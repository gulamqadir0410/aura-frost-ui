import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassFAB } from "@/components/glass/GlassFAB";
import { Plus, Edit, Image, Share2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const fabProps = [
  { name: "icon", type: "ReactNode", default: "<Plus />", description: "Custom icon for the main button" },
  { name: "actions", type: "FABAction[]", default: "[]", description: "Expandable action items" },
  { name: "position", type: '"bottom-right" | "bottom-left" | "bottom-center"', default: '"bottom-right"', description: "Screen position" },
  { name: "onClick", type: "() => void", description: "Click handler (when no actions)" },
  { name: "tooltip", type: "string", description: "Tooltip text on hover" },
];

export default function FABPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Floating Action Button</h1>
        <p className="text-lg text-muted-foreground">Elevated glass FAB with expandable radial action menu.</p>
      </div>

      <ComponentPreview
        code={`import { GlassFAB } from "@/components/glass/GlassFAB";
import { Edit, Image, Share2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

function Example() {
  return (
    <GlassFAB
      actions={[
        {
          icon: <Edit className="h-4 w-4" />,
          label: "Edit",
          onClick: () => toast("Edit clicked"),
        },
        {
          icon: <Image className="h-4 w-4" />,
          label: "Upload",
          onClick: () => toast("Upload clicked"),
        },
        {
          icon: <Share2 className="h-4 w-4" />,
          label: "Share",
          onClick: () => toast("Share clicked"),
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          label: "Comment",
          onClick: () => toast("Comment clicked"),
        },
      ]}
      position="bottom-right"
    />
  );
}`}
      >
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden gradient-bg border border-border">
          <p className="absolute top-4 left-4 text-sm text-muted-foreground">Click the FAB in the bottom-right corner ↘</p>
          <div className="absolute bottom-6 right-6">
            <div className="relative">
              <GlassFAB
                actions={[
                  { icon: <Edit className="h-4 w-4" />, label: "Edit", onClick: () => toast("Edit clicked") },
                  { icon: <Image className="h-4 w-4" />, label: "Upload", onClick: () => toast("Upload clicked") },
                  { icon: <Share2 className="h-4 w-4" />, label: "Share", onClick: () => toast("Share clicked") },
                  { icon: <MessageSquare className="h-4 w-4" />, label: "Comment", onClick: () => toast("Comment clicked") },
                ]}
                className="!fixed !bottom-auto !right-auto relative"
              />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Expandable radial action menu with staggered animations</li>
          <li>Labels appear on hover for each action</li>
          <li>Main button morphs from + to × when expanded</li>
          <li>Glass-float elevation for maximum depth</li>
          <li>Position variants: bottom-right, bottom-left, bottom-center</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={fabProps} />
      </div>
    </div>
  );
}
