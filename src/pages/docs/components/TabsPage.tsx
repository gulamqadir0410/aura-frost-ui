import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/components/glass/GlassTabs";
import { useState } from "react";
import { Home, Settings, User, Bell } from "lucide-react";

const tabsProps = [
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Tab list layout direction" },
  { name: "defaultValue", type: "string", description: "Initially active tab (uncontrolled)" },
  { name: "value", type: "string", description: "Controlled active tab" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when active tab changes" },
];

const triggerProps = [
  { name: "badge", type: "ReactNode", description: "Badge element next to label" },
  { name: "icon", type: "ReactNode", description: "Icon rendered before label" },
  { name: "closable", type: "boolean", default: "false", description: "Show close button on tab" },
  { name: "onClose", type: "() => void", description: "Callback when close button is clicked" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the tab trigger" },
];

export default function TabsPage() {
  const [tabs, setTabs] = useState(["Account", "Password", "Settings", "Billing"]);
  const [activeTab, setActiveTab] = useState("Account");

  const closeTab = (tab: string) => {
    const next = tabs.filter((t) => t !== tab);
    setTabs(next);
    if (activeTab === tab && next.length > 0) setActiveTab(next[0]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tabs</h1>
        <p className="text-lg text-muted-foreground">Frosted tab navigation with badges, icons, closable tabs, and vertical layout.</p>
      </div>

      <ComponentPreview
        code={`<GlassTabs defaultValue="account">
  <GlassTabsList>
    <GlassTabsTrigger value="account" icon={<User />}>Account</GlassTabsTrigger>
    <GlassTabsTrigger value="password" icon={<Settings />}>Password</GlassTabsTrigger>
    <GlassTabsTrigger value="notifications" icon={<Bell />} badge="3">
      Notifications
    </GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="account">...</GlassTabsContent>
</GlassTabs>`}
      >
        <GlassTabs defaultValue="account" className="w-full max-w-md">
          <GlassTabsList>
            <GlassTabsTrigger value="account" icon={<User className="h-4 w-4" />}>Account</GlassTabsTrigger>
            <GlassTabsTrigger value="password" icon={<Settings className="h-4 w-4" />}>Password</GlassTabsTrigger>
            <GlassTabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />} badge="3">Notifications</GlassTabsTrigger>
          </GlassTabsList>
          <GlassTabsContent value="account" className="glass-1 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
          </GlassTabsContent>
          <GlassTabsContent value="password" className="glass-1 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Change your password and security settings.</p>
          </GlassTabsContent>
          <GlassTabsContent value="notifications" className="glass-1 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Configure notification preferences.</p>
          </GlassTabsContent>
        </GlassTabs>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Closable Tabs</h2>
        <ComponentPreview
          code={`<GlassTabsTrigger value="tab" closable onClose={() => removeTab("tab")}>
  Tab Name
</GlassTabsTrigger>`}
        >
          <GlassTabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <GlassTabsList>
              {tabs.map((tab) => (
                <GlassTabsTrigger
                  key={tab}
                  value={tab}
                  closable={tabs.length > 1}
                  onClose={() => closeTab(tab)}
                >
                  {tab}
                </GlassTabsTrigger>
              ))}
            </GlassTabsList>
            {tabs.map((tab) => (
              <GlassTabsContent key={tab} value={tab} className="glass-1 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">Content for {tab} tab.</p>
              </GlassTabsContent>
            ))}
          </GlassTabs>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical Layout</h2>
        <ComponentPreview
          code={`<GlassTabs orientation="vertical" defaultValue="general">
  <GlassTabsList orientation="vertical">...</GlassTabsList>
  <GlassTabsContent value="general">...</GlassTabsContent>
</GlassTabs>`}
        >
          <GlassTabs orientation="vertical" defaultValue="general" className="w-full max-w-md">
            <GlassTabsList orientation="vertical">
              <GlassTabsTrigger value="general" icon={<Home className="h-4 w-4" />}>General</GlassTabsTrigger>
              <GlassTabsTrigger value="profile" icon={<User className="h-4 w-4" />}>Profile</GlassTabsTrigger>
              <GlassTabsTrigger value="settings" icon={<Settings className="h-4 w-4" />}>Settings</GlassTabsTrigger>
              <GlassTabsTrigger value="disabled" disabled>Disabled</GlassTabsTrigger>
            </GlassTabsList>
            <GlassTabsContent value="general" className="glass-1 rounded-xl p-4 flex-1">
              <p className="text-sm text-muted-foreground">General application settings.</p>
            </GlassTabsContent>
            <GlassTabsContent value="profile" className="glass-1 rounded-xl p-4 flex-1">
              <p className="text-sm text-muted-foreground">Profile configuration.</p>
            </GlassTabsContent>
            <GlassTabsContent value="settings" className="glass-1 rounded-xl p-4 flex-1">
              <p className="text-sm text-muted-foreground">Advanced settings.</p>
            </GlassTabsContent>
          </GlassTabs>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference — GlassTabs</h2>
        <PropsTable props={tabsProps} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference — GlassTabsTrigger</h2>
        <PropsTable props={triggerProps} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Built on Radix UI Tabs — full WAI-ARIA tab pattern</li>
          <li>Arrow key navigation between tabs</li>
          <li>Focus-visible ring styling</li>
          <li>Disabled state properly announced</li>
          <li>Close button has aria-label</li>
        </ul>
      </div>
    </div>
  );
}
