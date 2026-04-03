import { CodeBlock } from "@/components/CodeBlock";

export default function PublishingPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Publishing to npm</h1>
        <p className="text-lg text-muted-foreground">
          How to build and publish Glassic UI as an npm package for distribution.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Package Structure</h2>
        <p className="text-muted-foreground">
          The publishable package lives in <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">packages/glassic-ui/</code> with this structure:
        </p>
        <CodeBlock
          filename="Directory Structure"
          language="bash"
          code={`packages/glassic-ui/
├── bin/
│   └── cli.mjs              # CLI for "npx glassic-ui add ..."
├── src/
│   ├── components/           # All 15 glass components
│   │   ├── GlassButton.tsx
│   │   ├── GlassCard.tsx
│   │   └── ...
│   ├── styles/
│   │   └── glassic.css       # Glass CSS tokens & utilities
│   ├── index.ts              # Barrel exports
│   ├── utils.ts              # cn() utility
│   └── tailwind.config.js    # Tailwind preset (v3 compat)
├── registry.json             # Component registry for CLI
├── package.json
├── tsconfig.json
├── tsup.config.ts            # Build configuration
└── README.md`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Build the Package</h2>
        <p className="text-muted-foreground">
          The package uses <strong>tsup</strong> to build ESM and CJS outputs with TypeScript declarations:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`cd packages/glassic-ui
npm install
npm run build`}
        />
        <p className="text-muted-foreground">
          This generates the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">dist/</code> folder with:
        </p>
        <ul className="space-y-1 text-muted-foreground ml-4">
          <li>• <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">dist/index.js</code> — ESM bundle</li>
          <li>• <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">dist/index.cjs</code> — CJS bundle</li>
          <li>• <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">dist/index.d.ts</code> — Type declarations</li>
          <li>• <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">dist/styles/glassic.css</code> — Glass tokens</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. Publish to npm</h2>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm login
cd packages/glassic-ui
npm publish`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. Usage — CLI (shadcn-style)</h2>
        <p className="text-muted-foreground">
          Users can add components individually using the CLI, which copies source files directly into their project:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npx glassic-ui init
npx glassic-ui add button card input dialog
npx glassic-ui list`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">4. Usage — Package Import</h2>
        <p className="text-muted-foreground">
          Users can also import components directly from the package:
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install glassic-ui`}
        />
        <CodeBlock
          filename="App.tsx"
          language="tsx"
          code={`import { GlassButton, GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "glassic-ui";
import "glassic-ui/styles";

export default function App() {
  return (
    <GlassCard variant="elevated" hover>
      <GlassCardHeader>
        <GlassCardTitle>Welcome to Glassic UI</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <GlassButton variant="glass-float" size="lg">
          Get Started
        </GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">5. Consumer Tailwind Setup</h2>
        <p className="text-muted-foreground">
          Users on <strong>Tailwind v4</strong> add glass tokens via <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">@theme</code> in their CSS:
        </p>
        <CodeBlock
          filename="src/index.css (Tailwind v4)"
          language="css"
          code={`@import "tailwindcss";

@theme {
  --color-glass-bg: hsl(var(--glass-bg));
  --color-glass-border: hsl(var(--glass-border));
  --color-glass-glow: hsl(var(--glass-glow));
  --color-glass-shadow: hsl(var(--glass-shadow));
}`}
        />
        <p className="text-muted-foreground">
          Users on <strong>Tailwind v3</strong> add tokens in their <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">tailwind.config.js</code> instead:
        </p>
        <CodeBlock
          filename="tailwind.config.js (Tailwind v3)"
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
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Package Exports</h2>
        <p className="text-muted-foreground">
          The package exports all 15 components, their types, and the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">cn()</code> utility:
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
      </div>

      <div className="glass-2 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold">Checklist before publishing</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            All 15 components export correctly from <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/index.ts</code>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            TypeScript declarations are generated
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            Glass CSS tokens include both light and dark mode
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            CLI copies components with correct import paths
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">peerDependencies</code> are set (react, react-dom, tailwindcss)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            README includes usage instructions for both v3 and v4
          </li>
        </ul>
      </div>
    </div>
  );
}
