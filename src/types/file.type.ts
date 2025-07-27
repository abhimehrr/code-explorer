// File Node Type
export interface File {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  children?: File[];
  fileType?: string;
}

export interface FileContent {
  name: string;
  size: number;
  ext: string;
  content: string;
  path: string;
}
