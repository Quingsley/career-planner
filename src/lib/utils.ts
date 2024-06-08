import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeText(input: string): string {
  // Replace multiple spaces with a single space
  let normalized = input.replace(/\s+/g, " ");
  // Replace multiple line breaks with a single line break
  normalized = normalized.replace(/\n+/g, "\n");
  // Trim leading/trailing whitespace
  return normalized.trim();
}
