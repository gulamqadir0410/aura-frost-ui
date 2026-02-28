import { ComponentPreview } from "@/components/ComponentPreview";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/components/glass/GlassTabs";

export default function TabsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tabs</h1>
        <p className="text-lg text-muted-foreground">Frosted tab navigation with glass indicators.</p>
      </div>

      <ComponentPreview
        code={`<GlassTabs defaultValue="account">
  <GlassTabsList>
    <GlassTabsTrigger value="account">Account</GlassTabsTrigger>
    <GlassTabsTrigger value="password">Password</GlassTabsTrigger>
    <GlassTabsTrigger value="settings">Settings</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="account">
    Account settings content
  </GlassTabsContent>
</GlassTabs>`}
      >
        <GlassTabs defaultValue="account" className="w-full max-w-md">
          <GlassTabsList>
            <GlassTabsTrigger value="account">Account</GlassTabsTrigger>
            <GlassTabsTrigger value="password">Password</GlassTabsTrigger>
            <GlassTabsTrigger value="settings">Settings</GlassTabsTrigger>
          </GlassTabsList>
          <GlassTabsContent value="account" className="glass-1 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
          </GlassTabsContent>
          <GlassTabsContent value="password" className="glass-1 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Change your password and security settings.</p>
          </GlassTabsContent>
          <GlassTabsContent value="settings" className="glass-1 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">General application settings.</p>
          </GlassTabsContent>
        </GlassTabs>
      </ComponentPreview>
    </div>
  );
}
