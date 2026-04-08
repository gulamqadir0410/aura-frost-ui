import { CodeBlock } from "@/components/CodeBlock";
import { CheckCircle, Package, Terminal, Upload, Settings, FileText, AlertTriangle, Rocket, ShieldCheck, Wrench } from "lucide-react";

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

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-1 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
        <span>Important</span>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export default function PublishingPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Publishing to npm</h1>
        <p className="text-lg text-muted-foreground">
          Complete guide to build, verify, and publish Glassic UI to the npm registry — covering every field, permission, and consumer setup detail.
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

        {/* Critical package.json fields */}
        <h3 className="text-lg font-semibold mt-2">Critical package.json Fields</h3>
        <p className="text-sm text-muted-foreground">
          These fields <strong>must</strong> be present for the package to work correctly in all environments (CJS, ESM, TypeScript, bundlers):
        </p>
        <CodeBlock
          filename="package.json (required fields)"
          language="json"
          code={`{
  "name": "glassic-ui",
  "version": "1.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "bin", "registry", "README.md"],
  "bin": {
    "glassic-ui": "./bin/cli.mjs"
  },
  "sideEffects": ["*.css"],
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    },
    "./styles": "./dist/styles/glassic.css",
    "./tailwind": "./dist/tailwind.config.js"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=3.0.0"
  }
}`}
        />

        <div className="space-y-2">
          {/* Field explanations - mobile friendly cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { field: '"type": "module"', why: "Declares ESM as the default module system. Without this, .mjs extensions are required for ESM." },
              { field: '"main"', why: "Entry point for CJS (require()) consumers — Node.js, older bundlers." },
              { field: '"module"', why: "Entry point for ESM (import) consumers — Vite, webpack, Rollup." },
              { field: '"types"', why: "TypeScript declaration entry — enables autocomplete and type checking." },
              { field: '"files"', why: "Whitelist of files included in the npm tarball. Everything else is excluded." },
              { field: '"sideEffects": ["*.css"]', why: "Prevents bundlers from tree-shaking CSS imports away." },
              { field: '"exports"', why: "Modern Node.js conditional exports — maps import paths to files." },
              { field: '"peerDependencies"', why: "Declares React & Tailwind as user-provided — avoids duplicate bundles." },
            ].map((item) => (
              <div key={item.field} className="glass-1 rounded-lg p-3 space-y-1">
                <code className="font-mono text-xs text-primary">{item.field}</code>
                <p className="text-xs text-muted-foreground">{item.why}</p>
              </div>
            ))}
          </div>
        </div>
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
        <WarnBox>
          <p>
            If the name <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">glassic-ui</code> is already taken,
            update the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">name</code> field in <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">package.json</code> to
            a scoped name like <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">@yourname/glassic-ui</code>.
          </p>
        </WarnBox>

        <WarnBox>
          <p>
            <strong>Peer dependency note:</strong> Users must have <strong>React 18+</strong> and <strong>Tailwind CSS 3+</strong> installed
            before using Glassic UI. If they see "unmet peer dependency" warnings during install, they need to install these first:
          </p>
          <code className="font-mono text-xs block mt-1">npm install react react-dom tailwindcss</code>
        </WarnBox>
      </div>

      {/* Step 2: CLI Permissions */}
      <div className="space-y-4">
        <StepHeader step={2} icon={Terminal} title="Ensure CLI is Executable" />
        <p className="text-muted-foreground">
          The CLI file (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">bin/cli.mjs</code>) must have:
        </p>
        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
          <li>• A shebang (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">#!/usr/bin/env node</code>) as the first line</li>
          <li>• Executable file permissions</li>
        </ul>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Verify shebang exists
head -1 bin/cli.mjs
# Should output: #!/usr/bin/env node

# Set executable permission
chmod +x bin/cli.mjs`}
        />
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>Note:</strong> The CLI uses only Node.js built-in modules (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">fs</code>, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">path</code>) — no external dependencies like chalk or prompts are required.
          The <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">registry.json</code> file maps CLI component names (e.g. <code className="font-mono text-xs">"button"</code>) to their source file paths and dependency lists.
        </div>
      </div>

      {/* Step 3: Build */}
      <div className="space-y-4">
        <StepHeader step={3} icon={Terminal} title="Install & Build" />
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
            { file: "dist/index.js", desc: "ESM bundle" },
            { file: "dist/index.cjs", desc: "CJS bundle" },
            { file: "dist/index.d.ts", desc: "TypeScript declarations (ESM)" },
            { file: "dist/index.d.cts", desc: "TypeScript declarations (CJS)" },
            { file: "dist/styles/glassic.css", desc: "Glass design tokens & utilities" },
            { file: "dist/tailwind.config.js", desc: "Tailwind v3 preset" },
          ].map((item) => (
            <div key={item.file} className="flex items-center gap-2 text-sm">
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded shrink-0">{item.file}</code>
              <span className="text-muted-foreground text-xs">— {item.desc}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>Note:</strong> Bundle sizes are approximate and may vary between builds. The <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">"use client"</code> directive is injected at the top of JS bundles for Next.js App Router compatibility.
          The package uses ESM + CJS dual build format for maximum compatibility.
        </div>
      </div>

      {/* Step 4: Verify */}
      <div className="space-y-4">
        <StepHeader step={4} icon={FileText} title="Verify Before Publishing" />
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Preview what files will be published
npm pack --dry-run

# Expected output:
# - dist/          (bundles, types, CSS)
# - bin/cli.mjs    (CLI tool)
# - registry/      (raw component sources for CLI)
# - README.md
# - package.json`}
        />
        <p className="text-muted-foreground">
          Test locally in another project:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Create a tarball
npm pack

# In another project, install from the tarball
cd /path/to/test-project
npm install ../packages/glassic-ui/glassic-ui-1.1.0.tgz

# Test ESM import
node --input-type=module -e "import { GlassButton } from 'glassic-ui'; console.log('✓ ESM works')"

# Test CJS require
node -e "const g = require('glassic-ui'); console.log('✓ CJS works:', Object.keys(g).length, 'exports')"`}
        />
      </div>

      {/* Step 5: Publish */}
      <div className="space-y-4">
        <StepHeader step={5} icon={Upload} title="Publish to npm" />
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
          <p className="text-sm font-medium">Version management (semver)</p>
          <p className="text-sm text-muted-foreground">
            Always bump the version before each publish. npm rejects duplicate versions.
          </p>
        </div>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Patch release (1.1.0 → 1.1.1) — bug fixes
npm version patch

# Minor release (1.1.0 → 1.2.0) — new features, backward compatible
npm version minor

# Major release (1.1.0 → 2.0.0) — breaking changes
npm version major

# Then rebuild and publish
npm run build
npm publish --access public`}
        />
      </div>

      {/* Step 6: Consumer Setup — Package Import */}
      <div className="space-y-4">
        <StepHeader step={6} icon={Package} title="Consumer Setup — Package Import" />
        <p className="text-muted-foreground">
          After publishing, users install and configure as follows:
        </p>

        <h3 className="text-lg font-semibold">6a. Install the Package</h3>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Install Glassic UI
