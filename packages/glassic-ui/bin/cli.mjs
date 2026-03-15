#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REGISTRY_PATH = path.resolve(__dirname, "../registry");
const COMPONENTS_SOURCE = path.resolve(REGISTRY_PATH, "components");
const STYLES_SOURCE = path.resolve(REGISTRY_PATH, "styles");

// Colors for terminal output
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function log(msg) { console.log(msg); }
function success(msg) { log(`${c.green}✓${c.reset} ${msg}`); }
function info(msg) { log(`${c.blue}ℹ${c.reset} ${msg}`); }
function warn(msg) { log(`${c.yellow}⚠${c.reset} ${msg}`); }
function error(msg) { log(`${c.red}✗${c.reset} ${msg}`); }

// Load registry
function loadRegistry() {
  const registryPath = path.resolve(__dirname, "../registry.json");
  return JSON.parse(fs.readFileSync(registryPath, "utf-8"));
}

// Detect project config
function detectConfig() {
  const cwd = process.cwd();
  const config = {
    componentsDir: "src/components/glass",
    utilsPath: "src/lib/utils.ts",
    stylesDir: "src",
    aliasPrefix: "@",
  };

  // Check for components.json (shadcn config)
  const shadcnConfigPath = path.join(cwd, "components.json");
  if (fs.existsSync(shadcnConfigPath)) {
    try {
      const shadcnConfig = JSON.parse(fs.readFileSync(shadcnConfigPath, "utf-8"));
      if (shadcnConfig.aliases?.components) {
        config.aliasPrefix = shadcnConfig.aliases.components.split("/")[0];
      }
    } catch {}
  }

  return config;
}

// ─── INIT command ───
function init() {
  log(`\n${c.bold}${c.cyan}Glassic UI${c.reset} — Initializing project\n`);

  const cwd = process.cwd();
  const config = detectConfig();

  // 1. Create directories
  const dirs = [
    path.join(cwd, config.componentsDir),
    path.join(cwd, path.dirname(config.utilsPath)),
  ];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      success(`Created ${path.relative(cwd, dir)}/`);
    }
  });

  // 2. Create utils.ts if it doesn't exist
  const utilsTarget = path.join(cwd, config.utilsPath);
  if (!fs.existsSync(utilsTarget)) {
    fs.writeFileSync(
      utilsTarget,
      `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`
    );
    success(`Created ${config.utilsPath}`);
  } else {
    info(`${config.utilsPath} already exists, skipping`);
  }

  // 3. Copy glass CSS
  const cssSource = path.resolve(__dirname, "../dist/styles/glassic.css");
  const cssFallback = path.resolve(STYLES_SOURCE, "glassic.css");
  const cssActual = fs.existsSync(cssSource) ? cssSource : cssFallback;

  if (fs.existsSync(cssActual)) {
    const cssTarget = path.join(cwd, config.stylesDir, "glassic.css");
    fs.copyFileSync(cssActual, cssTarget);
    success(`Created ${path.relative(cwd, cssTarget)}`);
  } else {
    // Write inline
    const cssTarget = path.join(cwd, config.stylesDir, "glassic.css");
    fs.writeFileSync(cssTarget, getGlassCssContent());
    success(`Created ${path.relative(cwd, cssTarget)}`);
  }

  // 4. Print next steps
  log("");
  log(`${c.bold}Next steps:${c.reset}`);
  log("");
  log(`  1. Import the glass styles in your main CSS file:`);
  log(`     ${c.dim}@import './glassic.css';${c.reset}`);
  log("");
  log(`  2. Add glass colors to your ${c.bold}tailwind.config${c.reset}:`);
  log(`     ${c.dim}colors: {`);
  log(`       glass: {`);
  log(`         bg: "hsl(var(--glass-bg))",`);
  log(`         border: "hsl(var(--glass-border))",`);
  log(`         glow: "hsl(var(--glass-glow))",`);
  log(`         shadow: "hsl(var(--glass-shadow))",`);
  log(`       },`);
  log(`     }${c.reset}`);
  log("");
  log(`  3. Install required base dependencies:`);
  log(`     ${c.dim}npm install clsx tailwind-merge class-variance-authority${c.reset}`);
  log("");
  log(`  4. Add components:`);
  log(`     ${c.dim}npx glassic-ui add button card input${c.reset}`);
  log("");
}

