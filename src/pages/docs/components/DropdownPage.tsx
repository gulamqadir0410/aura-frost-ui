import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import {
  GlassDropdown,
  GlassDropdownTrigger,
  GlassDropdownContent,
  GlassDropdownItem,
  GlassDropdownLabel,
  GlassDropdownSeparator,
  GlassDropdownCheckboxItem,
  GlassDropdownSub,
  GlassDropdownSubTrigger,
  GlassDropdownSubContent,
  GlassDropdownShortcut,
} from "@/components/glass/GlassDropdown";
import { GlassButton } from "@/components/glass/GlassButton";
import { useState } from "react";
import { User, Settings, LogOut, CreditCard, Mail, PlusCircle } from "lucide-react";

export default function DropdownPage() {
  const [showStatus, setShowStatus] = useState(true);
  const [showActivity, setShowActivity] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dropdown Menu</h1>
        <p className="text-lg text-muted-foreground">Glass dropdown with submenus, checkboxes, and keyboard navigation.</p>
      </div>

      <ComponentPreview
        code={`<GlassDropdown>
  <GlassDropdownTrigger asChild>
    <GlassButton variant="glass">Open Menu</GlassButton>
  </GlassDropdownTrigger>
  <GlassDropdownContent>
    <GlassDropdownLabel>My Account</GlassDropdownLabel>
    <GlassDropdownSeparator />
    <GlassDropdownItem>
      <User className="mr-2 h-4 w-4" /> Profile
      <GlassDropdownShortcut>⇧⌘P</GlassDropdownShortcut>
    </GlassDropdownItem>
    <GlassDropdownItem>
      <Settings className="mr-2 h-4 w-4" /> Settings
    </GlassDropdownItem>
    <GlassDropdownSub>
      <GlassDropdownSubTrigger>
        <Mail className="mr-2 h-4 w-4" /> Invite
      </GlassDropdownSubTrigger>
      <GlassDropdownSubContent>
        <GlassDropdownItem>Email</GlassDropdownItem>
        <GlassDropdownItem>Message</GlassDropdownItem>
      </GlassDropdownSubContent>
    </GlassDropdownSub>
    <GlassDropdownSeparator />
    <GlassDropdownCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
      Show Status
    </GlassDropdownCheckboxItem>
    <GlassDropdownSeparator />
    <GlassDropdownItem>
      <LogOut className="mr-2 h-4 w-4" /> Log out
    </GlassDropdownItem>
  </GlassDropdownContent>
</GlassDropdown>`}
      >
        <GlassDropdown>
          <GlassDropdownTrigger asChild>
            <GlassButton variant="glass">Open Menu</GlassButton>
          </GlassDropdownTrigger>
          <GlassDropdownContent>
            <GlassDropdownLabel>My Account</GlassDropdownLabel>
            <GlassDropdownSeparator />
            <GlassDropdownItem>
              <User className="mr-2 h-4 w-4" /> Profile
              <GlassDropdownShortcut>⇧⌘P</GlassDropdownShortcut>
            </GlassDropdownItem>
            <GlassDropdownItem>
              <CreditCard className="mr-2 h-4 w-4" /> Billing
            </GlassDropdownItem>
            <GlassDropdownItem>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </GlassDropdownItem>
            <GlassDropdownSub>
              <GlassDropdownSubTrigger>
                <Mail className="mr-2 h-4 w-4" /> Invite Users
              </GlassDropdownSubTrigger>
              <GlassDropdownSubContent>
                <GlassDropdownItem><Mail className="mr-2 h-4 w-4" /> Email</GlassDropdownItem>
                <GlassDropdownItem><PlusCircle className="mr-2 h-4 w-4" /> Link</GlassDropdownItem>
              </GlassDropdownSubContent>
            </GlassDropdownSub>
            <GlassDropdownSeparator />
            <GlassDropdownCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
              Show Status Bar
            </GlassDropdownCheckboxItem>
            <GlassDropdownCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
              Show Activity
            </GlassDropdownCheckboxItem>
            <GlassDropdownSeparator />
            <GlassDropdownItem>
              <LogOut className="mr-2 h-4 w-4" /> Log out
              <GlassDropdownShortcut>⇧⌘Q</GlassDropdownShortcut>
            </GlassDropdownItem>
          </GlassDropdownContent>
        </GlassDropdown>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={[
          { name: "GlassDropdownContent", type: "Component", description: "Glass-styled dropdown panel with portal rendering" },
          { name: "GlassDropdownItem", type: "Component", description: "Menu item with inset support" },
          { name: "GlassDropdownCheckboxItem", type: "Component", description: "Toggleable checkbox menu item" },
          { name: "GlassDropdownRadioItem", type: "Component", description: "Radio option within a radio group" },
          { name: "GlassDropdownSub", type: "Component", description: "Nested submenu wrapper" },
          { name: "GlassDropdownShortcut", type: "Component", description: "Right-aligned keyboard shortcut hint" },
        ]} />
      </div>
    </div>
  );
}
