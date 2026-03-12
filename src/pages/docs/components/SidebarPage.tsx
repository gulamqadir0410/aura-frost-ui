import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassSidebar } from "@/components/glass/GlassSidebar";
import type { SidebarGroup } from "@/components/glass/GlassSidebar";
import { Home, Settings, Users, FileText, BarChart3, Inbox, Star } from "lucide-react";
import { useState } from "react";

const demoGroups: SidebarGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", icon: <Home className="h-4 w-4" />, active: true },
      { label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
      { label: "Messages", icon: <Inbox className="h-4 w-4" /> },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Documents", icon: <FileText className="h-4 w-4" />, children: [
        { label: "Drafts", icon: <FileText className="h-4 w-4" /> },
        { label: "Published", icon: <Star className="h-4 w-4" /> },
      ]},
      { label: "Team", icon: <Users className="h-4 w-4" /> },
      { label: "Settings", icon: <Settings className="h-4 w-4" /> },
    ],
  },
];

const sidebarProps = [
  { name: "groups", type: "SidebarGroup[]", default: "[]", description: "Grouped navigation items" },
  { name: "collapsed", type: "boolean", description: "Controlled collapsed state" },
  { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: "Callback when collapse state changes" },
  { name: "width", type: "number", default: "260", description: "Expanded width in pixels" },
  { name: "collapsedWidth", type: "number", default: "64", description: "Collapsed width in pixels" },
  { name: "hoverExpand", type: "boolean", default: "false", description: "Expand on hover when collapsed" },
  { name: "pinned", type: "boolean", default: "false", description: "Pin sidebar open" },
  { name: "onPinnedChange", type: "(pinned: boolean) => void", description: "Callback when pin state changes" },
];

export default function SidebarPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sidebar</h1>
        <p className="text-lg text-muted-foreground">Collapsible glass sidebar with nested groups and hover expand.</p>
      </div>

      <ComponentPreview
        code={`import { GlassSidebar } from "@/components/glass/GlassSidebar";
import type { SidebarGroup } from "@/components/glass/GlassSidebar";
import { useState } from "react";
import { Home, Settings, Users, FileText, BarChart3, Inbox, Star } from "lucide-react";

const groups: SidebarGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", icon: <Home className="h-4 w-4" />, active: true },
      { label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
      { label: "Messages", icon: <Inbox className="h-4 w-4" /> },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Documents",
        icon: <FileText className="h-4 w-4" />,
        children: [
          { label: "Drafts", icon: <FileText className="h-4 w-4" /> },
          { label: "Published", icon: <Star className="h-4 w-4" /> },
        ],
      },
      { label: "Team", icon: <Users className="h-4 w-4" /> },
      { label: "Settings", icon: <Settings className="h-4 w-4" /> },
    ],
  },
];

function Example() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-[400px] w-full max-w-md rounded-xl overflow-hidden border border-border">
      <GlassSidebar
        groups={groups}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        hoverExpand
      />
    </div>
  );
}`}
      >
        <div className="h-[400px] w-full max-w-md rounded-xl overflow-hidden border border-border">
          <GlassSidebar
            groups={demoGroups}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            hoverExpand
          />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={sidebarProps} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Collapse/expand buttons include aria-labels</li>
          <li>Active route is visually highlighted</li>
          <li>Keyboard navigable nested groups</li>
          <li>Smooth CSS transitions for width animation</li>
        </ul>
      </div>
    </div>
  );
}
