# 🎭 claude-cast quick installer (Windows / PowerShell) — Claude Code, no Node required.
#
#   irm https://raw.githubusercontent.com/hlsitechio/claude-cast/main/install.ps1 | iex; Install-ClaudeCast roast-squad
#
# Or download then run:
#   .\install.ps1 gandalf yoda -Project
#
# For Codex / OpenCode / Cursor / Pi (full multi-tool support) use the CLI:
#   npx github:hlsitechio/claude-cast add <team> --target=opencode
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Names,
    [switch]$Project,
    [switch]$Global
)

function Install-ClaudeCast {
    param([string[]]$Names, [switch]$Project, [switch]$Global)

    $repo = if ($env:CLAUDE_CAST_REPO) { $env:CLAUDE_CAST_REPO } else { "https://raw.githubusercontent.com/hlsitechio/claude-cast/main" }
    $dest = if ($Project) { Join-Path (Get-Location) ".claude\agents" } else { Join-Path $HOME ".claude\agents" }

    if (-not $Names -or $Names.Count -eq 0) {
        Write-Host "usage: Install-ClaudeCast <team-or-character> [more...] [-Project]"
        Write-Host "browse teams: https://github.com/hlsitechio/claude-cast#teams"
        return
    }

    New-Item -ItemType Directory -Force -Path $dest | Out-Null

    function Install-One($slug) {
        try {
            $md = Invoke-RestMethod -Uri "$repo/cast/$slug/agent.md" -ErrorAction Stop
            Set-Content -Path (Join-Path $dest "$slug.md") -Value $md -Encoding utf8
            Write-Host "  + $slug"
        } catch {
            Write-Host "  ! not found: $slug" -ForegroundColor Yellow
        }
    }

    foreach ($name in $Names) {
        try {
            $team = Invoke-RestMethod -Uri "$repo/teams/$name.json" -ErrorAction Stop
            Write-Host "[team] $name" -ForegroundColor Cyan
            foreach ($m in $team.members) { Install-One $m }
        } catch {
            Install-One $name
        }
    }

    Write-Host "OK installed -> $dest" -ForegroundColor Green
    Write-Host "   restart Claude Code (or run /agents) to load them."
}

# If invoked directly (not dot-sourced via iex), run with the bound params.
if ($MyInvocation.InvocationName -ne '.' -and $Names) {
    Install-ClaudeCast -Names $Names -Project:$Project -Global:$Global
}
