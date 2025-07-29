import axios from "axios";
import { ls } from "../utils/ls";
import { HostConfiguration, PathEnum } from "@/validation/configuration.zod";

// API Client
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// interface
export interface Token {
  type: "Bearer" | "Basic";
  value: string;
}

interface AxiosConfig {
  data?: any;
  method?: "get" | "post" | "put" | "delete" | "patch";
  params?: Record<string, string | number | boolean>;
}

// Axios Client Instance
export const getFile = async (config: AxiosConfig) => {
  // Get token from Local Storage
  const host: HostConfiguration = ls
    .get("hosts")
    ?.find((h: HostConfiguration) => h.default);

  // Set base URL
  if (!host) {
    throw new Error("No Host, Please add a host in the configuration");
  }

  // File Path
  const filePaths = host.paths?.find((p) => p.key === PathEnum.FILES);
  if (!filePaths) {
    throw new Error("File path not found in host configuration");
  }

  // Set Base URL
  api.defaults.baseURL = host.baseUrl;

  // Set token if provided
  if (host?.token) {
    // Set token
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${host.token}`;
      return config;
    });
  }

  // Make request
  return (
    await api[config.method || "get"](`${filePaths.path}`, {
      params: config?.params,
      data: config?.data,
    })
  ).data;
};
