import { CodeBlock } from "@/components/CodeBlock";

export default function IntroductionPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Introduction</h1>
        <p className="text-lg text-muted-foreground">
          A glassmorphism-inspired component library built on top of shadcn/ui, Radix UI, and Tailwind CSS.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Philosophy</h2>
        <p className="text-muted-foreground leading-relaxed">
          Liquid Glass UI brings Apple's design language to the web. Every component is designed to feel 
          <strong className="text-foreground"> translucent, layered, and depth-aware</strong> — like looking through frosted glass.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The library uses a 5-level glass elevation system with increasing backdrop-blur, decreasing opacity, 
          and progressive border glow to create a natural sense of depth and hierarchy.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">●</span>
            <span><strong className="text-foreground">5 Glass Elevation Levels</strong> — from subtle backdrop blur to floating luminous panels</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">●</span>
            <span><strong className="text-foreground">15+ Components</strong> — Button, Card, Input, Dialog, Toast, Tabs, and more</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">●</span>
            <span><strong className="text-foreground">Dark & Light Mode</strong> — adaptive opacity tokens that look great in both themes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">●</span>
            <span><strong className="text-foreground">Copy-Paste Ready</strong> — just like shadcn/ui, copy the code directly into your project</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">●</span>
            <span><strong className="text-foreground">Built on Radix</strong> — fully accessible primitives with glass styling</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Example</h2>
        <CodeBlock
          filename="example.tsx"
          code={`import { GlassButton } from "@/components/glass/GlassButton"
import { GlassCard } from "@/components/glass/GlassCard"

export function MyComponent() {
  return (
    <GlassCard variant="elevated" hover>
      <h2>Welcome</h2>
      <p>This card has glass styling with hover lift.</p>
      <GlassButton variant="glass">
        Get Started
      </GlassButton>
    </GlassCard>
  )
}`}
        />
      </div>
    </div>
  );
}