// ─── ADD command ───
function add(componentNames) {
  if (!componentNames.length) {
    error("Please specify component names. Example: npx glassic-ui add button card");
    log(`\n  Available components:`);
    const registry = loadRegistry();
    Object.entries(registry.components).forEach(([key, val]) => {
      log(`    ${c.cyan}${key.padEnd(16)}${c.reset} ${c.dim}${val.description}${c.reset}`);
    });
    process.exit(1);
  }

  const registry = loadRegistry();
  const config = detectConfig();
  const cwd = process.cwd();
  const targetDir = path.join(cwd, config.componentsDir);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  log(`\n${c.bold}${c.cyan}Glassic UI${c.reset} — Adding components\n`);

  const allDeps = new Set();
  let added = 0;

  for (const name of componentNames) {
    const entry = registry.components[name];
    if (!entry) {
      warn(`Unknown component "${name}", skipping`);
      continue;
    }

    // Find source file
    const sourceFile =
      path.resolve(COMPONENTS_SOURCE, entry.file) ||
      path.resolve(__dirname, "../src/components", entry.file);

    let content;
    if (fs.existsSync(sourceFile)) {
      content = fs.readFileSync(sourceFile, "utf-8");
    } else {
      // Try from dist
      const distFile = path.resolve(__dirname, "../dist/components", entry.file);
      if (fs.existsSync(distFile)) {
        content = fs.readFileSync(distFile, "utf-8");
      } else {
        error(`Source file not found for "${name}"`);
        continue;
      }
    }

    // Rewrite import paths to match user's project
    content = content.replace(
      /from\s+["']@\/lib\/utils["']/g,
      `from "${config.aliasPrefix}/lib/utils"`
    );
    content = content.replace(
      /from\s+["']\.\.\/utils["']/g,
      `from "${config.aliasPrefix}/lib/utils"`
    );

    const targetFile = path.join(targetDir, entry.file);
    const exists = fs.existsSync(targetFile);

    fs.writeFileSync(targetFile, content);

    if (exists) {
      info(`Updated ${path.relative(cwd, targetFile)}`);
    } else {
      success(`Added ${path.relative(cwd, targetFile)}`);
    }

    entry.dependencies.forEach((dep) => allDeps.add(dep));
    added++;
  }

  // Also ensure utils exists
  const utilsTarget = path.join(cwd, config.utilsPath);
  if (!fs.existsSync(utilsTarget)) {
    const utilsDir = path.dirname(utilsTarget);
    if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });
    fs.writeFileSync(
      utilsTarget,
      `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`
    );
    success(`Created ${config.utilsPath}`);
    allDeps.add("clsx");
    allDeps.add("tailwind-merge");
  }

  if (allDeps.size > 0) {
    log("");
    log(`${c.bold}Install required dependencies:${c.reset}`);
    log(`  ${c.dim}npm install ${[...allDeps].join(" ")}${c.reset}`);
  }

  log(`\n${c.green}Done!${c.reset} Added ${added} component${added !== 1 ? "s" : ""}.\n`);
}

// ─── LIST command ───
function list() {
  const registry = loadRegistry();
  log(`\n${c.bold}${c.cyan}Glassic UI${c.reset} — Available Components\n`);
  Object.entries(registry.components).forEach(([key, val]) => {
    log(`  ${c.cyan}${key.padEnd(16)}${c.reset} ${val.description}`);
  });
  log("");
}

