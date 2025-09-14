import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileName(url: string) {
  // Extract last part after slash and strip query params
  const filename = url.split("/").pop()?.split("?")[0];
  if (!filename) return "PDF Document";

  // Remove unwanted characters (keep letters, numbers, dot, dash, underscore)
  let cleaned = filename.replace(/[^a-zA-Z0-9.\-_]/g, " ");

  // If a word contains both letters and numbers, strip the numbers
  cleaned = cleaned
    .split(" ")
    .map((word) => {
      if (/[a-zA-Z]/.test(word) && /\d/.test(word)) {
        return word.replace(/\d+/g, "");
      }
      return word;
    })
    .join(" ");

  // Collapse multiple spaces and trim
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // Capitalize first letter of each word
  cleaned = cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Fallback if empty
  return cleaned || "PDF Document";
}
