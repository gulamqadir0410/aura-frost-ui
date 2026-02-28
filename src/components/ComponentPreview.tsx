import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

export function ComponentPreview({ children, code, className }: ComponentPreviewProps) {
  const [view, setView] = useState<"preview" | "code">("preview");

  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-muted/30">
        <button
          onClick={() => setView("preview")}
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
            view === "preview"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setView("code")}
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
            view === "code"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Code
        </button>
      </div>
      {view === "preview" ? (
        <div className="p-8 flex items-center justify-center min-h-[200px] gradient-bg">
          {children}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
}
