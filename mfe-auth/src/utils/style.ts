import { twMerge } from "tailwind-merge";
export { cva } from "class-variance-authority";

export const cn = (...args: any[]) => {
  return twMerge(...args);
};
