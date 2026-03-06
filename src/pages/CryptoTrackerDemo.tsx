import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gem, ArrowUpRight, ArrowDownRight, TrendingUp, Search, Bell, Star, RefreshCw,
  ChevronRight, Wallet, Shield, Zap, Globe,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassInput } from "@/components/glass/GlassInput";
import { GlassTabs } from "@/components/glass/GlassTabs";
import { GlassSwitch } from "@/components/glass/GlassSwitch";
import { GlassSegmentedControl } from "@/components/glass/GlassSegmentedControl";
import { GlassChart } from "@/components/glass/GlassChart";

const coins = [
  { name: "Bitcoin", symbol: "BTC", price: "67,432.18", change: "+3.24%", up: true, mcap: "$1.32T", icon: "₿" },
  { name: "Ethereum", symbol: "ETH", price: "3,521.90", change: "+1.87%", up: true, mcap: "$423B", icon: "Ξ" },
  { name: "Solana", symbol: "SOL", price: "178.45", change: "-2.15%", up: false, mcap: "$82B", icon: "◎" },
  { name: "Cardano", symbol: "ADA", price: "0.6821", change: "+5.42%", up: true, mcap: "$24B", icon: "₳" },
  { name: "Avalanche", symbol: "AVAX", price: "42.17", change: "-0.93%", up: false, mcap: "$16B", icon: "▲" },
  { name: "Polkadot", symbol: "DOT", price: "8.94", change: "+2.11%", up: true, mcap: "$12B", icon: "●" },
];

const portfolioStats = [
  { label: "Total Balance", value: "$124,832.45", change: "+$3,241.20", up: true },
  { label: "24h P&L", value: "+$1,847.30", change: "+1.5%", up: true },
  { label: "Best Performer", value: "ADA +5.42%", change: "Today", up: true },
  { label: "Total Assets", value: "12 Coins", change: "3 Networks", up: true },
];

const tabs = [
  { value: "market", label: "Market" },
  { value: "portfolio", label: "Portfolio" },
  { value: "watchlist", label: "Watchlist" },
];

