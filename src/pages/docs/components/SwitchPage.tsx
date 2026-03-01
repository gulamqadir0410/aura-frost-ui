import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassSwitch } from "@/components/glass/GlassSwitch";
import { useState } from "react";

const switchProps = [
  { name: "checked", type: "boolean", description: "Controlled checked state" },
  { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback on state change" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the switch" },
  { name: "loading", type: "boolean", default: "false", description: "Show loading spinner in thumb" },
  { name: "label", type: "string", description: "Associated label text" },
  { name: "description", type: "string", description: "Helper text below label" },
];

export default function SwitchPage() {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoadingToggle = (val: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setChecked(val);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Switch</h1>
        <p className="text-lg text-muted-foreground">Glass toggle switch with loading state, labels, and smooth animations.</p>
      </div>

      <ComponentPreview
        code={`<GlassSwitch checked={checked} onCheckedChange={setChecked} />
<GlassSwitch disabled />
<GlassSwitch loading />`}
      >
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center gap-3">
            <GlassSwitch checked={checked} onCheckedChange={setChecked} />
            <span className="text-sm text-muted-foreground">{checked ? "On" : "Off"}</span>
          </div>
          <div className="flex items-center gap-3">
            <GlassSwitch disabled />
            <span className="text-sm text-muted-foreground">Disabled</span>
          </div>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">With Label & Description</h2>
        <ComponentPreview
          code={`<GlassSwitch
  label="Email Notifications"
  description="Receive alerts for new activity"
  checked={notifications}
  onCheckedChange={setNotifications}
/>`}
        >
          <GlassSwitch
            label="Email Notifications"
            description="Receive alerts when someone mentions you"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Loading State</h2>
        <ComponentPreview
          code={`<GlassSwitch
  loading={isLoading}
  checked={checked}
  onCheckedChange={handleAsync}
/>`}
        >
          <div className="flex items-center gap-3">
            <GlassSwitch
              loading={loading}
              checked={checked}
              onCheckedChange={handleLoadingToggle}
            />
            <span className="text-sm text-muted-foreground">
              {loading ? "Saving..." : checked ? "Enabled" : "Disabled"}
            </span>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={switchProps} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Built on Radix UI Switch primitive — full WAI-ARIA support</li>
          <li>Label is associated via htmlFor when provided</li>
          <li>Focus-visible ring styling</li>
          <li>Disabled and loading states prevent interaction</li>
        </ul>
      </div>
    </div>
  );
}
