"use client";

import { CodeViewer } from "@/app/files/_comp/code-viewer";
import { FileExplorer } from "./_comp/explorer";
import { useFilesStore } from "@/stores/files.store";
import { ContentNotFound } from "@/components/file-explorer/content-not-found";
import Configuration from "./_comp/sticky-configuration";
import { useEffect } from "react";
import ConfigurationAndSettings from "@/components/file-explorer/configuration/configuration";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FilesPage() {
  // File Store
  const { selectedFile, hosts, initalizeHostConfig } = useFilesStore();

  // Initialize Host Config
  useEffect(() => {
    initalizeHostConfig();
  }, [initalizeHostConfig]);

  return hosts.length > 0 ? (
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
  ) : (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-3xl max-h-[95vh] overflow-auto">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Please configure the file explorer to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigurationAndSettings />
        </CardContent>
      </Card>
    </div>
  );
}
