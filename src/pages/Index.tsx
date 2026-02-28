import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Github, Sparkles, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  { delay: 0, x: "10%", y: "20%", rotate: -6 },
  { delay: 1, x: "70%", y: "15%", rotate: 4 },
  { delay: 2, x: "60%", y: "60%", rotate: -3 },
  { delay: 0.5, x: "20%", y: "65%", rotate: 8 },
];

export default function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 gradient-bg" />
      <div className="fixed inset-0 bg-background/60" />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Liquid Glass UI</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Floating glass decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-2xl glass-2"
            style={{ left: card.x, top: card.y, rotate: card.rotate }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6">
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-2 mb-8 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Inspired by Apple's design language
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="bg-clip-text text-transparent gradient-bg-vivid">
              Liquid Glass
            </span>
            <br />
            <span className="text-foreground">UI Components</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            A glassmorphism-inspired component library built on shadcn/ui. 
            Translucent, layered, and depth-aware.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs/introduction">
              <Button size="lg" className="glass-float text-foreground hover:glass-glow transition-all px-8 gap-2 font-semibold">
                Browse Components
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs/installation">
              <Button variant="outline" size="lg" className="glass-1 px-8 gap-2">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20 max-w-2xl w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { icon: Layers, title: "5 Glass Layers", desc: "Elevation-based blur & opacity system" },
            { icon: Sparkles, title: "15+ Components", desc: "Copy-paste ready glass components" },
            { icon: Zap, title: "Dark & Light", desc: "Adaptive tokens for both themes" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-2 rounded-xl p-5 hover-lift text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
