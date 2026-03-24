import { CodeBlock } from "@/components/CodeBlock";

export default function InstallationPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Get started with Glassic UI in your project.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <p className="text-muted-foreground">
          Glassic UI requires a project with:
        </p>
        <ul className="space-y-1 text-muted-foreground ml-4">
          <li>• React 18+</li>
          <li>• Tailwind CSS 3+</li>
          <li>• TypeScript</li>
        </ul>
      </div>

      {/* Option 1 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Option 1: CLI (Recommended — shadcn-style)</h2>
        <p className="text-muted-foreground">
          Initialize Glassic UI in your project. This sets up the glass CSS tokens, utility classes, and the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">cn()</code> helper automatically.
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npx glassic-ui init`}
        />
        <p className="text-muted-foreground">
          Then add components individually:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npx glassic-ui add button card input dialog tabs`}
        />
        <p className="text-muted-foreground">
          This copies the component source code directly into <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">src/components/glass/</code>, giving you full control and customization.
        </p>
        <p className="text-muted-foreground">
          To see all available components:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npx glassic-ui list`}
        />
      </div>

      {/* Option 2 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Option 2: Package Import</h2>
        <p className="text-muted-foreground">
          Install the package directly:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install glassic-ui`}
        />
        <p className="text-muted-foreground">
          Import the styles in your main CSS file:
        </p>
        <CodeBlock
          filename="index.css"
          language="css"
          code={`@import 'glassic-ui/styles';`}
        />
        <p className="text-muted-foreground">
          Use components directly:
        </p>
        <CodeBlock
          filename="App.tsx"
          language="tsx"
          code={`import { GlassButton, GlassCard, GlassCardHeader, GlassCardTitle } from 'glassic-ui';

export function MyComponent() {
  return (
    <GlassCard variant="elevated" hover>
      <GlassCardHeader>
        <GlassCardTitle>Hello World</GlassCardTitle>
      </GlassCardHeader>
      <GlassButton variant="glass-float">Click Me</GlassButton>
    </GlassCard>
  );
}`}
        />
      </div>

      {/* Tailwind Config */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tailwind Configuration</h2>
        <p className="text-muted-foreground">
          Add the glass color tokens to your <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">tailwind.config.ts</code>:
        </p>
        <CodeBlock
          filename="tailwind.config.ts"
          language="typescript"
          code={`import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          bg: "hsl(var(--glass-bg))",
          border: "hsl(var(--glass-border))",
          glow: "hsl(var(--glass-glow))",
          shadow: "hsl(var(--glass-shadow))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`}
        />
      </div>

      {/* Available Components */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Components</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Component</th>
                <th className="text-left px-4 py-3 font-semibold">CLI Name</th>
                <th className="text-left px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["GlassButton", "button", "Button with glass variants and loading state"],
                ["GlassCard", "card", "Card with elevation variants and hover-lift"],
                ["GlassInput", "input", "Text input with focus glow"],
                ["GlassSwitch", "switch", "Toggle switch with loading and label support"],
                ["GlassDialog", "dialog", "Modal dialog with overlay blur"],
                ["GlassDropdown", "dropdown", "Dropdown menu with checkbox/radio/sub-menu"],
                ["GlassTabs", "tabs", "Tabs with icons, badges, closable, vertical"],
                ["GlassNavBar", "navbar", "Responsive nav bar with mobile + mega-menu"],
                ["GlassSidebar", "sidebar", "Collapsible sidebar with nested groups"],
                ["GlassDataTable", "data-table", "Data table with sort, pagination, selection"],
                ["GlassChart", "chart", "Charts (Area, Bar, Line, Pie)"],
                ["GlassCommandPalette", "command", "Cmd+K command palette with fuzzy search"],
                ["GlassNotificationCenter", "notifications", "Notification center with categories"],
                ["GlassSegmentedControl", "segmented", "Segmented control with animated indicator"],
                ["GlassFAB", "fab", "Floating action button with radial actions"],
              ].map(([component, cli, desc]) => (
                <tr key={cli}>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{component}</td>
                  <td className="px-4 py-2.5"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{cli}</code></td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Peer Dependencies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Peer Dependencies</h2>
        <p className="text-muted-foreground">
          These are required and must be installed in your project:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install react react-dom tailwindcss`}
        />
      </div>
    </div>
  );
}
