import { generateRandomString } from "@/lib/utils/random.utils";
import { z } from "zod";

// Path
export enum PathEnum {
  FILES = "files",
}

// Host Configuration
export const hostPathSchema = z.object({
  key: z.enum(
    PathEnum,
    "Path must be a valid path, one of the following: " +
      Object.values(PathEnum).join(", ")
  ),
  path: z.string("Path must be a string").min(1, "Path is required"),
});

export const hostConfigurationSchema = z.object({
  id: z.string("Host ID must be a string").default(generateRandomString()),
  name: z.string("Host name must be a string").min(1, "Host name is required"),
  baseUrl: z.url("Base URL must be a valid URL"),
  token: z.string("Token must be a string").optional(),
  paths: z.array(hostPathSchema, "Paths must be an array").optional(),
  default: z.boolean("Default must be a boolean").default(false),
});

// Types
export type HostPath = z.infer<typeof hostPathSchema>;
export type HostConfiguration = z.infer<typeof hostConfigurationSchema>;
