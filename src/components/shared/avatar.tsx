import React from "react";
import { AvatarPlaceholder } from "./placeholder";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Avatar Props
export interface AvatarProps {
  image?: string;
  name?: string;
  classNames?: {
    container?: string;
    image?: string;
    placeholder?: string;
    icon?: string;
  };
}

// Avatar Component
const Avatar = ({ image, name, classNames }: AvatarProps) => {
  return (
    <div className={cn("relative size-12", classNames?.container)}>
      {image ? (
        <Image
          src={image}
          alt={name || ""}
          className={cn(
            "size-full rounded-full border object-cover",
            classNames?.image
          )}
          width={100}
          height={100}
          loading="lazy"
        />
      ) : (
        <AvatarPlaceholder
          className={classNames?.placeholder}
          iconClassName={classNames?.icon}
        />
      )}
    </div>
  );
};

export default Avatar;
