# Glassic UI

A production-ready glassmorphic component library built on React, Radix UI, and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/glassic-ui.svg)](https://www.npmjs.com/package/glassic-ui)
[![license](https://img.shields.io/npm/l/glassic-ui.svg)](https://github.com/gulamqadir0410/aura-frost-ui/blob/main/LICENSE)

## Features

- 🪟 **16 glassmorphic components** — Button, Card, Input, Dialog, Tabs, NavBar, and more
- 🎨 **CSS-first design tokens** — Works with Tailwind v3 and v4
- 🌗 **Dark mode** — Full light/dark support out of the box
- ♿ **Accessible** — Built on Radix UI primitives with ARIA support
- 📦 **Tree-shakeable** — Import only what you need
- 🔧 **Two install modes** — CLI (copy source) or package import

## Quick Start

### Option 1: CLI (Recommended — shadcn-style)

```bash
npx glassic-ui init
npx glassic-ui add button card input dialog tabs
```

This copies component source files directly into your project for full customization.

### Option 2: Package Import

```bash
npm install glassic-ui
```

```tsx
import { GlassButton, GlassCard, GlassCardHeader, GlassCardTitle } from 'glassic-ui';
import 'glassic-ui/styles';

export function MyComponent() {
  return (
    <GlassCard variant="elevated" hover>
      <GlassCardHeader>
        <GlassCardTitle>Hello World</GlassCardTitle>
      </GlassCardHeader>
      <GlassButton variant="glass-float">Click Me</GlassButton>
    </GlassCard>
  );
}
```

## Tailwind Setup

### Tailwind v4 (CSS-first)

```css
@import "tailwindcss";
@import "glassic-ui/styles";

@theme {
  --color-glass-bg: hsl(var(--glass-bg));
  --color-glass-border: hsl(var(--glass-border));
  --color-glass-glow: hsl(var(--glass-glow));
  --color-glass-shadow: hsl(var(--glass-shadow));
}
```

### Tailwind v3 (JS config)

```js
// tailwind.config.js
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/glassic-ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          bg: "hsl(var(--glass-bg))",
          border: "hsl(var(--glass-border))",
          glow: "hsl(var(--glass-glow))",
          shadow: "hsl(var(--glass-shadow))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

## Available Components

| Component | CLI Name | Description |
|-----------|----------|-------------|
| GlassButton | `button` | Button with glass variants and loading state |
| GlassCard | `card` | Card with elevation variants and hover-lift |
| GlassInput | `input` | Text input with focus glow |
| GlassSwitch | `switch` | Toggle switch with loading and label support |
| GlassAlert | `alert` | Alert banner with info/success/warning/error variants |
| GlassDialog | `dialog` | Modal dialog with overlay blur |
| GlassDropdown | `dropdown` | Dropdown menu with checkbox/radio/sub-menu |
| GlassTabs | `tabs` | Tabs with icons, badges, closable, vertical |
| GlassNavBar | `navbar` | Responsive nav bar with mobile + mega-menu |
| GlassSidebar | `sidebar` | Collapsible sidebar with nested groups |
| GlassDataTable | `data-table` | Data table with sort, pagination, selection |
| GlassChart | `chart` | Charts (Area, Bar, Line, Pie) |
| GlassCommandPalette | `command` | Cmd+K command palette with fuzzy search |
| GlassNotificationCenter | `notifications` | Notification center with categories |
| GlassSegmentedControl | `segmented` | Segmented control with animated indicator |
| GlassFAB | `fab` | Floating action button with radial actions |

## Requirements

- React 18+
- Tailwind CSS 3+ or 4+
- TypeScript (recommended)

## License

MIT
