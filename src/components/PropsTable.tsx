interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 font-medium text-foreground">Prop</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Type</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Default</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-primary">{prop.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground break-all">{prop.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {props.map((prop) => (
          <div key={prop.name} className="rounded-lg border border-border p-3 space-y-1.5">
            <div className="font-mono text-xs text-primary font-medium">{prop.name}</div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Type: </span>
              <span className="font-mono break-all">{prop.type}</span>
            </div>
            {prop.default && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Default: </span>
                <span className="font-mono">{prop.default}</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground">{prop.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
