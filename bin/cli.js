#!/usr/bin/env node
/**
 * agentic-swarm — install specialist engineering agents (solo or by team) into your coding assistant.
 *
 * Zero dependencies. Works via:  npx github:hlsitechio/agentic-swarm <command>
 *
 * Commands:
 *   list [team]                 List all teams, or the agents in one team
 *   add <name...> [flags]       Install agent(s) and/or whole team(s)
 *   remove <name...> [flags]    Uninstall agent(s)/team(s)
 *   help                        Show usage
 *
 * Flags:
 *   --target=<t[,t...]>   claude (default), vscode, codex, opencode, cursor, pi, generic
 *   --project             Install into the current project instead of global config
 *   --global              Force global install (default for claude/codex/opencode/pi)
 *   --out=<dir>           Custom output dir (generic target)
 *   --force               Overwrite existing files
 *   --dry-run             Show what would happen without writing
 */
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.join(__dirname, "..");
const CAST_DIR = path.join(ROOT, "agents");
const TEAMS_DIR = path.join(ROOT, "teams");

// ── tiny ANSI helpers ──────────────────────────────────────────────────────
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = (s) => c("1", s);
const dim = (s) => c("2", s);
const cyan = (s) => c("36", s);
const green = (s) => c("32", s);
const yellow = (s) => c("33", s);
const red = (s) => c("31", s);

// ── data loading ─────────────────────────────────────────────────────────--
function listCharacters() {
  return fs
    .readdirSync(CAST_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(CAST_DIR, d.name, "agent.md")))
    .map((d) => d.name)
    .sort();
}

function loadTeams() {
  const teams = {};
  for (const f of fs.readdirSync(TEAMS_DIR)) {
    if (f.endsWith(".json") && f !== "index.json") {
      const t = JSON.parse(fs.readFileSync(path.join(TEAMS_DIR, f), "utf8"));
      teams[t.id] = t;
    }
  }
  return teams;
}

/** Parse YAML-ish frontmatter (key: value) + body from a cast agent.md. */
function loadCharacter(slug) {
  const file = path.join(CAST_DIR, slug, "agent.md");
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const meta = { name: slug, description: "" };
  let body = raw;
  const m = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (kv) {
        let v = kv[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        meta[kv[1]] = v;
      }
    }
    body = raw.slice(m[0].length);
  }
  return { slug, name: meta.name || slug, description: meta.description || "", body: body.trimStart() };
}

// ── target adapters ────────────────────────────────────────────────────────
// Each adapter returns { dir, file, content } for a given character + scope.
function yamlEscape(s) {
  return String(s).replace(/"/g, "'");
}

const TARGETS = {
  claude: {
    label: "Claude Code",
    invoke: (n) => `the ${n} agent (auto-delegated, or "Use the ${n} agent…")`,
    dir: (project) => (project ? path.join(process.cwd(), ".claude", "agents") : path.join(os.homedir(), ".claude", "agents")),
    render: (ch) =>
      `---\nname: ${ch.slug}\ndescription: "${yamlEscape(ch.description)}"\n---\n\n${ch.body}`,
    ext: ".md",
  },
  vscode: {
    label: "VS Code (Copilot)",
    invoke: (n) => `pick "${n}" in the Chat agents dropdown`,
    dir: (project) => (project ? path.join(process.cwd(), ".github", "agents") : path.join(os.homedir(), ".copilot", "agents")),
    render: (ch) =>
      `---\nname: ${ch.slug}\ndescription: "${yamlEscape(ch.description)}"\n---\n\n${ch.body}`,
    ext: ".agent.md",
  },
  opencode: {
    label: "OpenCode",
    invoke: (n) => `@${n} (subagent mention)`,
    dir: (project) => (project ? path.join(process.cwd(), ".opencode", "agents") : path.join(os.homedir(), ".config", "opencode", "agents")),
    render: (ch) =>
      `---\ndescription: "${yamlEscape(ch.description)}"\nmode: subagent\n---\n\n${ch.body}`,
    ext: ".md",
  },
  codex: {
    label: "Codex CLI",
    invoke: (n) => `/prompts:${n}`,
    dir: () => path.join(os.homedir(), ".codex", "prompts"), // global only
    render: (ch) => `---\ndescription: "${yamlEscape(ch.description)}"\n---\n\n${ch.body}`,
    ext: ".md",
    globalOnly: true,
  },
  cursor: {
    label: "Cursor",
    invoke: (n) => `@${n} (in chat)`,
    dir: () => path.join(process.cwd(), ".cursor", "rules"), // project only
    render: (ch) =>
      `---\ndescription: "${yamlEscape(ch.description)}"\nalwaysApply: false\n---\n\n${ch.body}`,
    ext: ".mdc",
    projectOnly: true,
  },
  pi: {
    label: "Pi",
    invoke: (n) => `/${n} (prompt template)`,
    dir: (project) => (project ? path.join(process.cwd(), ".pi", "prompts") : path.join(os.homedir(), ".pi", "agent", "prompts")),
    render: (ch) => ch.body,
    ext: ".md",
  },
  generic: {
    label: "Generic markdown",
    invoke: () => `reference the .md file in your tool of choice`,
    dir: (project, out) => out || path.join(process.cwd(), "agentic-swarm-agents"),
    render: (ch) => `---\nname: ${ch.slug}\ndescription: "${yamlEscape(ch.description)}"\n---\n\n${ch.body}`,
    ext: ".md",
  },
};

// ── arg parsing ────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const flags = { targets: ["claude"], project: false, global: false, force: false, dryRun: false, out: null };
  const positional = [];
  for (const a of argv) {
    if (a === "--project") flags.project = true;
    else if (a === "--global") flags.global = true;
    else if (a === "--force") flags.force = true;
    else if (a === "--dry-run") flags.dryRun = true;
    else if (a.startsWith("--target=")) flags.targets = a.slice(9).split(",").map((s) => s.trim()).filter(Boolean);
    else if (a.startsWith("--out=")) flags.out = a.slice(6);
    else positional.push(a);
  }
  return { flags, positional };
}

