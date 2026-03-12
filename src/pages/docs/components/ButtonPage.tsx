import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassButton } from "@/components/glass/GlassButton";
import { ArrowRight, Download, Loader2, Heart } from "lucide-react";

const buttonProps = [
  { name: "variant", type: '"glass" | "glass-elevated" | "glass-float" | "solid" | "outline" | "ghost" | "destructive"', default: '"glass"', description: "The visual style of the button" },
  { name: "size", type: '"default" | "sm" | "lg" | "icon"', default: '"default"', description: "The size of the button" },
  { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and disables the button" },
  { name: "asChild", type: "boolean", default: "false", description: "Merge props onto child element" },
];

export default function ButtonPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Button</h1>
        <p className="text-lg text-muted-foreground">
          Glass-styled buttons with multiple elevation variants.
        </p>
      </div>

      <ComponentPreview
        code={`import { GlassButton } from "@/components/glass/GlassButton";

function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <GlassButton variant="glass">Default Glass</GlassButton>
      <GlassButton variant="glass-elevated">Elevated</GlassButton>
      <GlassButton variant="glass-float">Floating</GlassButton>
      <GlassButton variant="solid">Solid</GlassButton>
      <GlassButton variant="outline">Outline</GlassButton>
      <GlassButton variant="destructive">Destructive</GlassButton>
    </div>
  );
}`}
      >
        <div className="flex flex-wrap gap-3">
          <GlassButton variant="glass">Default Glass</GlassButton>
          <GlassButton variant="glass-elevated">Elevated</GlassButton>
          <GlassButton variant="glass-float">Floating</GlassButton>
          <GlassButton variant="solid">Solid</GlassButton>
          <GlassButton variant="outline">Outline</GlassButton>
          <GlassButton variant="destructive">Destructive</GlassButton>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <ComponentPreview
          code={`import { GlassButton } from "@/components/glass/GlassButton";
import { Heart } from "lucide-react";

function Example() {
  return (
    <div className="flex items-center gap-3">
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="default">Default</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
      <GlassButton size="icon"><Heart className="h-4 w-4" /></GlassButton>
    </div>
  );
}`}
        >
          <div className="flex items-center gap-3">
            <GlassButton size="sm">Small</GlassButton>
            <GlassButton size="default">Default</GlassButton>
            <GlassButton size="lg">Large</GlassButton>
            <GlassButton size="icon"><Heart className="h-4 w-4" /></GlassButton>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">With Icons & Loading</h2>
        <ComponentPreview
          code={`import { GlassButton } from "@/components/glass/GlassButton";
import { ArrowRight, Download } from "lucide-react";

function Example() {
  return (
    <div className="flex gap-3">
      <GlassButton>Continue <ArrowRight className="h-4 w-4" /></GlassButton>
      <GlassButton><Download className="h-4 w-4" /> Download</GlassButton>
      <GlassButton loading>Processing...</GlassButton>
    </div>
  );
}`}
        >
          <div className="flex gap-3">
            <GlassButton>Continue <ArrowRight className="h-4 w-4" /></GlassButton>
            <GlassButton><Download className="h-4 w-4" /> Download</GlassButton>
            <GlassButton loading>Processing...</GlassButton>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={buttonProps} />
      </div>
    </div>
  );
}
