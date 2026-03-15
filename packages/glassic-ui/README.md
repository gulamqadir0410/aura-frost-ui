# Glassic UI

A production-ready glassmorphic component library built on React, Radix UI, and Tailwind CSS.

## Installation

### Option 1: CLI (Recommended — shadcn-style)

Initialize Glassic UI in your project:

```bash
npx glassic-ui init
```

Then add components individually:

```bash
npx glassic-ui add button card input dialog tabs
```

This copies the component source code directly into your project, giving you full control and customization.

### Option 2: Package Import

Install the package:

```bash
npm install glassic-ui
```

Import the styles in your main CSS:

```css
@import 'glassic-ui/styles';
```

Use components:

```tsx
import { GlassButton, GlassCard, GlassCardHeader, GlassCardTitle } from 'glassic-ui';

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

## Available Components

| Component | CLI Name | Description |
|-----------|----------|-------------|
| GlassButton | `button` | Button with glass variants and loading state |
| GlassCard | `card` | Card with elevation variants and hover-lift |
| GlassInput | `input` | Text input with focus glow |
| GlassSwitch | `switch` | Toggle switch with loading and label support |
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

## Prerequisites

- React 18+
- Tailwind CSS 3+
- TypeScript

## Peer Dependencies

These are required and must be installed in your project:

```bash
npm install react react-dom tailwindcss
```

## Tailwind Configuration

Add the glass color tokens to your `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
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
} satisfies Config;
```

## License

MIT
