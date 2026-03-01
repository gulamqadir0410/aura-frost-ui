import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Segment {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface GlassSegmentedControlProps {
  segments: Segment[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  multiSelect?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  fullWidth?: boolean;
  compact?: boolean;
  className?: string;
}

export function GlassSegmentedControl({
  segments,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiSelect = false,
  selectedValues: controlledSelected,
  onSelectedValuesChange,
  fullWidth = false,
  compact = false,
  className,
}: GlassSegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || segments[0]?.value);
  const [internalSelected, setInternalSelected] = React.useState<string[]>(controlledSelected || []);

  const activeValue = controlledValue ?? internalValue;
  const selectedSet = new Set(controlledSelected ?? internalSelected);

  const handleClick = (seg: Segment) => {
    if (seg.disabled) return;
    if (multiSelect) {
      const next = selectedSet.has(seg.value)
        ? [...selectedSet].filter((v) => v !== seg.value)
        : [...selectedSet, seg.value];
      setInternalSelected(next);
      onSelectedValuesChange?.(next);
    } else {
      setInternalValue(seg.value);
      onValueChange?.(seg.value);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 p-1 rounded-xl glass-2",
        fullWidth && "w-full",
        className
      )}
      role="group"
    >
      {segments.map((seg) => {
        const isActive = multiSelect ? selectedSet.has(seg.value) : activeValue === seg.value;
        return (
          <button
            key={seg.value}
            onClick={() => handleClick(seg)}
            disabled={seg.disabled}
            className={cn(
              "relative flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors",
              compact ? "px-3 py-1.5" : "px-4 py-2",
              fullWidth && "flex-1",
              seg.disabled && "opacity-40 cursor-not-allowed",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segment-indicator"
                className="absolute inset-0 glass-1 rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {seg.icon}
              {seg.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
