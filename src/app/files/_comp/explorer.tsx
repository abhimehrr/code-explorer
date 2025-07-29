"use client";

import { NodeItem } from "@/components/file-explorer/node-item";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { InlineLoader } from "@/components/loaders";
import RefreshButton from "@/components/refresh-button";
import { Button } from "@/components/ui/button";
import { getFile } from "@/lib/api/api";
import { errorMessage } from "@/lib/utils/helper";
import { ls } from "@/lib/utils/ls";
import { useFilesStore } from "@/stores/files.store";
import { File } from "@/types/file.type";
import { HostConfiguration } from "@/validation/configuration.zod";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowUpRight,
  GitBranch,
  MoveLeft,
  RefreshCcw,
  Settings2,
} from "lucide-react";
import Link from "next/link";

// File Tree Component
export const FileExplorer: React.FC = () => {
  // File Store
  const { setSelectedFile } = useFilesStore();

  // Get Files
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryFn: () => getFile({}),
    queryKey: ["files"],
  });

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
          {isLoading ? (
            <InlineLoader
              loader={{
                show: true,
                text: "Getting Files...",
              }}
              classNames={{
                container: "h-full",
                loader: "size-5",
              }}
            />
          ) : isError ? (
            <div className="h-full flex flex-col">
              {/* Error */}
              <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-3 flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />
                <h3 className="font-medium text-destructive">
                  {errorMessage(error)}
                </h3>
              </div>

              {/* Host Configuration Title */}
              <div className="p-4 border-b">
                <h4 className="font-medium flex items-center gap-2">
                  <Settings2 className="size-5 text-muted-foreground" />
                  <span>Host Configuration</span>
                </h4>
              </div>

              {/* Host Configuration */}
              <div className="h-full overflow-auto">
                <pre className="p-4 text-sm">
                  {JSON.stringify(
                    ls.get("hosts")?.find((h: any) => h.default),
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          ) : (
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
          )}
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
