export default function ColorsPage() {
  const tokens = [
    { name: "--glass-bg", light: "0 0% 100%", dark: "0 0% 100%", desc: "Glass background base" },
    { name: "--glass-border", light: "0 0% 100%", dark: "0 0% 100%", desc: "Glass border tint" },
    { name: "--glass-glow", light: "221 83% 53%", dark: "217 91% 60%", desc: "Focus/hover glow" },
    { name: "--glass-shadow", light: "221 83% 53%", dark: "217 91% 60%", desc: "Drop shadow tint" },
    { name: "--primary", light: "221 83% 53%", dark: "217 91% 60%", desc: "Brand accent" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Color System</h1>
        <p className="text-lg text-muted-foreground">
          HSL-based tokens that adapt between light and dark themes.
        </p>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 font-medium">Token</th>
              <th className="text-left px-4 py-3 font-medium">Light</th>
              <th className="text-left px-4 py-3 font-medium">Dark</th>
              <th className="text-left px-4 py-3 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-primary">{t.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.light}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.dark}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Gradient Tokens</h2>
        <div className="gradient-bg-vivid rounded-xl p-8 text-white text-center">
          <p className="font-semibold text-lg">gradient-bg-vivid</p>
          <p className="text-sm opacity-80 mt-1">Uses --gradient-start, --gradient-mid, --gradient-end</p>
        </div>
        <div className="gradient-bg rounded-xl p-8 text-center">
          <p className="font-semibold text-lg">gradient-bg</p>
          <p className="text-sm text-muted-foreground mt-1">Subtle version at 10-15% opacity</p>
        </div>
      </div>
    </div>
  );
}