// ─── Fallback CSS content ───
function getGlassCssContent() {
  return `/* Glassic UI — CSS Tokens */
@layer base {
  :root {
    --glass-bg: 220 20% 100%;
    --glass-border: 220 20% 80%;
    --glass-glow: 221 83% 53%;
    --glass-shadow: 221 83% 53%;
    --glass-noise: 0.02;
    --gradient-start: 221 83% 53%;
    --gradient-mid: 262 83% 58%;
    --gradient-end: 330 81% 60%;
  }
  .dark {
    --glass-bg: 220 30% 20%;
    --glass-border: 220 20% 40%;
    --glass-glow: 217 91% 60%;
    --glass-shadow: 217 91% 60%;
    --glass-noise: 0.03;
    --gradient-start: 217 91% 60%;
    --gradient-mid: 262 83% 58%;
    --gradient-end: 330 81% 60%;
  }
}

@layer components {
  .glass-0 { background: hsl(var(--card) / 0.8); border: 1px solid hsl(var(--border)); }
  .glass-1 { background: hsl(var(--glass-bg) / 0.45); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid hsl(var(--glass-border) / 0.15); box-shadow: inset 0 1px 0 0 hsl(var(--glass-border) / 0.1), 0 4px 16px -2px hsl(var(--glass-shadow) / 0.08); }
  .glass-2 { background: hsl(var(--glass-bg) / 0.35); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid hsl(var(--glass-border) / 0.2); box-shadow: inset 0 1px 0 0 hsl(var(--glass-border) / 0.15), 0 8px 32px -4px hsl(var(--glass-shadow) / 0.12); }
  .glass-3 { background: hsl(var(--glass-bg) / 0.25); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid hsl(var(--glass-border) / 0.25); box-shadow: inset 0 1px 0 0 hsl(var(--glass-border) / 0.2), inset 0 0 20px 0 hsl(var(--glass-glow) / 0.03), 0 16px 48px -8px hsl(var(--glass-shadow) / 0.15); }
  .glass-float { background: hsl(var(--glass-bg) / 0.15); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid hsl(var(--glass-border) / 0.3); box-shadow: inset 0 1px 0 0 hsl(var(--glass-border) / 0.25), inset 0 0 30px 0 hsl(var(--glass-glow) / 0.05), 0 24px 64px -12px hsl(var(--glass-shadow) / 0.2), 0 0 0 1px hsl(var(--glass-border) / 0.05); }
  .glass-glow { box-shadow: 0 0 20px -5px hsl(var(--glass-glow) / 0.3), 0 0 40px -10px hsl(var(--glass-glow) / 0.15); }
  .hover-lift { transition: all 0.3s ease-out; }
  .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 12px 40px -8px hsl(var(--glass-shadow) / 0.2), 0 0 0 1px hsl(var(--glass-border) / 0.1); }
  .focus-glow:focus-within { box-shadow: 0 0 0 2px hsl(var(--glass-glow) / 0.3), 0 0 20px -5px hsl(var(--glass-glow) / 0.2); }
}
`;
}

// ─── Main CLI ───
const [, , command, ...args] = process.argv;

switch (command) {
  case "init":
    init();
    break;
  case "add":
    add(args);
    break;
  case "list":
    list();
    break;
  default:
    log(`
${c.bold}${c.cyan}Glassic UI${c.reset} — Glassmorphic Component Library

${c.bold}Usage:${c.reset}
  npx glassic-ui ${c.cyan}<command>${c.reset} [options]

${c.bold}Commands:${c.reset}
  ${c.cyan}init${c.reset}           Initialize Glassic UI in your project
  ${c.cyan}add${c.reset} <names>    Add component(s) to your project
  ${c.cyan}list${c.reset}           List all available components

${c.bold}Examples:${c.reset}
  ${c.dim}npx glassic-ui init${c.reset}
  ${c.dim}npx glassic-ui add button card input${c.reset}
  ${c.dim}npx glassic-ui add dialog tabs navbar${c.reset}
  ${c.dim}npx glassic-ui list${c.reset}
`);
}
