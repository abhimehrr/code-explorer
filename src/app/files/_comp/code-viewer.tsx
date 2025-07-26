"use client";

import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Copy,
  Download,
  Share2,
  Settings,
  FileText,
  Code,
  XIcon,
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

// Interface for the CodeViewer component
interface CodeViewerProps {
  fileName: string;
  filePath: string;
  content: string;
  language?: string;
  onClose?: () => void;
}

// CodeViewer component
export const CodeViewer: React.FC<CodeViewerProps> = ({
  fileName,
  filePath,
  content,
  language,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);

  const detectedLanguage = language || getFileFromExtension(fileName);
  const lines = content.split("\n");
  const totalLines = lines.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLines = searchTerm
    ? lines.filter((line, index) =>
        line.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : lines;

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileIcon fileName={fileName} />
            <h3 className="font-medium text-sm">{fileName}</h3>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Search */}
          <div className="relative max-md:hidden">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search in file..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="pl-8 h-8 w-48 text-sm hidden sm:block"
            />
          </div>

          {/* Actions */}
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setShowLineNumbers(!showLineNumbers)}
              >
                {showLineNumbers ? "Hide" : "Show"} line numbers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setWordWrap(!wordWrap)}>
                {wordWrap ? "Disable" : "Enable"} word wrap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {onClose && (
            <Button
              variant="outline"
              size="sm"
              className="size-7 cursor-pointer hover:text-destructive!"
              onClick={onClose}
              title="Close current selected file"
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Language Badge */}
      <div className="px-3 py-1 bg-muted/30 border-b">
        <span className="text-xs text-muted-foreground">{filePath}</span>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        <div className="font-mono text-sm">
          {filteredLines.map((line, index) => (
            <div
              key={index}
              className={`flex hover:bg-muted/50 ${
                wordWrap ? "whitespace-pre-wrap" : "whitespace-pre"
              }`}
            >
              {showLineNumbers && (
                <pre className="flex-shrink-0 w-12 text-right text-muted-foreground select-none border-r pr-2">
                  {index + 1}
                </pre>
              )}
              <pre className="flex-1 px-2 py-0.5">{line || "\u00A0"}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-1 bg-muted/30 border-t text-xs">
        <div className="flex items-center gap-4 text-muted-foreground">
          {searchTerm ? (
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
