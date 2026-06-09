#!/usr/bin/env python3
"""Add canonical Claude Code frontmatter (name + description) to every cast/*/agent.md.

Idempotent: skips files that already start with a YAML frontmatter block.
The body below the frontmatter is the personality system prompt; adapters in the
CLI transform this canonical form into each tool's required format.
"""
from __future__ import annotations

import pathlib
import sys

CAST = pathlib.Path(__file__).resolve().parent.parent / "agents"

# slug -> one-line description used for Claude Code auto-delegation.
DESCRIPTIONS: dict[str, str] = {
    "alien": "Code help from a baffled extraterrestrial observer. Use for a fresh, defamiliarizing take on your code.",
    "aragorn": "Reluctant tech-lead energy. Use for steady, humble leadership on architecture and team calls.",
    "astronaut": "Mission-control precision. Use for careful, checklist-driven reviews where failure is not an option.",
    "auctioneer": "Rapid-fire fast-talking reviewer. Use when you want quick, high-tempo verdicts on changes.",
    "aussie": "Laid-back Australian mate. Use for blunt, friendly, no-worries code feedback.",
    "bartender": "Wise storyteller who debugs over a drink. Use for relaxed, anecdotal mentoring.",
    "bob-ross": "Gentle, encouraging debugger. Use when you want calm, judgement-free help and 'happy little fixes'.",
    "c3po": "Anxious probability-calculating droid. Use for risk-averse reviews that surface everything that could fail.",
    "cat": "Aloof feline dev who helps on its own terms. Use for sardonic, low-effort-high-impact takes.",
    "coach": "High-energy hype person. Use when you want motivation and celebration of wins.",
    "conspiracy-theorist": "Everything-is-connected bug hunter. Use to chase subtle, system-wide root causes.",
    "darth-vader": "Dark-side reviewer. Use for intimidating, uncompromising reviews of error handling and discipline.",
    "david-attenborough": "Nature-documentary narrator. Use to narrate your codebase and dev behavior as wildlife.",
    "dobby": "Eager, devoted helper elf. Use for enthusiastic assistance and relentless bug-finding.",
    "dog": "Boundlessly excited pup. Use when you want pure, joyful encouragement on every commit.",
    "drill-sergeant": "Military code reviewer. Use for tough-love discipline on tests, standards, and rigor.",
    "dumbledore": "Cryptic, wise headmaster. Use for thoughtful, big-picture guidance with gentle riddles.",
    "dungeon-master": "D&D narrator. Use to turn debugging into a tabletop quest with dice rolls and stakes.",
    "escape-room": "Puzzle master on a timer. Use to gamify debugging as a race-against-the-clock escape room.",
    "floki": "Mad-genius shipwright. Use for wildly inventive, vision-driven architecture brainstorms.",
    "gandalf": "Epic-gravitas staff engineer who guards the main branch. Use for high-stakes reviews and 'YOU SHALL NOT MERGE'.",
    "ghost": "Spectral presence haunting the repo since commit #1. Use for eerie reminders of legacy and history.",
    "gollum": "Split-personality reviewer. Use for chaotic dual-voice takes that argue both sides of a decision.",
    "gordon-ramsay": "Brutally honest chef-style code reviewer. Use for harsh, passionate, high-standards reviews.",
    "grandma": "Sweet, caring coder. Use for warm, patient, beginner-friendly help (and a snack).",
    "hagrid": "Gentle giant who means well. Use for kind, plainspoken reassurance after mistakes.",
    "hodor": "One-word loyal guardian. Use for minimalist, expressive 'Hodor!' reactions that gate the door.",
    "hulk": "SMASH bad code. Use for blunt, high-impact takedowns of spaghetti and missing error handling.",
    "italian-chef": "Passionate Italian cook. Use for expressive feedback about code that lacks soul.",
    "jazz-musician": "Smooth improviser. Use for cool, freeform thinking about the lines you DON'T write.",
    "jon-snow": "Reluctant know-nothing on-call. Use for humble, earnest help that admits uncertainty.",
    "karen": "Wants to speak to the manager. Use for demanding, escalation-driven scrutiny of the codebase.",
    "medieval-knight": "Honor-bound code knight. Use for chivalrous, by-the-code defense of quality standards.",
    "morgan-freeman": "Calm, wise narrator. Use for soothing, profound narration of your code's journey.",
    "motivational-speaker": "Tony-Robbins energy. Use to unleash your inner 10x developer with relentless positivity.",
    "movie-trailer": "Epic trailer voiceover. Use to dramatize features and bugs as blockbuster cinema.",
    "mr-rogers": "Kind neighbor. Use for warm, affirming, psychologically-safe code feedback.",
    "news-anchor": "Breaking-news broadcaster. Use to report build status and incidents as live news.",
    "noir-detective": "Hard-boiled bug hunter. Use for moody, methodical investigation of mysterious bugs.",
    "obi-wan": "High-ground Jedi mentor. Use for wise, principled guidance on resisting tech-debt temptation.",
    "old-timer": "Grumpy veteran dev. Use for crusty 'back in my day' wisdom about fundamentals.",
    "pirate": "Nautical buccaneer dev. Use for swashbuckling, adventurous takes on your code's high seas.",
    "poet": "Writes code review in verse. Use for lyrical, reflective feedback rendered as poetry.",
    "professor": "Rigorous academic. Use for citation-backed, first-principles explanations and reviews.",
    "ragnar": "Bold viking raider. Use for fearless, ship-it-to-production conquest energy.",
    "rapper": "Bars-and-rhymes reviewer. Use for rhythmic, punchy feedback with flow.",
    "reality-tv": "Drama-host narrator. Use to turn code reviews into high-stakes reality-show suspense.",
    "robot": "Literal machine. Use for precise, unemotional, line-and-column-exact analysis.",
    "samuel-l-jackson": "Intense, fed-up reviewer. Use for emphatic, no-nonsense takedowns of recurring bugs.",
    "shakespeare": "The Bard. Use for eloquent, Elizabethan feedback on the tragedy of your bugs.",
    "sherlock-holmes": "Deductive detective. Use for sharp, evidence-driven root-cause analysis.",
    "snape": "Savage, exacting reviewer. Use for cutting, detail-obsessed critique that misses nothing.",
    "sports-commentator": "Live play-by-play. Use to broadcast your coding session with breathless excitement.",
    "stand-up-comedian": "Jokes and punchlines. Use for witty, comedic-but-correct feedback.",
    "superhero": "FIXMAN to the rescue. Use for heroic, can-do energy when tackling tough bugs.",
    "surfer": "Chill surfer dude. Use for relaxed, gnarly-bug-no-worries vibes.",
    "texting-teen": "Gen-Z texter. Use for blunt, slang-heavy, brutally honest short feedback.",
    "thanos": "Perfectly-balanced reviewer. Use for ruthless prioritization and eliminating technical debt.",
    "the-hound": "Cynic who hates fancy code. Use for grounded contempt of over-engineering and buzzwords.",
    "therapist": "Code-feelings counselor. Use to reflect on frustration and process bugs emotionally.",
    "thor": "God of Thunder. Use for booming, mythic celebration of passing tests and worthy code.",
    "time-traveler": "Visitor from the future. Use for prescient warnings about decisions you'll regret.",
    "tony-stark": "Genius billionaire engineer. Use for cocky, brilliant, build-it-in-a-cave problem solving.",
    "tyrion": "Sharp wit who drinks and debugs. Use for clever, pragmatic, politically-aware advice.",
    "valley-girl": "Like, totally a reviewer. Use for bubbly, slang-rich, surprisingly-sharp feedback.",
    "villain": "Charming evil genius. Use for menacing-but-helpful critique that admires your ambition.",
    "weather-reporter": "Forecast-format reporter. Use to predict runtime conditions and incoming error fronts.",
    "wrestler": "WWE-style commentator. Use for bombastic, body-slam reactions to memory leaks.",
    "yoda": "Force-wielding master. Use for inverted-syntax wisdom on handling absence and the dark side of bugs.",
    "zen-master": "Peaceful minimalist. Use for calm wisdom on simplicity and the code you choose not to write.",
}


def main() -> int:
    missing = []
    updated = 0
    skipped = 0
    for agent in sorted(CAST.glob("*/agent.md")):
        slug = agent.parent.name
        text = agent.read_text(encoding="utf-8")
        if text.lstrip().startswith("---"):
            skipped += 1
            continue
        desc = DESCRIPTIONS.get(slug)
        if not desc:
            missing.append(slug)
            continue
        # Escape any embedded double-quotes in the description for valid YAML.
        safe = desc.replace('"', "'")
        fm = f'---\nname: {slug}\ndescription: "{safe}"\n---\n\n'
        agent.write_text(fm + text, encoding="utf-8", newline="\n")
        updated += 1

    print(f"updated={updated} skipped={skipped} missing={len(missing)}")
    if missing:
        print("MISSING DESCRIPTIONS:", ", ".join(missing))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
