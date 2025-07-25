import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import React from "react";

// Avatar Placeholder
interface AvatarPlaceholderProps {
  className?: string;
  iconClassName?: string;
}

// Avatar Placeholder
export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  className,
  iconClassName,
}) => {
  return (
    <div
      className={cn(
        "size-full bg-gray-200 flex items-center justify-center rounded-full",
        className
      )}
    >
      <User className={cn("text-muted-foreground", iconClassName)} />
    </div>
  );
};
