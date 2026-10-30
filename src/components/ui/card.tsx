import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#FFFFFF] border border-[#ECE7DF] p-6 text-left transition-all duration-200",
        hoverEffect && "hover:border-[#171614]/40 hover:shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse bg-[#ECE7DF]/70", className)} {...props} />;
}
