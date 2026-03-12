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

      {/* Default variant */}
      <ComponentPreview
        code={`import { GlassNavBar } from "@/components/glass/GlassNavBar";
import type { NavItem } from "@/components/glass/GlassNavBar";
import { GlassButton } from "@/components/glass/GlassButton";
import { Search } from "lucide-react";

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

function Example() {
  return (
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
  );
}`}
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

      {/* Minimal variant */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Minimal Variant</h2>
        <p className="text-sm text-muted-foreground">Clean, borderless navbar with minimal styling — no background, just text links.</p>
        <ComponentPreview code={`import { GlassNavBar } from "@/components/glass/GlassNavBar";
import type { NavItem } from "@/components/glass/GlassNavBar";

const navItems: NavItem[] = [
  { label: "About", href: "#" },
  { label: "Work", href: "#" },
  { label: "Contact", href: "#" },
];

function Example() {
  return (
    <GlassNavBar
      brand={<span className="font-bold text-sm tracking-widest uppercase">Logo</span>}
      items={navItems}
      transparent
      sticky={false}
    />
  );
}`}>
          <div className="w-full max-w-2xl">
            <GlassNavBar
              brand={<span className="font-bold text-sm tracking-widest uppercase">Logo</span>}
              items={[{ label: "About", href: "#" }, { label: "Work", href: "#" }, { label: "Contact", href: "#" }]}
              transparent
              sticky={false}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Centered brand */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Centered Brand Variant</h2>
        <p className="text-sm text-muted-foreground">Brand centered between left and right navigation groups.</p>
        <ComponentPreview code={`import { GlassButton } from "@/components/glass/GlassButton";

function CenteredBrandNav() {
  return (
    <div className="glass-2 rounded-xl border border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Products
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
        </div>
        <div className="font-bold text-lg">✦ LiquidUI</div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <GlassButton size="sm" variant="glass">Sign Up</GlassButton>
        </div>
      </div>
    </div>
  );
}`}>
          <div className="w-full max-w-2xl glass-2 rounded-xl border border-border">
            <div className="flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              </div>
              <div className="font-bold text-lg">✦ LiquidUI</div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <GlassButton size="sm" variant="glass">Sign Up</GlassButton>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Split navigation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Split Navigation Variant</h2>
        <p className="text-sm text-muted-foreground">Primary links on the left, secondary actions on the right with clear visual separation.</p>
        <ComponentPreview code={`import { Search, Bell, User } from "lucide-react";

function SplitNav() {
  return (
    <div className="glass-2 rounded-xl border border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-6">
          <span className="font-bold">LiquidUI</span>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1">
            {["Dashboard", "Projects", "Team"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}`}>
          <div className="w-full max-w-2xl glass-2 rounded-xl border border-border">
            <div className="flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-6">
                <span className="font-bold">LiquidUI</span>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1">
                  {["Dashboard", "Projects", "Team"].map((item) => (
                    <a key={item} href="#" className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">{item}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"><Search className="h-4 w-4" /></button>
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"><Bell className="h-4 w-4" /></button>
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Transparent / overlay */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Transparent / Overlay Variant</h2>
        <p className="text-sm text-muted-foreground">Fully transparent navbar designed to overlay hero sections, with <code className="text-primary">scrollAware</code> to solidify on scroll.</p>
        <ComponentPreview code={`import { GlassNavBar } from "@/components/glass/GlassNavBar";
import type { NavItem } from "@/components/glass/GlassNavBar";
import { GlassButton } from "@/components/glass/GlassButton";

const navItems: NavItem[] = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
];

function Example() {
  return (
    <GlassNavBar
      brand={<span className="font-bold text-foreground">LiquidUI</span>}
      items={navItems}
      transparent
      scrollAware
      sticky={false}
      actions={<GlassButton size="sm" variant="glass">Get Started</GlassButton>}
    />
  );
}`}>
          <div className="w-full max-w-2xl relative">
            <div className="absolute inset-0 rounded-xl gradient-bg opacity-60" />
            <div className="relative">
              <GlassNavBar
                brand={<span className="font-bold text-foreground">LiquidUI</span>}
                items={[{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }, { label: "Blog", href: "#" }]}
                transparent
                sticky={false}
                actions={<GlassButton size="sm" variant="glass">Get Started</GlassButton>}
              />
              <div className="px-6 py-12 text-center">
                <h3 className="text-xl font-bold mb-2">Hero Section</h3>
                <p className="text-sm text-muted-foreground">The navbar overlays this content transparently</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Sticky scroll-reactive */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sticky Scroll-Reactive Variant</h2>
        <p className="text-sm text-muted-foreground">
          Starts transparent, transitions to a solid glass background with border on scroll. Set <code className="text-primary">scrollAware</code> and <code className="text-primary">transparent</code> together.
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
