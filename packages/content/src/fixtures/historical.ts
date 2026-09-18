import type {
  PublicPageFocus,
  PublicRoadmapItem,
  ResponsiveBreakpoint,
  VisualPolishItem,
} from "../types";

export const publicRoadmapItems: PublicRoadmapItem[] = [
  {
    version: "v1.6",
    title: "Public UX / content polish",
    status: "planned",
    summary: "Refine player-facing pages, homepage hierarchy, roadmap, download readiness and support guidance."
  },
  {
    version: "v1.7",
    title: "Visual responsive polish",
    status: "planned",
    summary: "Improved visual hierarchy, page composition, mobile/tablet readability and player-facing calls to action while runtime/browser checks remain guardrails."
  },
  {
    version: "v1.9",
    title: "News and guide detail pages",
    status: "current",
    summary: "Deepen article detail UX, guide detail pages, route-level explanations and static status/download transparency without CMS or backend claims."
  },
  {
    version: "v1.10",
    title: "Status / download trust polish",
    status: "current",
    summary: "Clarifies release trust, checksum/provenance evidence, status visibility and support expectations before any download or production claim appears."
  },
  {
    version: "v1.11",
    title: "Community / roadmap onboarding",
    status: "current",
    summary: "Connects new-player onboarding, community expectations, roadmap decision gates and staged release messaging without live community or backend claims."
  },

  {
    version: "v1.13",
    title: "Thế giới / lối chơi loop depth",
    status: "current",
    summary: "Deepens Spirit Gate-to-Training Stone loop, beginner expectations, guide-to-world navigation and route-level scope boundaries without combat/economy claims."
  },
  {
    version: "v1.14",
    title: "Player safety / FAQ hỗ trợ polish",
    status: "current",
    summary: "Clarifies player safety wording, privacy-safe issue reporting, hỗ trợ thử nghiệm expectations and community conduct without ticket/moderation backend claims."
  },
  {
    version: "v1.15",
    title: "Accessibility / readability polish",
    status: "current",
    summary: "Improves heading clarity, mobile scannability, focus order, skip-to-content affordance and route-level reading comfort without claiming formal audit compliance."
  },
  {
    version: "v1.16",
    title: "Performance / copy / asset budget polish",
    status: "current",
    summary: "Turns performance budget into player-facing copy discipline: lighter route composition, hiệu ứng CSS nhẹs, perceived-load clarity and mobile reading density without chứng nhận Web Vitals."
  },
  {
    version: "v1.17",
    title: "Route continuity / conversion-safe polish",
    status: "current",
    summary: "Connects Start, Game Loop, Download Trust, Status, Support Safety and Performance through safe next-step CTAs without fake conversion or sẵn sàng phát hành claims."
  },
  {
    version: "v1.18",
    title: "Player trust / release narrative",
    status: "current",
    summary: "Clarifies staged release story, closed-test readiness, download/status/support journey and proof-before-claim messaging without adding real release backend."
  },
  {
    version: "v1.20",
    title: "Closed tester information pack",
    status: "current",
    summary: "Explains tester checklist, privacy-safe feedback, known limitations and device report templates without opening tester intake or backend collection."
  },
  {
    version: "v1.21",
    title: "FAQ search and helpfulness polish",
    status: "current",
    summary: "Groups FAQ answers, issue-category routes and helpful next steps so players can self-serve support without a fake search backend or ticket system."
  },

  {
    version: "WEB-08",
    title: "Game backend contract sync",
    status: "blocked",
    summary: "Requires accepted Auth/API/DB/RBAC/audit contract from canonical game backend before real integration."
  },
  {
    version: "Future",
    title: "Production deployment",
    status: "planned",
    summary: "Only after source, runtime, security, content ownership, observability and release artifact gates are accepted."
  }
];


export const visualPolishItems: VisualPolishItem[] = [
  {
    label: "Hero hierarchy",
    title: "Một màn đầu giống cổng vào game hơn",
    summary: "Hero copy, status badges and CTA grouping now prioritize player understanding before technical provenance."
  },
  {
    label: "World preview",
    title: "Spirit Gate / Gate Keeper / Training Stone được neo bằng bố cục thị giác",
    summary: "World cards are presented as scene anchors so the site feels closer to an RPG landing page instead of a technical handoff page."
  },
  {
    label: "Guardrail wording",
    title: "Runtime/e2e chỉ đứng ở vai trò hỗ trợ",
    summary: "The public site now states product intent first and keeps technical gates as confidence notes, not the main message."
  }
];

export const responsiveBreakpoints: ResponsiveBreakpoint[] = [
  {
    device: "desktop",
    label: "Desktop",
    layout: "Hero + stage preview side-by-side, wide card grids, clear CTA rail",
    priority: "Give returning players and owner review a fast overview of world, download readiness and roadmap."
  },
  {
    device: "tablet",
    label: "Tablet",
    layout: "Two-column cards, compressed stat strip, readable touch targets",
    priority: "Keep public pages reviewable without horizontal scroll or crowded dashboard feel."
  },
  {
    device: "mobile",
    label: "Mobile",
    layout: "Single-column story flow, sticky-readable navigation, full-width CTAs",
    priority: "Let a player understand what exists, what is blocked, and where to go next in under one minute."
  }
];

export const publicPageFocus: PublicPageFocus[] = [
  {
    route: "/",
    title: "Homepage",
    playerNeed: "Understand what Linh Giới Online is and what can be followed today.",
    polish: "Visual hero, CTA rail, scene preview and explicit non-claim band."
  },
  {
    route: "/game",
    title: "World page",
    playerNeed: "See the current world anchors before combat, account and economy systems are opened.",
    polish: "Scene-anchor cards for Spirit Gate, Gate Keeper and Training Stone."
  },
  {
    route: "/download",
    title: "Download page",
    playerNeed: "Know whether a real public build exists and what blocks it.",
    polish: "Readiness checklist, future channel cards and no fake download button."
  },
  {
    route: "/support",
    title: "Support page",
    playerNeed: "Find static help without expecting account lookup or ticket backend.",
    polish: "Grouped FAQ guidance with backend-contract blocked state."
  }
];
