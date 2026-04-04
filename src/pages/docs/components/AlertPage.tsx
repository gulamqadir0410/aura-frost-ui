import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassAlert } from "@/components/glass/GlassAlert";
import { useState } from "react";

const alertProps = [
  { name: "variant", type: '"default" | "info" | "success" | "warning" | "destructive"', default: '"default"', description: "The visual style of the alert" },
  { name: "title", type: "string", description: "Optional title displayed above the description" },
  { name: "dismissible", type: "boolean", default: "false", description: "Shows a dismiss button" },
  { name: "onDismiss", type: "() => void", description: "Callback when dismiss button is clicked" },
  { name: "icon", type: "React.ReactNode", description: "Custom icon to override the default" },
];

export default function AlertPage() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Alert</h1>
        <p className="text-lg text-muted-foreground">
          Glass-styled alert banners for contextual feedback messages.
        </p>
      </div>

      <ComponentPreview
        code={`import { GlassAlert } from "@/components/glass/GlassAlert";

function Example() {
  return (
    <div className="space-y-3 w-full">
      <GlassAlert variant="default" title="Heads up!">
        You can add components using the CLI.
      </GlassAlert>
      <GlassAlert variant="info" title="Info">
        This is an informational alert.
      </GlassAlert>
      <GlassAlert variant="success" title="Success">
        Your changes have been saved.
      </GlassAlert>
      <GlassAlert variant="warning" title="Warning">
        Please check your input before continuing.
      </GlassAlert>
      <GlassAlert variant="destructive" title="Error">
        Something went wrong. Please try again.
      </GlassAlert>
    </div>
  );
}`}
      >
        <div className="space-y-3 w-full">
          <GlassAlert variant="default" title="Heads up!">
            You can add components using the CLI.
          </GlassAlert>
          <GlassAlert variant="info" title="Info">
            This is an informational alert.
          </GlassAlert>
          <GlassAlert variant="success" title="Success">
            Your changes have been saved.
          </GlassAlert>
          <GlassAlert variant="warning" title="Warning">
            Please check your input before continuing.
          </GlassAlert>
          <GlassAlert variant="destructive" title="Error">
            Something went wrong. Please try again.
          </GlassAlert>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dismissible</h2>
        <ComponentPreview
          code={`import { GlassAlert } from "@/components/glass/GlassAlert";

function Example() {
  const [show, setShow] = useState(true);
  return show ? (
    <GlassAlert variant="info" title="Dismissible Alert" dismissible onDismiss={() => setShow(false)}>
      Click the X to dismiss this alert.
    </GlassAlert>
  ) : (
    <button onClick={() => setShow(true)}>Show Alert</button>
  );
}`}
        >
          <div className="w-full">
            {showDismissible ? (
              <GlassAlert
                variant="info"
                title="Dismissible Alert"
                dismissible
                onDismiss={() => setShowDismissible(false)}
              >
                Click the X to dismiss this alert.
              </GlassAlert>
            ) : (
              <button
                onClick={() => setShowDismissible(true)}
                className="text-sm text-primary hover:underline"
              >
                Show Alert Again
              </button>
            )}
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Toast Notifications (Sonner)</h2>
        <p className="text-sm text-muted-foreground">
          For ephemeral notifications, Glassic UI uses <code className="text-primary font-mono text-xs">sonner</code> —
          a lightweight toast library. Alerts are for persistent inline messages, while toasts are for temporary feedback.
        </p>
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground space-y-2">
          <p><strong>Alert vs Toast:</strong></p>
          <ul className="space-y-1 ml-4">
            <li>• <strong>GlassAlert</strong> — inline, persistent, part of layout (form errors, info banners)</li>
            <li>• <strong>Sonner toast</strong> — floating, auto-dismiss, triggered by actions (save success, error feedback)</li>
          </ul>
          <p className="mt-2">
            See the <a href="/docs/components/toast" className="text-primary hover:underline">Toast docs</a> for Sonner usage.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={alertProps} />
      </div>
    </div>
  );
}
