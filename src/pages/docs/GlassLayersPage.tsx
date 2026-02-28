export default function GlassLayersPage() {
  const layers = [
    { name: "glass-0", blur: "none", opacity: "80%", border: "subtle", desc: "Base — no blur, solid background" },
    { name: "glass-1", blur: "10px", opacity: "45%", border: "light", desc: "Low — subtle translucency" },
    { name: "glass-2", blur: "20px", opacity: "35%", border: "medium", desc: "Medium — clear glass effect" },
    { name: "glass-3", blur: "30px", opacity: "25%", border: "strong", desc: "High — frosted glass" },
    { name: "glass-float", blur: "40px", opacity: "15%", border: "luminous", desc: "Floating — deep translucency with glow" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Glass Layer System</h1>
        <p className="text-lg text-muted-foreground">
          Five elevation levels with progressive blur, opacity, and border glow.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Elevation Levels</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium">Level</th>
                <th className="text-left px-4 py-3 font-medium">Blur</th>
                <th className="text-left px-4 py-3 font-medium">Opacity</th>
                <th className="text-left px-4 py-3 font-medium">Border</th>
              </tr>
            </thead>
            <tbody>
              {layers.map((l) => (
                <tr key={l.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{l.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.blur}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.opacity}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.border}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Visual Demo</h2>
        <div className="gradient-bg rounded-xl p-8 space-y-4">
          {layers.map((l) => (
            <div key={l.name} className={`${l.name} rounded-xl p-5`}>
              <span className="font-mono text-sm font-semibold">.{l.name}</span>
              <p className="text-sm text-muted-foreground mt-1">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
