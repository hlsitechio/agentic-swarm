#!/bin/sh
# 🎭 claude-cast quick installer — Claude Code, no Node required.
#
#   curl -fsSL https://raw.githubusercontent.com/hlsitechio/claude-cast/main/install.sh | sh -s roast-squad
#   curl -fsSL .../install.sh | sh -s gandalf yoda --project
#
# For Codex / OpenCode / Cursor / Pi (full multi-tool support) use the CLI:
#   npx github:hlsitechio/claude-cast add <team> --target=opencode
set -eu

REPO="${CLAUDE_CAST_REPO:-https://raw.githubusercontent.com/hlsitechio/claude-cast/main}"
DEST="$HOME/.claude/agents"
NAMES=""

for a in "$@"; do
  case "$a" in
    --project) DEST="$(pwd)/.claude/agents" ;;
    --global)  DEST="$HOME/.claude/agents" ;;
    -*)        echo "ignoring unknown flag: $a" ;;
    *)         NAMES="$NAMES $a" ;;
  esac
done

if [ -z "$NAMES" ]; then
  echo "usage: ... | sh -s <team-or-character> [more...] [--project]"
  echo "browse teams: https://github.com/hlsitechio/claude-cast#teams"
  exit 1
fi

mkdir -p "$DEST"

install_one() {
  slug="$1"
  if curl -fsSL "$REPO/cast/$slug/agent.md" -o "$DEST/$slug.md" 2>/dev/null; then
    echo "  + $slug"
  else
    echo "  ! not found: $slug"
    rm -f "$DEST/$slug.md"
  fi
}

for name in $NAMES; do
  tjson="$(curl -fsSL "$REPO/teams/$name.json" 2>/dev/null || true)"
  if [ -n "$tjson" ]; then
    echo "📦 team: $name"
    members="$(printf '%s' "$tjson" | sed -n '/"members"/,/]/p' | grep -oE '"[a-z0-9-]+"' | tr -d '"' | grep -v '^members$')"
    for m in $members; do install_one "$m"; done
  else
    install_one "$name"
  fi
done

echo "✅ installed → $DEST"
echo "   restart Claude Code (or run /agents) to load them."
