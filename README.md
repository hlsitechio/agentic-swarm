<div align="center">

# 🐝 Agentic Swarm

### Deployable swarms of specialist AI agents — organized into teams, installed with one command.

**Pick a team. Run one command. Your coding assistant gains a whole squad of specialists.**

[![Claude Code](https://img.shields.io/badge/Claude_Code-Compatible-blueviolet?style=flat-square&logo=anthropic)](https://code.claude.com)
[![Codex](https://img.shields.io/badge/Codex-Compatible-black?style=flat-square&logo=openai)](https://developers.openai.com/codex)
[![OpenCode](https://img.shields.io/badge/OpenCode-Compatible-00bcd4?style=flat-square)](https://opencode.ai)
[![Cursor](https://img.shields.io/badge/Cursor-Compatible-blue?style=flat-square)](https://cursor.com)
[![Agents](https://img.shields.io/badge/Agents-70-orange?style=flat-square)]()
[![Teams](https://img.shields.io/badge/Teams-15-success?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)]()

</div>

---

## What is this?

**Agentic Swarm** is a library of **70 specialist AI agents**, sorted into **15 teams (swarms)**,
that you install into your coding assistant with **one command** — no cloning, no copy-paste.

Each agent has a distinct voice and a focus: a brutal code reviewer, a calm architect, a relentless
bug hunter, a hype coach. Deploy a whole **swarm** when you want a job covered from every angle, or
drop in a single agent when you want one voice.

**Every agent is technically accurate.** The advice is real engineering. The delivery has character.

## ⚡ Quick start

```bash
# Browse the swarms
npx github:hlsitechio/agentic-swarm list

# Deploy a whole team into Claude Code (global)
npx github:hlsitechio/agentic-swarm add roast-squad

# Or a single agent
npx github:hlsitechio/agentic-swarm add gandalf
```

Then in Claude Code, say *"Use the gordon-ramsay agent to review this PR"* — or let it auto-delegate. ✅

> **No Node?** One-line installer (Claude Code, macOS/Linux):
> ```bash
> curl -fsSL https://raw.githubusercontent.com/hlsitechio/agentic-swarm/main/install.sh | sh -s roast-squad
> ```
> Windows PowerShell:
> ```powershell
> irm https://raw.githubusercontent.com/hlsitechio/agentic-swarm/main/install.ps1 | iex; Install-Swarm roast-squad
> ```

## 🎯 Works with your assistant

One command, many tools. Choose your target with `--target`:

| Tool | Installs to | How you invoke it | Flag |
|------|-------------|-------------------|------|
| **Claude Code** | `~/.claude/agents/` | auto-delegate · `/agents` | *(default)* |
| **OpenCode** | `~/.config/opencode/agents/` | `@agent` | `--target=opencode` |
| **Codex CLI** | `~/.codex/prompts/` | `/prompts:agent` | `--target=codex` |
| **Cursor** | `.cursor/rules/` *(project)* | `@agent` in chat | `--target=cursor` |
| **Pi** | `~/.pi/agent/prompts/` | `/agent` | `--target=pi` |
| **Anything** | `./agentic-swarm-agents/` | reference the `.md` | `--target=generic` |

```bash
# Same agents, any tool:
npx github:hlsitechio/agentic-swarm add wise-council --target=opencode
npx github:hlsitechio/agentic-swarm add detective-agency --target=cursor --project
npx github:hlsitechio/agentic-swarm add gandalf --target=claude,codex   # multiple at once
```

Use `--project` to install into the current repo instead of your global config, and `--dry-run`
to preview first.

---

## 🧩 The swarms

Deploy a **team** for a whole vibe; deploy a single **agent** for one voice.

### 🛠️ Functional swarms — *deploy a team for a job*

| Team | | For | Agents |
|------|--|-----|--------|
| 🔥 `roast-squad` | **The Roast Squad** | Brutal, high-standards code review | Gordon Ramsay · Snape · Drill Sergeant · Darth Vader · Thanos · The Hound · Villain · Samuel L. Jackson |
| 🧠 `wise-council` | **The Wise Council** | Architecture & deep guidance | Gandalf · Yoda · Obi-Wan · Dumbledore · Professor · Sherlock · Zen Master · Bartender |
| 🤗 `comfort-crew` | **The Comfort Crew** | Gentle, beginner-friendly help | Bob Ross · Mr. Rogers · Grandma · Morgan Freeman · Therapist · Hagrid · Dobby |
| 💪 `hype-squad` | **The Hype Squad** | Motivation & energy | Coach · Motivational Speaker · Wrestler · Sports Commentator · Thor · Dog · Hulk · Superhero |
| 🔍 `detective-agency` | **The Detective Agency** | Bug hunting & investigation | Noir Detective · Sherlock · Conspiracy Theorist · Time Traveler · Escape Room · Ghost · Robot |
| 😂 `comedy-club` | **The Comedy Club** | Pure levity | Stand-up · Reality TV · Auctioneer · Valley Girl · Texting Teen · Surfer · Karen · Cat · Old-Timer |
| 🎙️ `narrators` | **The Narrators** | Narrate your session | Morgan Freeman · David Attenborough · News Anchor · Weather Reporter · Movie Trailer · Sports Commentator · Dungeon Master |
| 🎨 `creative-studio` | **The Creative Studio** | Code as art | Poet · Rapper · Jazz Musician · Shakespeare · Bob Ross |

### 🌌 Universe swarms — *assemble your favorite franchise*

| Team | | Agents |
|------|--|--------|
| ⚔️ `middle-earth` | **The Fellowship** | Gandalf · Gollum · Aragorn · Medieval Knight |
| 🧙 `hogwarts` | **Hogwarts Faculty** | Dumbledore · Snape · Dobby · Hagrid |
| 🦸 `avengers` | **The Avengers** | Tony Stark · Thor · Hulk · Thanos |
| 🌌 `galactic-order` | **The Galactic Order** | Darth Vader · Obi-Wan · C-3PO · Yoda |
| 🐉 `westeros` | **The Westeros Court** | Tyrion · Hodor · The Hound · Jon Snow |
| ⚡ `norse-raiders` | **The Norse Raiders** | Ragnar · Floki · Thor |
| 🌍 `world-tour` | **The World Tour** | Aussie · Italian Chef · Surfer · Pirate · Astronaut · Alien |

> Agents can appear in more than one swarm — teams are curated rosters, not exclusive buckets.

---

## 🎬 The full roster (70 agents)

<details>
<summary><b>Click to expand all 70 agents</b></summary>

Gordon Ramsay · Yoda · Bob Ross · Noir Detective · David Attenborough · Dungeon Master · Coach ·
Drill Sergeant · Wrestler · Sports Commentator · Samuel L. Jackson · Motivational Speaker ·
Stand-up Comedian · Movie Trailer · Pirate · Conspiracy Theorist · Auctioneer · Reality TV ·
Morgan Freeman · Mr. Rogers · Zen Master · Professor · Bartender · Grandma · Shakespeare ·
Sherlock Holmes · Medieval Knight · Superhero · Villain · Ghost · Aussie · Italian Chef · Surfer ·
Robot · Alien · Time Traveler · Astronaut · Cat · Dog · Karen · Texting Teen · Valley Girl ·
Old-Timer · Poet · Rapper · Jazz Musician · News Anchor · Weather Reporter · Therapist ·
Escape Room · Dumbledore · Snape · Dobby · Hagrid · Gandalf · Gollum · Aragorn · Darth Vader ·
Obi-Wan · C-3PO · Tony Stark · Thor · Hulk · Thanos · Tyrion · Hodor · The Hound · Jon Snow ·
Ragnar · Floki

Each lives in [`agents/<name>/agent.md`](agents/) with ready-to-use frontmatter.

</details>

---

## 🧰 CLI reference

```text
npx github:hlsitechio/agentic-swarm <command> [names...] [flags]

Commands
  list [team]            List all swarms, or one team's agents
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

## 🙋 Manual install (no CLI)

Every `agents/<name>/agent.md` is already a valid Claude Code subagent (it ships with frontmatter):

```bash
cp agents/gordon-ramsay/agent.md ~/.claude/agents/gordon-ramsay.md
```

## 🤝 Contributing

**Add your own agent!** The roster is always open.

1. Fork this repo
2. Create `agents/your-agent/agent.md` with `Personality`, `Vocabulary`, `Example`, `Rules`
3. Add a description in `scripts/add_frontmatter.py`, then run `python scripts/add_frontmatter.py`
4. Add them to one or more teams in `scripts/build_teams.py`, then run `python scripts/build_teams.py`
5. Submit a PR — if it makes us smile **and** teaches something, you're in

## 🔗 Related

- [**claude-crew**](https://github.com/hlsitechio/claude-crew) — Serious production agents (code reviewer, security auditor, DevOps)
- [**claude-memory**](https://github.com/hlsitechio/claude-memory) — Persistent memory for Claude Code sessions

---

<div align="center">

**70 agents. 15 swarms. One command.**

*Technically accurate. Full of character. Ready for Claude Code, Codex, OpenCode, Cursor & Pi.*

MIT License

</div>
