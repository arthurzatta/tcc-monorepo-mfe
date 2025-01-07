import { cn } from "@/utils/style";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex text-text-50 justify-center rounded-md p-2 bg-primary-800",
        className
      )}
      {...props}
    />
  );
};
