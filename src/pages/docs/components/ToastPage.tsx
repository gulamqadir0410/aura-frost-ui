import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassButton } from "@/components/glass/GlassButton";
import { toast } from "sonner";

const toastExamples = [
  { name: "notifications", type: "Notification[]", description: "Array of notification objects with title, description, time, read, category" },
];

export default function ToastPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Toast</h1>
        <p className="text-lg text-muted-foreground">Floating glass-styled notifications powered by Sonner.</p>
      </div>

      <ComponentPreview
        code={`import { toast } from "sonner";

toast("Event has been created");
toast.success("Successfully saved!");
toast.error("Something went wrong");
toast.warning("Please check your input");
toast("Custom action", {
  action: { label: "Undo", onClick: () => {} },
});`}
      >
        <div className="flex flex-wrap gap-3">
          <GlassButton variant="glass" onClick={() => toast("Event has been created")}>
            Default Toast
          </GlassButton>
          <GlassButton variant="glass" onClick={() => toast.success("Successfully saved!")}>
            Success
          </GlassButton>
          <GlassButton variant="glass" onClick={() => toast.error("Something went wrong")}>
            Error
          </GlassButton>
          <GlassButton variant="glass" onClick={() => toast.warning("Please check your input")}>
            Warning
          </GlassButton>
          <GlassButton variant="glass" onClick={() => toast("File uploaded", {
            description: "Your document has been saved to the cloud.",
            action: { label: "Undo", onClick: () => toast("Undone!") },
          })}>
            With Action
          </GlassButton>
          <GlassButton variant="glass" onClick={() => {
            const id = toast.loading("Uploading...");
            setTimeout(() => toast.success("Done!", { id }), 2000);
          }}>
            Loading → Success
          </GlassButton>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <p className="text-sm text-muted-foreground">
          Glassic UI uses <code className="text-primary">sonner</code> for toast notifications. Import <code className="text-primary">toast</code> from sonner and call it anywhere in your app. The <code className="text-primary">{`<Sonner />`}</code> component is already mounted in the app root.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={[
          { name: "toast(message)", type: "function", description: "Show a default toast" },
          { name: "toast.success(message)", type: "function", description: "Show a success toast" },
          { name: "toast.error(message)", type: "function", description: "Show an error toast" },
          { name: "toast.warning(message)", type: "function", description: "Show a warning toast" },
          { name: "toast.loading(message)", type: "function", description: "Show a loading toast (returns ID for updating)" },
          { name: "description", type: "string", description: "Secondary text below the title" },
          { name: "action", type: "{ label, onClick }", description: "Action button in the toast" },
          { name: "duration", type: "number", default: "4000", description: "Auto-dismiss time in ms" },
        ]} />
      </div>
    </div>
  );
}
