"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CodeViewerProps {
  fileName: string;
  filePath: string;
  content: string;
  language?: string;
  onClose?: () => void;
}

const getLanguageFromExtension = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";
    case "py":
      return "python";
    case "java":
      return "java";
    case "cpp":
    case "cc":
    case "cxx":
      return "cpp";
    case "c":
      return "c";
    case "cs":
      return "csharp";
    case "php":
      return "php";
    case "rb":
      return "ruby";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "swift":
      return "swift";
    case "kt":
      return "kotlin";
    case "json":
      return "json";
    case "xml":
      return "xml";
    case "yaml":
    case "yml":
      return "yaml";
    case "toml":
      return "toml";
    case "ini":
      return "ini";
    case "md":
      return "markdown";
    case "html":
      return "html";
    case "css":
      return "css";
    case "scss":
    case "sass":
      return "scss";
    case "sql":
      return "sql";
    case "sh":
    case "bash":
      return "bash";
    case "txt":
    case "log":
      return "text";
    default:
      return "text";
  }
};

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "py":
    case "java":
    case "cpp":
    case "c":
    case "cs":
    case "php":
    case "rb":
    case "go":
    case "rs":
    case "swift":
    case "kt":
      return <Code className="h-4 w-4 text-blue-500" />;
    case "json":
    case "xml":
    case "yaml":
    case "yml":
    case "toml":
    case "ini":
      return <Code className="h-4 w-4 text-green-500" />;
    case "md":
    case "txt":
    case "log":
      return <FileText className="h-4 w-4 text-gray-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-400" />;
  }
};

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

  const detectedLanguage = language || getLanguageFromExtension(fileName);
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
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getFileIcon(fileName)}
            <h3 className="font-medium text-sm">{fileName}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{filePath}</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search in file..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="pl-8 h-8 w-48 text-xs"
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
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </div>

      {/* Language Badge */}
      <div className="px-3 py-1 bg-muted/30 border-b">
        <span className="text-xs text-muted-foreground">
          {detectedLanguage.toUpperCase()} • {totalLines} lines
        </span>
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
                <div className="flex-shrink-0 w-12 text-right text-muted-foreground select-none border-r pr-2">
                  {index + 1}
                </div>
              )}
              <div className="flex-1 px-2 py-0.5">{line || "\u00A0"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-1 bg-muted/30 border-t text-xs text-muted-foreground">
        {searchTerm && (
          <span>
            Found {filteredLines.length} of {totalLines} lines
          </span>
        )}
        {!searchTerm && <span>Ready</span>}
      </div>
    </div>
  );
};
