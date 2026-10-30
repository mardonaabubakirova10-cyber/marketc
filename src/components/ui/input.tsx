import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs tracking-wider uppercase text-[#736E67]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full bg-[#FFFFFF] border border-[#ECE7DF] px-4 py-3 text-sm text-[#171614] placeholder:text-[#A8A29E] transition-colors focus:border-[#171614] focus:outline-none",
            error && "border-[#C47B78] focus:border-[#C47B78]",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-[#C47B78]">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
