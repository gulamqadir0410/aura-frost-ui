import { CodeBlock } from "@/components/CodeBlock";

export default function AnimationsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Animations</h1>
        <p className="text-lg text-muted-foreground">
          Motion utilities and the useDepth hook for glass interactions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Utility Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-2 rounded-xl p-5 hover-lift cursor-pointer">
            <code className="font-mono text-sm text-primary">.hover-lift</code>
            <p className="text-xs text-muted-foreground mt-1">Hover to see translateY(-2px) + shadow boost</p>
          </div>
          <div className="glass-2 rounded-xl p-5 cursor-pointer focus-glow" tabIndex={0}>
            <code className="font-mono text-sm text-primary">.focus-glow</code>
            <p className="text-xs text-muted-foreground mt-1">Click/focus to see the glow ring</p>
          </div>
          <div className="glass-2 rounded-xl p-5 glass-glow">
            <code className="font-mono text-sm text-primary">.glass-glow</code>
            <p className="text-xs text-muted-foreground mt-1">Permanent subtle glow effect</p>
          </div>
          <div className="glass-2 rounded-xl p-5 animate-float">
            <code className="font-mono text-sm text-primary">.animate-float</code>
            <p className="text-xs text-muted-foreground mt-1">Gentle floating animation</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">useDepth Hook</h2>
        <p className="text-muted-foreground">
          A custom hook that adds depth illusion with shadow and blur adjustments on hover.
        </p>
        <CodeBlock
          filename="useDepth.ts"
          code={`import { useState } from "react"

export function useDepth(intensity = 1) {
  const [isHovered, setIsHovered] = useState(false)

  const depthStyle = {
    transform: isHovered 
      ? \`translateY(-\${2 * intensity}px) scale(\${1 + 0.01 * intensity})\`
      : "translateY(0) scale(1)",
    boxShadow: isHovered
      ? \`0 \${12 * intensity}px \${40 * intensity}px -8px hsl(var(--glass-shadow) / \${0.2 * intensity})\`
      : "none",
    transition: "all 0.3s ease-out",
  }

  return {
    depthStyle,
    depthProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      style: depthStyle,
    },
  }
}`}
        />
      </div>
    </div>
  );
}
