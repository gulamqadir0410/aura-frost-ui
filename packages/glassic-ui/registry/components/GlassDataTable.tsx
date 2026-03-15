import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Check, Loader2, Eye, EyeOff } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  hidden?: boolean;
}

interface GlassDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  selectable?: boolean;
  expandable?: (row: T) => React.ReactNode;
  pageSize?: number;
  stickyHeader?: boolean;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  emptyMessage?: string;
}

function GlassDataTableInner<T extends Record<string, any>>(
  {
    columns: allColumns,
    data,
    loading = false,
    selectable = false,
    expandable,
    pageSize = 10,
    stickyHeader = false,
    onRowClick,
    className,
    emptyMessage = "No results found.",
  }: GlassDataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [expanded, setExpanded] = React.useState<Set<number>>(new Set());
  const [hiddenCols, setHiddenCols] = React.useState<Set<string>>(
    new Set(allColumns.filter((c) => c.hidden).map((c) => c.key))
  );

  const columns = allColumns.filter((c) => !hiddenCols.has(c.key));

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleSelect = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((_, i) => page * pageSize + i)));
  };

  const toggleExpand = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div ref={ref} className={cn("rounded-xl glass-2 border border-border overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={cn("border-b border-border bg-muted/20", stickyHeader && "sticky top-0 z-10 glass-2")}>
              {selectable && (
                <th className="w-10 px-3 py-3">
                  <button onClick={toggleAll} className="flex items-center justify-center h-4 w-4 rounded border border-border hover:border-primary transition-colors">
                    {selected.size === paged.length && paged.length > 0 && <Check className="h-3 w-3 text-primary" />}
                  </button>
                </th>
              )}
              {expandable && <th className="w-10" />}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn("px-4 py-3 text-left font-medium text-muted-foreground", col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors")}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && <SortIcon col={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  {selectable && <td className="px-3 py-3"><div className="h-4 w-4 rounded bg-muted animate-pulse" /></td>}
                  {expandable && <td />}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3"><div className="h-4 w-24 rounded bg-muted animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)} className="px-4 py-12 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => {
                const globalIdx = page * pageSize + i;
                const isSelected = selected.has(globalIdx);
                const isExpanded = expanded.has(globalIdx);
                return (
                  <React.Fragment key={globalIdx}>
                    <tr
                      className={cn(
                        "border-b border-border/50 transition-colors",
                        isSelected && "bg-primary/5",
                        onRowClick && "cursor-pointer hover:bg-accent/30"
                      )}
                      onClick={() => onRowClick?.(row, globalIdx)}
                    >
                      {selectable && (
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => toggleSelect(globalIdx)} className={cn("flex items-center justify-center h-4 w-4 rounded border transition-colors", isSelected ? "border-primary bg-primary" : "border-border hover:border-primary")}>
                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </button>
                        </td>
                      )}
                      {expandable && (
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => toggleExpand(globalIdx)} className="text-muted-foreground hover:text-foreground transition-colors">
                            <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                          </button>
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3 text-foreground/90">
                          {col.render ? col.render(row[col.key], row, globalIdx) : String(row[col.key] ?? "")}
                        </td>
                      ))}
                    </tr>
                    {expandable && isExpanded && (
                      <tr className="bg-muted/10">
                        <td colSpan={columns.length + (selectable ? 1 : 0) + 1} className="px-6 py-4">
                          {expandable(row)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {selected.size > 0 ? `${selected.size} selected · ` : ""}
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const GlassDataTable = React.forwardRef(GlassDataTableInner) as <T extends Record<string, any>>(
  props: GlassDataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export { GlassDataTable };
export type { GlassDataTableProps };
