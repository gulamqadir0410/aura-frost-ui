import * as React from "react";
import { cn } from "@/lib/utils";
import { Bell, X, Check, CheckCheck, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  category?: string;
  icon?: React.ReactNode;
}

interface GlassNotificationCenterProps {
  notifications?: Notification[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function GlassNotificationCenter({
  notifications: externalNotifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  className,
}: GlassNotificationCenterProps) {
  const [open, setOpen] = React.useState(false);
  const [internalNotifications, setInternalNotifications] = React.useState<Notification[]>(
    externalNotifications || []
  );
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const notifications = externalNotifications ?? internalNotifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const categories = React.useMemo(() => {
    const cats = new Set(notifications.map((n) => n.category || "General"));
    return ["All", ...cats];
  }, [notifications]);

  const filtered = activeCategory === "All"
    ? notifications
    : notifications.filter((n) => (n.category || "General") === activeCategory);

  const handleMarkRead = (id: string) => {
    if (onMarkRead) onMarkRead(id);
    else setInternalNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    if (onMarkAllRead) onMarkAllRead();
    else setInternalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDismiss = (id: string) => {
    if (onDismiss) onDismiss(id);
    else setInternalNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-[380px] max-h-[500px] z-50 glass-float rounded-2xl border border-border overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      title="Mark all as read"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Category tabs */}
              {categories.length > 2 && (
                <div className="flex gap-1 px-3 py-2 border-b border-border overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Notifications list */}
              <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Inbox className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-sm">No notifications</span>
                  </div>
                ) : (
                  <div className="py-1">
                    {filtered.map((notification) => (
                      <motion.div
                        key={notification.id}
                        layout
                        exit={{ opacity: 0, x: 50 }}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 hover:bg-accent/30 transition-colors group",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        {/* Unread indicator */}
                        <div className="mt-1.5 shrink-0">
                          {!notification.read ? (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-transparent" />
                          )}
                        </div>

                        {notification.icon && (
                          <div className="mt-0.5 shrink-0 text-muted-foreground">
                            {notification.icon}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{notification.title}</div>
                          {notification.description && (
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.description}</div>
                          )}
                          {notification.time && (
                            <div className="text-[10px] text-muted-foreground/60 mt-1">{notification.time}</div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkRead(notification.id)}
                              className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                              title="Mark as read"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDismiss(notification.id)}
                            className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                            title="Dismiss"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
