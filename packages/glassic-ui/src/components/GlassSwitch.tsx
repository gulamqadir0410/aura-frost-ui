import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../utils";
import { Loader2 } from "lucide-react";

export interface GlassSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  loading?: boolean;
  label?: string;
  description?: string;
}

const GlassSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  GlassSwitchProps
>(({ className, loading, label, description, id, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  const switchElement = (
    <SwitchPrimitive.Root
      id={switchId}
      ref={ref}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all duration-200",
        "glass-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary/30",
        loading && "opacity-70 cursor-wait",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none flex items-center justify-center h-5 w-5 rounded-full glass-float shadow-lg transition-transform duration-200",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
        )}
      >
        {loading && <Loader2 className="h-3 w-3 animate-spin text-foreground" />}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {switchElement}
        <div className="space-y-0.5">
          {label && (
            <label htmlFor={switchId} className="text-sm font-medium cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }

  return switchElement;
});
GlassSwitch.displayName = "GlassSwitch";

export { GlassSwitch };
