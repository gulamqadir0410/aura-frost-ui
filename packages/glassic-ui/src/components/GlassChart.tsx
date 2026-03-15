import * as React from "react";
import { cn } from "../utils";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const areaData = [
  { name: "Jan", value: 400, value2: 240 },
  { name: "Feb", value: 300, value2: 320 },
  { name: "Mar", value: 520, value2: 280 },
  { name: "Apr", value: 480, value2: 390 },
  { name: "May", value: 600, value2: 420 },
  { name: "Jun", value: 580, value2: 500 },
  { name: "Jul", value: 700, value2: 550 },
];

const barData = [
  { name: "Mon", value: 65 }, { name: "Tue", value: 80 }, { name: "Wed", value: 45 },
  { name: "Thu", value: 90 }, { name: "Fri", value: 70 }, { name: "Sat", value: 55 }, { name: "Sun", value: 40 },
];

const pieData = [
  { name: "Desktop", value: 45 }, { name: "Mobile", value: 35 }, { name: "Tablet", value: 20 },
];

const GLASS_COLORS = ["hsl(221, 83%, 53%)", "hsl(262, 83%, 58%)", "hsl(330, 81%, 60%)", "hsl(174, 70%, 45%)"];

function GlassTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-3 rounded-lg px-3 py-2 text-xs border border-border">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: entry.color }} />
          {entry.name}: <span className="font-medium text-foreground">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

interface GlassChartProps {
  variant?: "area" | "bar" | "line" | "pie";
  data?: any[];
  className?: string;
  title?: string;
  description?: string;
}

export function GlassChart({ variant = "area", data, className, title, description }: GlassChartProps) {
  const chartData = data || (variant === "pie" ? pieData : variant === "bar" ? barData : areaData);

  const renderChart = () => {
    switch (variant) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="glassGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GLASS_COLORS[0]} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={GLASS_COLORS[0]} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="glassGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GLASS_COLORS[1]} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={GLASS_COLORS[1]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<GlassTooltipContent />} />
              <Area type="monotone" dataKey="value" stroke={GLASS_COLORS[0]} fill="url(#glassGrad1)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="value2" stroke={GLASS_COLORS[1]} fill="url(#glassGrad2)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<GlassTooltipContent />} />
              <Bar dataKey="value" fill={GLASS_COLORS[0]} radius={[6, 6, 0, 0]} name="Visitors" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<GlassTooltipContent />} />
              <Line type="monotone" dataKey="value" stroke={GLASS_COLORS[0]} strokeWidth={2.5} dot={{ fill: GLASS_COLORS[0], r: 4 }} name="Revenue" />
              <Line type="monotone" dataKey="value2" stroke={GLASS_COLORS[1]} strokeWidth={2.5} dot={{ fill: GLASS_COLORS[1], r: 4 }} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Tooltip content={<GlassTooltipContent />} />
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" strokeWidth={0}>
                {chartData.map((_: any, i: number) => (
                  <Cell key={i} fill={GLASS_COLORS[i % GLASS_COLORS.length]} fillOpacity={0.8} />
                ))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={cn("glass-2 rounded-xl p-5", className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h4 className="text-sm font-semibold">{title}</h4>}
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      )}
      {renderChart()}
    </div>
  );
}
