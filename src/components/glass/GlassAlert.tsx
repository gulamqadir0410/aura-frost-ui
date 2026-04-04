import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

const glassAlertVariants = cva(
  "relative w-full rounded-xl glass-1 p-4 flex gap-3 items-start transition-all duration-200",
  {
    variants: {
      variant: {
        default: "text-foreground",
        info: "border-primary/30 text-foreground",
        success: "border-green-500/30 text-foreground",
        warning: "border-yellow-500/30 text-foreground",
        destructive: "border-destructive/30 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
};

const iconColorMap = {
  default: "text-muted-foreground",
  info: "text-primary",
  success: "text-green-500",
  warning: "text-yellow-500",
  destructive: "text-destructive",
};

export interface GlassAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassAlertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const GlassAlert = React.forwardRef<HTMLDivElement, GlassAlertProps>(
  ({ className, variant = "default", title, dismissible, onDismiss, icon, children, ...props }, ref) => {
    const IconComponent = iconMap[variant || "default"];
    const iconColor = iconColorMap[variant || "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(glassAlertVariants({ variant, className }))}
        {...props}
      >
        <div className={cn("shrink-0 mt-0.5", iconColor)}>
          {icon || <IconComponent className="h-4 w-4" />}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="font-medium text-sm leading-none tracking-tight mb-1">
              {title}
            </h5>
          )}
          <div className="text-sm text-muted-foreground [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="shrink-0 p-1 rounded-md hover:bg-accent/50 transition-colors"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}
      </div>
    );
  }
);
GlassAlert.displayName = "GlassAlert";

export { GlassAlert, glassAlertVariants };
