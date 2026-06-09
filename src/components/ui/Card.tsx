import * as React from "react";
import { cn } from "@/utils/cn";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        "hover:border-white/20",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
