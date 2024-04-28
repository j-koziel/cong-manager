import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Takes some string inputs and merges them using tailwind merge
 *
 * @param inputs - The tailwind class inputs
 * @returns A string of tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
