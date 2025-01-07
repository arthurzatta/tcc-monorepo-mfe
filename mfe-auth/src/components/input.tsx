import { cn } from "@/utils/style";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "rounded-md border border-text-900/10 h-8 p-2 text-sm",
        className
      )}
      {...props}
    />
  );
};
