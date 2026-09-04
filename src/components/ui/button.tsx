import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-white gradient-primary hover:opacity-95 hover:shadow-[0_10px_40px_-10px_rgba(255,68,51,0.45)] active:scale-[0.99]",
        primary:
          "text-white gradient-primary hover:opacity-95 hover:shadow-[0_10px_40px_-10px_rgba(255,68,51,0.45)] active:scale-[0.99]",
        secondary: "text-white bg-white/5 border border-white/10 hover:bg-white/10",
        outline: "text-white border border-white/15 bg-transparent hover:bg-white/5",
        ghost: "text-white/80 hover:text-white hover:bg-white/5",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-danger text-white hover:opacity-90",
        google: "bg-white text-black hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, fullWidth, children, disabled, ...props }, ref) => {
    const Comp: any = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), fullWidth && "w-full", className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? (
              <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : null}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";
