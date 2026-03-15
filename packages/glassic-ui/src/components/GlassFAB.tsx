import * as React from "react";
import { cn } from "../utils";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface GlassFABProps {
  icon?: React.ReactNode;
  actions?: FABAction[];
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  onClick?: () => void;
  tooltip?: string;
  className?: string;
}

export function GlassFAB({ icon, actions = [], position = "bottom-right", onClick, tooltip, className }: GlassFABProps) {
  const [expanded, setExpanded] = React.useState(false);
  const hasActions = actions.length > 0;

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  };

  const handleClick = () => {
    if (hasActions) setExpanded(!expanded);
    else onClick?.();
  };

  return (
    <div className={cn("fixed z-40", positionClasses[position], className)}>
      <AnimatePresence>
        {expanded && hasActions && (
          <div className="absolute bottom-16 right-0 flex flex-col-reverse items-end gap-2 mb-2">
            {actions.map((action, i) => (
              <motion.button key={action.label} initial={{ opacity: 0, scale: 0.3, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.3, y: 20 }} transition={{ delay: i * 0.05, duration: 0.15 }} onClick={() => { action.onClick?.(); setExpanded(false); }} className="flex items-center gap-2 group">
                <span className="px-2.5 py-1 rounded-lg glass-2 text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{action.label}</span>
                <div className="h-10 w-10 rounded-full glass-2 hover-lift flex items-center justify-center text-foreground transition-all hover:glass-glow">{action.icon}</div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
      <motion.button whileTap={{ scale: 0.92 }} onClick={handleClick} className={cn("h-14 w-14 rounded-full glass-float hover-lift flex items-center justify-center", "text-foreground transition-all hover:glass-glow focus-glow", "shadow-lg")} title={tooltip}>
        <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {expanded ? <X className="h-6 w-6" /> : (icon || <Plus className="h-6 w-6" />)}
        </motion.div>
      </motion.button>
    </div>
  );
}
