

# Fix Incomplete Code Snippets in Documentation

## Problem
The code shown in the "Code" tab of each component's documentation page is incomplete or abbreviated. Users cannot copy the code and use it directly in their projects. For example:
- **NavBar**: Shows `<GlassNavBar brand={...} items={navItems}>` but doesn't include the `navItems` data or import statements
- **Centered Brand / Split Navigation**: Code just says `// Centered brand layout using custom composition` — no actual code
- **Tabs (Closable)**: Shows a single `<GlassTabsTrigger>` instead of the full working example with state management
- **Tabs (Vertical)**: Uses `...` placeholder instead of full content
- **DataTable**: Abbreviated — no column definitions, no data array, no render function
- **Switch (Loading)**: Shows pseudo-code `handleAsync` instead of the real handler
- **Notifications**: Shows `markAsRead(id)` placeholders instead of real setState logic
- **CommandPalette**: Missing the items array and state setup
- **Segmented (Full Width)**: Missing state setup

## Solution
Update every `ComponentPreview` `code` prop across all 15 component doc pages to include **complete, self-contained, copy-pasteable code** — including imports, state declarations, data arrays, and handler functions.

## Files to Edit (14 component doc pages)

1. **`src/pages/docs/components/NavBarPage.tsx`** — Add full imports + navItems array to default example; replace placeholder comments in Centered Brand and Split Navigation with real JSX code; complete all 5 variant snippets
2. **`src/pages/docs/components/TabsPage.tsx`** — Add full closable tabs example with state + closeTab handler; expand vertical layout code to include all tab contents instead of `...`
3. **`src/pages/docs/components/DataTablePage.tsx`** — Include full column definitions with render function, sample data array, and imports in the code snippet
4. **`src/pages/docs/components/SwitchPage.tsx`** — Replace `handleAsync` with real loading toggle handler code; add state declarations
5. **`src/pages/docs/components/NotificationsPage.tsx`** — Replace `markAsRead(id)` / `markAllRead()` / `dismiss(id)` with actual useState handlers; include sample notifications array
6. **`src/pages/docs/components/CommandPage.tsx`** — Include items array definition and state setup in the code snippet
7. **`src/pages/docs/components/ButtonPage.tsx`** — Add import statement to code snippets (these are mostly fine but missing imports)
8. **`src/pages/docs/components/CardPage.tsx`** — Add import statement; code is mostly complete
9. **`src/pages/docs/components/ChartPage.tsx`** — Add import statement; code is mostly complete
10. **`src/pages/docs/components/DialogPage.tsx`** — Add import statement; code is mostly complete
11. **`src/pages/docs/components/FABPage.tsx`** — Add import + toast import to code; include full actions array
12. **`src/pages/docs/components/InputPage.tsx`** — Add import statement
13. **`src/pages/docs/components/SegmentedPage.tsx`** — Add state setup to full-width example
14. **`src/pages/docs/components/SidebarPage.tsx`** — Include full groups array definition and imports in code snippet
15. **`src/pages/docs/components/DropdownPage.tsx`** — Already has complete code; just add imports
16. **`src/pages/docs/components/ToastPage.tsx`** — Already fairly complete; add import line

## Code Snippet Format
Each code snippet will follow this structure:
```tsx
import { ComponentName } from "@/components/glass/ComponentName";
import { useState } from "react";
// other imports...

// data/config (if needed)
const items = [...];

// component with state (if needed)
function Example() {
  const [state, setState] = useState(...);
  return (
    <ComponentName ... />
  );
}
```

## Scope
- Only editing the `code={...}` string props inside `ComponentPreview` — no changes to the actual rendered previews or component implementations
- Every code snippet will be a complete, working example a user can drop into their project

