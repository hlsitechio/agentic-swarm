<div align="center">

# 🐝 Agentic Swarm

### A swarm of 60 specialist engineering agents — organized into teams, installed with one command.

**Pick a team. Run one command. Your coding assistant gains a full squad of specialists.**

[![Claude Code](https://img.shields.io/badge/Claude_Code-Compatible-blueviolet?style=flat-square&logo=anthropic)](https://code.claude.com)
[![Codex](https://img.shields.io/badge/Codex-Compatible-black?style=flat-square&logo=openai)](https://developers.openai.com/codex)
[![OpenCode](https://img.shields.io/badge/OpenCode-Compatible-00bcd4?style=flat-square)](https://opencode.ai)
[![Cursor](https://img.shields.io/badge/Cursor-Compatible-blue?style=flat-square)](https://cursor.com)
[![VS Code](https://img.shields.io/badge/VS_Code-Compatible-007ACC?style=flat-square&logo=visualstudiocode)](https://code.visualstudio.com)
[![Agents](https://img.shields.io/badge/Agents-60-orange?style=flat-square)]()
[![Teams](https://img.shields.io/badge/Teams-10-success?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)]()

</div>

---

## The problem

Every time you try a new coding tool — **VS Code, Codex, OpenCode, Cursor, Pi, Claude Code** — you
rebuild your agents from scratch. Different folders, different file formats, different frontmatter.
That reviewer, security auditor, or architect you carefully tuned? It doesn't come with you, so you
stop and recreate it. Again.

**Agentic Swarm fixes that.** Define your agents **once**; deploy the whole swarm into any tool in
seconds. Switch tools — or onboard a teammate — without losing your squad.

## What is this?

A curated library of **60 specialist software-engineering agents**, sorted into **10 teams**, that
install into your coding assistant with **one command** — no cloning, no copy-paste.

Each agent is a focused expert with a real, production-minded system prompt: a security auditor, a
database engineer, a React specialist, an SRE. Deploy a whole **team** to cover a domain end-to-end,
or drop in a single agent for a precise task.

**One definition → every tool.** The same agents install natively into **Claude Code, VS Code
(Copilot), Codex, OpenCode, Cursor, and Pi**.

## ⚡ Quick start

```bash
# Browse the teams
npx github:hlsitechio/agentic-swarm list

# Deploy a whole team into Claude Code (global)
npx github:hlsitechio/agentic-swarm add backend

# Or a single agent
npx github:hlsitechio/agentic-swarm add code-reviewer
```

Then in Claude Code, say *"Use the code-reviewer agent on this diff"* — or let it auto-delegate. ✅

> **No Node?** One-line installer (Claude Code, macOS/Linux):
> ```bash
> curl -fsSL https://raw.githubusercontent.com/hlsitechio/agentic-swarm/main/install.sh | sh -s security
> ```
> Windows PowerShell:
> ```powershell
> irm https://raw.githubusercontent.com/hlsitechio/agentic-swarm/main/install.ps1 | iex; Install-Swarm security
> ```

## 🎯 Works with your assistant

One command, many tools. Choose your target with `--target`:

| Tool | Installs to | How you invoke it | Flag |
|------|-------------|-------------------|------|
| **Claude Code** | `~/.claude/agents/` | auto-delegate · `/agents` | *(default)* |
| **VS Code (Copilot)** | `.github/agents/` *(project)* · `~/.copilot/agents/` | agents dropdown | `--target=vscode` |
| **OpenCode** | `~/.config/opencode/agents/` | `@agent` | `--target=opencode` |
| **Codex CLI** | `~/.codex/prompts/` | `/prompts:agent` | `--target=codex` |
| **Cursor** | `.cursor/rules/` *(project)* | `@agent` in chat | `--target=cursor` |
| **Pi** | `~/.pi/agent/prompts/` | `/agent` | `--target=pi` |
| **Anything** | `./agentic-swarm-agents/` | reference the `.md` | `--target=generic` |

```bash
# Same agents, any tool:
npx github:hlsitechio/agentic-swarm add devops --target=vscode --project
npx github:hlsitechio/agentic-swarm add backend --target=opencode
npx github:hlsitechio/agentic-swarm add quality --target=cursor --project
npx github:hlsitechio/agentic-swarm add code-reviewer --target=claude,codex   # multiple at once
```

Use `--project` to install into the current repo instead of your global config, and `--dry-run`
to preview first.

---

## 🧩 The teams

Deploy a **team** to cover a domain; deploy a single **agent** for a precise task.

### 🏛️ `architecture` — Architecture Guild
*Design systems, APIs & boundaries*
`solution-architect` · `api-designer` · `domain-modeler` · `cloud-architect` · `tech-lead` · `integration-architect`

### ⚙️ `backend` — Backend Squad
*Server-side services & data*
`backend-engineer` · `microservices-engineer` · `database-engineer` · `graphql-engineer` · `realtime-engineer` · `caching-engineer`

### 🎨 `frontend` — Frontend Squad
*UI, client logic & UX delivery*
`frontend-engineer` · `react-specialist` · `design-system-engineer` · `accessibility-engineer` · `mobile-engineer` · `web-perf-engineer`

### 🔤 `languages` — Language Pros
*Deep per-language expertise*
`python-pro` · `typescript-pro` · `go-pro` · `rust-pro` · `java-pro` · `csharp-pro`

### ✅ `quality` — Quality Crew
*Correctness, tests & performance*
`code-reviewer` · `qa-engineer` · `test-automation-engineer` · `performance-engineer` · `refactoring-specialist` · `debugger`

### 🔐 `security` — Security Team
*AppSec, offense & supply chain*
`security-auditor` · `appsec-engineer` · `penetration-tester` · `secrets-scanner` · `dependency-auditor` · `threat-modeler`

### 🚀 `devops` — DevOps & SRE
*Ship, scale & operate*
`devops-engineer` · `site-reliability-engineer` · `kubernetes-engineer` · `ci-cd-engineer` · `terraform-engineer` · `observability-engineer`

### 🧠 `data-ai` — Data & AI
*Pipelines, models & LLM apps*
`data-engineer` · `ml-engineer` · `data-scientist` · `mlops-engineer` · `analytics-engineer` · `prompt-engineer`

### 📋 `product-docs` — Product & Docs
*Plan, document & communicate*
`product-manager` · `technical-writer` · `ux-researcher` · `api-documenter` · `release-manager` · `project-planner`

### 🧩 `specialists` — Specialists
*Targeted, high-leverage expertise*
`migration-specialist` · `legacy-modernizer` · `payments-engineer` · `search-engineer` · `i18n-engineer` · `seo-engineer`

> Browse any team's agents and their descriptions: `npx github:hlsitechio/agentic-swarm list <team>`

---

## 🧰 CLI reference

```text
npx github:hlsitechio/agentic-swarm <command> [names...] [flags]

Commands
  list [team]            List all teams, or one team's agents
  add  <name...>         Install agent(s) and/or whole team(s)
  remove <name...>       Uninstall agent(s)/team(s)
  help                   Show help

Flags
  --target=<t[,t...]>    claude (default), codex, opencode, cursor, pi, generic
  --project              Install into ./ (project) instead of global config
  --global               Force global install
  --out=<dir>            Custom output dir for the 'generic' target
  --force                Overwrite existing files
  --dry-run              Preview without writing
```

## 🧱 How it's built

Each agent is stored **once** as a canonical Markdown file with frontmatter:

```
agents/<slug>/agent.md     # name + description + system prompt
teams/<id>.json            # which agents belong to a team
```

The CLI's **adapters** transform that canonical form into each tool's required format and path
(verified against each tool's current docs). One source of truth, six output targets.

Everything is generated from a single file — `scripts/generate.py` defines the full roster and
teams, then writes `agents/` and `teams/`. To add or edit agents, edit that script and run it.

## 🤝 Contributing

1. Fork this repo
2. Add an entry to `AGENTS` in [`scripts/generate.py`](scripts/generate.py) (title, role, responsibilities, principles, description)
3. Add the slug to one or more teams in `TEAMS`
4. Run `python scripts/generate.py` and commit the generated files
5. Open a PR

## 🔗 Related

- [**claude-crew**](https://github.com/hlsitechio/claude-crew) — production agent presets for Claude Code
- [**claude-memory**](https://github.com/hlsitechio/claude-memory) — persistent memory for Claude Code sessions

---

<div align="center">

**60 agents. 10 teams. One command.**

*Real engineering specialists, ready for Claude Code, VS Code, Codex, OpenCode, Cursor & Pi.*

MIT License

</div>
