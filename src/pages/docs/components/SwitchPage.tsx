import { ComponentPreview } from "@/components/ComponentPreview";
import { GlassSwitch } from "@/components/glass/GlassSwitch";
import { useState } from "react";

export default function SwitchPage() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Switch</h1>
        <p className="text-lg text-muted-foreground">Glass toggle switch with translucent thumb.</p>
      </div>

      <ComponentPreview
        code={`<GlassSwitch checked={checked} onCheckedChange={setChecked} />
<GlassSwitch disabled />`}
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
    </div>
  );
}
