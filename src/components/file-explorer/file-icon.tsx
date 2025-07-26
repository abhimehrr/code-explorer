import { cn } from "@/lib/utils";
import { Code, FileText } from "lucide-react";

/**
 * File extension to language mapping
 */
const FILE_EXTENSION_MAP: Record<string, string> = {
  // TypeScript/JavaScript
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",

  // Python
  py: "python",

  // Java/Kotlin
  java: "java",
  kt: "kotlin",

  // C/C++
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  c: "c",

  // C#
  cs: "csharp",

  // Other languages
  php: "php",
  rb: "ruby",
  go: "go",
  rs: "rust",
  swift: "swift",

  // Data formats
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  ini: "ini",

  // Markup
  md: "markdown",
  html: "html",

  // Stylesheets
  css: "css",
  scss: "scss",
  sass: "scss",

  // Database
  sql: "sql",

  // Shell scripts
  sh: "bash",
  bash: "bash",

  // Text files
  txt: "text",
  log: "text",
};

/**
 * File extension to icon type mapping
 */
interface FileIconMap {
  extensions: string[];
  icon: React.ElementType;
  class: string;
}
const FILE_ICON_MAP: FileIconMap[] = [
  // Programming languages - blue code icon
  {
    extensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "java",
      "py",
      "kt",
      "cpp",
      "cc",
      "cxx",
      "c",
      "cs",
      "php",
      "rb",
      "go",
      "rs",
      "swift",
    ],
    icon: Code,
    class: "text-blue-500",
  },
  {
    extensions: ["json", "xml", "yaml", "yml", "toml", "ini"],
    icon: Code,
    class: "text-green-500",
  },
  {
    extensions: ["md", "txt", "log"],
    icon: FileText,
    class: "text-gray-500",
  },
];

/**
 * Get the file extension from a file name
 * @param fileName - The file name
 * @returns The file extension
 */
export const getFileFromExtension = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return FILE_EXTENSION_MAP[extension] || "text";
};

/**
 * Get file icon configuration
 * @param fileName - The file name
 * @returns Object with icon type and color class
 */
export const FileIcon = ({
  fileName,
  className,
}: {
  fileName: string;
  className?: string;
}): React.ReactNode => {
  // Get the file extension
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  // Get the file icon config
  const config =
    FILE_ICON_MAP.find((icon) => icon.extensions.includes(extension)) ||
    FILE_ICON_MAP[0];

  // Return the file icon
  return <config.icon className={cn("size-4", config.class, className)} />;
};
