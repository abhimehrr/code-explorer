import { create } from "zustand";
import { File } from "@/types/file.type";

// File Store State
interface FileStoreState {
  selectedFile: File | null;
  fileContent: string | null;
  setFileContent: (content: string | null) => void;
  setSelectedFile: (file: File | null) => void;
}

// Files Store
export const useFilesStore = create<FileStoreState>((set) => ({
  selectedFile: null,
  fileContent: null,
  setFileContent: (content) => set({ fileContent: content }),
  setSelectedFile: (file) => set({ selectedFile: file }),
}));
