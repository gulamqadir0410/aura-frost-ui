import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Palette,
  Sparkles,
  RectangleHorizontal,
  CreditCard,
  TextCursorInput,
  PanelTop,
  Bell,
  Layers,
  Navigation,
  PanelLeft,
  ChevronDown,
  Table2,
  Search,
  ToggleLeft,
  Circle,
  Power,
  Inbox,
  BarChart3,
  Package,
} from "lucide-react";

const gettingStarted = [
  { title: "Introduction", url: "/docs/introduction", icon: BookOpen },
  { title: "Installation", url: "/docs/installation", icon: Sparkles },
  { title: "Publishing", url: "/docs/publishing", icon: Package },
];

const theming = [
  { title: "Glass Layers", url: "/docs/glass-layers", icon: Layers },
  { title: "Colors", url: "/docs/colors", icon: Palette },
  { title: "Animations", url: "/docs/animations", icon: Sparkles },
];

const coreComponents = [
  { title: "Button", url: "/docs/components/button", icon: RectangleHorizontal },
  { title: "Card", url: "/docs/components/card", icon: CreditCard },
  { title: "Input", url: "/docs/components/input", icon: TextCursorInput },
  { title: "Dialog", url: "/docs/components/dialog", icon: PanelTop },
  { title: "Toast", url: "/docs/components/toast", icon: Bell },
];

const extendedComponents = [
  { title: "Tabs", url: "/docs/components/tabs", icon: Layers },
  { title: "Navigation Bar", url: "/docs/components/navbar", icon: Navigation },
  { title: "Sidebar", url: "/docs/components/sidebar", icon: PanelLeft },
  { title: "Dropdown Menu", url: "/docs/components/dropdown", icon: ChevronDown },
  { title: "Data Table", url: "/docs/components/data-table", icon: Table2 },
];

const advancedComponents = [
  { title: "Command Palette", url: "/docs/components/command", icon: Search },
  { title: "Segmented Control", url: "/docs/components/segmented", icon: ToggleLeft },
  { title: "FAB", url: "/docs/components/fab", icon: Circle },
  { title: "Switch", url: "/docs/components/switch", icon: Power },
  { title: "Notification Center", url: "/docs/components/notifications", icon: Inbox },
  { title: "Charts", url: "/docs/components/chart", icon: BarChart3 },
];

function NavGroup({ label, items }: { label: string; items: typeof gettingStarted }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className="hover:bg-accent/50 transition-colors"
                  activeClassName="bg-accent text-primary font-medium"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DocsSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-4">
        <NavGroup label="Getting Started" items={gettingStarted} />
        <NavGroup label="Theming" items={theming} />
        <NavGroup label="Core Components" items={coreComponents} />
        <NavGroup label="Extended" items={extendedComponents} />
        <NavGroup label="Advanced" items={advancedComponents} />
      </SidebarContent>
    </Sidebar>
  );
}
