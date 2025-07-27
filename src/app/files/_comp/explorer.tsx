"use client";

import { NodeItem } from "@/components/file-explorer/node-item";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { InlineLoader } from "@/components/loaders";
import RefreshButton from "@/components/refresh-button";
import { Button } from "@/components/ui/button";
import { axios } from "@/lib/api/api";
import { useFilesStore } from "@/stores/files.store";
import { File } from "@/types/file.type";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, GitBranch, MoveLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
export const HOST = "http://localhost:2000";

// File Tree Component
export const FileExplorer: React.FC = () => {
  // File Store
  const { setSelectedFile } = useFilesStore();

  // Get Files
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryFn: () => axios({ url: `${HOST}/files` }),
    queryKey: ["files"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-80 border-r bg-muted/30">
      {/* File Tree Sidebar */}
      <div className="py-2 px-4 border-b">
        <div className="flex items-center justify-between gap-4">
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

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Refresh Button */}
            <RefreshButton onClick={() => refetch()} isLoading={isFetching} />
          </div>
        </div>
      </div>
      {/* File Explorer */}

      <div className="h-full">
        <div className="w-full h-[calc(100vh-90px)] overflow-auto thin-scrollbar">
          <div className="p-2">
            {data.map((dir: File) => (
              <NodeItem
                key={dir.id}
                node={dir}
                level={0}
                onFileSelect={setSelectedFile}
              />
            ))}
          </div>
        </div>
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
  );
};
