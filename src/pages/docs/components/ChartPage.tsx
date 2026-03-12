import { ComponentPreview } from "@/components/ComponentPreview";
import { PropsTable } from "@/components/PropsTable";
import { GlassChart } from "@/components/glass/GlassChart";

const chartProps = [
  { name: "variant", type: '"area" | "bar" | "line" | "pie"', default: '"area"', description: "Chart type" },
  { name: "data", type: "any[]", description: "Custom data array" },
  { name: "title", type: "string", description: "Chart card title" },
  { name: "description", type: "string", description: "Chart card description" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function ChartPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Charts</h1>
        <p className="text-lg text-muted-foreground">Glassmorphic chart components powered by Recharts with soft blur styling.</p>
      </div>

      <ComponentPreview code={`import { GlassChart } from "@/components/glass/GlassChart";

function Example() {
  return (
    <GlassChart
      variant="area"
      title="Revenue Overview"
      description="Monthly revenue vs expenses"
    />
  );
}`}>
        <div className="w-full max-w-xl">
          <GlassChart variant="area" title="Revenue Overview" description="Monthly revenue vs expenses" />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Bar Chart</h2>
        <ComponentPreview code={`import { GlassChart } from "@/components/glass/GlassChart";

function Example() {
  return (
    <GlassChart
      variant="bar"
      title="Weekly Visitors"
      description="Daily visitor count"
    />
  );
}`}>
          <div className="w-full max-w-xl">
            <GlassChart variant="bar" title="Weekly Visitors" description="Daily visitor count" />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Line Chart</h2>
        <ComponentPreview code={`import { GlassChart } from "@/components/glass/GlassChart";

function Example() {
  return (
    <GlassChart
      variant="line"
      title="Trend Analysis"
      description="Revenue and expenses over time"
    />
  );
}`}>
          <div className="w-full max-w-xl">
            <GlassChart variant="line" title="Trend Analysis" description="Revenue and expenses over time" />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pie / Donut Chart</h2>
        <ComponentPreview code={`import { GlassChart } from "@/components/glass/GlassChart";

function Example() {
  return (
    <GlassChart
      variant="pie"
      title="Device Breakdown"
      description="Traffic by device type"
    />
  );
}`}>
          <div className="w-full max-w-md">
            <GlassChart variant="pie" title="Device Breakdown" description="Traffic by device type" />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <PropsTable props={chartProps} />
      </div>
    </div>
  );
}
