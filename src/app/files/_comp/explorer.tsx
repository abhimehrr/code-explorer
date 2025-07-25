import {
  FileExplorerProps,
  NodeItem,
} from "@/components/file-explorer/node-item";

// File Tree Component
export const FileExplorer: React.FC<FileExplorerProps> = ({
  data,
  onFileSelect,
  onFolderToggle,
}) => {
  return (
    <div className="w-full h-[calc(100vh-90px)] overflow-auto thin-scrollbar">
      <div className="p-2">
        {data.map((node) => (
          <NodeItem
            key={node.id}
            node={node}
            level={0}
            onFileSelect={onFileSelect}
            onFolderToggle={onFolderToggle}
          />
        ))}
      </div>
    </div>
  );
};