/** Resolve a list of names (teams and/or characters) into a unique slug list. */
function resolveSlugs(names, teams, characters) {
  const set = new Set();
  const unknown = [];
  for (const name of names) {
    const key = name.toLowerCase();
    if (teams[key]) teams[key].members.forEach((m) => set.add(m));
    else if (characters.includes(key)) set.add(key);
    else unknown.push(name);
  }
  return { slugs: [...set], unknown };
}

// ── commands ───────────────────────────────────────────────────────────────
function cmdList(positional, teams) {
  const arg = positional[0];
  if (arg && teams[arg.toLowerCase()]) {
    const t = teams[arg.toLowerCase()];
    console.log(`\n${t.emoji}  ${bold(t.name)}  ${dim("(" + t.id + ")")}`);
    console.log(`   ${dim(t.tagline)}\n`);
    for (const slug of t.members) {
      const ch = loadCharacter(slug);
      console.log(`   ${cyan(slug.padEnd(20))} ${dim(ch ? ch.description : "")}`);
    }
    console.log();
    return;
  }
  console.log(`\n${bold("🐝 Agentic Swarm — teams")}  ${dim("(npx github:hlsitechio/agentic-swarm add <team>)")}\n`);
  for (const t of Object.values(teams)) {
    console.log(`  ${t.emoji}  ${cyan(t.id.padEnd(18))} ${bold(t.name.padEnd(22))} ${dim(t.tagline)} ${dim("· " + t.members.length)}`);
  }
  console.log(`\n  ${dim("List a team's agents:  ")} npx github:hlsitechio/agentic-swarm list security`);
  console.log(`  ${dim("Install a team:       ")} npx github:hlsitechio/agentic-swarm add security`);
  console.log(`  ${dim("Install one agent:    ")} npx github:hlsitechio/agentic-swarm add code-reviewer\n`);
}

function ensureScope(target, flags) {
  const t = TARGETS[target];
  if (t.projectOnly && flags.global) {
    console.log(yellow(`  note: ${t.label} only supports project install; using project scope.`));
  }
  if (t.globalOnly && flags.project) {
    console.log(yellow(`  note: ${t.label} only supports global install; using global scope.`));
  }
  // Scope resolution. --global wins if both --global and --project are passed.
  let project;
  if (t.globalOnly) project = false;
  else if (t.projectOnly) project = true;
  else if (flags.global) project = false;
  else project = flags.project;
  return project;
}

