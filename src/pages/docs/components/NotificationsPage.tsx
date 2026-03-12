import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassNotificationCenter } from "@/components/glass/GlassNotificationCenter";
import { useState } from "react";
import { MessageSquare, Star, AlertCircle, UserPlus } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  category?: string;
  icon?: React.ReactNode;
}

const initialNotifications: Notification[] = [
  { id: "1", title: "New comment on your post", description: "Alice replied to your discussion about glassmorphism design patterns.", time: "2 minutes ago", read: false, category: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "2", title: "Project starred", description: "Your Glassic UI project received a new star.", time: "15 minutes ago", read: false, category: "Activity", icon: <Star className="h-4 w-4" /> },
  { id: "3", title: "Build failed", description: "Production deployment #42 failed with 2 errors.", time: "1 hour ago", read: false, category: "Alerts", icon: <AlertCircle className="h-4 w-4" /> },
  { id: "4", title: "New team member", description: "Bob joined your team as an editor.", time: "3 hours ago", read: true, category: "Activity", icon: <UserPlus className="h-4 w-4" /> },
  { id: "5", title: "Weekly digest available", description: "Your weekly report for the component library is ready.", time: "1 day ago", read: true, category: "Messages" },
];

const notificationProps = [
  { name: "notifications", type: "Notification[]", description: "Array of notification objects" },
  { name: "onMarkRead", type: "(id: string) => void", description: "Mark a notification as read" },
  { name: "onMarkAllRead", type: "() => void", description: "Mark all notifications as read" },
  { name: "onDismiss", type: "(id: string) => void", description: "Remove/dismiss a notification" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Notification Center</h1>
        <p className="text-lg text-muted-foreground">Slide-over notification panel with categories, badges, and dismiss animations.</p>
      </div>

      <ComponentPreview
        code={`import { GlassNotificationCenter } from "@/components/glass/GlassNotificationCenter";
import { useState } from "react";
import { MessageSquare, Star, AlertCircle, UserPlus } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  category?: string;
  icon?: React.ReactNode;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New comment on your post",
    description: "Alice replied to your discussion.",
    time: "2 minutes ago",
    read: false,
    category: "Messages",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Project starred",
    description: "Your project received a new star.",
    time: "15 minutes ago",
    read: false,
    category: "Activity",
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "Build failed",
    description: "Production deployment #42 failed.",
    time: "1 hour ago",
    read: false,
    category: "Alerts",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    id: "4",
    title: "New team member",
    description: "Bob joined your team as an editor.",
    time: "3 hours ago",
    read: true,
    category: "Activity",
    icon: <UserPlus className="h-4 w-4" />,
  },
];

function Example() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  return (
    <GlassNotificationCenter
      notifications={notifications}
      onMarkRead={(id) =>
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
      }
      onMarkAllRead={() =>
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      }
      onDismiss={(id) =>
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }
    />
  );
}`}
      >
        <div className="relative flex justify-end w-full min-h-[400px]">
          <div className="relative z-10">
            <GlassNotificationCenter
              notifications={notifications}
              onMarkRead={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
              onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
              onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
            />
          </div>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Unread count badge on bell icon</li>
          <li>Category filter tabs (auto-generated from data)</li>
          <li>Mark individual or all notifications as read</li>
          <li>Dismiss with smooth exit animation</li>
          <li>Empty state illustration</li>
          <li>Glass-float panel with backdrop blur</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={notificationProps} />
      </div>
    </div>
  );
}