npm install glassic-ui

# Required peer dependencies
npm install react react-dom tailwindcss

# Component dependencies (if not already installed)
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-slot

# Only needed if using GlassChart
npm install recharts`}
        />

        <h3 className="text-lg font-semibold">6b. Import Glass CSS into Your Stylesheet</h3>
        <p className="text-sm text-muted-foreground">
          You <strong>must</strong> import the Glassic CSS tokens. Add this to the <strong>top</strong> of your main CSS file:
        </p>
        <CodeBlock
          filename="src/index.css"
          language="css"
          code={`/* Import glass design tokens BEFORE tailwind */
@import "glassic-ui/styles";
@import "tailwindcss";`}
        />
        <WarnBox>
          <p>
            Without this import, glass utility classes (<code className="font-mono text-xs">glass-1</code>, <code className="font-mono text-xs">glass-2</code>, <code className="font-mono text-xs">glass-float</code>, etc.)
            will not work. The CSS file defines all <code className="font-mono text-xs">--glass-*</code> custom properties and glass layer utilities.
          </p>
        </WarnBox>

        <h3 className="text-lg font-semibold">6c. Tailwind v4 Setup (CSS-first — Recommended)</h3>
        <p className="text-sm text-muted-foreground">
          Tailwind v4 uses CSS-first configuration. <strong>No <code className="font-mono text-xs">tailwind.config.js</code> or <code className="font-mono text-xs">postcss.config.js</code> needed.</strong>{" "}
          Tailwind v4 automatically detects class usage — no <code className="font-mono text-xs">content</code> scanning required.
        </p>
        <CodeBlock
          filename="src/index.css (Tailwind v4)"
          language="css"
          code={`@import "glassic-ui/styles";
