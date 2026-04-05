import { CodeBlock } from "@/components/CodeBlock";
import { ComponentPreview } from "@/components/ComponentPreview";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/glass/GlassCard";
import { GlassSwitch } from "@/components/glass/GlassSwitch";
import { GlassInput } from "@/components/glass/GlassInput";
import { useState } from "react";

export default function DarkModePage() {
  const [darkPreview, setDarkPreview] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dark Mode</h1>
        <p className="text-lg text-muted-foreground">
          How dark mode works in Glassic UI — configuration, toggling, and system preference integration.
        </p>
      </div>

      {/* How it works */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <p className="text-muted-foreground">
          Glassic UI uses the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">class</code> strategy
          for dark mode. When the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> class
          is added to a parent element (usually <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">&lt;html&gt;</code>),
          all CSS variables switch to their dark variants automatically.
        </p>
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>Key concept:</strong> All colors are defined as HSL CSS variables in{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">:root</code> (light) and{" "}
          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">.dark</code> (dark).
          Components reference these variables — no conditional logic needed in component code.
        </div>
      </div>

      {/* CSS Variables */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Define Light & Dark Tokens</h2>
        <p className="text-muted-foreground">
          Glass tokens automatically adapt when <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> is active:
        </p>
        <CodeBlock
          filename="src/index.css"
          language="css"
          code={`:root {
  /* Light mode */
  --background: 220 25% 94%;
  --foreground: 222 84% 8%;
  --primary: 221 83% 53%;
  --glass-bg: 220 20% 100%;
  --glass-border: 220 20% 80%;
  --glass-glow: 221 83% 53%;
  --glass-shadow: 221 83% 53%;
}

.dark {
  /* Dark mode */
  --background: 225 30% 8%;
  --foreground: 210 40% 96%;
  --primary: 217 91% 60%;
  --glass-bg: 220 30% 20%;
  --glass-border: 220 20% 40%;
  --glass-glow: 217 91% 60%;
  --glass-shadow: 217 91% 60%;
}`}
        />
      </div>

      {/* Theme Provider */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. Set Up a Theme Provider</h2>
        <p className="text-muted-foreground">
          Glassic UI uses <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">next-themes</code> for
          theme management. It handles persisting the user's choice and detecting system preferences.
        </p>
        <CodeBlock
          filename="terminal"
          language="bash"
          code={`npm install next-themes`}
        />
        <CodeBlock
          filename="src/components/ThemeProvider.tsx"
          language="tsx"
          code={`import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}`}
        />
        <CodeBlock
          filename="src/App.tsx (wrap your app)"
          language="tsx"
          code={`import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
        />
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <strong>Props explained:</strong>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">attribute="class"</code> — toggles <code className="text-xs">.dark</code> on <code className="text-xs">&lt;html&gt;</code></li>
            <li>• <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">defaultTheme="system"</code> — follows OS preference on first visit</li>
            <li>• <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">enableSystem</code> — reacts to <code className="text-xs">prefers-color-scheme</code> changes</li>
          </ul>
        </div>
      </div>

      {/* Toggle Component */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. Create a Theme Toggle</h2>
        <p className="text-muted-foreground">
          Use the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">useTheme</code> hook to switch between modes:
        </p>
        <CodeBlock
          filename="src/components/ThemeToggle.tsx"
          language="tsx"
          code={`import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { GlassButton } from "@/components/glass/GlassButton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <GlassButton
      variant="glass"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </GlassButton>
  );
}`}
        />
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <ComponentPreview
          code={`import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/glass/GlassCard";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassInput } from "@/components/glass/GlassInput";
import { GlassSwitch } from "@/components/glass/GlassSwitch";

function DarkModeExample() {
  return (
    <GlassCard variant="elevated">
      <GlassCardHeader>
        <GlassCardTitle>Settings</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="space-y-4">
        <GlassInput placeholder="Search settings..." />
        <GlassSwitch label="Enable dark mode" />
        <GlassButton variant="glass-float">Save Changes</GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
}`}
        >
          <div className="w-full max-w-sm">
            <GlassCard variant="elevated">
              <GlassCardHeader>
                <GlassCardTitle>Settings</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <GlassInput placeholder="Search settings..." />
                <GlassSwitch
                  label="Enable dark mode"
                  checked={darkPreview}
                  onCheckedChange={setDarkPreview}
                />
                <GlassButton variant="glass-float">Save Changes</GlassButton>
              </GlassCardContent>
            </GlassCard>
          </div>
        </ComponentPreview>
      </div>

      {/* Manual toggle without next-themes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">4. Manual Toggle (Without next-themes)</h2>
        <p className="text-muted-foreground">
          If you prefer not to use <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">next-themes</code>, you can toggle dark mode manually:
        </p>
        <CodeBlock
          filename="src/App.tsx"
          language="tsx"
          code={`import { useState } from "react";
import { GlassSwitch } from "@/components/glass/GlassSwitch";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground p-8">
        <GlassSwitch
          label="Dark Mode"
          checked={dark}
          onCheckedChange={setDark}
        />
        {/* Rest of your app */}
      </div>
    </div>
  );
}`}
        />
      </div>

      {/* System preference */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">5. Detect System Preference</h2>
        <p className="text-muted-foreground">
          To follow the user's OS preference without any library:
        </p>
        <CodeBlock
          filename="src/hooks/useSystemTheme.ts"
          language="typescript"
          code={`import { useEffect, useState } from "react";

export function useSystemTheme() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return { isDark, setIsDark };
}`}
        />
      </div>

      {/* Glass tokens in dark mode */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Glass Tokens in Dark Mode</h2>
        <p className="text-muted-foreground">
          The glassmorphism effect adapts automatically. In dark mode, backgrounds become darker with higher noise, borders are more visible, and glows are more pronounced.
        </p>
        <div className="overflow-x-auto">
          {/* Desktop table */}
          <table className="hidden sm:table w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Token</th>
                <th className="text-left px-4 py-3 font-semibold">Light</th>
                <th className="text-left px-4 py-3 font-semibold">Dark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["--glass-bg", "220 20% 100%", "220 30% 20%"],
                ["--glass-border", "220 20% 80%", "220 20% 40%"],
                ["--glass-glow", "221 83% 53%", "217 91% 60%"],
                ["--glass-shadow", "221 83% 53%", "217 91% 60%"],
              ].map(([token, light, dark]) => (
                <tr key={token}>
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{token}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{light}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{dark}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {[
              ["--glass-bg", "220 20% 100%", "220 30% 20%"],
              ["--glass-border", "220 20% 80%", "220 20% 40%"],
              ["--glass-glow", "221 83% 53%", "217 91% 60%"],
              ["--glass-shadow", "221 83% 53%", "217 91% 60%"],
            ].map(([token, light, dark]) => (
              <div key={token} className="rounded-lg border border-border p-3 space-y-1">
                <div className="font-mono text-xs text-primary">{token}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Light: <span className="font-mono text-foreground">{light}</span></span>
                  <span className="text-muted-foreground">Dark: <span className="font-mono text-foreground">{dark}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="glass-2 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold">Dark Mode Checklist</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "CSS variables defined in both :root and .dark",
            "ThemeProvider wraps your app with attribute=\"class\"",
            "Glass tokens switch automatically — no component changes needed",
            "Toggle button accessible via keyboard (focus-visible ring)",
            "System preference detection enabled with enableSystem",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
