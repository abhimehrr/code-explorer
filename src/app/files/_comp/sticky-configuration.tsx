"use client";

import React, { Suspense, useMemo, useState } from "react";
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
import { FullScreenLoader } from "@/components/loaders";
import { useRouter, useSearchParams } from "next/navigation";

// Configuration Content
const Configuration = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  const isOpen = useMemo(() => tab === "config", [tab]);

  // Handle Open Change
  const handleOpenChange = (open: boolean) => {
    // Make Url
    const url = new URL(window.location.href);
    url.searchParams.set("tab", open ? "config" : "");
    router.push(url.toString());
  };

  return (
    <div className="fixed bottom-2 right-4 z-50">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            id="configuration-button"
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

// Configuration Modal
export function ConfigurationModal() {
  return (
    <Suspense
      fallback={
        <FullScreenLoader
          loader={{
            show: true,
            text: "Setting up things for you, Please wait...",
          }}
          classNames={{
            container: "bg-background",
          }}
        />
      }
    >
      <Configuration />
    </Suspense>
  );
}