@import "tailwindcss";

@theme {
  --color-glass-bg: hsl(var(--glass-bg));
  --color-glass-border: hsl(var(--glass-border));
  --color-glass-glow: hsl(var(--glass-glow));
  --color-glass-shadow: hsl(var(--glass-shadow));
}`}
        />

        <h3 className="text-lg font-semibold">6d. Tailwind v3 Setup (JS config)</h3>
        <p className="text-sm text-muted-foreground">
          If using Tailwind v3, you need a JS config with glass tokens and content scanning:
        </p>
        <CodeBlock
          filename="tailwind.config.js (Tailwind v3)"
          language="javascript"
          code={`export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    // Include glassic-ui dist files for class detection
    "./node_modules/glassic-ui/dist/**/*.{js,mjs,cjs}",
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
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>v3 vs v4:</strong> In Tailwind v3, you <em>must</em> include <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.cjs</code> in the content glob to scan CJS bundles.
          In v4, content scanning is automatic.
        </div>

        <h3 className="text-lg font-semibold">6e. Use Components</h3>
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

      {/* Step 7: Consumer Setup — CLI */}
      <div className="space-y-4">
        <StepHeader step={7} icon={Terminal} title="Consumer Setup — CLI (shadcn-style)" />
        <p className="text-muted-foreground">
          The CLI copies component source files directly into the user's project for full customization.
        </p>

        <h3 className="text-lg font-semibold">7a. Prerequisites</h3>
        <p className="text-sm text-muted-foreground">
          CLI users need <strong>shadcn/ui's utility pattern</strong> — specifically the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">cn()</code> helper. If you've already set up shadcn, you're good. Otherwise:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Install cn() dependencies
npm install clsx tailwind-merge`}
        />
        <CodeBlock
          filename="src/lib/utils.ts"
          language="typescript"
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        />

        <h3 className="text-lg font-semibold">7b. Initialize & Add Components</h3>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`# Initialize (creates directories, utils, glassic.css)
npx glassic-ui init

# Add specific components
npx glassic-ui add button card input alert dialog tabs

# List all available components
npx glassic-ui list`}
        />

        <h3 className="text-lg font-semibold">7c. Paste Glass CSS Tokens into index.css</h3>
        <p className="text-sm text-muted-foreground">
          After <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npx glassic-ui init</code>, a <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">glassic.css</code> file is created.
          You <strong>must import it</strong> in your main CSS file:
        </p>
        <CodeBlock
          filename="src/index.css"
          language="css"
          code={`@import "tailwindcss";
@import "./glassic.css";

/* Or paste the glass tokens directly:
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
}
*/`}
        />

        <h3 className="text-lg font-semibold">7d. Expected Folder Structure</h3>
        <CodeBlock
          filename="Project structure after CLI init"
          language="bash"
          code={`src/
