import { CodeBlock } from "@/components/CodeBlock";

export default function InstallationPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Get started with Liquid Glass UI in your project.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <p className="text-muted-foreground">
          Liquid Glass UI is built on top of shadcn/ui. Make sure you have a project with:
        </p>
        <ul className="space-y-1 text-muted-foreground ml-4">
          <li>• React 18+</li>
          <li>• Tailwind CSS</li>
          <li>• TypeScript</li>
          <li>• shadcn/ui initialized</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Add Glass Tokens</h2>
        <p className="text-muted-foreground">Add the glass CSS variables to your <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">index.css</code>:</p>
        <CodeBlock
          filename="index.css"
          language="css"
          code={`:root {
  /* Glass tokens */
  --glass-bg: 0 0% 100%;
  --glass-border: 0 0% 100%;
  --glass-glow: 221 83% 53%;
  --glass-shadow: 221 83% 53%;
}

.dark {
  --glass-bg: 0 0% 100%;
  --glass-border: 0 0% 100%;
  --glass-glow: 217 91% 60%;
  --glass-shadow: 217 91% 60%;
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. Add Glass Utilities</h2>
        <p className="text-muted-foreground">Add the glass utility classes to your CSS:</p>
        <CodeBlock
          filename="index.css"
          language="css"
          code={`.glass-1 {
  background: hsl(var(--glass-bg) / 0.45);
  backdrop-filter: blur(10px);
  border: 1px solid hsl(var(--glass-border) / 0.15);
}

.glass-2 {
  background: hsl(var(--glass-bg) / 0.35);
  backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--glass-border) / 0.2);
}

.glass-3 {
  background: hsl(var(--glass-bg) / 0.25);
  backdrop-filter: blur(30px);
  border: 1px solid hsl(var(--glass-border) / 0.25);
}

.glass-float {
  background: hsl(var(--glass-bg) / 0.15);
  backdrop-filter: blur(40px);
  border: 1px solid hsl(var(--glass-border) / 0.3);
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. Install Dependencies</h2>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install framer-motion next-themes
npx shadcn@latest init`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">4. Copy Components</h2>
        <p className="text-muted-foreground">
          Browse the component docs and copy the code directly into your project. Each component is self-contained and ready to use.
        </p>
      </div>
    </div>
  );
}
