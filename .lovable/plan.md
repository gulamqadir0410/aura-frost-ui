

# Liquid Glass UI — Documentation & Showcase Site

## Overview
Build a **shadcn-style documentation site** for the "Liquid Glass UI" component library — a glassmorphism-inspired design system. The site will feature live interactive demos, copyable code snippets, and comprehensive docs for each component.

---

## 1. Design System Foundation
- Create the **Liquid Glass design token system** — 5 glass elevation levels with backdrop-blur, opacity, border glow, and shadow utilities
- Build Tailwind utility classes (`glass-1` through `glass-4`, `glass-float`) for easy reuse
- Implement **light & dark mode** support with adaptive glass opacity tokens
- Add subtle motion effects (hover lift, focus glow, entrance fade)

## 2. Site Layout (shadcn-style)
- **Collapsible sidebar** with grouped navigation: Getting Started, Theming, Components, Animations
- **Top header** with logo, theme toggle (light/dark), and GitHub link
- **Main content area** with component docs, live previews, and code blocks
- Responsive design — sidebar collapses on mobile

## 3. Documentation Pages

### Getting Started
- Introduction to Liquid Glass UI philosophy
- Installation instructions (CLI command, peer dependencies)
- Quick start guide

### Theming
- Glass layer system explanation (5 elevation levels with visual diagram)
- Color system & tokens
- Light physics rules (inner glow, edge highlights, gradient overlays)
- Dark mode behavior

### Animations
- Motion principles
- Available animation utilities
- `useDepth()` hook documentation

## 4. Component Pages (15+ components)
Each component page includes:
- **Live interactive demo** with the glass-styled component
- **Variants showcase** (default, elevated, floating, interactive, destructive)
- **Props/API table**
- **Copyable code snippets**
- **Accessibility notes**

### Core Components
1. **Button** — glass, glass-elevated, icon-button, loading state
2. **Card** — static, hover-lift, blur-panel
3. **Input** — translucent background with focus glow
4. **Modal / Dialog** — glass dialog with depth layering
5. **Toast** — floating glass notification

### Extended Components
6. **Tabs** — frosted with sliding glow indicator
7. **Navigation Bar** — floating dock style (macOS inspired)
8. **Sidebar** — collapsible with blur background
9. **Dropdown Menu** — depth elevation layering
10. **Data Table** — soft bordered, layered header

### Advanced Components
11. **Command Palette** — spotlight search overlay
12. **Segmented Control** — glass toggle group
13. **Floating Action Button** — elevated glass FAB
14. **Switch** — glass toggle switch
15. **Notification Center** — slide-out panel with activity feed

## 5. Interactive Features
- **Live preview** for every component with toggle between demo and code view
- **Copy code** button on all code blocks
- **Theme toggle** that updates all previews in real-time
- **Component playground** section for experimenting with props

## 6. Landing Hero (Homepage)
- Bold headline introducing Liquid Glass UI
- Animated gradient background with floating glass component demos
- CTA buttons to browse docs or view GitHub
- Quick comparison table (shadcn vs Material UI vs Liquid Glass UI)

