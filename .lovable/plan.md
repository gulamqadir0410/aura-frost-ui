

# Upgrade to Tailwind CSS v4 + Latest shadcn/ui

## Overview
Migrate from Tailwind CSS v3 (PostCSS-based, JS config) to Tailwind CSS v4 (Vite plugin, CSS-first config) and update shadcn/ui to its latest patterns.

## Key Changes

### 1. Update Dependencies
**`package.json`** — Replace/upgrade:
- `tailwindcss` → `^4.x` (latest)
- Add `@tailwindcss/vite` as devDependency
- Remove `postcss`, `autoprefixer`, `tailwindcss-animate` (v4 has built-in animations)
- Keep all Radix, CVA, clsx, tailwind-merge as-is (already latest)

### 2. Update Vite Config
**`vite.config.ts`** — Add `@tailwindcss/vite` plugin:
```ts
import tailwindcss from '@tailwindcss/vite'
// add tailwindcss() to plugins array
```

### 3. Remove Old Config Files
- **Delete `postcss.config.js`** — no longer needed with Vite plugin
- **Delete `tailwind.config.ts`** — theme moves into CSS

### 4. Migrate `src/index.css` (Biggest Change)
Replace `@tailwind base/components/utilities` directives with:
```css
@import "tailwindcss";
```

Migrate the entire `tailwind.config.ts` theme into CSS using `@theme`:
```css
@theme {
  --color-border: hsl(var(--border));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  /* ... all color tokens */
  --color-glass-bg: hsl(var(--glass-bg));
  --color-glass-border: hsl(var(--glass-border));
  --color-glass-glow: hsl(var(--glass-glow));
  --color-glass-shadow: hsl(var(--glass-shadow));
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  /* animations, keyframes */
}
```

Keep all CSS custom properties (`:root` / `.dark`) and glass utility classes as-is — they work in v4.

Replace `@layer components` with `@utility` for custom utilities like `glass-1`, `hover-lift`, `focus-glow`.

### 5. Update `components.json`
Update to latest shadcn schema — the format is largely the same but ensure it points to the new CSS-first setup.

### 6. Update shadcn UI Components
Most shadcn components use standard Tailwind classes and will work as-is. Scan for any `tailwindcss-animate` specific classes and replace with v4 equivalents (v4 has built-in `animate-*` support).

### 7. Update Glass Components
No changes needed to glass component logic — they use `cn()`, CVA, and CSS class names which remain the same. The glass utility classes in CSS will be migrated to `@utility` syntax.

### 8. Update Documentation
**`src/pages/docs/InstallationPage.tsx`** — Update installation steps:
- Step 2: Use `@tailwindcss/vite` instead of PostCSS setup
- Show `@import "tailwindcss"` instead of `@tailwind` directives
- Update Tailwind config section to show CSS-first `@theme` approach
- Remove references to `postcss.config.js`

### 9. Update npm Package Docs
**`src/pages/docs/PublishingPage.tsx`** — Update consumer instructions to reflect v4 setup for projects using Glassic UI.

## Files Modified
| File | Action |
|------|--------|
| `package.json` | Update deps (tailwindcss v4, add @tailwindcss/vite, remove postcss/autoprefixer/tailwindcss-animate) |
| `vite.config.ts` | Add tailwindcss plugin |
| `postcss.config.js` | Delete |
| `tailwind.config.ts` | Delete |
| `src/index.css` | Full rewrite — `@import "tailwindcss"`, `@theme` block, `@utility` for glass classes |
| `components.json` | Update for v4 compatibility |
| `src/pages/docs/InstallationPage.tsx` | Update all setup instructions |
| `src/pages/docs/PublishingPage.tsx` | Update consumer setup instructions |

## Risk Mitigation
- All existing CSS custom properties (`:root` / `.dark`) work unchanged in v4
- Glass utility classes keep the same names — only the declaration syntax changes (`@utility` instead of `@layer components`)
- All component TSX files remain untouched — no class name changes needed
- CVA variants, cn() utility, Radix primitives are all independent of Tailwind version