function cmdAdd(positional, teams, characters, flags) {
  const { slugs, unknown } = resolveSlugs(positional, teams, characters);
  if (unknown.length) {
    console.log(red(`  unknown: ${unknown.join(", ")}`));
    console.log(dim("  run 'list' to see available teams and agents."));
  }
  if (!slugs.length) {
    console.log(red("  nothing to install."));
    process.exit(1);
  }

  let hadError = unknown.length > 0;
  for (const target of flags.targets) {
    const t = TARGETS[target];
    if (!t) {
      console.log(red(`  unknown target '${target}' (valid: ${Object.keys(TARGETS).join(", ")})`));
      hadError = true;
      continue;
    }
    const project = ensureScope(target, flags);
    const dir = t.dir(project, flags.out);
    console.log(`\n${bold(t.label)} ${dim("→ " + dir)} ${flags.dryRun ? yellow("[dry-run]") : ""}`);
    let wrote = 0;
    for (const slug of slugs) {
      const ch = loadCharacter(slug);
      if (!ch) continue;
      const dest = path.join(dir, slug + t.ext);
      const exists = fs.existsSync(dest);
      if (exists && !flags.force) {
        console.log(`  ${yellow("skip")} ${slug}${t.ext} ${dim("(exists — use --force)")}`);
        continue;
      }
      if (!flags.dryRun) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(dest, t.render(ch), "utf8");
      }
      console.log(`  ${green(exists ? "overwrite" : "add ")} ${cyan(slug + t.ext)}  ${dim("invoke: " + t.invoke(slug))}`);
      wrote++;
    }
    console.log(dim(`  ${wrote} installed for ${t.label}.`));
    if (target === "claude" && !flags.dryRun && wrote) {
      console.log(dim("  ↳ restart Claude Code (or use /agents) to load new agents."));
    }
  }
  console.log();
  if (hadError) process.exit(1);
}

function cmdRemove(positional, teams, characters, flags) {
  const { slugs, unknown } = resolveSlugs(positional, teams, characters);
  if (unknown.length) console.log(red(`  unknown: ${unknown.join(", ")}`));
  let hadError = unknown.length > 0;
  for (const target of flags.targets) {
    const t = TARGETS[target];
    if (!t) {
      console.log(red(`  unknown target '${target}' (valid: ${Object.keys(TARGETS).join(", ")})`));
      hadError = true;
      continue;
    }
    const project = ensureScope(target, flags);
    const dir = t.dir(project, flags.out);
    console.log(`\n${bold(t.label)} ${dim("→ " + dir)} ${flags.dryRun ? yellow("[dry-run]") : ""}`);
    for (const slug of slugs) {
      const dest = path.join(dir, slug + t.ext);
      if (fs.existsSync(dest)) {
        if (!flags.dryRun) fs.unlinkSync(dest);
        console.log(`  ${green("removed")} ${cyan(slug + t.ext)}`);
      } else {
        console.log(`  ${dim("absent ")} ${slug + t.ext}`);
      }
    }
  }
  console.log();
  if (hadError) process.exit(1);
}

function help() {
  console.log(`
${bold("🐝 agentic-swarm")} — install AI personality agents into your coding assistant.

${bold("Usage")}
  npx github:hlsitechio/agentic-swarm <command> [names...] [flags]

${bold("Commands")}
  list [team]            List all teams, or one team's agents
  add  <name...>         Install agent(s) and/or whole team(s)
  remove <name...>       Uninstall agent(s)/team(s)
  <team|agent> [flags]   Shorthand for "add <team|agent>"
  help                   Show this help

${bold("Flags")}
  --target=<t[,t...]>    ${dim("claude (default), vscode, codex, opencode, cursor, pi, generic")}
  --project              ${dim("Install into ./ (project) instead of global config")}
  --global               ${dim("Force global install")}
  --out=<dir>            ${dim("Custom output dir for the 'generic' target")}
  --force                ${dim("Overwrite existing files")}
  --dry-run              ${dim("Preview without writing")}

${bold("Examples")}
  npx github:hlsitechio/agentic-swarm list
  npx github:hlsitechio/agentic-swarm add security
  npx github:hlsitechio/agentic-swarm backend            # shorthand: team name = command
  npx github:hlsitechio/agentic-swarm add code-reviewer debugger --target=opencode
  npx github:hlsitechio/agentic-swarm add backend --target=claude,cursor --project
  npx github:hlsitechio/agentic-swarm remove data-ai
`);
}

// ── main ─────────────────────────────────────────────────────────────────--
function main() {
  const [, , cmd, ...rest] = process.argv;
  const { flags, positional } = parseArgs(rest);
  const teams = loadTeams();
  const characters = listCharacters();

  switch (cmd) {
    case "list":
    case "ls":
      cmdList(positional, teams);
      break;
    case "add":
    case "install":
      cmdAdd(positional, teams, characters, flags);
      break;
    case "remove":
    case "rm":
    case "uninstall":
      cmdRemove(positional, teams, characters, flags);
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      help();
      break;
    case "--version":
    case "-v": {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
      console.log(pkg.version);
      break;
    }
    default: {
      // Shorthand: a team or agent name used directly IS the command.
      //   npx … backend            → add backend
      //   npx … security --project → add security --project
      const key = cmd.toLowerCase();
      if (teams[key] || characters.includes(key)) {
        cmdAdd([cmd, ...positional], teams, characters, flags);
        break;
      }
      console.log(red(`unknown command: ${cmd}`));
      help();
      process.exit(1);
    }
  }
}

main();
