import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-normal tracking-wider transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
          // Sizes
          size === "sm" && "px-4 py-2 text-xs",
          size === "md" && "px-6 py-3 text-xs tracking-[0.1em]",
          size === "lg" && "px-8 py-4 text-sm tracking-[0.12em]",
          // Variants
          variant === "primary" &&
            "bg-[#171614] text-[#F7F4EF] hover:bg-[#2A2723] hover:-translate-y-px active:scale-[0.98] active:translate-y-0",
          variant === "secondary" &&
            "bg-[#F1ECE4] text-[#171614] hover:bg-[#E8E2D7] hover:-translate-y-px active:scale-[0.98] active:translate-y-0",
          variant === "outline" &&
            "border border-[#171614] text-[#171614] bg-transparent hover:bg-[#171614] hover:text-[#F7F4EF] hover:-translate-y-px active:scale-[0.98] active:translate-y-0",
          variant === "ghost" && "bg-transparent text-[#171614] hover:bg-[#F1ECE4]/60",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
