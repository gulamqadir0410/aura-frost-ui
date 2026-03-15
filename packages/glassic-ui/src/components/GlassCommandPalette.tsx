import * as React from "react";
import { cn } from "../utils";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect?: () => void;
  keywords?: string[];
}

interface GlassCommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items?: CommandItem[];
  placeholder?: string;
  recentIds?: string[];
  loading?: boolean;
  className?: string;
}

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let qi = 0;
  let lastIdx = 0;
  for (let i = 0; i < text.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) {
      if (i > lastIdx) parts.push(text.slice(lastIdx, i));
      parts.push(<mark key={i} className="bg-primary/20 text-foreground rounded-sm px-0.5">{text[i]}</mark>);
      lastIdx = i + 1;
      qi++;
    }
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return <>{parts}</>;
}

export function GlassCommandPalette({ open: controlledOpen, onOpenChange, items = [], placeholder = "Search commands...", recentIds = [], loading = false, className }: GlassCommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(!isOpen); }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen]);

  React.useEffect(() => {
    if (isOpen) { setQuery(""); setSelectedIndex(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [isOpen]);

  const filtered = React.useMemo(() => {
    if (!query) return items;
    return items.filter((item) => fuzzyMatch(item.label, query) || (item.description && fuzzyMatch(item.description, query)) || item.keywords?.some((k) => fuzzyMatch(k, query)));
  }, [items, query]);

  const grouped = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    const recent = filtered.filter((i) => recentIds.includes(i.id));
    if (recent.length > 0 && !query) groups["Recent"] = recent;
    filtered.forEach((item) => {
      const cat = item.category || "Commands";
      if (!groups[cat]) groups[cat] = [];
      if (!recent.includes(item) || query) { if (!groups[cat].includes(item)) groups[cat].push(item); }
    });
    return groups;
  }, [filtered, recentIds, query]);

  const flatItems = Object.values(grouped).flat();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && flatItems[selectedIndex]) { flatItems[selectedIndex].onSelect?.(); setOpen(false); }
  };

  let flatIdx = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.15 }} className={cn("fixed left-1/2 top-[20%] -translate-x-1/2 z-50 w-full max-w-lg", "glass-float rounded-2xl border border-border overflow-hidden", className)}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }} onKeyDown={handleKeyDown} placeholder={placeholder} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              {loading && <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border px-1.5 text-[10px] font-medium text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1.5">
              {flatItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">{query ? "No results found." : "Start typing to search..."}</div>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group}>
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                      {group === "Recent" && <Clock className="h-3 w-3" />}{group}
                    </div>
                    {groupItems.map((item) => {
                      const idx = flatIdx++;
                      return (
                        <button key={item.id} onClick={() => { item.onSelect?.(); setOpen(false); }} onMouseEnter={() => setSelectedIndex(idx)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left", idx === selectedIndex ? "bg-accent/50 text-foreground" : "text-foreground/80 hover:bg-accent/30")}>
                          {item.icon && <span className="shrink-0 text-muted-foreground">{item.icon}</span>}
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{highlightMatch(item.label, query)}</div>
                            {item.description && <div className="text-xs text-muted-foreground truncate">{item.description}</div>}
                          </div>
                          {idx === selectedIndex && <CornerDownLeft className="h-3 w-3 text-muted-foreground shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><ArrowUp className="h-2.5 w-2.5" /><ArrowDown className="h-2.5 w-2.5" /> Navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft className="h-2.5 w-2.5" /> Select</span>
              <span className="flex items-center gap-1">ESC Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
