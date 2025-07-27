import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/provider/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Metadata
export const metadata: Metadata = {
  title:
    "File Explorer - A web based file explorer which can be used to explore files and folders",
  description:
    "File Explorer is a web based file explorer which can be used to explore files and folders",
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {/* Tanstack Query Provider */}
            <QueryProvider>
              {/* Main Content */}
              <main className="flex-1">{children}</main>

              {/* Sonner Toast Provider */}
              <Toaster />

              {/* React Query Devtools */}
              {false && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
