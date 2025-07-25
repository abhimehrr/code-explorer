"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Theme Provider
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
