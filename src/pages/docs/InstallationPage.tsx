import { CodeBlock } from "@/components/CodeBlock";

export default function InstallationPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Installation Guide</h1>
        <p className="text-lg text-muted-foreground">
          Complete step-by-step guide — from a fresh React project to a working Glassic UI setup.
        </p>
      </div>

      {/* Step 1 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
          Create a New React + Vite Project
        </h2>
        <p className="text-muted-foreground">
          Start by scaffolding a new React project with Vite and TypeScript:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}
        />
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
          Install Tailwind CSS v4
        </h2>
        <p className="text-muted-foreground">
          Glassic UI uses Tailwind CSS v4 with the new Vite plugin — no PostCSS config needed:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install -D tailwindcss @tailwindcss/vite`}
        />
        <p className="text-muted-foreground">
          Add the Tailwind plugin to your <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">vite.config.ts</code>:
        </p>
        <CodeBlock
          filename="vite.config.ts"
          language="typescript"
          code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}
        />
        <p className="text-muted-foreground">
          Replace the contents of <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">src/index.css</code> with:
        </p>
        <CodeBlock
          filename="src/index.css"
          language="css"
          code={`@import "tailwindcss";`}
        />
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>Note:</strong> Tailwind v4 uses a CSS-first configuration — no{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">tailwind.config.js</code>,{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">postcss.config.js</code>, or{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">tailwindcss-animate</code> needed.
          Theme tokens go directly in your CSS using <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">@theme</code>.
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
          Install Required Dependencies
        </h2>
        <p className="text-muted-foreground">
          Glassic UI components use these libraries. Install them all at once:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install glassic-ui

# Required peer dependencies used by components
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-slot

# Only needed if using GlassChart
npm install recharts`}
        />
      </div>

      {/* Step 4 — Option A */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
          Add Glassic UI Components
        </h2>

        <p className="text-muted-foreground font-medium">Choose one of the two methods below:</p>

        {/* Option A */}
        <div className="space-y-4 rounded-lg border border-border p-5">
          <h3 className="text-lg font-semibold">Option A: CLI (Recommended — shadcn-style)</h3>
          <p className="text-muted-foreground">
            The CLI copies component source code into your project so you can fully customize them.
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            Step 4a — Initialize (creates glass CSS tokens, utility helper, and folder structure):
          </p>
          <CodeBlock
            filename="terminal"
            language="bash"
            code={`npx glassic-ui init`}
          />
          <p className="text-muted-foreground text-sm">
            This will create:
          </p>
          <ul className="space-y-1 text-muted-foreground text-sm ml-4">
            <li>• <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">src/components/glass/</code> — component directory</li>
            <li>• <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">src/lib/utils.ts</code> — the <code className="font-mono text-xs">cn()</code> class merge helper</li>
            <li>• Glass CSS tokens appended to your <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">src/index.css</code></li>
          </ul>

          <p className="text-muted-foreground text-sm font-medium">
            Step 4b — Add components (add one, several, or all):
          </p>
          <CodeBlock
            filename="terminal"
            language="bash"
            code={`# Add specific components
npx glassic-ui add button card input dialog alert tabs

# Add ALL components at once
npx glassic-ui add button card input switch alert dialog dropdown tabs navbar sidebar data-table chart command notifications segmented fab`}
          />
          <p className="text-muted-foreground text-sm font-medium">
            Step 4c — See all available components:
          </p>
          <CodeBlock
            filename="terminal"
            language="bash"
            code={`npx glassic-ui list`}
          />
        </div>

        {/* Option B */}
        <div className="space-y-4 rounded-lg border border-border p-5">
          <h3 className="text-lg font-semibold">Option B: Direct Package Import</h3>
          <p className="text-muted-foreground">
            Import components directly from the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">glassic-ui</code> package without copying source files.
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            Step 4a — Import the Glassic UI styles at the top of your CSS file:
          </p>
          <CodeBlock
            filename="src/index.css"
            language="css"
            code={`@import 'glassic-ui/styles';
@import "tailwindcss";`}
          />
          <p className="text-muted-foreground text-sm font-medium">
            Step 4b — Use components directly:
          </p>
          <CodeBlock
            filename="src/App.tsx"
            language="tsx"
            code={`import { GlassButton, GlassCard, GlassCardHeader, GlassCardTitle } from 'glassic-ui';

export default function App() {
  return (
    <GlassCard variant="elevated" hover>
      <GlassCardHeader>
        <GlassCardTitle>Hello Glassic UI</GlassCardTitle>
      </GlassCardHeader>
      <GlassButton variant="glass-float">Click Me</GlassButton>
    </GlassCard>
  );
}`}
          />
        </div>
      </div>

      {/* Step 5 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
          Configure Glass Tokens (CSS-first)
        </h2>
        <p className="text-muted-foreground">
          Add the glass color tokens using Tailwind v4's <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">@theme</code> block in your CSS:
        </p>
        <CodeBlock
          filename="src/index.css"
          language="css"
          code={`@import "tailwindcss";

@theme {
  --color-glass-bg: hsl(var(--glass-bg));
  --color-glass-border: hsl(var(--glass-border));
  --color-glass-glow: hsl(var(--glass-glow));
  --color-glass-shadow: hsl(var(--glass-shadow));

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-scale-in: scale-in 0.3s ease-out;

  @keyframes fade-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes scale-in {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
}

/* CSS custom properties for light/dark mode */
:root {
  --glass-bg: 220 20% 100%;
  --glass-border: 220 20% 80%;
  --glass-glow: 221 83% 53%;
  --glass-shadow: 221 83% 53%;
}

.dark {
  --glass-bg: 220 30% 20%;
  --glass-border: 220 20% 40%;
  --glass-glow: 217 91% 60%;
  --glass-shadow: 217 91% 60%;
}`}
        />
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>Key difference from v3:</strong> In Tailwind v4, there's no{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">tailwind.config.js</code>.
          All theme tokens are defined in CSS using{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">@theme</code>.
          Custom utilities use{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">@utility</code> instead of{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">@layer components</code>.
        </div>
      </div>

      {/* Step 6 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">6</span>
          Run Your Project
        </h2>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm run dev`}
        />
        <p className="text-muted-foreground">
          Open <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">http://localhost:5173</code> and you should see your Glassic UI components rendering with the glassmorphic styling.
        </p>
      </div>

      {/* Quick Example */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">✓</span>
          Complete Working Example
        </h2>
        <p className="text-muted-foreground">
          Here's a full <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">App.tsx</code> using CLI-installed components:
        </p>
        <CodeBlock
          filename="src/App.tsx"
          language="tsx"
          code={`import { useState } from "react";
import { GlassButton } from "./components/glass/GlassButton";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "./components/glass/GlassCard";
import { GlassInput } from "./components/glass/GlassInput";
import { GlassSwitch } from "./components/glass/GlassSwitch";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground p-8 space-y-6">
        <GlassCard variant="elevated" hover>
          <GlassCardHeader>
            <GlassCardTitle>Welcome to Glassic UI</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="space-y-4">
            <GlassInput placeholder="Enter your name..." />

            <GlassSwitch
              label="Dark Mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />

            <div className="flex gap-2">
              <GlassButton variant="glass">Default</GlassButton>
              <GlassButton variant="glass-float">Floating</GlassButton>
              <GlassButton variant="glass-glow">Glowing</GlassButton>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}`}
        />
      </div>

      {/* Available Components Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Available Components</h2>
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
                ["GlassAlert", "alert", "Alert banner with info/success/warning/error"],
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

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Troubleshooting</h2>
        <div className="space-y-3">
          <div>
            <p className="font-medium text-foreground">Glass effects not showing?</p>
            <p className="text-muted-foreground text-sm">Make sure the CSS variables (<code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">--glass-bg</code>, <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">--glass-border</code>, etc.) are defined in your CSS. Run <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">npx glassic-ui init</code> to auto-inject them.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Using Tailwind v3 instead of v4?</p>
            <p className="text-muted-foreground text-sm">The glass utility classes use <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">@utility</code> syntax which requires Tailwind v4. If you're on v3, use <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">@layer components</code> instead and add <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">tailwindcss-animate</code> plugin.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">cn() not found?</p>
            <p className="text-muted-foreground text-sm">Run <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">npx glassic-ui init</code> — it creates <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">src/lib/utils.ts</code> with the cn() helper automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
