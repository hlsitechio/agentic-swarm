<div align="center">

# 🎭 Claude Cast

### 70 AI personality agents — organized into teams, installed with one command.

**Give your AI a character. Pick a team. Make coding fun.**

[![Claude Code](https://img.shields.io/badge/Claude_Code-Compatible-blueviolet?style=flat-square&logo=anthropic)](https://code.claude.com)
[![Codex](https://img.shields.io/badge/Codex-Compatible-black?style=flat-square&logo=openai)](https://developers.openai.com/codex)
[![OpenCode](https://img.shields.io/badge/OpenCode-Compatible-00bcd4?style=flat-square)](https://opencode.ai)
[![Cursor](https://img.shields.io/badge/Cursor-Compatible-blue?style=flat-square)](https://cursor.com)
[![Personalities](https://img.shields.io/badge/Personalities-70-orange?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)]()

*"This function is RAWWW!" — Gordon Ramsay reviewing your code*

</div>

---

## What is this?

70 personality agents that make your AI coding assistant talk like your favorite characters.
Gordon Ramsay reviews your code. Gandalf blocks your bad PRs. Snape roasts your null pointers.

The new part: they're sorted into **teams**, and you install a whole team — or a single
character — into your assistant with **one command**. No cloning, no copy-paste.

**Every persona is technically accurate.** The code advice is real. The delivery is entertainment.

## ⚡ Quick start

```bash
# Browse the teams
npx github:hlsitechio/claude-cast list

# Install a whole team into Claude Code (global)
npx github:hlsitechio/claude-cast add roast-squad

# Install one character
npx github:hlsitechio/claude-cast add gandalf
```

Then in Claude Code, just say *"Use the gordon-ramsay agent to review this PR"* — or let it
auto-delegate. That's it. 🎉

> No Node? Use the one-line installer (Claude Code, macOS/Linux):
> ```bash
> curl -fsSL https://raw.githubusercontent.com/hlsitechio/claude-cast/main/install.sh | sh -s roast-squad
> ```
> Windows PowerShell:
> ```powershell
> irm https://raw.githubusercontent.com/hlsitechio/claude-cast/main/install.ps1 | iex; Install-ClaudeCast roast-squad
> ```

## 🎯 Works with your assistant

One command, many tools. Pick your target with `--target`:

| Tool | Installs to | How you invoke it | Flag |
|------|-------------|-------------------|------|
| **Claude Code** | `~/.claude/agents/` | auto-delegate · `/agents` | *(default)* |
| **OpenCode** | `~/.config/opencode/agents/` | `@character` | `--target=opencode` |
| **Codex CLI** | `~/.codex/prompts/` | `/prompts:character` | `--target=codex` |
| **Cursor** | `.cursor/rules/` *(project)* | `@character` in chat | `--target=cursor` |
| **Pi** | `~/.pi/agent/prompts/` | `/character` | `--target=pi` |
| **Anything** | `./claude-cast-agents/` | reference the `.md` | `--target=generic` |

```bash
# Same characters, any tool:
npx github:hlsitechio/claude-cast add wise-council --target=opencode
npx github:hlsitechio/claude-cast add detective-agency --target=cursor --project
npx github:hlsitechio/claude-cast add gandalf --target=claude,codex   # multiple at once
```

Use `--project` to install into the current repo instead of your global config, and `--dry-run`
to preview first.

---

## 🧩 Teams

Invoke a **team** when you want a whole vibe; invoke a **character** when you want one voice.

### 🛠️ Functional teams — *invoke a team for a job*

| Team | | For | Members |
|------|--|-----|---------|
| 🔥 `roast-squad` | **The Roast Squad** | Brutal, high-standards code review | Gordon Ramsay · Snape · Drill Sergeant · Darth Vader · Thanos · The Hound · Villain · Samuel L. Jackson |
| 🧠 `wise-council` | **The Wise Council** | Architecture & deep guidance | Gandalf · Yoda · Obi-Wan · Dumbledore · Professor · Sherlock · Zen Master · Bartender |
| 🤗 `comfort-crew` | **The Comfort Crew** | Gentle, beginner-friendly help | Bob Ross · Mr. Rogers · Grandma · Morgan Freeman · Therapist · Hagrid · Dobby |
| 💪 `hype-squad` | **The Hype Squad** | Motivation & energy | Coach · Motivational Speaker · Wrestler · Sports Commentator · Thor · Dog · Hulk · Superhero |
| 🔍 `detective-agency` | **The Detective Agency** | Bug hunting & investigation | Noir Detective · Sherlock · Conspiracy Theorist · Time Traveler · Escape Room · Ghost · Robot |
| 😂 `comedy-club` | **The Comedy Club** | Pure levity | Stand-up · Reality TV · Auctioneer · Valley Girl · Texting Teen · Surfer · Karen · Cat · Old-Timer |
| 🎙️ `narrators` | **The Narrators** | Narrate your session | Morgan Freeman · David Attenborough · News Anchor · Weather Reporter · Movie Trailer · Sports Commentator · Dungeon Master |
| 🎨 `creative-studio` | **The Creative Studio** | Code as art | Poet · Rapper · Jazz Musician · Shakespeare · Bob Ross |

### 🌌 Universe teams — *assemble your favorite franchise*

| Team | | Members |
|------|--|---------|
| ⚔️ `middle-earth` | **The Fellowship** | Gandalf · Gollum · Aragorn · Medieval Knight |
| 🧙 `hogwarts` | **Hogwarts Faculty** | Dumbledore · Snape · Dobby · Hagrid |
| 🦸 `avengers` | **The Avengers** | Tony Stark · Thor · Hulk · Thanos |
| 🌌 `galactic-order` | **The Galactic Order** | Darth Vader · Obi-Wan · C-3PO · Yoda |
| 🐉 `westeros` | **The Westeros Court** | Tyrion · Hodor · The Hound · Jon Snow |
| ⚡ `norse-raiders` | **The Norse Raiders** | Ragnar · Floki · Thor |
| 🌍 `world-tour` | **The World Tour** | Aussie · Italian Chef · Surfer · Pirate · Astronaut · Alien |

> Characters can appear in more than one team — teams are curated playlists, not exclusive buckets.

---

## 🎬 The full cast (70)

<details>
<summary><b>Click to expand all 70 characters</b></summary>

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

Each lives in [`cast/<name>/agent.md`](cast/) with ready-to-use frontmatter.

</details>

---

## 🧰 CLI reference

```text
npx github:hlsitechio/claude-cast <command> [names...] [flags]

Commands
  list [team]            List all teams, or one team's members
  add  <name...>         Install character(s) and/or whole team(s)
  remove <name...>       Uninstall character(s)/team(s)
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

Every `cast/<name>/agent.md` is already a valid Claude Code subagent (it has frontmatter):

```bash
cp cast/gordon-ramsay/agent.md ~/.claude/agents/gordon-ramsay.md
```

## 🤝 Contributing

**Add your own character!** The cast is always auditioning.

1. Fork this repo
2. Create `cast/your-character/agent.md` with `Personality`, `Vocabulary`, `Example`, `Rules`
3. Add a `name` + `description` to the frontmatter (run `python scripts/add_frontmatter.py` after adding a description)
4. Add them to one or more teams in `scripts/build_teams.py`, then run `python scripts/build_teams.py`
5. Submit a PR — if it makes us laugh **and** teaches something, you're in

## 🔗 Related

- [**claude-crew**](https://github.com/hlsitechio/claude-crew) — Serious production agents (code reviewer, security auditor, DevOps)
- [**claude-memory**](https://github.com/hlsitechio/claude-memory) — Persistent memory for Claude Code sessions

---

<div align="center">

**70 characters. 15 teams. One command.**

*Technically accurate. Hilariously delivered.*

MIT License

</div>
