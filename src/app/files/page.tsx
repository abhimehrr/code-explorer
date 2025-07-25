"use client";

import React, { useState } from "react";
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

// Mock data for demonstration
const mockFileData = [
  {
    id: "1",
    name: "src",
    type: "folder" as const,
    path: "/src",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder" as const,
        path: "/src/components",
        children: [
          {
            id: "3",
            name: "navbar.tsx",
            type: "file" as const,
            path: "/src/components/navbar.tsx",
            fileType: "typescript",
          },
          {
            id: "4",
            name: "button.tsx",
            type: "file" as const,
            path: "/src/components/button.tsx",
            fileType: "typescript",
          },
        ],
      },
      {
        id: "5",
        name: "app",
        type: "folder" as const,
        path: "/src/app",
        children: [
          {
            id: "6",
            name: "page.tsx",
            type: "file" as const,
            path: "/src/app/page.tsx",
            fileType: "typescript",
          },
          {
            id: "7",
            name: "layout.tsx",
            type: "file" as const,
            path: "/src/app/layout.tsx",
            fileType: "typescript",
          },
        ],
      },
      {
        id: "8",
        name: "utils.ts",
        type: "file" as const,
        path: "/src/utils.ts",
        fileType: "typescript",
      },
    ],
  },
  {
    id: "9",
    name: "package.json",
    type: "file" as const,
    path: "/package.json",
    fileType: "json",
  },
  {
    id: "10",
    name: "README.md",
    type: "file" as const,
    path: "/README.md",
    fileType: "markdown",
  },
];

// Mock file contents
const mockFileContents: Record<string, string> = {
  "/src/components/navbar.tsx": `"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CodeExplorer</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}`,
  "/package.json": `{
  "name": "code-explorer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.525.0",
    "next": "15.4.4",
    "next-themes": "^0.4.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}`,
  "/README.md": `# CodeExplorer

A modern web-based file explorer that allows you to browse and view code files from your local system, cloud storage, or Git repositories.

## Features

- **Local File Browsing**: Explore files on your local system
- **Cloud Integration**: Connect to cloud services like Google Drive, Dropbox
- **Git Repository Support**: Browse Git repositories without cloning
- **Code Viewing**: View code files with syntax highlighting
- **Search Functionality**: Find files and code snippets quickly
- **Team Collaboration**: Share code files with your team

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run the development server: \`npm run dev\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- Use the file tree to navigate through your files
- Click on any file to view its contents
- Use the search functionality to find specific files
- Share files with your team using the share button

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Lucide React Icons`,
};

export default function LocalFilesPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileSelect = (file: any) => {
    if (file.type === "file") {
      setSelectedFile(file.path);
    }
  };

  const handleFolderToggle = (folder: any) => {
    console.log("Folder toggled:", folder.name);
  };

  const selectedFileContent = selectedFile
    ? mockFileContents[selectedFile]
    : null;
  const selectedFileName = selectedFile
    ? selectedFile.split("/").pop() || ""
    : "";

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
          <div className="h-full">
            <FileExplorer
              data={mockFileData}
              onFileSelect={handleFileSelect}
              onFolderToggle={handleFolderToggle}
            />
            <div className="border-t pt-2 text-center text-sm text-muted-foreground">
              <Link
                href={"https://abhi.shre.in"}
                target="_blank"
                className="flex items-center justify-center gap-2 text-pink-500 hover:text-pink-600 tracking-wide transition-all"
              >
                <span>Abhishek</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1">
          {selectedFile && selectedFileContent ? (
            <CodeViewer
              fileName={selectedFileName}
              filePath={selectedFile}
              content={selectedFileContent}
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
