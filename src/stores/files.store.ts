import { create } from "zustand";
import { File } from "@/types/file.type";
import { HostConfiguration } from "@/validation/configuration.zod";
import { ls } from "@/lib/utils/ls";
import { successToast } from "@/components/form-error";

// File Store State
interface FileStoreState {
  selectedFile: File | null;
  fileContent: string | null;
  hosts: HostConfiguration[];
  isAddingHost: boolean;
  initalizeHostConfig: () => void;
  setHost: (host: HostConfiguration) => void;
  deleteHost: (id: string) => void;
  updateHost: (id: string, host: HostConfiguration) => void;
  setIsAddingHost: (isAddingHost: boolean) => void;
  setFileContent: (content: string | null) => void;
  setSelectedFile: (file: File | null) => void;
}

// Files Store
export const useFilesStore = create<FileStoreState>((set, get) => ({
  selectedFile: null,
  fileContent: null,
  hosts: [],
  isAddingHost: false,

  // Initialize Host Config
  initalizeHostConfig: () => {
    const hosts = ls.get("hosts") || [];
    console.log(hosts);
    set({ hosts });
    console.log("get", get().hosts);
  },

  // Set Host
  setHost: (host) => {
    let hosts: HostConfiguration[] = JSON.parse(JSON.stringify(get().hosts));

    // If host already exists, update it
    const existingHost = hosts.find((h) => h.id === host.id);

    // If current host is default, remove it from other hosts
    if (existingHost?.default) {
      hosts = hosts.map((h) =>
        h.id !== host.id ? { ...h, default: false } : h
      );
    }

    // If host already exists, update it
    if (existingHost) {
      // Update Host
      Object.assign(existingHost, host);
    } else {
      // Add new host
      hosts.push(host);
    }

    // Save to Local Storage
    ls.set("hosts", hosts);
    set({ hosts, isAddingHost: false });

    // Toast
    successToast("Host saved successfully");
  },

  // Delete Host
  deleteHost: (id: string) => {
    const hosts = get().hosts.filter((h) => h.id !== id);
    ls.set("hosts", hosts);
    set({ hosts });
  },

  // Update Host
  updateHost: (id: string, host: HostConfiguration) => {
    const hosts = get().hosts.map((h) =>
      h.id === id
        ? host
        : {
            ...h,
            default: false,
          }
    );
    ls.set("hosts", hosts);
    set({ hosts });
  },

  // Set Is Adding Host
  setIsAddingHost: (isAddingHost: boolean) => set({ isAddingHost }),

  // Set File Content
  setFileContent: (content) => set({ fileContent: content }),

  // Set Selected File
  setSelectedFile: (file) => set({ selectedFile: file }),
}));
