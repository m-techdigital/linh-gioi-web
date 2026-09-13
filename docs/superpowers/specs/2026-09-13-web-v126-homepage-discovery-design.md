# WEB v1.26 Homepage Discovery & Media Storytelling — Design

## Goal
Tighten the homepage into three high-signal discovery entrances (Class, World, Story) instead of repeating the full deep-route summaries.

## Base First architecture
- `packages/content` owns the three spotlight references and points back to canonical class/world/story datasets.
- `packages/ui` owns generic `MediaFrame` presentation.
- `apps/web` owns `HomeDiscoveryShowcase` composition and web-specific visual treatment.
- `/classes`, `/game`, `/story` remain the deep owners of detailed content.

## Constraints
No duplicated canonical class/world/story data, no fake gameplay screenshot, no backend/CMS work, and no production-release claim.