export default function CryptoTrackerDemo() {
  const [activeTab, setActiveTab] = useState("market");
  const [timeframe, setTimeframe] = useState("24h");

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 gradient-bg" />
      <div className="fixed inset-0 bg-background/60" />

      {/* Header */}
      <header className="relative z-50 glass-1 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-bold">CryptoVault</span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {["Markets", "Trade", "Earn", "NFTs"].map((item) => (
                <button key={item} className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center glass-1 rounded-lg px-3 py-1.5 text-sm text-muted-foreground gap-2 w-48">
              <Search className="h-3.5 w-3.5" />
              <span>Search coins…</span>
            </div>
            <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </button>
            <ThemeToggle />
            <GlassButton size="sm" className="hidden sm:flex gap-1">
              <Wallet className="h-3.5 w-3.5" /> Connect
            </GlassButton>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {portfolioStats.map((stat) => (
            <div key={stat.label} className="glass-2 rounded-xl border border-border p-5">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
              <span className={`text-xs font-medium flex items-center gap-0.5 mt-1 ${stat.up ? "text-emerald-500" : "text-red-400"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Tabs + Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.value ? "text-foreground bg-accent/50" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <GlassSegmentedControl
            segments={[
              { value: "1h", label: "1H" },
              { value: "24h", label: "24H" },
              { value: "7d", label: "7D" },
              { value: "30d", label: "30D" },
            ]}
            defaultValue="24h"
            onValueChange={setTimeframe}
          />
        </div>

        {activeTab === "market" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Chart + Coin List */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Chart */}
              <div className="lg:col-span-3">
                <GlassChart variant="area" title="Bitcoin (BTC)" description={`Price chart — ${timeframe}`} />
              </div>

              {/* Coin List */}
              <div className="lg:col-span-2 glass-2 rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Top Coins</h3>
                  <button className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors">
                    <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-1">
                  {coins.map((coin) => (
                    <div key={coin.symbol} className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full glass-1 flex items-center justify-center text-sm font-bold">
                          {coin.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{coin.name}</div>
                          <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${coin.price}</div>
                        <div className={`text-xs font-medium flex items-center justify-end gap-0.5 ${coin.up ? "text-emerald-500" : "text-red-400"}`}>
                          {coin.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {coin.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <GlassChart variant="bar" title="Trading Volume" description="24h volume by exchange" />
              <GlassChart variant="pie" title="Portfolio Allocation" description="Distribution by asset" />
            </div>
          </motion.div>
        )}

        {activeTab === "portfolio" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Holdings */}
              <div className="lg:col-span-2 glass-2 rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Your Holdings</h3>
                <div className="space-y-3">
                  {coins.slice(0, 4).map((coin, i) => (
                    <div key={coin.symbol} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full glass-1 flex items-center justify-center text-lg font-bold">
                          {coin.icon}
                        </div>
                        <div>
                          <div className="font-medium">{coin.name}</div>
                          <div className="text-xs text-muted-foreground">{(Math.random() * 5).toFixed(4)} {coin.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(parseFloat(coin.price.replace(",", "")) * Math.random() * 5).toFixed(2)}</div>
                        <div className={`text-xs font-medium ${coin.up ? "text-emerald-500" : "text-red-400"}`}>
                          {coin.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="glass-2 rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-semibold">Quick Trade</h3>
                  <GlassInput placeholder="Amount in USD" type="number" />
                  <GlassSegmentedControl
                    segments={[
                      { value: "buy", label: "Buy" },
                      { value: "sell", label: "Sell" },
                    ]}
                    defaultValue="buy"
                  />
                  <GlassButton className="w-full">Execute Trade</GlassButton>
                </div>
                <div className="glass-2 rounded-xl border border-border p-6 space-y-3">
                  <h3 className="font-semibold text-sm">Settings</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price Alerts</span>
                    <GlassSwitch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Auto-Rebalance</span>
                    <GlassSwitch />
                  </div>
                </div>
              </div>
            </div>

            <GlassChart variant="area" title="Portfolio Performance" description="30-day portfolio value" />
          </motion.div>
        )}

        {activeTab === "watchlist" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <GlassInput placeholder="Search coins to add…" className="max-w-sm" />
              <GlassButton variant="outline" size="sm" className="gap-1">
                <Star className="h-3.5 w-3.5" /> Add
              </GlassButton>
            </div>
            <div className="glass-2 rounded-xl border border-border overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-5 gap-4 px-6 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Coin</span>
                <span className="text-right">Price</span>
                <span className="text-right">24h Change</span>
                <span className="text-right">Market Cap</span>
                <span className="text-right">Action</span>
              </div>
              {coins.map((coin) => (
                <div key={coin.symbol} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-accent/20 transition-colors items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full glass-1 flex items-center justify-center text-sm font-bold">{coin.icon}</div>
                    <div>
                      <div className="text-sm font-medium">{coin.name}</div>
                      <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium">${coin.price}</div>
                  <div className={`text-right text-sm font-medium ${coin.up ? "text-emerald-500" : "text-red-400"}`}>{coin.change}</div>
                  <div className="text-right text-sm text-muted-foreground">{coin.mcap}</div>
                  <div className="text-right">
                    <GlassButton size="sm" variant="outline">Trade</GlassButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {[
            { icon: Shield, title: "Bank-Grade Security", desc: "Enterprise-level encryption and cold storage" },
            { icon: Zap, title: "Instant Execution", desc: "Sub-second trade execution across markets" },
            { icon: Globe, title: "Global Markets", desc: "Access 200+ coins across all major exchanges" },
          ].map((f) => (
            <div key={f.title} className="glass-2 rounded-xl border border-border p-5 text-center">
              <div className="h-10 w-10 rounded-full glass-1 flex items-center justify-center mx-auto mb-3">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-xs text-muted-foreground">
          <p>
            Built with{" "}
            <Link to="/" className="text-primary hover:underline font-medium">Glassic UI</Link>
            {" "}— Glassmorphic Component Library
          </p>
        </footer>
      </div>
    </div>
  );
}
