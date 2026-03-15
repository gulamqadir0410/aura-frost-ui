import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../utils";
import { X } from "lucide-react";

export interface GlassTabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export interface GlassTabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  tabs?: GlassTabItem[];
  onTabClose?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

const GlassTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  GlassTabsProps
>(({ className, tabs, onTabClose, orientation = "horizontal", children, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      orientation === "vertical" && "flex gap-4",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Root>
));
GlassTabs.displayName = "GlassTabs";

const GlassTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 p-1 rounded-xl glass-2",
      orientation === "vertical" && "flex-col items-stretch",
      className
    )}
    {...props}
  />
));
GlassTabsList.displayName = "GlassTabsList";

export interface GlassTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const GlassTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  GlassTabsTriggerProps
>(({ className, badge, icon, closable, onClose, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all",
      "text-muted-foreground hover:text-foreground",
      "data-[state=active]:glass-1 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:opacity-40 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
    {badge && (
      <span className="ml-1 inline-flex items-center justify-center rounded-full bg-primary/15 text-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none">
        {badge}
      </span>
    )}
    {closable && (
      <button
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="ml-1 rounded-sm p-0.5 text-muted-foreground/60 hover:text-foreground hover:bg-accent/50 transition-colors"
        aria-label="Close tab"
      >
        <X className="h-3 w-3" />
      </button>
    )}
  </TabsPrimitive.Trigger>
));
GlassTabsTrigger.displayName = "GlassTabsTrigger";

const GlassTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-4 animate-fade-in focus-visible:outline-none", className)}
    {...props}
  />
));
GlassTabsContent.displayName = "GlassTabsContent";

export { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent };
