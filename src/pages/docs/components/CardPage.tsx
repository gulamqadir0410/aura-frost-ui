import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from "@/components/glass/GlassCard";
import { GlassButton } from "@/components/glass/GlassButton";

const cardProps = [
  { name: "variant", type: '"default" | "elevated" | "frosted" | "floating"', default: '"default"', description: "Glass elevation level" },
  { name: "hover", type: "boolean", default: "false", description: "Enable hover lift animation" },
];

export default function CardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Card</h1>
        <p className="text-lg text-muted-foreground">Glass card containers with elevation variants.</p>
      </div>

      <ComponentPreview
        code={`<GlassCard variant="default">
  <GlassCardHeader>
    <GlassCardTitle>Default Card</GlassCardTitle>
    <GlassCardDescription>Glass level 1</GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>Content here</GlassCardContent>
</GlassCard>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          {(["default", "elevated", "frosted", "floating"] as const).map((v) => (
            <GlassCard key={v} variant={v} hover>
              <GlassCardHeader>
                <GlassCardTitle className="text-base capitalize">{v}</GlassCardTitle>
                <GlassCardDescription>Glass card variant</GlassCardDescription>
              </GlassCardHeader>
              <GlassCardContent>
                <GlassButton variant="glass" size="sm">Action</GlassButton>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={cardProps} />
      </div>
    </div>
  );
}
