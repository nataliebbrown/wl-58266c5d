import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding size. Default is "md" (24px). */
  padding?: "sm" | "md" | "lg" | "none";
  /** Optional inner gradient for hero-style cards. Pass a CSS gradient string. */
  innerGradient?: string;
  /** Inner gradient padding. Only applies when innerGradient is set. */
  innerPadding?: "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, padding = "md", innerGradient, innerPadding = "lg", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("glass-card", paddingMap[padding], className)}
        {...props}
      >
        {innerGradient ? (
          <div
            className={cn("rounded-2xl min-h-0", paddingMap[innerPadding])}
            style={{ background: innerGradient }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps };
