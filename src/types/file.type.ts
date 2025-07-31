export interface File {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  path: string;
  ext?: string;
  children?: File[];
}

export interface FileContent {
  name: string;
  size: number;
  ext: string;
  content: string;
  path: string;
}
