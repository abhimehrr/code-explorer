import { Navbar } from "@/components/header/navbar";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { Button } from "@/components/ui/button";
import { Code, Sparkles } from "lucide-react";
import Link from "next/link";

// Global Layout
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-background">
        <div className="flex items-center justify-between py-2 px-10 border-b border-border">
          {/* Title */}
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Button size={"icon"} className="size-6 rounded-sm">
              <Code className="size-4" />
            </Button>
            <span className="text-primary">CodeExplorer</span>
          </h1>
          {/* Navbar */}
          <Navbar />
          <div className="flex items-center gap-2">
            <Button size="sm" asChild className="flex items-center gap-2">
              <Link href="/files">
                <Sparkles className="size-3" />
                <span>Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
