import { CircleCheck, CircleX, LucideIcon } from "lucide-react";
import { toast } from "sonner";

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

// Form Error Type
export interface zodError {
  message?: string;
  [key: string]: any;
}

/**
 * Find First Error Message
 * @param errors - Zod Error
 * @returns Error Message
 */
export function zodError(errors: zodError): string | null {
  for (const key in errors) {
    const value = errors[key];

    // If value is not found, continue
    if (!value) continue;

    // If value is a string, show toast
    if (typeof value.message === "string") {
      errorToast(value.message);
      return value.message;
    }

    // If value is an object, recursively call zodError
    if (typeof value === "object") {
      const nestedMessage = zodError(value);
      if (nestedMessage) return nestedMessage;
    }
  }

  return null;
}

/**
 * Show Error Message in Toast
 * @param errMsg Error message
 * @param config Toast config
 * @return void
 */
export const errorToast = (
  errMsg: string,
  config?: {
    duration?: number;
    position?: Position;
    icon?: LucideIcon;
    closeButton?: boolean;
  }
): void => {
  const defaultConfig = {
    duration: 3000,
    position: "top-center",
    closeButton: false,
    icon: CircleX,
  };

  const cfg = { ...defaultConfig, ...config };

  toast.error(errMsg, {
    position: cfg.position as Position,
    duration: cfg.duration,
    closeButton: cfg.closeButton,
    classNames: {
      content: "text-red-500",
      closeButton: "hover:text-white!",
    },
    icon: cfg.icon ? <cfg.icon className="size-4 text-red-500" /> : undefined,
  });
};

/**
 * Show Success Message in Toast
 * @param successMsg Error message
 * @param config Toast config
 * @return void
 */
export const successToast = (
  successMsg: string,
  config?: {
    duration?: number;
    position?: Position;
    icon?: LucideIcon;
    closeButton?: boolean;
  }
): void => {
  const defaultConfig = {
    duration: 3000,
    position: "top-center",
    closeButton: false,
    icon: CircleCheck,
  };

  const cfg = { ...defaultConfig, ...config };

  toast.success(successMsg, {
    position: cfg.position as Position,
    duration: cfg.duration,
    closeButton: cfg.closeButton,
    classNames: {
      content: "text-green-600",
    },
    icon: cfg.icon ? <cfg.icon className="size-4 text-green-500" /> : undefined,
  });
};
