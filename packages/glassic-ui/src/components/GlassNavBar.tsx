import * as React from "react";
import { cn } from "../utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface GlassNavBarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  items?: NavItem[];
  sticky?: boolean;
  transparent?: boolean;
  scrollAware?: boolean;
  actions?: React.ReactNode;
}

const GlassNavBar = React.forwardRef<HTMLElement, GlassNavBarProps>(
  ({ className, brand, items = [], sticky = true, transparent = false, scrollAware = false, actions, children, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (!scrollAware) return;
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollAware]);

    const showSolid = scrollAware ? scrolled : !transparent;

    return (
      <>
        <nav
          ref={ref}
          className={cn(
            "w-full z-50 transition-all duration-300",
            sticky && "sticky top-0",
            showSolid ? "glass-2 border-b border-border" : "bg-transparent",
            className
          )}
          {...props}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0 font-bold text-lg">{brand}</div>
              <div className="hidden md:flex items-center gap-1">
                {items.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setActiveMenu(item.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <a
                      href={item.href || "#"}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.label}
                    </a>
                    <AnimatePresence>
                      {item.children && activeMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 min-w-[200px] glass-3 rounded-xl p-2 border border-border"
                        >
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href || "#"}
                              className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                            >
                              {child.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {actions}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden border-t border-border"
              >
                <div className="px-4 py-3 space-y-1">
                  {items.map((item) => (
                    <React.Fragment key={item.label}>
                      <a
                        href={item.href || "#"}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      >
                        {item.label}
                      </a>
                      {item.children?.map((child) => (
                        <a
                          key={child.label}
                          href={child.href || "#"}
                          className="block pl-6 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        {children}
      </>
    );
  }
);
GlassNavBar.displayName = "GlassNavBar";

export { GlassNavBar };
