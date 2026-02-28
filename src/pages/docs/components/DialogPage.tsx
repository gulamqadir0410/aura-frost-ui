import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import {
  GlassDialog,
  GlassDialogTrigger,
  GlassDialogContent,
  GlassDialogHeader,
  GlassDialogTitle,
  GlassDialogDescription,
} from "@/components/glass/GlassDialog";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassInput } from "@/components/glass/GlassInput";

export default function DialogPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dialog</h1>
        <p className="text-lg text-muted-foreground">Glass-styled modal dialog with depth layering.</p>
      </div>

      <ComponentPreview
        code={`<GlassDialog>
  <GlassDialogTrigger asChild>
    <GlassButton>Open Dialog</GlassButton>
  </GlassDialogTrigger>
  <GlassDialogContent>
    <GlassDialogHeader>
      <GlassDialogTitle>Glass Dialog</GlassDialogTitle>
      <GlassDialogDescription>
        A translucent dialog with depth layering.
      </GlassDialogDescription>
    </GlassDialogHeader>
    <GlassInput placeholder="Enter something..." />
    <GlassButton variant="solid">Submit</GlassButton>
  </GlassDialogContent>
</GlassDialog>`}
      >
        <GlassDialog>
          <GlassDialogTrigger asChild>
            <GlassButton>Open Dialog</GlassButton>
          </GlassDialogTrigger>
          <GlassDialogContent>
            <GlassDialogHeader>
              <GlassDialogTitle>Glass Dialog</GlassDialogTitle>
              <GlassDialogDescription>
                A translucent dialog with frosted glass background and depth layering.
              </GlassDialogDescription>
            </GlassDialogHeader>
            <div className="space-y-3">
              <GlassInput placeholder="Enter your name..." />
              <GlassInput type="email" placeholder="Enter your email..." />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <GlassButton variant="ghost">Cancel</GlassButton>
              <GlassButton variant="solid">Submit</GlassButton>
            </div>
          </GlassDialogContent>
        </GlassDialog>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable
          props={[
            { name: "open", type: "boolean", description: "Controlled open state" },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
          ]}
        />
      </div>
    </div>
  );
}
