# Design system

**Mode:** Read, with one Persuade moment (the hero and the assistant). A recruiter should know who this is, what he built and why to talk to him within 30 seconds.

**Thesis:** an engineer's notebook, not a landing page. Editorial reading column, a quiet sidebar for wayfinding, and one signature: authored engineering schematics in indigo ink on a faint grid, one per project, instead of stock thumbnails.

## Tokens (`src/app/globals.css`)

| Role | Light | Dark |
|---|---|---|
| Ground | `#f6f5f1` warm off-white | `#0f1013` |
| Rail (sidebar) | `#efede7` | `#131418` |
| Surface (cards) | `#ffffff` | `#17181d` |
| Ink | `#16171b` | `#ecebe6` |
| Muted text | `#5c6170` (≥4.5:1) | `#9a9fab` |
| Hairline | `#e2dfd7` | `#262830` |
| Accent | `#2b3bd1` deep electric indigo | `#8e9bff` |
| Status | `#1f8a4c` | `#4fc883` |

Colour strategy: restrained. Neutrals plus one accent that does real jobs: the assistant, schematic ink, focus rings, selection, links on hover.

## Type

Geist Sans for everything readable; Geist Mono only for data: dates, stack tags, schematic labels, code. Display tracking −0.035 to −0.04em, body 15 to 17px at 1.7 line height, reading measure ≤ 68ch.

## Layout

Sidebar 256px fixed from 1024px up; a sticky top bar with a full-screen menu below that. Reading column 46rem, project grids 68rem.

## Motion

One authored moment per surface: page content eases in once (`page-enter`), cards lift 2px and their schematic redraws on hover, the status dot breathes. Everything collapses under `prefers-reduced-motion`.

## Components

Primary button is ink-filled; secondary is bordered; the accent fill is reserved for the assistant's Ask button. Cards: 1px hairline, soft offset shadow, 12px radius. No gradients, no glass, no icon-heading-text card grids.
