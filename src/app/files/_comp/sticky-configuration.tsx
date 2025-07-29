"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConfigurationAndSettings from "@/components/file-explorer/configuration/configuration";

// Configuration Dialog
const Configuration = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-2 right-4 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            id="configuration-button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="px-4 py-5 bg-accent! group rounded-full cursor-pointer"
          >
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <div className="relative">
                <Settings className="size-5 group-hover:animate-spin transition-transform duration-700" />
                <div className="absolute -top-1 -right-1 size-2 bg-yellow-500 rounded-full animate-caret-blink"></div>
              </div>
              <span className="font-semibold tracking-wide text-sm">
                Config
              </span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-accent" />
        <DialogContent className="min-w-2xl max-w-3xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Configure the code viewer</DialogDescription>
          </DialogHeader>

          {/* Configuration and Settings */}
          <ConfigurationAndSettings />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configuration;
