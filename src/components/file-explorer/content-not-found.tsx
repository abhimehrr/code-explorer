import { Code, FileText, Sparkles, ArrowUpRight, FolderOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

// Content Not Found Component
export const ContentNotFound = () => {
  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="text-center space-y-10 p-8 max-w-lg relative z-10">
        {/* Enhanced icon with multiple layers */}
        <div className="relative mx-auto w-28 h-28 mb-8">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl blur-2xl animate-pulse"></div>
          
          {/* Middle layer */}
          <div className="absolute inset-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-lg"></div>
          
          {/* Main container */}
          <div className="relative w-full h-full bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 rounded-2xl border border-primary/30 flex items-center justify-center backdrop-blur-sm shadow-2xl">
            <div className="relative">
              <Code className="h-12 w-12 text-primary drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Enhanced content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              No file selected
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-pink-500 rounded-full mx-auto"></div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed text-lg max-w-md mx-auto">
            Select a file from the file tree to view its contents and start exploring your codebase
          </p>
        </div>

        {/* Enhanced portfolio section */}
        <div className="pt-8 border-t border-border/30">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
              <span>Meanwhile, explore my work</span>
            </div>
            
            <Link
              href="https://abhi.shre.in"
              target="_blank"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-blue-500/20 border border-pink-500/20 hover:border-pink-500/40 rounded-2xl text-pink-500 hover:text-pink-400 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="relative">
                <Sparkles className="h-5 w-5 group-hover:animate-caret-blink transition-transform duration-700" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <span className="font-semibold tracking-wide text-base">abhi.shre.in</span>
              <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-br from-primary to-pink-500 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-pulse delay-1000 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/6 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-1500"></div>
      </div>
    </div>
  );
};
