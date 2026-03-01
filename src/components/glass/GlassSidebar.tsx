import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Pin, PinOff } from "lucide-react";

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  children?: SidebarItem[];
}

interface SidebarGroup {
  label?: string;
  items: SidebarItem[];
}

interface GlassSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  groups?: SidebarGroup[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  pinned?: boolean;
  onPinnedChange?: (pinned: boolean) => void;
  width?: number;
  collapsedWidth?: number;
  hoverExpand?: boolean;
}

const GlassSidebar = React.forwardRef<HTMLDivElement, GlassSidebarProps>(
  ({
    className,
    groups = [],
    collapsed: controlledCollapsed,
    onCollapsedChange,
    pinned = false,
    onPinnedChange,
    width = 260,
    collapsedWidth = 64,
    hoverExpand = false,
    ...props
  }, ref) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());

    const isCollapsed = controlledCollapsed ?? internalCollapsed;
    const setCollapsed = onCollapsedChange ?? setInternalCollapsed;
    const showExpanded = !isCollapsed || (hoverExpand && hovered);

    const toggleGroup = (label: string) => {
      setExpandedGroups((prev) => {
        const next = new Set(prev);
        if (next.has(label)) next.delete(label);
        else next.add(label);
        return next;
      });
    };

    const renderItem = (item: SidebarItem, depth = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = expandedGroups.has(item.label);

      return (
        <div key={item.label}>
          <a
            href={item.href || "#"}
            onClick={hasChildren ? (e) => { e.preventDefault(); toggleGroup(item.label); } : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
              "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              item.active && "text-foreground bg-accent font-medium",
              depth > 0 && "ml-4 text-xs"
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {showExpanded && <span className="truncate">{item.label}</span>}
            {hasChildren && showExpanded && (
              <ChevronRight className={cn("ml-auto h-3 w-3 transition-transform", isOpen && "rotate-90")} />
            )}
          </a>
          {hasChildren && isOpen && showExpanded && (
            <div className="mt-0.5">
              {item.children!.map((child) => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        style={{ width: showExpanded ? width : collapsedWidth, transition: "width 0.2s ease-in-out" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "h-full glass-2 border-r border-border flex flex-col overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Header with controls */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          {showExpanded && <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Menu</span>}
          <div className="flex items-center gap-1 ml-auto">
            {onPinnedChange && showExpanded && (
              <button
                onClick={() => onPinnedChange(!pinned)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
              >
                {pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
              </button>
            )}
            <button
              onClick={() => setCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Groups */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {groups.map((group, i) => (
            <div key={group.label || i}>
              {group.label && showExpanded && (
                <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => renderItem(item))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
GlassSidebar.displayName = "GlassSidebar";

export { GlassSidebar };
export type { GlassSidebarProps, SidebarItem, SidebarGroup };
