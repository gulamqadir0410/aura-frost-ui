import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassNavBar } from "@/components/glass/GlassNavBar";
import type { NavItem } from "@/components/glass/GlassNavBar";
import { GlassButton } from "@/components/glass/GlassButton";
import { Search, Bell, User } from "lucide-react";

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    children: [
      { label: "Components", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Themes", href: "#" },
    ],
  },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

const navBarProps = [
  { name: "brand", type: "ReactNode", description: "Logo or brand element" },
  { name: "items", type: "NavItem[]", default: "[]", description: "Navigation items with optional children for mega menus" },
  { name: "sticky", type: "boolean", default: "true", description: "Stick navbar to top on scroll" },
  { name: "transparent", type: "boolean", default: "false", description: "Start with transparent background" },
  { name: "scrollAware", type: "boolean", default: "false", description: "Transition from transparent to solid on scroll" },
  { name: "actions", type: "ReactNode", description: "Action buttons (search, profile, etc.)" },
];

export default function NavBarPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Navigation Bar</h1>
        <p className="text-lg text-muted-foreground">Responsive glass navbar with mega menu support and mobile slide panel.</p>
      </div>

      <ComponentPreview
        code={`<GlassNavBar
  brand={<span className="font-bold">LiquidUI</span>}
  items={[
    { label: "Home", href: "#" },
    { label: "Products", children: [
      { label: "Components", href: "#" },
      { label: "Templates", href: "#" },
    ]},
    { label: "Docs", href: "#" },
  ]}
  actions={<GlassButton size="sm" variant="glass">Sign In</GlassButton>}
  sticky={false}
/>`}
      >
        <div className="w-full max-w-2xl">
          <GlassNavBar
            brand={<span className="font-bold">LiquidUI</span>}
            items={navItems}
            sticky={false}
            actions={
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                  <Search className="h-4 w-4" />
                </button>
                <GlassButton size="sm" variant="glass">Sign In</GlassButton>
              </div>
            }
          />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Scroll-Aware Variant</h2>
        <p className="text-sm text-muted-foreground">
          Set <code className="text-primary">scrollAware</code> to transition from transparent to solid on scroll.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={navBarProps} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Mobile toggle button has aria-label</li>
          <li>Full keyboard navigation support</li>
          <li>Semantic nav element used</li>
          <li>Responsive collapse at md breakpoint</li>
        </ul>
      </div>
    </div>
  );
}
