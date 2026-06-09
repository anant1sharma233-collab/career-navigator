import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, type, ...props }, ref) => {
    if (!leftIcon && !rightIcon && !error) {
      return (
        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl bg-white/[0.03] border border-white/10 px-3.5 text-sm text-white placeholder:text-muted-foreground/70 outline-hidden transition-colors focus:border-primary/60 focus:bg-white/[0.05] disabled:opacity-50",
            className,
          )}
          {...props}
        />
      );
    }
    return (
      <div className="w-full">
        <div
          className={cn(
            "group flex items-center gap-2 rounded-xl px-3.5 h-11 bg-white/[0.03] border border-white/10 transition-colors duration-200 focus-within:border-primary/60 focus-within:bg-white/[0.05]",
            error && "border-danger/70 focus-within:border-danger",
          )}
        >
          {leftIcon ? <span className="text-muted-foreground text-base">{leftIcon}</span> : null}
          <input
            ref={ref}
            type={type}
            className={cn(
              "flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground/70 outline-hidden border-0",
              className,
            )}
            {...props}
          />
          {rightIcon ? <span className="text-muted-foreground">{rightIcon}</span> : null}
        </div>
        {error ? <p className="mt-1.5 text-xs text-danger">{error}</p> : null}
      </div>
    );
  },
);
Input.displayName = "Input";
