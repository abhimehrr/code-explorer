"use client";

import { CodeViewer } from "@/app/files/_comp/code-viewer";
import { FileExplorer } from "./_comp/explorer";
import { useFilesStore } from "@/stores/files.store";
import { ContentNotFound } from "@/components/file-explorer/content-not-found";
import Configuration from "./_comp/sticky-configuration";

export default function FilesPage() {
  // File Store
  const { selectedFile } = useFilesStore();

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
      <Configuration />
    </div>
  );
}
