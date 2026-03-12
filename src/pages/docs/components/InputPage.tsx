import { ComponentPreview } from "@/components/ComponentPreview";
import { GlassInput } from "@/components/glass/GlassInput";
import { PropsTable } from "@/components/PropsTable";
import { Search, Mail } from "lucide-react";

const inputProps = [
  { name: "type", type: "string", default: '"text"', description: "HTML input type" },
  { name: "placeholder", type: "string", description: "Placeholder text" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the input" },
];

export default function InputPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Input</h1>
        <p className="text-lg text-muted-foreground">Translucent input fields with focus glow.</p>
      </div>

      <ComponentPreview
        code={`import { GlassInput } from "@/components/glass/GlassInput";

function Example() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <GlassInput placeholder="Type something..." />
      <GlassInput type="email" placeholder="Email address" />
      <GlassInput type="password" placeholder="Password" />
      <GlassInput disabled placeholder="Disabled" />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <GlassInput placeholder="Type something..." />
          <GlassInput type="email" placeholder="Email address" />
          <GlassInput type="password" placeholder="Password" />
          <GlassInput disabled placeholder="Disabled" />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={inputProps} />
      </div>
    </div>
  );
}
