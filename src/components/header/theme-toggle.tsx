"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Toggle Theme
export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="icon" className="size-8 cursor-pointer">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="mr-4 mt-1 p-1 w-32">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-2"
            onClick={() => setTheme("light")}
          >
            <Sun className="size-4" />
            <span className="text-sm font-medium">Light</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-2"
            onClick={() => setTheme("dark")}
          >
            <Moon className="size-4" />
            <span className="text-sm font-medium">Dark</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setTheme("system")}
            className="w-full flex items-center justify-start gap-2"
          >
            <Monitor className="size-4" />
            <span className="text-sm font-medium">System</span>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
