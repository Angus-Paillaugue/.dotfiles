import { clsx } from "clsx";
import { merge } from "tailwind-merge";

export function cn(...classes: string[]): string {
  return clsx(classes);
}
