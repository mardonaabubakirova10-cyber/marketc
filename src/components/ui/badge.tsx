import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "subtle" | "rose" | "sale" | "hit";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-bold select-none",
        variant === "default" && "bg-[#2D2326] text-white",
        variant === "outline" && "border border-[#ECDFE4] text-[#2D2326]",
        variant === "subtle" && "bg-[#FCF5F7] text-[#6B5C5F]",
        variant === "rose" && "bg-[#F8E6EC] text-[#BA073F]",
        variant === "sale" && "bg-[#BA073F] text-white shadow-sm",
        variant === "hit" && "bg-[#2D2326] text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
