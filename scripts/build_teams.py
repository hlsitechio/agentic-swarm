#!/usr/bin/env python3
"""Generate teams/*.json manifests and teams/index.json from a single definition.

Run after editing TEAMS below. Validates that every member slug has a matching
cast/<slug>/agent.md and warns about any cast member not in at least one team.
"""
from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CAST = ROOT / "agents"
TEAMS_DIR = ROOT / "teams"

# id -> (emoji, display name, tagline, [member slugs])
TEAMS: dict[str, tuple[str, str, str, list[str]]] = {
    # ── Functional teams: invoke a team for a job ──────────────────────────
    "roast-squad": ("🔥", "The Roast Squad", "Brutal, high-standards code review",
        ["gordon-ramsay", "snape", "drill-sergeant", "darth-vader", "thanos", "the-hound", "villain", "samuel-l-jackson"]),
    "wise-council": ("🧠", "The Wise Council", "Architecture & deep guidance",
        ["gandalf", "yoda", "obi-wan", "dumbledore", "professor", "sherlock-holmes", "zen-master", "bartender"]),
    "comfort-crew": ("🤗", "The Comfort Crew", "Gentle, supportive, beginner-friendly",
        ["bob-ross", "mr-rogers", "grandma", "morgan-freeman", "therapist", "hagrid", "dobby"]),
    "hype-squad": ("💪", "The Hype Squad", "Motivation & relentless energy",
        ["coach", "motivational-speaker", "wrestler", "sports-commentator", "thor", "dog", "hulk", "superhero"]),
    "detective-agency": ("🔍", "The Detective Agency", "Bug hunting & investigation",
        ["noir-detective", "sherlock-holmes", "conspiracy-theorist", "time-traveler", "escape-room", "ghost", "robot"]),
    "comedy-club": ("😂", "The Comedy Club", "Pure levity while you code",
        ["stand-up-comedian", "reality-tv", "auctioneer", "valley-girl", "texting-teen", "surfer", "karen", "cat", "old-timer"]),
    "narrators": ("🎙️", "The Narrators", "Turn your session into a broadcast",
        ["morgan-freeman", "david-attenborough", "news-anchor", "weather-reporter", "movie-trailer", "sports-commentator", "dungeon-master"]),
    "creative-studio": ("🎨", "The Creative Studio", "Code as art — verse, rhyme & calm",
        ["poet", "rapper", "jazz-musician", "shakespeare", "bob-ross"]),
    # ── Universe teams: assemble your favorite franchise ───────────────────
    "middle-earth": ("⚔️", "The Fellowship", "Middle-earth assembles",
        ["gandalf", "gollum", "aragorn", "medieval-knight"]),
    "hogwarts": ("🧙", "Hogwarts Faculty", "Wizarding code review",
        ["dumbledore", "snape", "dobby", "hagrid"]),
    "avengers": ("🦸", "The Avengers", "Earth's mightiest engineers",
        ["tony-stark", "thor", "hulk", "thanos"]),
    "galactic-order": ("🌌", "The Galactic Order", "A galaxy far, far away",
        ["darth-vader", "obi-wan", "c3po", "yoda"]),
    "westeros": ("🐉", "The Westeros Court", "Code is coming",
        ["tyrion", "hodor", "the-hound", "jon-snow"]),
    "norse-raiders": ("⚡", "The Norse Raiders", "Sail to production at dawn",
        ["ragnar", "floki", "thor"]),
    "world-tour": ("🌍", "The World Tour", "Accents & attitudes from everywhere",
        ["aussie", "italian-chef", "surfer", "pirate", "astronaut", "alien"]),
}


def main() -> int:
    TEAMS_DIR.mkdir(exist_ok=True)
    known = {p.parent.name for p in CAST.glob("*/agent.md")}
    covered: set[str] = set()
    errors: list[str] = []
    index = []

    for team_id, (emoji, name, tagline, members) in TEAMS.items():
        for m in members:
            if m not in known:
                errors.append(f"{team_id}: unknown member '{m}'")
            covered.add(m)
        manifest = {
            "id": team_id,
            "emoji": emoji,
            "name": name,
            "tagline": tagline,
            "members": members,
        }
        (TEAMS_DIR / f"{team_id}.json").write_text(
            json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
        index.append({"id": team_id, "emoji": emoji, "name": name,
                      "tagline": tagline, "size": len(members)})

    (TEAMS_DIR / "index.json").write_text(
        json.dumps({"teams": index}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    orphans = sorted(known - covered)
    print(f"teams={len(TEAMS)} members_covered={len(covered)}/{len(known)}")
    if orphans:
        print("NOT IN ANY TEAM:", ", ".join(orphans))
    if errors:
        print("ERRORS:")
        for e in errors:
            print("  -", e)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
