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
import { FileIcon } from "./file-icon";

// File Tree Props Type
export interface FileExplorerProps {
  onFileSelect?: (file: FileNode) => void;
  onFolderToggle?: (folder: FileNode) => void;
}

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
            <FileIcon fileName={"node.name.ts"} />
          )}

          {/* File Name */}
          <span className="text-sm truncate flex-1">
            {/* {truncateString(node.name)} */}
            {node.name}
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
