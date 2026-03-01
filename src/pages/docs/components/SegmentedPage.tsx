import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassSegmentedControl } from "@/components/glass/GlassSegmentedControl";
import { useState } from "react";
import { Grid3X3, List, LayoutGrid, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const segmentedProps = [
  { name: "segments", type: "Segment[]", description: "Array of { value, label, icon?, disabled? }" },
  { name: "value", type: "string", description: "Controlled selected value" },
  { name: "defaultValue", type: "string", description: "Initial value (uncontrolled)" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback on value change" },
  { name: "multiSelect", type: "boolean", default: "false", description: "Allow multiple selections" },
  { name: "fullWidth", type: "boolean", default: "false", description: "Stretch to fill container width" },
  { name: "compact", type: "boolean", default: "false", description: "Smaller padding" },
];

export default function SegmentedPage() {
  const [view, setView] = useState("grid");
  const [align, setAlign] = useState("left");
  const [selected, setSelected] = useState<string[]>(["bold"]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Segmented Control</h1>
        <p className="text-lg text-muted-foreground">Animated sliding indicator with single and multi-select modes.</p>
      </div>

      <ComponentPreview
        code={`<GlassSegmentedControl
  segments={[
    { value: "list", label: "List", icon: <List /> },
    { value: "grid", label: "Grid", icon: <Grid3X3 /> },
    { value: "cards", label: "Cards", icon: <LayoutGrid /> },
  ]}
  value={view}
  onValueChange={setView}
/>`}
      >
        <div className="flex flex-col items-center gap-6">
          <GlassSegmentedControl
            segments={[
              { value: "list", label: "List", icon: <List className="h-4 w-4" /> },
              { value: "grid", label: "Grid", icon: <Grid3X3 className="h-4 w-4" /> },
              { value: "cards", label: "Cards", icon: <LayoutGrid className="h-4 w-4" /> },
            ]}
            value={view}
            onValueChange={setView}
          />
          <span className="text-sm text-muted-foreground">Selected: {view}</span>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Compact with Icons Only</h2>
        <ComponentPreview
          code={`<GlassSegmentedControl
  segments={[
    { value: "left", label: "", icon: <AlignLeft /> },
    { value: "center", label: "", icon: <AlignCenter /> },
    { value: "right", label: "", icon: <AlignRight /> },
  ]}
  compact
/>`}
        >
          <GlassSegmentedControl
            segments={[
              { value: "left", label: "", icon: <AlignLeft className="h-4 w-4" /> },
              { value: "center", label: "", icon: <AlignCenter className="h-4 w-4" /> },
              { value: "right", label: "", icon: <AlignRight className="h-4 w-4" /> },
            ]}
            value={align}
            onValueChange={setAlign}
            compact
          />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width with Disabled</h2>
        <ComponentPreview
          code={`<GlassSegmentedControl
  segments={[
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise", disabled: true },
  ]}
  fullWidth
/>`}
        >
          <div className="w-full max-w-md">
            <GlassSegmentedControl
              segments={[
                { value: "free", label: "Free" },
                { value: "pro", label: "Pro" },
                { value: "enterprise", label: "Enterprise", disabled: true },
              ]}
              fullWidth
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={segmentedProps} />
      </div>
    </div>
  );
}
