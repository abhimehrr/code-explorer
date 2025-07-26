"use client";

import React, { useEffect, useState } from "react";
import { CodeViewer } from "@/app/files/_comp/code-viewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FolderOpen,
  FileText,
  Code,
  ArrowLeft,
  MoveLeft,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { FileExplorer } from "./_comp/explorer";
import { FileNode } from "@/types/file.type";

export default function FilesPage() {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    path: string;
  } | null>(null);

  // Handle File Select
  const handleFileSelect = (file: any) => {
    if (file.type === "file") {
      setSelectedFile(file.path);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree Sidebar */}
        <div className="w-80 border-r bg-muted/30">
          <div className="py-2 px-4 border-b">
            <div className="flex items-center gap-2">
              <Button
                variant={"ghost"}
                className="cursor-pointer"
                title="Home"
                asChild
              >
                <Link href={"/"}>
                  <MoveLeft className="size-4" />
                </Link>
              </Button>
              <h2 className="font-semibold flex items-center gap-2">
                <GitBranch className="size-4" />
                <span>File Explorer</span>
              </h2>
            </div>
          </div>
          {/* File Explorer */}
          <FileExplorer onFileSelect={handleFileSelect} />
        </div>

        {/* Code Viewer */}
        <div className="flex-1">
          {selectedFile ? (
            <CodeViewer
              fileName={selectedFile.name}
              filePath={selectedFile.path}
              content={"selectedFileContent"}
              onClose={() => setSelectedFile(null)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Code className="h-12 w-12 opacity-50" />
                  <h3 className="text-lg font-medium">No file selected</h3>
                </div>
                <p className="text-sm">
                  Select a file from the file tree to view its contents
                </p>
                <div className="">
                  <p>Meanwhile you can see my portfolio at</p>
                  <p className="text-lg">
                    <Link
                      href={"https://abhi.shre.in"}
                      target="_blank"
                      className="text-pink-500 hover:text-pink-600 tracking-wide transition-all"
                    >
                      abhi.shre.in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
