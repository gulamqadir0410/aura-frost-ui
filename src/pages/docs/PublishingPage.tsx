import { CodeBlock } from "@/components/CodeBlock";
import { CheckCircle, Package, Terminal, Upload, Settings, FileText, AlertTriangle, Rocket } from "lucide-react";

function StepHeader({ step, icon: Icon, title }: { step: number; icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
        {step}
      </div>
      <Icon className="h-5 w-5 text-primary shrink-0" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export default function PublishingPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Publishing to npm</h1>
        <p className="text-lg text-muted-foreground">
          Complete guide to build, verify, and publish Glassic UI to the npm registry.
        </p>
      </div>

      {/* Package Overview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Package Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass-1 rounded-xl p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Package</p>
            <p className="font-mono text-sm font-semibold">glassic-ui</p>
          </div>
          <div className="glass-1 rounded-xl p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Version</p>
            <p className="font-mono text-sm font-semibold">1.1.0</p>
          </div>
          <div className="glass-1 rounded-xl p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Components</p>
            <p className="font-mono text-sm font-semibold">16</p>
          </div>
        </div>
        <CodeBlock
          filename="Directory Structure"
          language="bash"
          code={`packages/glassic-ui/
├── bin/
│   └── cli.mjs              # CLI for "npx glassic-ui add ..."
├── registry/
│   ├── components/           # Raw .tsx files for CLI distribution
│   └── styles/glassic.css    # Glass tokens for CLI users
├── src/
│   ├── components/           # All 16 glass components
│   ├── styles/glassic.css    # Glass CSS tokens & utilities
│   ├── index.ts              # Barrel exports
│   ├── utils.ts              # cn() utility
│   └── tailwind.config.js    # Tailwind v3 preset
├── registry.json             # Component registry for CLI
├── package.json
├── tsconfig.json
├── tsup.config.ts            # Build configuration
└── README.md`}
        />
      </div>

      {/* Step 1: Prerequisites */}
      <div className="space-y-4">
        <StepHeader step={1} icon={Settings} title="Prerequisites" />
        <p className="text-muted-foreground">
          Before publishing, ensure you have the following set up:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# 1. Create an npm account (if you don't have one)
npm adduser

# 2. Log in to npm
npm login

# 3. Verify you're logged in
npm whoami

# 4. Check the package name is available
npm view glassic-ui`}
        />
        <div className="glass-1 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span>Important</span>
          </div>
          <p className="text-sm text-muted-foreground">
            If the name <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">glassic-ui</code> is already taken, 
            update the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">name</code> field in <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">package.json</code> to 
            a scoped name like <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">@yourname/glassic-ui</code>.
          </p>
        </div>
      </div>

      {/* Step 2: Install Dependencies */}
      <div className="space-y-4">
        <StepHeader step={2} icon={Terminal} title="Install & Build" />
        <p className="text-muted-foreground">
          Navigate to the package directory, install dependencies, and build:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`cd packages/glassic-ui

# Install dependencies
npm install

# Build the package (ESM + CJS + types + CSS)
npm run build`}
        />
        <p className="text-muted-foreground">
          The build generates these outputs in <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">dist/</code>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { file: "dist/index.js", desc: "ESM bundle (~62 KB)" },
            { file: "dist/index.cjs", desc: "CJS bundle (~70 KB)" },
            { file: "dist/index.d.ts", desc: "TypeScript declarations" },
            { file: "dist/index.d.cts", desc: "CJS type declarations" },
            { file: "dist/styles/glassic.css", desc: "Glass design tokens" },
            { file: "dist/tailwind.config.js", desc: "Tailwind v3 preset" },
          ].map((item) => (
            <div key={item.file} className="flex items-center gap-2 text-sm">
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded shrink-0">{item.file}</code>
              <span className="text-muted-foreground text-xs">— {item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Verify */}
      <div className="space-y-4">
        <StepHeader step={3} icon={FileText} title="Verify Before Publishing" />
        <p className="text-muted-foreground">
          Always verify the package contents before publishing. Run <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">npm pack --dry-run</code> to see exactly what will be included:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Preview what files will be published
npm pack --dry-run

# Expected output: ~27 files, ~50 KB packed
# - dist/          (bundles, types, CSS)
# - bin/cli.mjs    (CLI tool)
# - registry/      (raw component sources for CLI)
# - README.md
# - package.json`}
        />
        <p className="text-muted-foreground">
          You can also create a local tarball and test it in another project:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Create a tarball
npm pack

# In another project, install from the tarball
cd /path/to/test-project
npm install ../packages/glassic-ui/glassic-ui-1.1.0.tgz

# Test the import works
node -e "const g = require('glassic-ui'); console.log(Object.keys(g))"`}
        />
      </div>

      {/* Step 4: Publish */}
      <div className="space-y-4">
        <StepHeader step={4} icon={Upload} title="Publish to npm" />
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`cd packages/glassic-ui

# First publish (public package)
npm publish --access public

# If using a scoped name (@yourname/glassic-ui)
npm publish --access public`}
        />
        <div className="glass-1 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium">Version management</p>
          <p className="text-sm text-muted-foreground">
            For subsequent releases, bump the version before publishing:
          </p>
        </div>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Patch release (1.1.0 → 1.1.1) — bug fixes
npm version patch

# Minor release (1.1.0 → 1.2.0) — new features
npm version minor

# Major release (1.1.0 → 2.0.0) — breaking changes
npm version major

# Then publish
npm publish --access public`}
        />
      </div>

      {/* Step 5: Consumer Usage — Package Import */}
      <div className="space-y-4">
        <StepHeader step={5} icon={Package} title="Consumer Usage — Package Import" />
        <p className="text-muted-foreground">
          After publishing, users can install and use Glassic UI as a direct dependency:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install glassic-ui`}
        />
        <CodeBlock
          filename="App.tsx"
          language="tsx"
          code={`import {
  GlassButton,
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardContent,
  GlassAlert,
} from "glassic-ui";
import "glassic-ui/styles";

