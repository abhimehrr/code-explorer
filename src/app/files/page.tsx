"use client";

import { CodeViewer } from "@/app/files/_comp/code-viewer";
import { FileExplorer } from "./_comp/explorer";
import { useFilesStore } from "@/stores/files.store";
import { ContentNotFound } from "@/components/file-explorer/content-not-found";
import { ConfigurationModal } from "./_comp/sticky-configuration";
import { useEffect } from "react";

// Files Page Content
export default function FilesPage() {
  // File Store
  const { selectedFile, initalizeHostConfig } = useFilesStore();

  // Initialize Host Config
  useEffect(() => {
    initalizeHostConfig();
  }, [initalizeHostConfig]);

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <FileExplorer />

        {/* Code Viewer */}
        <div className="flex-1">
          {selectedFile ? <CodeViewer /> : <ContentNotFound />}
        </div>
      </div>

      {/* Sticky Configuration */}
      <ConfigurationModal />
    </div>
  );
}
