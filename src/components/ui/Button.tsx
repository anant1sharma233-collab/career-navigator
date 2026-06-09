import * as React from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "google";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

const variantMap: Record<Variant, string> = {
  primary:
    "text-white gradient-primary hover:opacity-95 hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.6)] active:scale-[0.99]",
  secondary:
    "text-white bg-white/5 border border-white/10 hover:bg-white/10",
  outline:
    "text-white border border-white/15 bg-transparent hover:bg-white/5",
  ghost: "text-white/80 hover:text-white hover:bg-white/5",
  google: "bg-white text-black hover:opacity-90",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeMap[size],
        variantMap[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      ) : null}
      {children}
    </button>
  ),
);
Button.displayName = "Button";
