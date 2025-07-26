import {
  FileExplorerProps,
  NodeItem,
} from "@/components/file-explorer/node-item";
import { axios } from "@/lib/api/api";
import { FileNode } from "@/types/file.type";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
const HOST = "http://localhost:2000";

// File Tree Component
export const FileExplorer: React.FC<FileExplorerProps> = ({
  onFileSelect,
  onFolderToggle,
}) => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryFn: () => axios({ url: `${HOST}/files` }),
    queryKey: ["files"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full">
      <div className="w-full h-[calc(100vh-90px)] overflow-auto thin-scrollbar">
        <div className="p-2">
          {data.map((dir: FileNode) => (
            <NodeItem
              key={dir.id}
              node={dir}
              level={0}
              onFileSelect={onFileSelect}
              onFolderToggle={onFolderToggle}
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
  );
};
