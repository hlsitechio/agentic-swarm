<div align="center">

<img src="assets/banner.png" alt="Agentic Swarm — AI Agents. United Intelligence." width="100%">

# 🐝 Agentic Swarm

### Write your AI coding agents **once**. Deploy them into **any** tool in seconds.

Claude Code · VS Code · Codex · OpenCode · Cursor · Pi — same agents, one command.

[![Claude Code](https://img.shields.io/badge/Claude_Code-✓-blueviolet?style=flat-square&logo=anthropic)](https://code.claude.com)
[![VS Code](https://img.shields.io/badge/VS_Code-✓-007ACC?style=flat-square&logo=visualstudiocode)](https://code.visualstudio.com)
[![Codex](https://img.shields.io/badge/Codex-✓-black?style=flat-square&logo=openai)](https://developers.openai.com/codex)
[![OpenCode](https://img.shields.io/badge/OpenCode-✓-00bcd4?style=flat-square)](https://opencode.ai)
[![Cursor](https://img.shields.io/badge/Cursor-✓-blue?style=flat-square)](https://cursor.com)
[![Pi](https://img.shields.io/badge/Pi-✓-ff5c8a?style=flat-square)](https://pi.dev)
<br>
[![Agents](https://img.shields.io/badge/Agents-60-orange?style=flat-square)]()
[![Teams](https://img.shields.io/badge/Teams-10-success?style=flat-square)]()
[![Install](https://img.shields.io/badge/install-npx-cb3837?style=flat-square&logo=npm)]()
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)]()

</div>

---

## 🎯 The problem

You tune a great set of agents — a sharp code reviewer, a security auditor, a database expert.
Then you try a new tool, and… you start over.

Every assistant stores agents differently: **Claude Code** wants `~/.claude/agents/*.md`, **VS Code**
wants `.github/agents/*.agent.md`, **Cursor** wants `.cursor/rules/*.mdc`, **Codex** wants
`~/.codex/prompts/`, **OpenCode** and **Pi** want their own folders and frontmatter. So your agents
get left behind every time you switch — and you rebuild them by hand. Again.

## ✅ The fix

**Agentic Swarm is a portable agent library.** Define an agent once; the CLI translates it into each
tool's native format and drops it in the right place. Switch tools, set up a new laptop, or onboard a
teammate — your whole swarm comes with you.

| | Without Agentic Swarm | With Agentic Swarm |
|---|---|---|
| New tool | Recreate every agent by hand | `npx … spawn 6` — done |
| Formats | Learn each tool's frontmatter & paths | Handled for you |
| Sharing | "Here, copy-paste these prompts" | One command |
| Source of truth | Scattered across machines | One repo |

---

## 🚀 Quick start

```bash
# 1. See the numbered team list
npx github:hlsitechio/agentic-swarm list

# 2. Spawn a team — by number or name (into Claude Code, the default)
npx github:hlsitechio/agentic-swarm spawn 6          # → security team
npx github:hlsitechio/agentic-swarm spawn backend    # → by name

# 3. Spawn into any tool, or just one agent
npx github:hlsitechio/agentic-swarm spawn 3 --target=vscode --project
npx github:hlsitechio/agentic-swarm spawn code-reviewer

# Shortcut: the number/name IS the command
npx github:hlsitechio/agentic-swarm 6
```

Then invoke it: in Claude Code say *“use the code-reviewer agent”*; in VS Code pick it from the Chat
agents dropdown; in OpenCode/Cursor type `@code-reviewer`. Same agent, every tool.

> **No Node installed?** One-liner for Claude Code:
> ```bash
> # macOS / Linux
> curl -fsSL https://raw.githubusercontent.com/hlsitechio/agentic-swarm/main/install.sh | sh -s security
> ```
> ```powershell
> # Windows PowerShell
> irm https://raw.githubusercontent.com/hlsitechio/agentic-swarm/main/install.ps1 | iex; Install-Swarm security
> ```

---

## ⚡ Spawn any team

Copy-paste a command — each spawns the whole team into **Claude Code**. Add `--target=vscode`
(or `codex`, `opencode`, `cursor`, `pi`) for another tool, and `--project` to install into the current repo.

| # | Team | Command |
|---|------|---------|
| 1 | 🏛️ Architecture Guild | `npx github:hlsitechio/agentic-swarm spawn architecture` |
| 2 | ⚙️ Backend Squad | `npx github:hlsitechio/agentic-swarm spawn backend` |
| 3 | 🎨 Frontend Squad | `npx github:hlsitechio/agentic-swarm spawn frontend` |
| 4 | 🔤 Language Pros | `npx github:hlsitechio/agentic-swarm spawn languages` |
| 5 | ✅ Quality Crew | `npx github:hlsitechio/agentic-swarm spawn quality` |
| 6 | 🔐 Security Team | `npx github:hlsitechio/agentic-swarm spawn security` |
| 7 | 🚀 DevOps & SRE | `npx github:hlsitechio/agentic-swarm spawn devops` |
| 8 | 🧠 Data & AI | `npx github:hlsitechio/agentic-swarm spawn data-ai` |
| 9 | 📋 Product & Docs | `npx github:hlsitechio/agentic-swarm spawn product-docs` |
| 10 | 🧩 Specialists | `npx github:hlsitechio/agentic-swarm spawn specialists` |

> **Prefer numbers?** `npx … spawn 1` … `spawn 10` work identically. Spawn several at once: `spawn 2 6`.
> **Spawn everything** (all 60 agents): `npx … spawn architecture backend frontend languages quality security devops data-ai product-docs specialists`

---

## 🧩 Supported tools

Pick where agents land with `--target` (default: `claude`). Use `--project` for the current repo or
`--global` for your user config.

| Tool | `--target` | Installs to | Invoke with |
|------|-----------|-------------|-------------|
| **Claude Code** | `claude` *(default)* | `~/.claude/agents/` · `.claude/agents/` | auto-delegate · `/agents` |
| **VS Code (Copilot)** | `vscode` | `.github/agents/` · `~/.copilot/agents/` | Chat **agents dropdown** |
| **Codex CLI** | `codex` | `~/.codex/prompts/` | `/prompts:<agent>` |
| **OpenCode** | `opencode` | `~/.config/opencode/agents/` · `.opencode/agents/` | `@<agent>` |
| **Cursor** | `cursor` | `.cursor/rules/` *(project)* | `@<agent>` in chat |
| **Pi** | `pi` | `~/.pi/agent/prompts/` · `.pi/prompts/` | `/<agent>` |
| **Anything else** | `generic` | `./agentic-swarm-agents/` | reference the `.md` |

```bash
# Deploy the same team into several tools at once:
npx github:hlsitechio/agentic-swarm spawn security --target=claude,vscode,codex,opencode
```

---

## 👥 The roster — 60 agents in 10 teams

Deploy a **team** to cover a domain end-to-end, or a single **agent** for a precise task.
Run `list <team|#>` to see each agent's description.

<table>
<tr><td valign="top" width="50%">

**🏛️ `architecture`** — *systems, APIs & boundaries*
`solution-architect` · `api-designer` · `domain-modeler` · `cloud-architect` · `tech-lead` · `integration-architect`

**⚙️ `backend`** — *server-side & data*
`backend-engineer` · `microservices-engineer` · `database-engineer` · `graphql-engineer` · `realtime-engineer` · `caching-engineer`

**🎨 `frontend`** — *UI, client & UX delivery*
`frontend-engineer` · `react-specialist` · `design-system-engineer` · `accessibility-engineer` · `mobile-engineer` · `web-perf-engineer`

**🔤 `languages`** — *deep per-language pros*
`python-pro` · `typescript-pro` · `go-pro` · `rust-pro` · `java-pro` · `csharp-pro`

**✅ `quality`** — *correctness, tests & perf*
`code-reviewer` · `qa-engineer` · `test-automation-engineer` · `performance-engineer` · `refactoring-specialist` · `debugger`

</td><td valign="top" width="50%">

**🔐 `security`** — *appsec, offense & supply chain*
`security-auditor` · `appsec-engineer` · `penetration-tester` · `secrets-scanner` · `dependency-auditor` · `threat-modeler`

**🚀 `devops`** — *ship, scale & operate*
`devops-engineer` · `site-reliability-engineer` · `kubernetes-engineer` · `ci-cd-engineer` · `terraform-engineer` · `observability-engineer`

**🧠 `data-ai`** — *pipelines, models & LLM apps*
`data-engineer` · `ml-engineer` · `data-scientist` · `mlops-engineer` · `analytics-engineer` · `prompt-engineer`

**📋 `product-docs`** — *plan, document & communicate*
`product-manager` · `technical-writer` · `ux-researcher` · `api-documenter` · `release-manager` · `project-planner`

**🧩 `specialists`** — *targeted, high-leverage*
`migration-specialist` · `legacy-modernizer` · `payments-engineer` · `search-engineer` · `i18n-engineer` · `seo-engineer`

</td></tr>
</table>

---

## 🧰 CLI

```text
npx github:hlsitechio/agentic-swarm <command> [names...] [flags]

Commands
  list [team|#]        List all teams (numbered), or one team's agents
  spawn <#|team|agent> Deploy team(s)/agent(s) — by number, name, or both
  remove <#|team|agent> Remove team(s)/agent(s)
  <#|team|agent>       Shorthand: the number/name IS the command (= spawn)
  help                 Show help
                       (add = spawn, despawn = remove)

Flags
  --target=<t[,t...]>  claude (default), vscode, codex, opencode, cursor, pi, generic
  --project            Install into ./ (this repo) instead of global config
  --global             Force global install
  --out=<dir>          Custom output dir for the 'generic' target
  --force              Overwrite existing files
  --dry-run            Preview without writing
```

**Examples**

```bash
npx github:hlsitechio/agentic-swarm list security
npx github:hlsitechio/agentic-swarm spawn quality --target=vscode --project
npx github:hlsitechio/agentic-swarm spawn python-pro typescript-pro --target=opencode
npx github:hlsitechio/agentic-swarm remove data-ai
```

---

## ⚙️ How it works

Each agent is stored **once**, as a canonical Markdown file with frontmatter:

```
agents/<slug>/agent.md     # name + description + system prompt
teams/<id>.json            # which agents belong to a team
```

When you `add`, an **adapter** per tool rewrites that canonical file into the target's required
format (frontmatter keys, file extension) and writes it to the correct directory — paths verified
against each tool's current docs. **One definition, six outputs.**

Everything is generated from a single source of truth — [`scripts/generate.py`](scripts/generate.py)
defines the full roster and teams, then emits `agents/` and `teams/`.

---

## ❓ FAQ

**Do these replace my tool's built-in agent?** No — they're added alongside, invoked by name.

**Will `add` clobber my existing files?** No. It skips files that already exist unless you pass `--force`.

**Global or project?** Most tools support both. `--project` keeps agents with the repo (commit them,
share with the team); the default is your global user config. Cursor is project-only; Codex is global-only.

**Can I customize the agents?** Yes — fork, edit `scripts/generate.py`, run it, and install from your fork.

---

## 🤝 Contributing

1. Fork this repo
2. Add an entry to `AGENTS` in [`scripts/generate.py`](scripts/generate.py) — `title`, `role`, `does`, `principles`, `use`
3. Add the slug to one or more teams in `TEAMS`
4. Run `python scripts/generate.py` and commit the generated files
5. Open a PR

---

## 🔗 Related

- [**claude-crew**](https://github.com/hlsitechio/claude-crew) — production agent presets for Claude Code
- [**claude-memory**](https://github.com/hlsitechio/claude-memory) — persistent memory for Claude Code sessions

<div align="center">

---

**Write once. Deploy anywhere.** · 60 agents · 10 teams · 6 tools · one command.

MIT License

</div>
