"use client";

import React, { useState } from "react";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { File } from "@/types/file.type";
import { cn } from "@/lib/utils";
import { FileIcon } from "./file-icon";
import { truncateString } from "@/lib/utils/helper";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// File Tree Props Type
export interface FileExplorerProps {
  node: File;
  level: number;
  onFileSelect?: (file: File) => void;
  onFolderToggle?: (folder: File) => void;
}

// Node Item Component
export const NodeItem = ({
  node,
  level,
  onFileSelect,
  onFolderToggle,
}: FileExplorerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle Toggle
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
          <Tooltip>
            <TooltipTrigger className="cursor-pointer max-w-full truncate">
              {node.name}
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{node.path}</p>
            </TooltipContent>
          </Tooltip>
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