export default function App() {
  return (
    <div className="space-y-6 p-8">
      <GlassAlert variant="info" title="Welcome!">
        Glassic UI is ready to use.
      </GlassAlert>

      <GlassCard variant="elevated" hover>
        <GlassCardHeader>
          <GlassCardTitle>Getting Started</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <GlassButton variant="glass-float" size="lg">
            Get Started
          </GlassButton>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}`}
        />
      </div>

      {/* Step 6: Consumer Usage — CLI */}
      <div className="space-y-4">
        <StepHeader step={6} icon={Terminal} title="Consumer Usage — CLI (shadcn-style)" />
        <p className="text-muted-foreground">
          Users can also copy individual components into their project for full customization:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Initialize Glassic UI (creates directories, utils, CSS)
npx glassic-ui init

# Add specific components
npx glassic-ui add button card input alert dialog tabs

# List all available components
npx glassic-ui list`}
        />
      </div>

      {/* Step 7: Consumer Tailwind Setup */}
      <div className="space-y-4">
        <StepHeader step={7} icon={Settings} title="Consumer Tailwind Setup" />
        <p className="text-muted-foreground">
          Consumers need to register the glass design tokens with their Tailwind setup:
        </p>

        <h3 className="text-lg font-semibold mt-4">Tailwind v4 (CSS-first)</h3>
        <CodeBlock
          filename="src/index.css"
          language="css"
          code={`@import "tailwindcss";
@import "glassic-ui/styles";

@theme {
  --color-glass-bg: hsl(var(--glass-bg));
  --color-glass-border: hsl(var(--glass-border));
  --color-glass-glow: hsl(var(--glass-glow));
  --color-glass-shadow: hsl(var(--glass-shadow));
}`}
        />

        <h3 className="text-lg font-semibold mt-4">Tailwind v3 (JS config)</h3>
        <CodeBlock
          filename="tailwind.config.js"
          language="javascript"
          code={`export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/glassic-ui/dist/**/*.{js,mjs}",
  ],
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
};`}
        />
      </div>

      {/* Package Exports */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Package Exports Map</h2>
        <p className="text-muted-foreground">
          The package provides three entry points:
        </p>
        <CodeBlock
          filename="package.json (exports)"
          language="json"
          code={`{
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    },
    "./styles": "./dist/styles/glassic.css",
    "./tailwind": "./dist/tailwind.config.js"
  }
}`}
        />
        <div className="overflow-x-auto">
          <table className="hidden sm:table w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="glass-1">
                <th className="text-left p-3 font-medium">Import</th>
                <th className="text-left p-3 font-medium">Resolves to</th>
                <th className="text-left p-3 font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-mono text-xs">{`import { ... } from "glassic-ui"`}</td>
                <td className="p-3 font-mono text-xs">dist/index.js</td>
                <td className="p-3 text-muted-foreground">All 16 components + cn()</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-mono text-xs">{`import "glassic-ui/styles"`}</td>
                <td className="p-3 font-mono text-xs">dist/styles/glassic.css</td>
                <td className="p-3 text-muted-foreground">Glass design tokens + utilities</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-mono text-xs">{`import "glassic-ui/tailwind"`}</td>
                <td className="p-3 font-mono text-xs">dist/tailwind.config.js</td>
                <td className="p-3 text-muted-foreground">Tailwind v3 preset config</td>
              </tr>
            </tbody>
          </table>
          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {[
              { imp: 'import { ... } from "glassic-ui"', resolves: "dist/index.js", purpose: "All 16 components + cn()" },
              { imp: 'import "glassic-ui/styles"', resolves: "dist/styles/glassic.css", purpose: "Glass design tokens" },
              { imp: 'import "glassic-ui/tailwind"', resolves: "dist/tailwind.config.js", purpose: "Tailwind v3 preset" },
            ].map((row) => (
              <div key={row.resolves} className="glass-1 rounded-lg p-3 space-y-1.5">
                <code className="font-mono text-xs text-primary block">{row.imp}</code>
                <p className="text-xs text-muted-foreground">→ {row.resolves}</p>
                <p className="text-xs text-muted-foreground">{row.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Troubleshooting</h2>
        <div className="space-y-3">
          {[
            {
              q: '"use client" directive warning during build',
              a: 'This is a bundler info message, not an error. The directive is preserved for Next.js App Router compatibility and does not affect functionality.',
            },
            {
              q: "Glass styles not showing in consumer project",
              a: 'Ensure the consumer imports "glassic-ui/styles" in their main CSS file and has registered the glass tokens in their Tailwind config (@theme for v4, extend.colors for v3).',
            },
            {
              q: "CLI copies files but styles don't work",
              a: 'Run "npx glassic-ui init" first — this copies the glassic.css file with all required CSS custom properties and utility classes.',
            },
            {
              q: "Package name already taken on npm",
              a: 'Use a scoped name: rename to "@yourname/glassic-ui" in package.json, then publish with --access public.',
            },
          ].map((item) => (
            <div key={item.q} className="glass-1 rounded-xl p-4 space-y-1.5">
              <p className="text-sm font-medium">{item.q}</p>
              <p className="text-xs text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Publish Checklist */}
      <div className="glass-2 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Pre-Publish Checklist</h3>
        </div>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <CheckItem>
            All 16 components export correctly from <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/index.ts</code>
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm run build</code> completes without errors
          </CheckItem>
          <CheckItem>
            TypeScript declarations generated (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">dist/index.d.ts</code>)
          </CheckItem>
          <CheckItem>
            Glass CSS tokens include both light and dark mode variables
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm pack --dry-run</code> shows ~27 files, ~50 KB
          </CheckItem>
          <CheckItem>
            CLI (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npx glassic-ui add button</code>) copies files with correct imports
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">peerDependencies</code> set: react, react-dom, tailwindcss
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">registry.json</code> lists all 16 components
          </CheckItem>
          <CheckItem>
            README includes setup instructions for both Tailwind v3 and v4
          </CheckItem>
          <CheckItem>
            Version bumped following <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">semver</code> (patch / minor / major)
          </CheckItem>
        </ul>
      </div>

      {/* Quick Reference */}
      <div className="glass-1 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold">Quick Reference Commands</h3>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Full publish workflow
cd packages/glassic-ui
npm install
npm run build
npm pack --dry-run          # verify contents
npm publish --access public # publish to npm

# Update existing version
npm version patch           # or minor / major
npm run build
npm publish --access public`}
        />
      </div>
    </div>
  );
}
