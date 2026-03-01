import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassCommandPalette } from "@/components/glass/GlassCommandPalette";
import { GlassButton } from "@/components/glass/GlassButton";
import { useState } from "react";
import { FileText, Settings, Users, BarChart3, Search, Mail, Globe } from "lucide-react";

const commandItems = [
  { id: "docs", label: "Go to Documentation", description: "Browse component docs", icon: <FileText className="h-4 w-4" />, category: "Navigation", onSelect: () => {} },
  { id: "settings", label: "Open Settings", description: "Manage preferences", icon: <Settings className="h-4 w-4" />, category: "Navigation", onSelect: () => {} },
  { id: "team", label: "Team Members", description: "View and manage team", icon: <Users className="h-4 w-4" />, category: "Navigation", onSelect: () => {} },
  { id: "analytics", label: "View Analytics", description: "Dashboard and reports", icon: <BarChart3 className="h-4 w-4" />, category: "Navigation", onSelect: () => {} },
  { id: "search", label: "Search Components", description: "Find a component", icon: <Search className="h-4 w-4" />, category: "Actions", keywords: ["find", "look"], onSelect: () => {} },
  { id: "invite", label: "Invite Collaborator", description: "Send an invite link", icon: <Mail className="h-4 w-4" />, category: "Actions", onSelect: () => {} },
  { id: "deploy", label: "Deploy to Production", description: "Push current build", icon: <Globe className="h-4 w-4" />, category: "Actions", onSelect: () => {} },
];

const commandProps = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
  { name: "items", type: "CommandItem[]", default: "[]", description: "Command items with id, label, icon, category" },
  { name: "placeholder", type: "string", default: '"Search commands..."', description: "Search input placeholder" },
  { name: "recentIds", type: "string[]", default: "[]", description: "IDs of recently used commands" },
  { name: "loading", type: "boolean", default: "false", description: "Show loading spinner" },
];

export default function CommandPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Command Palette</h1>
        <p className="text-lg text-muted-foreground">Spotlight-style command palette with fuzzy search, categories, and keyboard navigation.</p>
      </div>

      <ComponentPreview
        code={`<GlassCommandPalette
  open={open}
  onOpenChange={setOpen}
  items={[
    { id: "docs", label: "Go to Docs", icon: <FileText />, category: "Navigation" },
    { id: "settings", label: "Settings", icon: <Settings />, category: "Navigation" },
    { id: "search", label: "Search", icon: <Search />, category: "Actions" },
  ]}
  recentIds={["docs"]}
/>
// Opens with Ctrl/Cmd + K`}
      >
        <div className="flex flex-col items-center gap-4">
          <GlassButton onClick={() => setOpen(true)} variant="glass">
            <Search className="h-4 w-4 mr-2" />
            Open Command Palette
            <kbd className="ml-3 text-[10px] border border-border rounded px-1.5 py-0.5 text-muted-foreground">⌘K</kbd>
          </GlassButton>
          <p className="text-xs text-muted-foreground">Or press <kbd className="border border-border rounded px-1 py-0.5 text-[10px]">⌘K</kbd> / <kbd className="border border-border rounded px-1 py-0.5 text-[10px]">Ctrl+K</kbd></p>
          <GlassCommandPalette
            open={open}
            onOpenChange={setOpen}
            items={commandItems}
            recentIds={["docs", "settings"]}
          />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Opens with <kbd className="border border-border rounded px-1 text-[10px]">⌘K</kbd> / <kbd className="border border-border rounded px-1 text-[10px]">Ctrl+K</kbd> keyboard shortcut</li>
          <li>Fuzzy search across labels, descriptions, and keywords</li>
          <li>Search term highlighting in results</li>
          <li>Recent commands section</li>
          <li>Category grouping</li>
          <li>Full keyboard navigation (↑↓ arrows, Enter, Escape)</li>
          <li>Smooth modal transitions with framer-motion</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={commandProps} />
      </div>
    </div>
  );
}