├── components/
│   └── glass/              ← Components copied here
│       ├── GlassButton.tsx
│       ├── GlassCard.tsx
│       ├── GlassInput.tsx
│       └── ...
├── lib/
│   └── utils.ts            ← cn() helper (created by init)
├── glassic.css              ← Glass design tokens (created by init)
└── index.css                ← Must import glassic.css here`}
        />

        <h3 className="text-lg font-semibold">7e. Vite Path Alias (Required for CLI Components)</h3>
        <p className="text-sm text-muted-foreground">
          CLI-installed components use <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">@/lib/utils</code> imports. You must configure the alias:
        </p>
        <CodeBlock
          filename="vite.config.ts"
          language="typescript"
          code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});`}
        />
        <CodeBlock
          filename="tsconfig.json (or tsconfig.app.json)"
          language="json"
          code={`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
        />

        <h3 className="text-lg font-semibold">7f. CLI Error Handling</h3>
        <div className="space-y-2">
          {[
            { error: '"Unknown component" when running add', fix: 'Run "npx glassic-ui list" to see valid component names. Names are lowercase: button, card, input, dialog, etc.' },
            { error: '"Source file not found"', fix: "The registry/ folder may be missing from the installed package. Reinstall with npm install glassic-ui@latest." },
            { error: 'Folder structure missing', fix: 'Run "npx glassic-ui init" first — it creates the required directories, utils.ts, and glassic.css file.' },
          ].map((item) => (
            <div key={item.error} className="glass-1 rounded-lg p-3 space-y-1">
              <p className="text-sm font-medium text-destructive">{item.error}</p>
              <p className="text-xs text-muted-foreground">{item.fix}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Package Exports Map */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Package Exports Map</h2>
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
          <div className="sm:hidden space-y-3">
            {[
              { imp: 'import { ... } from "glassic-ui"', resolves: "dist/index.js", purpose: "All 16 components + cn()" },
              { imp: 'import "glassic-ui/styles"', resolves: "dist/styles/glassic.css", purpose: "Glass design tokens" },
              { imp: 'import "glassic-ui/tailwind"', resolves: "dist/tailwind.config.js", purpose: "Tailwind v3 preset" },
            ].map((row) => (
              <div key={row.resolves} className="glass-1 rounded-lg p-3 space-y-1.5">
                <code className="font-mono text-xs text-primary block break-all">{row.imp}</code>
                <p className="text-xs text-muted-foreground">→ {row.resolves}</p>
                <p className="text-xs text-muted-foreground">{row.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Browser & SSR Compatibility */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Compatibility</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "React 18+", desc: "Hooks, forwardRef, and concurrent features supported." },
            { title: "Tailwind CSS 3 & 4", desc: "Works with both v3 (JS config) and v4 (CSS-first @theme)." },
            { title: "Next.js App Router", desc: '"use client" directive is auto-injected in bundles for RSC compatibility.' },
            { title: "Vite / webpack / Rollup", desc: "ESM + CJS dual build ensures compatibility with all modern bundlers." },
            { title: "TypeScript", desc: "Full type declarations included (.d.ts + .d.cts). Strict typing on all props." },
            { title: "Tree-shaking", desc: "Only imported components are bundled. CSS marked as sideEffect to prevent removal." },
          ].map((item) => (
            <div key={item.title} className="glass-1 rounded-lg p-3 space-y-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Troubleshooting</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: "Glass styles not showing",
              a: 'You must import "glassic-ui/styles" in your main CSS file (before @import "tailwindcss"). This CSS file defines all --glass-* custom properties and glass-1, glass-2, glass-float utility classes.',
            },
            {
              q: '"unmet peer dependency" warning on install',
              a: "Install React 18+ and Tailwind CSS before installing glassic-ui: npm install react react-dom tailwindcss",
            },
            {
              q: 'cn() not found / "@/lib/utils" import error',
              a: 'CLI components use the @/lib/utils alias. Ensure: (1) src/lib/utils.ts exists with cn() exported, (2) vite.config.ts has @ alias pointing to src/, (3) tsconfig.json has paths: { "@/*": ["./src/*"] }',
            },
            {
              q: '"use client" directive warning during build',
              a: "This is a bundler info message, not an error. The directive is preserved for Next.js App Router compatibility.",
            },
            {
              q: "CLI copies files but styles don't work",
              a: 'Run "npx glassic-ui init" first, then import the generated glassic.css in your index.css. The CSS custom properties must be present for glass utilities to render.',
            },
            {
              q: "Tailwind classes from components not detected (v3)",
              a: 'Add "./node_modules/glassic-ui/dist/**/*.{js,mjs,cjs}" to the content array in tailwind.config.js. Include .cjs for CJS consumers.',
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
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">package.json</code> has all required fields: name, version, type, main, module, types, files, exports, sideEffects, peerDependencies
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">bin/cli.mjs</code> has shebang and executable permission (<code className="font-mono text-xs">chmod +x</code>)
          </CheckItem>
          <CheckItem>
            All 16 components export correctly from <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/index.ts</code>
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm run build</code> completes without errors
          </CheckItem>
          <CheckItem>
            TypeScript declarations generated (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.d.ts</code> + <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.d.cts</code>)
          </CheckItem>
          <CheckItem>
            Glass CSS tokens include both light and dark mode variables
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm pack --dry-run</code> shows expected files (no unnecessary files)
          </CheckItem>
          <CheckItem>
            CLI (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npx glassic-ui add button</code>) copies files with correct imports
          </CheckItem>
          <CheckItem>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">registry.json</code> lists all 16 components with correct file paths
          </CheckItem>
          <CheckItem>
            README includes setup for both Tailwind v3 and v4, plus CLI and package usage
          </CheckItem>
          <CheckItem>
            Version bumped following semver (patch / minor / major)
          </CheckItem>
          <CheckItem>
            Tested local install via <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm pack</code> + <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm install ../glassic-ui-1.1.0.tgz</code>
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
chmod +x bin/cli.mjs        # ensure CLI is executable
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
