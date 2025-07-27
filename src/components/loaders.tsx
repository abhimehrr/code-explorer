import { cn } from "@/lib/utils";
import { Loader, Loader2, LoaderPinwheel } from "lucide-react";

type LoaderType = "pinwheel" | "circle" | "circle-dashed";

// Props
export interface LoaderProps {
  loader?: {
    show?: boolean;
    text?: string;
    type?: LoaderType;
    className?: string;
  };
  classNames?: {
    container?: string;
    loader?: string;
  };
}

// Default Loader
const defaultLoader: LoaderProps["loader"] = {
  text: "Loading...",
  type: "circle-dashed",
  show: false,
  className: "",
};

// Get Loader
const GetLoader = ({
  type,
  className,
}: {
  type: LoaderType | undefined;
  className?: string;
}): React.ReactNode => {
  const defaultClassName = "size-10 animate-spin";
  switch (type) {
    case "circle":
      return <Loader2 className={cn(defaultClassName, className)} />;
    case "circle-dashed":
      return <Loader className={cn(defaultClassName, className)} />;
    case "pinwheel":
      return <LoaderPinwheel className={cn(defaultClassName, className)} />;
    default:
      return <Loader className={cn(defaultClassName, className)} />;
  }
};

// Full Screen Loader
export const FullScreenLoader = ({ classNames, loader }: LoaderProps) => {
  loader = {
    ...defaultLoader,
    ...loader,
  };
  return (
    <div
      className={cn(
        "w-full h-screen fixed inset-0 z-50 bg-foreground/20",
        classNames?.container
      )}
    >
      <div className="size-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <GetLoader type={loader.type} className={classNames?.loader} />
          {loader.show && (
            <span className={cn("text-sm -ml-2", loader?.className)}>
              {loader.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Block Loader
export const BlockLoader = ({ classNames, loader }: LoaderProps) => {
  loader = {
    ...defaultLoader,
    ...loader,
  };
  return (
    <div className={cn("w-full", classNames?.container)}>
      <div className="size-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <GetLoader type={loader.type} className={classNames?.loader} />
          {loader.show && (
            <span className={cn("text-sm -mr-2", loader?.className)}>
              {loader.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline Loader
export const InlineLoader = ({ classNames, loader }: LoaderProps) => {
  loader = {
    ...defaultLoader,
    ...loader,
  };
  return (
    <div className={cn("w-full", classNames?.container)}>
      <div className="size-full flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <GetLoader
            type={loader.type}
            className={cn("size-6", classNames?.loader)}
          />
          {loader.show && (
            <span className={cn(loader?.className)}>{loader.text}</span>
          )}
        </div>
      </div>
    </div>
  );
};
