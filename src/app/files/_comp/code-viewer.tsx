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
  AlertTriangle,
  Settings2,
  RefreshCcw,
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
import { useFilesStore } from "@/stores/files.store";
import { getFile } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { FileContent } from "@/types/file.type";
import { BlockLoader, InlineLoader } from "@/components/loaders";
import { errorMessage } from "@/lib/utils/helper";
import { cn } from "@/lib/utils";
import { ls } from "@/lib/utils/ls";

// CodeViewer component
export const CodeViewer: React.FC = () => {
  // File Store
  const { selectedFile, setSelectedFile, hosts } = useFilesStore();

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
      getFile({
        params: {
          file_path: selectedFile?.path || "",
        },
      }),
    queryKey: ["files", selectedFile?.path],
    enabled: !!selectedFile?.path,
  });

  // File Details
  const detectedLanguage = getFileFromExtension(file?.ext || "");
  const lines = file?.content?.split("\n") || [];
  const totalLines = lines.length;

  // Handle Copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file?.content || "");
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Handle Download
  const handleDownload = () => {
    const blob = new Blob([file?.content || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file?.name || "";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered Lines
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

        <div className="flex items-center gap-2">
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

          <div className="flex items-center">
            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading || isFetching}
            >
              {isLoading || isFetching ? (
                <InlineLoader
                  classNames={{
                    loader: "size-4",
                  }}
                />
              ) : (
                <RefreshCcw className="size-4" />
              )}
            </Button>

            {/* Copy to clipboard */}
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="size-4" />
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
                variant="ghost"
                size="sm"
                className="size-7 cursor-pointer hover:text-destructive hover:bg-destructive/10!"
                onClick={() => setSelectedFile(null)}
                title="Close current selected file"
              >
                <XIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Language Badge */}
      <div className="px-3 py-1.5 bg-muted/30 border-b">
        <p className="text-sm text-muted-foreground">{file?.path || ""}</p>
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
          <div className="h-full flex flex-col">
            {/* Error */}
            <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-3 flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              <h3 className="font-medium text-destructive">
                {errorMessage(error)}
              </h3>
            </div>

            {/* Host Configuration Title */}
            <div className="p-4 flex items-center gap-8">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Settings2 className="size-5 text-muted-foreground" />
                <span>Host Configuration</span>
              </h4>

              {/* Refresh Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => refetch()}
                disabled={isLoading || isFetching}
              >
                {isFetching || isLoading ? (
                  <InlineLoader
                    loader={{
                      show: true,
                      text: "Refreshing...",
                    }}
                  />
                ) : (
                  <>
                    <span>Try Refreshing</span>
                    <RefreshCcw className="size-3.5" />
                  </>
                )}
              </Button>
            </div>

            {/* Host Configuration */}
            <div className="flex-1 border-y overflow-auto">
              <pre className="p-4 text-xs">
                {JSON.stringify(hosts, null, 2)}
              </pre>
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
