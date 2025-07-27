"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Copy,
  Download,
  Settings,
  XIcon,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getFileFromExtension,
  FileIcon,
} from "@/components/file-explorer/file-icon";
import Link from "next/link";
import { useFilesStore } from "@/stores/files.store";
import { axios } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { HOST } from "./explorer";
import { FileContent } from "@/types/file.type";
import { BlockLoader } from "@/components/loaders";
import { errorMessage } from "@/lib/utils/helper";
import { cn } from "@/lib/utils";

// CodeViewer component
export const CodeViewer: React.FC = () => {
  // File Store
  const { selectedFile, setSelectedFile } = useFilesStore();

  // File State
  const [file, setFile] = useState<FileContent | null>(null);
  const [settings, setSettings] = useState({
    searchTerm: "",
    showLineNumbers: true,
    wordWrap: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Get File Content
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryFn: () =>
      axios({
        url: `${HOST}/files/?file_path=${selectedFile?.path}`,
      }),
    queryKey: ["files", selectedFile?.path],
    enabled: !!selectedFile?.path,
  });

  // File Details
  const detectedLanguage = getFileFromExtension(file?.ext || "");
  const lines = file?.content?.split("\n") || [];
  const totalLines = lines.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file?.content || "");
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([file?.content || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file?.name || "";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLines = settings.searchTerm
    ? lines.filter((line, index) =>
        line.toLowerCase().includes(settings.searchTerm.toLowerCase())
      )
    : lines;

  // Keydown for Search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // File content
  useEffect(() => {
    if (data) {
      setFile(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col h-full w-full bg-background border rounded-lg overflow-hiddens">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileIcon fileName={file?.name || ""} className="size-5" />
            <h3 className="font-medium">{file?.name || ""}</h3>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Search */}
          <div className="w-full flex items-center justify-between gap-2 max-md:hidden">
            <Button
              variant={"outline"}
              className="w-full flex items-center justify-between gap-2 py-0!"
            >
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Search in File..."
                value={settings.searchTerm}
                ref={inputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                className="h-full px-2 w-36 md:w-48 lg:w-64 border-x focus:outline-none"
              />
              <div className="absoluteright-2 top-1/2 transform-translate-y-1/2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Ctrl + K
                </span>
              </div>
            </Button>
          </div>

          {/* Copy to clipboard */}
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>

          {/* Download */}
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    showLineNumbers: !prev.showLineNumbers,
                  }))
                }
              >
                {settings.showLineNumbers ? "Hide" : "Show"} Line Numbers
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    wordWrap: !prev.wordWrap,
                  }))
                }
              >
                {settings.wordWrap ? "Disable" : "Enable"} Word Wrap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedFile && (
            <Button
              variant="outline"
              size="sm"
              className="size-7 cursor-pointer hover:text-destructive!"
              onClick={() => setSelectedFile(null)}
              title="Close current selected file"
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Language Badge */}
      <div className="px-3 py-1 bg-muted/30 border-b">
        <span className="text-xs text-muted-foreground">
          {file?.path || ""}
        </span>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <BlockLoader
            loader={{
              show: true,
              text: "Getting File Content...",
            }}
            classNames={{
              container: "flex items-center justify-center h-full",
            }}
          />
        ) : isError ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-destructive" />
              <p className="text-destructive">{errorMessage(error)}</p>
            </div>
          </div>
        ) : (
          filteredLines.map((line, index) => (
            <div
              key={index}
              className={cn(
                "flex hover:bg-muted/50",
                settings.wordWrap ? "whitespace-pre-wrap" : "whitespace-pre"
              )}
            >
              {settings.showLineNumbers && (
                <pre className="flex-shrink-0 w-12 text-right text-muted-foreground select-none border-r pr-2">
                  {index + 1}
                </pre>
              )}
              <pre className="flex-1 px-2 py-0.5">{line || "\u00A0"}</pre>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-1 bg-muted/30 border-t text-xs">
        <div className="flex items-center gap-4 text-muted-foreground">
          {settings.searchTerm ? (
            <div className="flex items-center gap-1">
              <span>Found</span>
              <span className="font-medium">{filteredLines.length}</span>
              <span>of</span>
              <span className="font-medium">{totalLines}</span>
              <span>lines</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="size-2 bg-green-500 block rounded-full animate-pulse" />
              <span>Ready</span>
            </div>
          )}

          {/* Separator */}
          <div className="h-4 w-[1px] bg-primary/50" />

          {/* File Type */}
          <div className="flex items-center gap-1.5">
            <span>{detectedLanguage.toUpperCase()}</span>
            <span>•</span>
            <span>{totalLines} lines</span>
          </div>
        </div>
      </div>
    </div>
  );
};
