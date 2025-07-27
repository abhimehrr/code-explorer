import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";

// Content Not Found Component
export const ContentNotFound = () => {
  return (
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
  );
};
