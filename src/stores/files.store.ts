import { create } from "zustand";
import { File } from "@/types/file.type";

// File Store State
interface FileStoreState {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

// Files Store
export const useFilesStore = create<FileStoreState>((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
}));
