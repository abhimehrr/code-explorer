import axs, { AxiosInstance } from "axios";

// API Client
const api = axs.create({
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
  url: string;
  data?: any;
  token?: Token;
  method?: "get" | "post" | "put" | "delete" | "patch";
  params?: Record<string, string | number | boolean>;
}

// Axios Client Instance
export const axios = async (config: AxiosConfig) => {
  const { token, params, method = "get", url, data } = config;

  // Set token if provided
  if (token) {
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `${token.type} ${token.value}`;
      return config;
    });
  }
  return (await api[method](url, { params, data })).data;
};
