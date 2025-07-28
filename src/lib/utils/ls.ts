"use client";

// Local Storage
export const ls = {
  get: (key: string) => JSON.parse(localStorage.getItem(key) || "null"),
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  },
  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
