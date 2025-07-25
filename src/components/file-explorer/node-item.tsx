"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  FileCode,
  FileImage,
  File,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileNode } from "@/types/file.type";
import { cn } from "@/lib/utils";
import { truncateString } from "@/lib/utils/helper";

// File Tree Props Type
export interface FileExplorerProps {
  data: FileNode[];
  onFileSelect?: (file: FileNode) => void;
  onFolderToggle?: (folder: FileNode) => void;
}

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
      return <FileCode className="h-4 w-4 text-blue-500" />;
    case "json":
    case "xml":
    case "yaml":
    case "yml":
    case "toml":
    case "ini":
      return <FileCode className="h-4 w-4 text-green-500" />;
    case "md":
    case "txt":
    case "log":
      return <FileText className="h-4 w-4 text-gray-500" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "ico":
      return <FileImage className="h-4 w-4 text-purple-500" />;
    case "pdf":
      return <FileText className="h-4 w-4 text-red-500" />;
    default:
      return <File className="h-4 w-4 text-gray-400" />;
  }
};

export const NodeItem: React.FC<{
  node: FileNode;
  level: number;
  onFileSelect?: (file: FileNode) => void;
  onFolderToggle?: (folder: FileNode) => void;
}> = ({ node, level, onFileSelect, onFolderToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded);
      onFolderToggle?.(node);
    } else {
      onFileSelect?.(node);
    }
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={cn(
          "flex items-center cursor-pointer hover:bg-accent py-1.5 rounded group"
          // level > 0 && "ml-1"
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2 px-2">
          {node.type === "folder" && hasChildren && (
            <ChevronRight
              className={cn(
                "size-3 text-muted-foreground transition-all duration-300",
                isExpanded && "rotate-90"
              )}
            />
          )}

          {/* Folder Icon */}
          {node.type === "folder" ? (
            isExpanded ? (
              <FolderOpen className="size-4 text-yellow-500" />
            ) : (
              <Folder className="size-4 text-yellow-500" />
            )
          ) : (
            getFileIcon(node.name)
          )}

          {/* File Name */}
          <span className="text-sm truncate flex-1">
            {truncateString(node.name)}
          </span>
        </div>
      </div>

      {/* Folder Children Recursively */}
      {node.type === "folder" && isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <NodeItem
              key={child.id}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              onFolderToggle={onFolderToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};
