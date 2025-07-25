import { Navbar } from "@/components/header/navbar";
import { ThemeToggle } from "@/components/header/theme-toggle";

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
          <h1 className="text-xl font-bold">File Explorer</h1>
          {/* Navbar */}
          <Navbar />
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
      {children}
    </div>
  );
}
