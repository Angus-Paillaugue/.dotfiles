import { clsx } from "clsx";
import { merge } from "tailwind-merge";

export const cn(...classes: string[]) => clsx(...classes.map((c) => merge(c)));
