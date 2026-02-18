import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn("w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500", className)}
      {...props}
    />
  );
});
