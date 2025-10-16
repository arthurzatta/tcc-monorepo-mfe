import { DetailedHTMLProps, FC, FieldsetHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type FieldsetProps = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>

export const Fieldset: FC<FieldsetProps> = ({className, ...props}) => {
  return (
    <fieldset className={cn("flex flex-col gap-2", className)} {...props}/>
  );
};
