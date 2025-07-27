import React from "react";
import { Button } from "./ui/button";
import { InlineLoader, LoaderProps } from "./loaders";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// Props
export interface RefreshButtonProps {
  onClick: () => void;
  isLoading: boolean;
  title?: string;
  className?: string;
  loader?: LoaderProps;
}

// Refresh Button
const RefreshButton = ({
  onClick,
  isLoading,
  className,
  loader,
  title,
}: RefreshButtonProps) => {
  // Default Loader
  const defaultLoader: LoaderProps = {
    classNames: {
      loader: "size-4",
    },
  };
  // Loader
  loader = { ...defaultLoader, ...loader };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn("size-8 cursor-pointer", className)}
      title={title}
      onClick={onClick}
    >
      {isLoading ? (
        <InlineLoader {...loader} />
      ) : (
        <RefreshCcw className="size-4" />
      )}
    </Button>
  );
};

export default RefreshButton;
