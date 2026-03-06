import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { ArrowRight, Gem, Github, Sparkles, Layers, Zap, Search, Bell, User, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassInput } from "@/components/glass/GlassInput";
import { GlassTabs } from "@/components/glass/GlassTabs";
import { GlassSwitch } from "@/components/glass/GlassSwitch";
import { GlassSegmentedControl } from "@/components/glass/GlassSegmentedControl";
import { GlassChart } from "@/components/glass/GlassChart";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const showcaseTabs = [
  { value: "examples", label: "Examples" },
  { value: "dashboard", label: "Dashboard" },
  { value: "playground", label: "Playground" },
];

const statsData = [
  { label: "Total Revenue", value: "$1,250.00", change: "+12.5%", trend: "up" as const, desc: "Trending up this month" },
  { label: "New Customers", value: "1,234", change: "-20%", trend: "down" as const, desc: "Acquisition needs attention" },
  { label: "Active Accounts", value: "45,678", change: "+12.5%", trend: "up" as const, desc: "Strong user retention" },
  { label: "Growth Rate", value: "4.5%", change: "+4.5%", trend: "up" as const, desc: "Steady performance" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("examples");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 gradient-bg" />
      <div className="fixed inset-0 bg-background/60" />

      {/* Header */}
      <header className="relative z-50 glass-1 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Gem className="h-5 w-5 text-primary" />
              <span className="font-bold">Glassic UI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {["Docs", "Components", "Charts", "Themes"].map((item) => (
                <Link
                  key={item}
                  to={item === "Docs" ? "/docs/introduction" : item === "Components" ? "/docs/components/button" : item === "Charts" ? "/docs/components/chart" : "/docs/colors"}
                  className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center glass-1 rounded-lg px-3 py-1.5 text-sm text-muted-foreground gap-2 w-48">
              <Search className="h-3.5 w-3.5" />
              <span>Search docs…</span>
            </div>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-2 mb-8 text-sm font-medium cursor-pointer hover:glass-glow transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Open Source Component Library
            <ArrowRight className="h-3 w-3" />
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The Foundation for your
            <br />
            <span>Design System</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A set of beautifully designed components that you can customize, extend,
            and build on. Start here then make it your own. Open Source. Open Code.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/docs/introduction">
              <GlassButton size="lg" className="px-8 gap-2 font-semibold">
                Get Started
              </GlassButton>
            </Link>
            <Link to="/docs/components/button">
              <Button variant="ghost" size="lg" className="px-8 gap-2 text-muted-foreground hover:text-foreground">
                View Components
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Showcase section */}
        <motion.div
          className="max-w-6xl mx-auto px-6 pb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* Tab bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              {showcaseTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.value
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.value && (
                    <motion.div layoutId="tab-underline" className="h-0.5 bg-foreground rounded-full mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Showcase content */}
          {activeTab === "examples" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Payment card */}
              <div className="md:col-span-4 glass-2 rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-1">Payment Method</h3>
                <p className="text-xs text-muted-foreground mb-4">All transactions are secure and encrypted</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block">Name on Card</label>
                    <GlassInput placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-xs font-medium mb-1.5 block">Card Number</label>
                      <GlassInput placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block">CVV</label>
                      <GlassInput placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Team card */}
              <div className="md:col-span-4 glass-2 rounded-xl border border-border p-6 flex flex-col items-center justify-center text-center">
                <div className="flex -space-x-2 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <h3 className="font-semibold mb-1">No Team Members</h3>
                <p className="text-xs text-muted-foreground mb-4">Invite your team to collaborate on this project.</p>
                <GlassButton variant="outline" size="sm">+ Invite Members</GlassButton>
              </div>

              {/* Settings card */}
              <div className="md:col-span-4 glass-2 rounded-xl border border-border p-6 space-y-4">
                <div className="glass-1 rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded-full bg-muted" />
                  <span className="text-muted-foreground">https://</span>
                </div>
                <div className="glass-1 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-factor authentication</span>
                    <GlassButton size="sm" variant="glass">Enable</GlassButton>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">Profile verified</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GlassSwitch />
                  <span className="text-xs text-muted-foreground">I agree to the terms</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat) => (
                  <div key={stat.label} className="glass-2 rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.trend === "up" ? "text-primary" : "text-destructive"}`}>
                        {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                  </div>
                ))}
              </div>
              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <GlassChart variant="area" title="Revenue Overview" description="Monthly revenue vs expenses" />
                <GlassChart variant="bar" title="Weekly Visitors" description="Daily visitor breakdown" />
              </div>
            </div>
          )}

          {activeTab === "playground" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buttons */}
              <div className="glass-2 rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold text-sm">Buttons</h3>
                <div className="flex flex-wrap gap-2">
                  <GlassButton>Default</GlassButton>
                  <GlassButton variant="glass">Glass</GlassButton>
                  <GlassButton variant="outline">Outline</GlassButton>
                  <GlassButton variant="ghost">Ghost</GlassButton>
                  <GlassButton variant="destructive">Destructive</GlassButton>
                </div>
              </div>

              {/* Segmented + Switch */}
              <div className="glass-2 rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold text-sm">Controls</h3>
                <GlassSegmentedControl
                  segments={[
                    { value: "overview", label: "Overview" },
                    { value: "analytics", label: "Analytics" },
                    { value: "reports", label: "Reports" },
                  ]}
                />
                <div className="flex items-center gap-3">
                  <GlassSwitch label="Dark mode" />
                  <GlassSwitch label="Notifications" defaultChecked />
                </div>
              </div>

              {/* Inputs */}
              <div className="glass-2 rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold text-sm">Inputs</h3>
                <GlassInput placeholder="Search components…" />
                <GlassInput placeholder="Enter your email" type="email" />
              </div>

              {/* Chart */}
              <GlassChart variant="pie" title="Device Breakdown" description="Traffic by device type" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
