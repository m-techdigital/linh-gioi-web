import type {
  ContentEntry,
  DownloadBuild,
  DownloadReadiness,
  PlayerJourneyStep,
  PublicHeroStat,
  PublicRoadmapItem,
  ResponsiveBreakpoint,
  SupportTopic,
  VisualPolishItem,
  WorldPillar,
  PublicPageFocus,
  CommunityPrinciple,
  WorldStoryChapter,
  BeginnerGuideSection,
  DownloadStatusNote,
  SupportFaq,
  CommunityReadinessStep,
  ContentDetailSection,
  GuideDetailStep,
  DownloadExplainer,
  StatusExplainer,
  DownloadTrustGate,
  ReleaseEvidenceRequirement,
  StatusTrustSurface,
  PlayerSupportExpectation,
  CommunityOnboardingPath,
  CommunityFeedbackChannel,
  RoadmapDecisionGate,
  StagedReleaseMessage,
  PublicContentHub,
  PlayerEntryQuestion,
  PublicRouteGroup,
  GameplayLoopStage,
  BeginnerExpectation,
  GuideWorldNavigationLink,
  GameplayScopeBoundary,
  PlayerSafetyPrinciple,
  SupportIssuePath,
  ClosedTestSupportExpectation,
  CommunityConductRule,
  AccessibilityReadabilityPrinciple,
  RouteReadabilityCheck,
  MobileScannabilityRule,
  FocusOrderCheckpoint,
  PerformanceCopyBudgetPrinciple,
  StaticRouteCompositionRule,
  PerceivedLoadSignal,
  MobileDensityBudget,
  RouteContinuityBridge,
  ConversionSafeCta,
  JourneyFrictionCheck,
  PageCohesionCheckpoint,
  PlayerTrustSignal,
  ReleaseNarrativeStage,
  ClosedTestReadinessCheck,
  TrustJourneyCheckpoint,
  ReleaseReadinessHubItem,
  OwnerReleaseGate,
  TesterExpectationCopy,
  ReleaseSurfaceAlignment,
  ClosedTesterChecklistItem,
  SafeFeedbackTemplate,
  KnownLimitationNote,
  DeviceReportTemplateField,
  FaqDiscoveryGroup,
  FaqHelpfulnessPrompt,
  IssueCategoryRoute,
  NoSearchBackendNote,
  GameExperiencePillar,
  ClassPath,
  WorldRouteStop,
  HomeDiscoveryMoment,
  NarrativeChapter,
  SessionBeat,
  PublicGameArtAsset
} from "./types";

export const PROVISIONAL_WEB_FIXTURE = "PROVISIONAL_WEB_FIXTURE" as const;
export const NOT_CANONICAL_BACKEND_CONTRACT = "NOT_CANONICAL_BACKEND_CONTRACT" as const;

export const publicHeroStats: PublicHeroStat[] = [
  {
    label: "Trạng thái web",
    value: "FAQ/helpfulness public web",
    note: "Source-ready public site now clarifies FAQ discovery, helpfulness grouping, safe issue-category routing, tester preparation, release readiness and download trust."
  },
  {
    label: "Game claim",
    value: "Playable info only",
    note: "No full MMO, production auth, DB persistence or economy claim."
  },
  {
    label: "Runtime guard",
    value: "Guardrail only",
    note: "Runtime/browser checks support product polish; v1.21 adds FAQ/helpfulness clarity while runtime/browser checks stay a guardrail."
  }
];

export const worldPillars: WorldPillar[] = [
  {
    eyebrow: "Spirit Gate",
    title: "Cổng giới mở lối vào sân luyện",
    summary: "Điểm vào đầu tiên giúp người chơi hiểu nhịp game trước khi combat thật xuất hiện.",
    detail: "Trang web mô tả Spirit Gate như fantasy anchor, không claim map production hoặc live server event."
  },
  {
    eyebrow: "Gate Keeper",
    title: "Người dẫn đường thân thiện",
    summary: "NPC định hướng người chơi qua mục tiêu ngắn, rõ, nhẹ nhàng và có cảm giác online RPG Việt.",
    detail: "Hiện chỉ mô tả UX/game direction; dialogue và quest persistence vẫn thuộc game source future scope."
  },
  {
    eyebrow: "Training Stone",
    title: "Vòng tập luyện không combat",
    summary: "Một objective chain nhỏ để kiểm tra enter world, interaction, feedback và save position.",
    detail: "Không có damage, HP, loot, PvP, boss, guild hoặc economy trong web claim."
  }
];

export const playerJourneySteps: PlayerJourneyStep[] = [
  {
    step: "01",
    title: "Vào cổng",
    summary: "Người chơi đọc nhanh fantasy, trạng thái build và giới hạn hiện tại trước khi tải hoặc tham gia test."
  },
  {
    step: "02",
    title: "Hiểu thế giới",
    summary: "Trang Thế giới giải thích Spirit Gate, Gate Keeper và Training Stone bằng ngôn ngữ player-facing."
  },
  {
    step: "03",
    title: "Theo dõi tiến độ",
    summary: "Roadmap công khai cho biết phần nào đã sẵn sàng, phần nào còn blocked bởi backend hoặc gameplay contract."
  },
  {
    step: "04",
    title: "Nhận hỗ trợ",
    summary: "Support page gom FAQ, download status và account-help wording mà không tạo ticket/backend giả."
  }
];

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
    title: "World / gameplay loop depth",
    status: "current",
    summary: "Deepens Spirit Gate-to-Training Stone loop, beginner expectations, guide-to-world navigation and route-level scope boundaries without combat/economy claims."
  },
  {
    version: "v1.14",
    title: "Player safety / support FAQ polish",
    status: "current",
    summary: "Clarifies player safety wording, privacy-safe issue reporting, closed-test support expectations and community conduct without ticket/moderation backend claims."
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
    summary: "Turns performance budget into player-facing copy discipline: lighter route composition, CSS-only visuals, perceived-load clarity and mobile reading density without Core Web Vitals certification."
  },
  {
    version: "v1.17",
    title: "Route continuity / conversion-safe polish",
    status: "current",
    summary: "Connects Start, Game Loop, Download Trust, Status, Support Safety and Performance through safe next-step CTAs without fake conversion or release-ready claims."
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

export const communityPrinciples: CommunityPrinciple[] = [
  {
    title: "Thân thiện với người chơi mới",
    summary: "Copy ưu tiên giải thích rõ ràng: game đang có gì, chưa có gì, và bước tiếp theo là gì."
  },
  {
    title: "Không hứa tính năng chưa mở",
    summary: "Community wording không claim chat, forum, guild, production account, DB hoặc live moderation backend."
  },
  {
    title: "Sẵn sàng cho closed testing sau này",
    summary: "Trang cộng đồng giữ chỗ cho rules, feedback channel và test announcements khi có release artifact được duyệt."
  }
];


export const worldStoryChapters: WorldStoryChapter[] = [
  {
    id: "spirit-gate-arrival",
    title: "Bước qua Cổng Giới",
    subtitle: "Điểm nhập vai đầu tiên",
    summary: "Người chơi được giới thiệu vào Linh Giới bằng hình ảnh cổng sáng, sân luyện và lời dẫn của Gate Keeper thay vì bị ném vào hệ thống phức tạp.",
    playerTakeaway: "Đây là nơi hiểu game là gì, chưa phải bản đồ production hay live shard MMO.",
    nonClaim: "No production world map, no live server event, no MMO shard claim."
  },
  {
    id: "gate-keeper-guidance",
    title: "Nghe lời dẫn của Gate Keeper",
    subtitle: "NPC hướng dẫn thân thiện",
    summary: "Gate Keeper đóng vai trò dẫn người chơi mới qua các mục tiêu ngắn: đọc nhiệm vụ, tới Training Stone, thử tương tác, lưu trạng thái.",
    playerTakeaway: "Web mô tả player journey hiện tại, không claim branching quest hoặc dialogue persistence.",
    nonClaim: "No production quest system, no dialogue backend, no account lookup."
  },
  {
    id: "training-stone-loop",
    title: "Chạm vào Training Stone",
    subtitle: "Vòng chơi non-combat",
    summary: "Training Stone giúp kiểm tra cảm giác vào world, tương tác và phản hồi trước khi mở combat thật bằng contract rõ ràng.",
    playerTakeaway: "Người chơi thấy hướng phát triển combat nhưng không bị hứa damage, loot hay skill production.",
    nonClaim: "No combat damage, no HP, no loot, no skill economy."
  },
  {
    id: "return-to-lobby",
    title: "Lưu vị trí và quay lại sảnh",
    subtitle: "Kết thúc phiên chơi ngắn",
    summary: "Luồng hiện tại ưu tiên một session ngắn có điểm bắt đầu, điểm kết thúc và trạng thái rõ ràng để sau này mở closed testing an toàn hơn.",
    playerTakeaway: "Trang web nên giải thích trạng thái test và không biến prototype thành lời hứa release.",
    nonClaim: "No public launcher, no production persistence, no paid access."
  }
];

export const beginnerGuideSections: BeginnerGuideSection[] = [
  {
    step: "01",
    title: "Kiểm tra trạng thái tải game",
    action: "Vào trang Download để xem có release artifact, checksum và owner approval chưa.",
    playerTip: "Nếu chưa có build, hãy đọc roadmap thay vì tìm nút tải giả.",
    blockedScope: "No public game download artifact."
  },
  {
    step: "02",
    title: "Đọc bối cảnh Linh Giới",
    action: "Mở trang Thế giới để hiểu Spirit Gate, Gate Keeper và Training Stone.",
    playerTip: "Các mô tả hiện tại là định hướng public web, không phải wiki gameplay đầy đủ.",
    blockedScope: "No full combat/wiki/quest database."
  },
  {
    step: "03",
    title: "Theo dõi roadmap",
    action: "Xem phần Roadmap để biết thứ tự public web, backend contract, portal và production deployment.",
    playerTip: "Tính năng nào bị chặn bởi contract sẽ được ghi rõ, không ẩn trong copy marketing.",
    blockedScope: "WEB-08 backend contract sync remains blocked."
  },
  {
    step: "04",
    title: "Gửi phản hồi đúng kênh",
    action: "Dùng Support/Community để đọc FAQ và nguyên tắc phản hồi static.",
    playerTip: "Ticket/account lookup thật chỉ mở khi có accepted API/RBAC/audit contract.",
    blockedScope: "No support ticket backend or live community backend."
  }
];

export const downloadStatusNotes: DownloadStatusNote[] = [
  {
    label: "Build artifact",
    owner: "Game release owner",
    condition: "Cần file build, checksum, provenance và owner approval.",
    playerMessage: "Chưa có build public nên web không hiển thị nút tải."
  },
  {
    label: "Closed testing",
    owner: "Project owner",
    condition: "Cần chính sách test, version note, known limitations và rollback path.",
    playerMessage: "Closed testing sẽ được công bố riêng khi package được duyệt."
  },
  {
    label: "Portal entitlement",
    owner: "Canonical backend contract",
    condition: "Cần Auth/API/DB/RBAC/audit contract được chấp nhận từ game backend.",
    playerMessage: "Tài khoản thật và quyền tải chưa tồn tại trong web repo."
  }
];

export const supportFaqs: SupportFaq[] = [
  {
    question: "Hiện có tải được game không?",
    answer: "Chưa. Trang Download chỉ hiển thị readiness và blocker cho đến khi có public hoặc closed-testing artifact kèm checksum.",
    scope: "static public guidance"
  },
  {
    question: "Dev login trong game có phải tài khoản thật không?",
    answer: "Không. Dev/login gate và account/character prototype không đồng nghĩa với production auth, email/password, OAuth hoặc DB persistence.",
    scope: "auth non-claim"
  },
  {
    question: "Có combat, guild, chat hoặc economy chưa?",
    answer: "Chưa claim trên public web. Các hệ thống này cần milestone/contract riêng trước khi đưa vào nội dung public như tính năng thật.",
    scope: "gameplay non-claim"
  },
  {
    question: "Vì sao web nhắc nhiều tới contract?",
    answer: "Vì portal, ops, account, DB và live community cần backend canonical. Web không tự tạo backend giả để lấy cảm giác hoàn chỉnh.",
    scope: "governance"
  },
  {
    question: "Khi báo lỗi nên gửi gì?",
    answer: "Ở giai đoạn static guidance, chỉ chuẩn bị route, thiết bị, bước tái hiện và ảnh/log không chứa bí mật. Không gửi mật khẩu, token, payment data hoặc thông tin cá nhân nhạy cảm.",
    scope: "privacy-safe issue reporting"
  },
  {
    question: "Closed test có hỗ trợ live không?",
    answer: "Chưa. Closed-test support chỉ được nói tới khi có artifact, known limitations, support owner và privacy rule được duyệt. Web không claim SLA, ticket backend hoặc account lookup.",
    scope: "closed-test support non-claim"
  }
];

export const communityReadinessSteps: CommunityReadinessStep[] = [
  {
    title: "Thông báo tiến độ dễ hiểu",
    purpose: "Giúp người chơi biết build nào thật, build nào chỉ là source/demo.",
    currentState: "Static content fixtures and public roadmap are source-owned.",
    futureGate: "CMS/live announcements require accepted content ownership and deployment gates."
  },
  {
    title: "Quy tắc phản hồi sớm",
    purpose: "Chuẩn bị tone thân thiện trước khi mở test đông người.",
    currentState: "Community page lists principles but has no live submission workflow.",
    futureGate: "Feedback/ticket flow requires API/RBAC/audit contract."
  },
  {
    title: "Không tạo cộng đồng giả",
    purpose: "Tránh hứa chat, guild, forum hoặc moderation khi backend chưa có.",
    currentState: "Public copy states live community backend is not claimed.",
    futureGate: "Live social systems require identity/session/community backend milestones."
  }
];

export const supportTopics: SupportTopic[] = [
  {
    title: "Tải game / bản test",
    summary: "Hiện chưa có public production download. Chỉ dùng download page để giải thích trạng thái release artifact.",
    action: "Theo dõi Download Status"
  },
  {
    title: "Tài khoản và nhân vật",
    summary: "Dev login và account/character flow thuộc game prototype; web chưa claim production auth hoặc DB persistence.",
    action: "Đọc Account Notice"
  },
  {
    title: "Lỗi vào game",
    summary: "Hướng dẫn hiện là static FAQ. Ticket backend cần accepted API/RBAC/audit contract trước khi mở thật.",
    action: "Xem Support FAQ"
  },
  {
    title: "An toàn người chơi",
    summary: "Người chơi được nhắc không gửi secrets, token, mật khẩu hoặc dữ liệu cá nhân nhạy cảm khi chưa có kênh intake chính thức.",
    action: "Đọc Safety Support"
  }
];

export const downloadReadiness: DownloadReadiness[] = [
  {
    label: "Gói phát hành",
    status: "blocked",
    detail: "Chưa có gói build công khai được chủ sở hữu chấp nhận."
  },
  {
    label: "SHA256",
    status: "planned",
    detail: "Mã kiểm tra sẽ hiển thị cùng gói build khi có bản phát hành thật."
  },
  {
    label: "Phê duyệt chủ sở hữu",
    status: "blocked",
    detail: "Cần kiểm tra phiên bản cuối, ghi chú rollback và nội dung thông báo chính thức."
  },
  {
    label: "Giới hạn đã biết",
    status: "planned",
    detail: "Các giới hạn của bản phát hành phải được công bố minh bạch trước khi mở tải."
  },
  {
    label: "Sẵn sàng hỗ trợ",
    status: "planned",
    detail: "Đội ngũ hỗ trợ và kênh hướng dẫn phải sẵn sàng trước khi mở cổng public."
  }
];

export const contentEntries: ContentEntry[] = [
  {
    slug: "web-program-control-tower",
    category: "news",
    title: "Web program control tower established",
    summary: "The independent Linh Giới Online web repo now has governance, ownership and non-claim guardrails.",
    body: "This public content is a source-owned fixture for the web program. It is not a backend contract and does not claim a production website release. WEB v1.7 continues by improving visual hierarchy, responsive layout and player-facing page quality while tooling remains a support guardrail.",
    publishedAt: "2026-09-05T00:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "public-ux-content-polish-started",
    category: "news",
    title: "Public UX/content polish starts",
    summary: "The previous web slice focused on homepage hierarchy, game information, roadmap clarity, download status and support guidance.",
    body: "WEB v1.6 content polish established the player-facing foundation while keeping non-claims explicit: no production auth, no DB persistence, no CMS and no real backend integration.",
    publishedAt: "2026-09-05T06:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "visual-responsive-polish-started",
    category: "news",
    title: "Visual responsive polish starts",
    summary: "The next web slice focuses on visual hierarchy, responsive page composition, clearer game information, download status and support guidance.",
    body: "Runtime/browser E2E remains a regression guard. The main product work is visual and responsive polish for the public website while keeping non-claims explicit: no production auth, no DB persistence, no CMS and no real backend integration.",
    publishedAt: "2026-09-05T09:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE]
  },

  {
    slug: "public-game-info-depth-started",
    category: "news",
    title: "Public game information gets deeper",
    summary: "WEB v1.8 expands player-facing lore, beginner guidance, download status, support FAQ and community readiness without claiming production systems.",
    body: "WEB v1.8 focuses on the actual public website product. It deepens world story chapters, beginner guide steps, download status notes, support FAQ and community readiness while runtime/browser checks remain guardrails only.",
    publishedAt: "2026-09-05T10:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "news-guide-detail-pages-started",
    category: "news",
    title: "News and guide detail pages get deeper",
    summary: "WEB v1.9 turns list pages into readable detail experiences for news, guide, status and download explanation content.",
    body: "WEB v1.9 keeps the product focus on public website quality. It adds article detail sections, guide detail steps, status explainers and download explanations while preserving non-claims: no CMS, no production auth, no DB persistence, no live support backend and no public game download artifact.",
    publishedAt: "2026-09-05T11:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "status-download-trust-polish-started",
    category: "news",
    title: "Status and download trust copy gets clearer",
    summary: "WEB v1.10 focuses on release trust wording, checksum/provenance explanation, status visibility and support expectations without adding backend claims.",
    body: "WEB v1.10 keeps building the public web product. It explains what evidence a real download needs, how status surfaces should be read, and what support can safely promise while public game artifacts, production auth, DB persistence, CMS and live support backend remain unavailable.",
    publishedAt: "2026-09-05T12:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "closed-tester-information-pack-started",
    category: "news",
    title: "Closed tester information pack is prepared",
    summary: "WEB v1.20 explains what a future tester should read, prepare and avoid sharing before any real intake channel exists.",
    body: "The closed tester information pack keeps the public website useful without opening registration. It gives players a checklist, feedback format, known limitation copy and device report template while preserving boundaries: no tester intake backend, no account entitlement and no collection of secrets or sensitive personal data.",
    publishedAt: "2026-09-05T23:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "monorepo-foundation-env-limited",
    category: "patch-notes",
    title: "Monorepo foundation source is ready for local runtime closure",
    summary: "The source-level pnpm/Turborepo/Next.js scaffold exists, while Node 24 and pnpm runtime gates require local or preseeded validation.",
    body: "The web repository still does not claim production auth, DB persistence, backend integration, CMS or deployment.",
    publishedAt: "2026-09-05T01:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "browser-matrix-guardrail-passed",
    category: "patch-notes",
    title: "Browser matrix is now a support guardrail",
    summary: "Public web, portal shell and ops shell routes have browser checks so product polish can continue with less regression risk.",
    body: "The browser matrix protects web UX source changes; it is not a production deployment, live content, account, database or operations readiness claim.",
    publishedAt: "2026-09-05T07:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "closed-testing-download-placeholder",
    category: "download-builds",
    title: "Download page is a placeholder for future closed testing",
    summary: "No public build is currently linked from the web source.",
    body: "Download builds must be provided by an accepted release artifact before this page can offer a real link.",
    publishedAt: "2026-09-05T02:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "spirit-gate-maintenance-placeholder",
    category: "maintenance",
    title: "Maintenance status is local fixture only",
    summary: "Status and maintenance pages are prepared for future operations content but are not wired to live infrastructure.",
    body: "No production deployment or ops mutation is claimed by this fixture.",
    publishedAt: "2026-09-05T03:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "gate-entry-guide",
    category: "guides",
    title: "Gate Entry guide placeholder",
    summary: "A future player guide area is reserved without claiming complete gameplay documentation.",
    body: "Guide content will follow the game source of truth and explicit content acceptance gates.",
    publishedAt: "2026-09-05T04:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "beginner-training-loop-guide",
    category: "guides",
    title: "Beginner training loop guide",
    summary: "A player-facing explanation of the current non-combat flow: enter world, meet the Gate Keeper and interact with the Training Stone.",
    body: "This guide describes current public-facing direction only. It does not claim production quest persistence, combat, rewards, inventory or backend integration.",
    publishedAt: "2026-09-05T08:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "download-readiness-guide",
    category: "guides",
    title: "Download readiness guide",
    summary: "A player-facing explanation of why a real build link requires checksum, release notes and owner approval.",
    body: "This guide explains the public download gate without creating a fake launcher, entitlement flow or production release promise.",
    publishedAt: "2026-09-05T11:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "support-and-community-guide",
    category: "guides",
    title: "Support and community readiness guide",
    summary: "A static guide for support expectations, feedback channels and community boundaries before live systems exist.",
    body: "This guide prepares public copy and player expectations while ticket, moderation, chat, guild and forum backends remain contract-blocked.",
    publishedAt: "2026-09-05T11:20:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "release-trust-and-checksum-guide",
    category: "guides",
    title: "Release trust and checksum guide",
    summary: "A player-facing guide that explains why build artifact, checksum, provenance, known limitations and owner approval must exist before a download CTA appears.",
    body: "This guide turns release trust into readable public copy. It does not create a launcher, entitlement, account gate, CMS workflow, support ticket backend or production deployment claim.",
    publishedAt: "2026-09-05T12:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "community-roadmap-onboarding-started",
    category: "news",
    title: "Community / roadmap onboarding được làm rõ",
    summary: "WEB v1.11 nối homepage, community, roadmap, support và staged release messaging để người chơi biết đi đâu và kỳ vọng gì.",
    body: "Bản cập nhật public web này tập trung vào hành trình người chơi mới: đọc thế giới, kiểm tra download trust, xem roadmap gates và hiểu cách gửi phản hồi trước khi có live community backend.",
    publishedAt: "2026-09-05T13:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "community-roadmap-onboarding-guide",
    category: "guides",
    title: "Cách theo dõi roadmap và tham gia cộng đồng đúng kỳ vọng",
    summary: "Guide giúp người chơi mới hiểu status, roadmap, feedback và staged release mà không nhầm với live forum hoặc account portal.",
    body: "Đi theo thứ tự: đọc status/download trust, xem roadmap decision gates, hiểu cộng đồng hiện là static guidance, rồi chờ release artifact hoặc owner announcement trước khi tham gia test.",
    publishedAt: "2026-09-05T13:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "content-ia-hub-polish-started",
    category: "news",
    title: "Content hub và lộ trình đọc được làm rõ",
    summary: "WEB v1.12 gom các trang quan trọng thành Start hub để người chơi mới biết đọc gì trước, đi đâu tiếp và không hiểu nhầm trạng thái release.",
    body: "Bản cập nhật này tập trung vào information architecture của public website: Start hub, nhóm route theo nhu cầu, câu hỏi người chơi mới và đường dẫn tới guide/news/download/status/community. Runtime/browser/e2e vẫn chỉ là guardrail, không phải nội dung chính.",
    publishedAt: "2026-09-05T14:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "start-here-content-hub-guide",
    category: "guides",
    title: "Start here: cách đọc website Linh Giới Online",
    summary: "Guide giúp người chơi mới dùng Start hub để chọn đúng trang: thế giới, download trust, roadmap, status, support hoặc community.",
    body: "Hãy bắt đầu từ /start, chọn đúng mục tiêu đọc, rồi kiểm tra non-claim trước khi kỳ vọng release, account hoặc backend thật.",
    publishedAt: "2026-09-05T14:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "world-gameplay-loop-depth-started",
    category: "news",
    title: "World loop và kỳ vọng gameplay được làm rõ",
    summary: "WEB v1.13 làm rõ hành trình Spirit Gate, Gate Keeper, Training Stone, route đọc tiếp và boundary gameplay để người chơi không nhầm content web với combat release.",
    body: "Bản cập nhật này tập trung vào nội dung game public: loop người chơi mới, kỳ vọng hiện tại, đường nối từ guide sang world và các scope boundary trước khi có combat/economy/backend contract thật.",
    publishedAt: "2026-09-05T15:20:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "world-gameplay-loop-guide",
    category: "guides",
    title: "World loop: từ Spirit Gate tới Training Stone",
    summary: "Guide giúp người chơi hiểu loop hiện tại: vào cổng, gặp Gate Keeper, tương tác Training Stone, đọc status/download trust và gửi feedback đúng phạm vi.",
    body: "Đi theo /game/loop để hiểu cảm giác gameplay đang được mô tả. Đây là guide public tĩnh, không phải quest database, combat tutorial hoặc live progression system.",
    publishedAt: "2026-09-05T15:25:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "player-safety-support-faq-polish-started",
    category: "news",
    title: "Player safety and support FAQ get clearer",
    summary: "WEB v1.14 focuses on player safety wording, support FAQ quality, privacy-safe issue reporting and closed-test support expectations.",
    body: "WEB v1.14 keeps the product focus on the public website. It adds a safety/support hub, issue reporting guidance, closed-test support expectations and community conduct clarity without claiming live tickets, account lookup, moderation dashboard or backend integration.",
    publishedAt: "2026-09-05T14:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "player-safety-support-guide",
    category: "guides",
    title: "Hướng dẫn an toàn và hỗ trợ cho người chơi mới",
    summary: "Cách đọc support FAQ, chuẩn bị bug report an toàn, hiểu closed-test support và tránh gửi thông tin nhạy cảm khi chưa có backend thật.",
    body: "Guide này giúp người chơi mới biết nên đọc đâu, chuẩn bị thông tin gì khi báo lỗi, dữ liệu nào không nên gửi, và vì sao web chưa có ticket/account/moderation backend thật.",
    publishedAt: "2026-09-05T14:05:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "accessibility-readability-polish-started",
    category: "news",
    title: "Accessibility and readability polish starts",
    summary: "WEB v1.15 improves heading clarity, mobile scannability, focus order and reading comfort across the public website.",
    body: "WEB v1.15 keeps building the actual public website. It adds accessibility/readability guidance, route-level scan aids, mobile reading rules and focus-order expectations while avoiding any formal WCAG audit, legal compliance or production support claim.",
    publishedAt: "2026-09-05T21:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "accessibility-readability-guide",
    category: "guides",
    title: "Cách đọc web Linh Giới Online dễ hơn",
    summary: "Guide giúp người chơi mới dùng headings, Start hub, skip link, mobile cards và safety/download boundaries để đọc nhanh hơn.",
    body: "Bắt đầu từ /start hoặc /accessibility, dùng headings để scan từng route, ưu tiên CTA đầu trang, đọc boundary trước khi kỳ vọng download, account, combat hoặc live support. Đây là accessibility/readability guidance, không phải formal audit certification.",
    publishedAt: "2026-09-05T21:05:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "performance-copy-asset-budget-polish-started",
    category: "news",
    title: "Performance and copy budget get a public polish pass",
    summary: "WEB v1.16 makes the public website lighter to read: copy budgets, CSS-only visual budget, static route composition and perceived load expectations are visible to players.",
    body: "This update keeps product focus on the public web. It does not claim Core Web Vitals PASS, production monitoring, CDN deployment, bundle analysis certification or image CDN integration. Runtime/browser/e2e remains a guardrail only.",
    publishedAt: "2026-09-05T21:40:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "performance-copy-budget-guide",
    category: "guides",
    title: "Performance copy budget guide",
    summary: "Guide giúp người chơi và reviewer hiểu vì sao web dùng copy ngắn, CSS-only visual, static routes và non-claim gần CTA nhạy cảm.",
    body: "Đọc /performance để hiểu cách public web giữ route nhẹ, card dễ scan, visual không phụ thuộc ảnh nặng và trạng thái tải game không bị trình bày như release-ready. Đây là guidance/source discipline, không phải Lighthouse hoặc Core Web Vitals certification.",
    publishedAt: "2026-09-05T21:45:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "route-continuity-conversion-polish-started",
    category: "news",
    title: "Route continuity and safe next steps get clearer",
    summary: "WEB v1.17 connects public routes into a safer player journey: start, world loop, download trust, status, support safety and performance all point to the right next step.",
    body: "This update focuses on the public website product. It improves page-to-page cohesion, CTA hierarchy and conversion-safe routing without creating fake download, account, portal, ticket, payment or backend conversion flows.",
    publishedAt: "2026-09-05T22:05:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "route-continuity-conversion-guide",
    category: "guides",
    title: "Route continuity and safe conversion guide",
    summary: "Guide giúp reviewer và người chơi hiểu cách đi từ Start sang World Loop, Download Trust, Status và Support mà không bị dẫn tới CTA giả.",
    body: "Dùng /journey để xem route continuity map. Mỗi CTA phải nói rõ nó mở thông tin gì, khi nào an toàn để dùng, và không được ngầm hứa download, account, ticket hoặc payment thật khi backend/release artifacts chưa tồn tại.",
    publishedAt: "2026-09-05T22:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "player-trust-release-narrative-started",
    category: "news",
    title: "Player trust and release narrative get clearer",
    summary: "WEB v1.18 explains the path from content-ready website to closed testing and public download without claiming production release systems.",
    body: "WEB v1.18 keeps building the public web product. It adds player trust signals, staged release narrative, closed-test readiness checks and trust journey checkpoints so players understand what is real today, what proof is required next and which claims remain blocked.",
    publishedAt: "2026-09-05T16:30:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "player-trust-release-guide",
    category: "guides",
    title: "Player trust: từ content-ready tới closed test",
    summary: "Guide giúp người chơi hiểu staged release, checksum/provenance, closed-test gates, status/support boundaries và vì sao chưa có public download.",
    body: "Bắt đầu từ /release để đọc trust narrative, sau đó kiểm tra /download/trust, /status và /support/safety. Guide này không mở download, account entitlement, support ticket hay production release claim.",
    publishedAt: "2026-09-05T16:35:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "release-readiness-hub-polish-started",
    category: "news",
    title: "Release readiness hub gets clearer",
    summary: "WEB v1.19 groups owner gates, tester expectations and download/status/support alignment into a dedicated release readiness hub.",
    body: "WEB v1.19 keeps building the public web product. It adds a /release/readiness hub so players and reviewers can see which release gates are public, internal or blocked before any download, test, support or community CTA is treated as real.",
    publishedAt: "2026-09-05T23:05:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "release-readiness-hub-guide",
    category: "guides",
    title: "Release readiness hub guide",
    summary: "Guide giúp người chơi đọc release readiness, owner gates, tester expectations và alignment giữa Download, Status, Support trước khi kỳ vọng bản test.",
    body: "Bắt đầu từ /release/readiness để xem gate nào đã có copy, gate nào còn planned/blocked và vì sao public download hoặc closed test không được claim khi artifact, checksum, support intake và owner sign-off chưa đủ.",
    publishedAt: "2026-09-05T23:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "closed-tester-information-pack-guide",
    category: "guides",
    title: "Closed tester information pack guide",
    summary: "Cách đọc tester checklist, safe feedback template, known limitations và device report fields mà không hiểu nhầm là signup form.",
    body: "Tester pack là static guidance. Trang giúp tester tương lai chuẩn bị feedback và thông tin thiết bị an toàn, tránh password, token, payment data, private account data và sensitive personal data. Trang này không mở registration, không bảo đảm access và không bật account entitlement.",
    publishedAt: "2026-09-05T23:05:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },


  {
    slug: "faq-search-helpfulness-polish-started",
    category: "news",
    title: "FAQ search and helpfulness polish starts",
    summary: "WEB v1.21 improves FAQ discovery, helpfulness grouping and support route clarity without adding a fake search backend.",
    body: "WEB v1.21 keeps building the public web product. It adds a dedicated support help route, groups common questions by player intent, explains issue-category routing and states that search is static guidance only until a real backend/search contract exists.",
    publishedAt: "2026-09-05T23:55:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "faq-search-helpfulness-guide",
    category: "guides",
    title: "FAQ search and helpfulness guide",
    summary: "Cách tìm câu trả lời theo nhóm vấn đề, chọn route hỗ trợ đúng và gửi feedback hữu ích mà không phụ thuộc search backend.",
    body: "Bắt đầu từ /support/help để chọn nhóm câu hỏi: download, release, safety, tester pack, performance hoặc account/backend boundaries. Guide này không bật live search, chatbot support, ticket routing hoặc account lookup.",
    publishedAt: "2026-09-05T23:58:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "spirit-festival-event-placeholder",
    category: "events",
    title: "Spirit festival event placeholder",
    summary: "Event taxonomy exists, but no real live event or backend scheduler exists in WEB-07.",
    body: "This is a provisional web fixture and not a live operations contract.",
    publishedAt: "2026-09-05T05:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE]
  }
];

export const downloadBuilds: DownloadBuild[] = [
  {
    channel: "coming-soon",
    title: "Launcher / gói build công khai",
    status: "not-available",
    note: "Chưa có bản tải công khai từ web repo này. Link tải cần gói phát hành được chấp nhận riêng."
  },
  {
    channel: "closed-testing",
    title: "Gói kiểm thử giới hạn",
    status: "limited-internal",
    note: "Phân phối kiểm thử giới hạn chỉ là trạng thái dự kiến, không phải cam kết tải thật đang mở."
  }
];


export const contentDetailSections: ContentDetailSection[] = [
  {
    slug: "closed-tester-information-pack-started",
    heading: "Tester pack là guidance, không phải intake",
    body: "v1.20 gom checklist, safe feedback template, known limitations và device report template vào một route public để chuẩn bị closed-test communication trước khi kênh official tồn tại.",
    playerImpact: "Người chơi biết nên đọc gì và tránh gửi gì trước khi có thông báo tester chính thức.",
    nonClaim: "No live tester intake, no guaranteed tester slot, no open registration."
  },
  {
    slug: "closed-tester-information-pack-started",
    heading: "Privacy boundary được đặt cạnh feedback",
    body: "Các field feedback chỉ yêu cầu mô tả route, bước tái hiện, expected/actual và device class an toàn; public copy không yêu cầu secrets hoặc dữ liệu nhạy cảm.",
    playerImpact: "Feedback tương lai dễ triage hơn mà không tạo cảm giác phải chia sẻ tài khoản hoặc token.",
    nonClaim: "No collection of passwords, tokens, payment data or sensitive personal data."
  },
  {
    slug: "release-readiness-hub-polish-started",
    heading: "Release readiness hub gom gate quan trọng về một chỗ",
    body: "WEB v1.19 thêm /release/readiness để người chơi thấy rõ owner gates, tester expectations và sự đồng bộ giữa Download, Status, Support trước khi có public build.",
    playerImpact: "Người chơi không bị dẫn từ release narrative sang download/test mà thiếu điều kiện chứng minh.",
    nonClaim: "No public download, no open beta, no entitlement automation."
  },
  {
    slug: "release-readiness-hub-polish-started",
    heading: "Download, Status và Support phải cùng nói một sự thật",
    body: "Release readiness làm rõ mỗi surface cần nói gì, link tới đâu và mâu thuẫn nào phải tránh trước khi mở tester expectation.",
    playerImpact: "Người chơi hiểu blocker tại đúng route thay vì suy diễn từ CTA hoặc build guardrail.",
    nonClaim: "No fake ticket, no placeholder checksum, no release-ready claim."
  },
  {
    slug: "route-continuity-conversion-polish-started",
    heading: "Route continuity biến menu dài thành hành trình đọc",
    body: "WEB v1.17 nối Start, World Loop, Download Trust, Status, Support Safety, Community Onboarding, Accessibility và Performance bằng CTA hierarchy rõ hơn.",
    playerImpact: "Người chơi mới biết nên đọc gì tiếp theo và vì sao chưa nên kỳ vọng download, account hoặc ticket thật.",
    nonClaim: "No fake funnel, no public artifact, no account/support backend."
  },
  {
    slug: "route-continuity-conversion-polish-started",
    heading: "Conversion-safe nghĩa là không hứa nhầm",
    body: "CTA vẫn cần rõ và hấp dẫn, nhưng mỗi CTA nhạy cảm phải mở thông tin/status/trust trước khi có hành động release thật.",
    playerImpact: "Download, support và community không còn giống lời hứa production; chúng trở thành các bước hiểu trạng thái hiện tại.",
    nonClaim: "No entitlement, payment, launcher, secure inbox or live moderation claim."
  },
  {
    slug: "content-ia-hub-polish-started",
    heading: "Start hub biến website thành hành trình đọc có thứ tự",
    body: "WEB v1.12 thêm một hub trung tâm để người chơi mới chọn mục tiêu: hiểu game, kiểm tra tải game, xem roadmap, đọc guide hoặc biết cách góp ý.",
    playerImpact: "Người chơi không phải đoán nên đọc News, Guides, Download hay Status trước; mỗi nhóm route có mục đích và boundary rõ.",
    nonClaim: "No CMS, no live personalization, no account-aware recommendation backend."
  },
  {
    slug: "community-roadmap-onboarding-started",
    heading: "Community / roadmap onboarding nối các trang public",
    body: "Homepage, Community, Roadmap, Support, Status và Download trust được kết nối thành một hành trình đọc có thứ tự thay vì các trang rời rạc.",
    playerImpact: "Người chơi biết đọc gì trước, hiểu điều kiện test/download và không nhầm roadmap với lời hứa release.",
    nonClaim: "No live community backend, no fake waitlist, no production account."
  },
  {
    slug: "community-roadmap-onboarding-started",
    heading: "Staged release messaging giữ kỳ vọng an toàn",
    body: "Mỗi stage nói rõ public/internal/blocked để tách content-ready, artifact-ready và backend-connected readiness.",
    playerImpact: "Người chơi thấy trạng thái thật thay vì bị dẫn tới download hoặc portal chưa tồn tại.",
    nonClaim: "No public game download artifact, no portal entitlement, no CMS."
  },
  {
    slug: "web-program-control-tower",
    heading: "Vì sao web repo đứng độc lập?",
    body: "Trang tin này giải thích rằng website là lớp public/player-facing riêng, không được sao chép game source hoặc tự dựng backend thay game server canonical.",
    playerImpact: "Người đọc hiểu vì sao web có thể phát triển nhanh nhưng vẫn không hứa tính năng account, DB hoặc portal thật.",
    nonClaim: "No independent backend, no production auth, no DB persistence."
  },
  {
    slug: "public-game-info-depth-started",
    heading: "Từ placeholder sang thông tin game dễ đọc",
    body: "WEB v1.8 đưa lore, beginner guide, download status, FAQ và community readiness vào các trang public để người chơi có đường đọc rõ hơn.",
    playerImpact: "Người chơi mới có thể đi từ Trang chủ tới Thế giới, Guide, Download và Support mà không cần hiểu cấu trúc sandbox.",
    nonClaim: "No production quest/wiki/combat/economy claim."
  },
  {
    slug: "news-guide-detail-pages-started",
    heading: "Detail page là nơi giải thích sâu, không chỉ lặp summary",
    body: "WEB v1.9 bổ sung section chi tiết, impact cho người chơi, và non-claim ngay trong từng bài viết/guide để public copy rõ hơn.",
    playerImpact: "Mỗi bài tin/guide có ngữ cảnh, việc cần làm tiếp và boundary rõ để tránh hiểu nhầm là đã có release/live service.",
    nonClaim: "No CMS, no backend editorial workflow, no live announcement scheduler."
  },
  {
    slug: "status-download-trust-polish-started",
    heading: "Download trust không phải marketing CTA",
    body: "WEB v1.10 làm rõ rằng nút tải chỉ được xuất hiện khi artifact, checksum, provenance, limitations và owner approval đều tồn tại.",
    playerImpact: "Người chơi biết trang Download đáng tin vì nó nói thật về blocker thay vì giấu sau lời mời tải giả.",
    nonClaim: "No public game download artifact, no production deployment, no entitlement backend."
  },
  {
    slug: "status-download-trust-polish-started",
    heading: "Status cần phân biệt public, internal và blocked",
    body: "Status page không gom runtime/browser guardrails với release readiness; mỗi surface có source-of-truth và forbidden claim riêng.",
    playerImpact: "Người đọc hiểu cái gì đang public, cái gì chỉ là kiểm thử nội bộ, và cái gì bị chặn bởi backend/release artifact.",
    nonClaim: "Runtime/browser/e2e is guardrail only, not public release readiness."
  },
  {
    slug: "world-gameplay-loop-depth-started",
    heading: "Gameplay loop được mô tả theo cảm giác người chơi, không theo log tooling",
    body: "WEB v1.13 diễn giải hành trình từ Spirit Gate tới Gate Keeper và Training Stone như một loop đọc/hiểu/chuẩn bị feedback cho người mới.",
    playerImpact: "Người chơi hiểu bước hiện tại là guided world loop explanation, chưa phải combat release, economy release hoặc MMO live service.",
    nonClaim: "No combat damage, HP, loot, inventory/economy, quest DB or live world server claim."
  },
  {
    slug: "world-gameplay-loop-depth-started",
    heading: "Route-level copy nối guide, world và trust pages",
    body: "Start, Game, Guides, Download Trust, Status và Support được nối bằng nội dung giải thích loop và boundary để người chơi biết đọc gì tiếp theo.",
    playerImpact: "Người mới không bị đưa thẳng tới download/account; họ đi qua world loop, guide và release trust trước.",
    nonClaim: "No fake download CTA, no production auth, no backend recommendation engine."
  },
  {
    slug: "player-trust-release-narrative-started",
    heading: "Release narrative giải thích stage, không phải quảng cáo launch",
    body: "WEB v1.18 thêm /release để nói rõ web content-ready khác với closed-test preparation, limited closed test và public download candidate.",
    playerImpact: "Người chơi hiểu vì sao website đã có nhiều trang nhưng vẫn chưa có public build hoặc account entitlement.",
    nonClaim: "No public build, no open beta, no entitlement funnel."
  },
  {
    slug: "player-trust-release-narrative-started",
    heading: "Trust journey nối Download, Status và Support",
    body: "Release hub dẫn người chơi qua Download Trust, Status và Support Safety theo thứ tự proof-before-claim.",
    playerImpact: "Người chơi không bị ép vào CTA nhạy cảm; họ thấy blocker và proof required ngay trước khi chờ download/test/support.",
    nonClaim: "No fake download, no secure ticket inbox, no production SLA."
  }
];

export const guideDetailSteps: GuideDetailStep[] = [
  {
    slug: "release-readiness-hub-guide",
    step: "01",
    title: "Mở release readiness hub trước",
    action: "Đọc /release/readiness để xem release stage, owner gates và tester expectations trước khi tìm download hoặc closed test.",
    expectedResult: "Người chơi hiểu website đang chuẩn bị release messaging chứ chưa mở build public.",
    blockedScope: "No public download, no open beta, no entitlement automation."
  },
  {
    slug: "release-readiness-hub-guide",
    step: "02",
    title: "Kiểm tra owner gate",
    action: "Đối chiếu artifact, checksum, known limitations, support intake và status copy với bảng Owner Release Gates.",
    expectedResult: "Reviewer biết gate nào cần bằng chứng trước khi chuyển sang tester-facing copy.",
    blockedScope: "No owner sign-off bypass, no placeholder checksum, no fake test invite."
  },
  {
    slug: "release-readiness-hub-guide",
    step: "03",
    title: "Đọc Download, Status và Support như một bộ",
    action: "Đi qua /download/trust, /status và /support/safety để tránh mâu thuẫn giữa CTA, blocker và support expectation.",
    expectedResult: "Public copy không hứa bản tải, tài khoản hoặc ticket khi các surface đó còn blocked.",
    blockedScope: "No production support SLA, no account lookup, no live ticket backend."
  },
  {
    slug: "release-readiness-hub-guide",
    step: "04",
    title: "Chỉ hiểu closed test là stage có điều kiện",
    action: "Dùng tester expectation copy để biết closed test cần scope, limitation, feedback path và owner approval riêng.",
    expectedResult: "Người chơi chờ thông báo đúng stage, không hiểu nhầm thành open registration hoặc launch.",
    blockedScope: "No open registration, no reward/economy promise, no production launch."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "01",
    title: "Đọc tester pack như hướng dẫn chuẩn bị",
    action: "Mở /release/tester-pack để xem checklist, feedback template, known limitations và device report template.",
    expectedResult: "Người chơi hiểu đây là static guidance, không phải form đăng ký hoặc invite.",
    blockedScope: "No live tester intake, no open registration, no entitlement automation."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "02",
    title: "Chuẩn bị feedback không chứa dữ liệu nhạy cảm",
    action: "Dùng safe feedback template: summary, steps, expected/actual và severity gợi ý.",
    expectedResult: "Feedback dễ đọc hơn mà không thu password, token, payment data hoặc private account data.",
    blockedScope: "No secure ticket inbox, no account lookup, no collection backend."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "03",
    title: "Đối chiếu known limitations",
    action: "Đọc limitation notes để biết public build, tester access, support và gameplay scope đang ở trạng thái nào.",
    expectedResult: "Tester tương lai không kỳ vọng open beta, reward/economy hoặc combat/live world promise.",
    blockedScope: "No public build, no reward/economy promise, no live world claim."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "04",
    title: "Quay lại Release Readiness trước mọi CTA",
    action: "Đi từ /release/tester-pack về /release/readiness, /download/trust và /support/safety để kiểm tra gate còn blocked.",
    expectedResult: "Người chơi hiểu cần owner-approved channel trước khi gửi feedback thật.",
    blockedScope: "No owner sign-off bypass, no guaranteed tester slot, no production support SLA."
  },
  {
    slug: "player-trust-release-guide",
    step: "01",
    title: "Đọc stage hiện tại trước",
    action: "Mở /release để xem content-ready, closed-test preparation, limited closed test và public download candidate khác nhau thế nào.",
    expectedResult: "Người chơi hiểu public web đã rõ hơn nhưng chưa phải release-ready.",
    blockedScope: "No public build, no open beta, no production launch."
  },
  {
    slug: "player-trust-release-guide",
    step: "02",
    title: "Kiểm tra proof-before-claim",
    action: "Đi tới /download/trust để xem artifact, SHA256, provenance, known limitations và owner approval cần có gì.",
    expectedResult: "Download CTA chỉ được hiểu là điều kiện release, không phải link tải thật.",
    blockedScope: "No fake download button, no placeholder checksum, no launcher promise."
  },
  {
    slug: "player-trust-release-guide",
    step: "03",
    title: "Xác nhận trạng thái và support boundary",
    action: "Mở /status và /support/safety để biết public/internal/blocked surfaces và cách chuẩn bị feedback an toàn.",
    expectedResult: "Người chơi biết báo lỗi/góp ý thế nào mà không gửi secrets hoặc dữ liệu nhạy cảm.",
    blockedScope: "Chưa có ticket inbox an toàn, chưa tra cứu tài khoản, chưa SLA hỗ trợ production."
  },
  {
    slug: "player-trust-release-guide",
    step: "04",
    title: "Theo dõi closed-test readiness",
    action: "Đọc closed-test checks để biết build artifact, limitations, feedback protocol và status/support alignment còn thiếu gì.",
    expectedResult: "Người chơi chờ đúng stage thay vì kỳ vọng open registration hoặc entitlement automation.",
    blockedScope: "No open registration, no reward/economy promise, no automated entitlement."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "01",
    title: "Bắt đầu từ câu hỏi người chơi",
    action: "Mở /journey hoặc /start để chọn câu hỏi: hiểu game, kiểm tra tải, xem status, báo lỗi hay đọc roadmap.",
    expectedResult: "Người chơi được dẫn tới route phù hợp trước khi chạm vào CTA nhạy cảm.",
    blockedScope: "No personalized recommendation backend or account-aware routing."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "02",
    title: "Đi qua Download Trust trước mọi download CTA",
    action: "Nếu muốn tải game, đọc /download/trust để biết artifact, checksum, provenance và owner approval cần gì.",
    expectedResult: "Không còn hiểu nhầm rằng web đã có launcher/public build chỉ vì có Download route.",
    blockedScope: "No public game artifact, no placeholder checksum, no entitlement backend."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "03",
    title: "Support phải giữ privacy boundary",
    action: "Nếu muốn báo lỗi, mở /support/safety để biết nên chuẩn bị mô tả, bước tái hiện, ảnh/log nào và không gửi bí mật.",
    expectedResult: "Feedback hữu ích hơn nhưng không tạo ticket/support backend giả.",
    blockedScope: "No secure inbox, no account lookup, no SLA or moderation dashboard."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "04",
    title: "Đóng vòng đọc bằng Status và Community Onboarding",
    action: "Sau khi hiểu blocker, đọc /status và /community/onboarding để biết stage hiện tại và kỳ vọng cộng đồng.",
    expectedResult: "Người chơi hiểu public/internal/blocked surfaces trước khi chờ closed test hoặc góp ý.",
    blockedScope: "No live forum/chat/guild backend or production deployment."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "01",
    title: "Vào Spirit Gate bằng kỳ vọng đúng",
    action: "Đọc /game/loop để hiểu loop world hiện tại là entry explanation, chưa phải combat release.",
    expectedResult: "Người chơi biết mục tiêu là cảm nhận tone, scene anchors và next reading path.",
    blockedScope: "No combat damage, HP, loot, inventory/economy or quest database."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "02",
    title: "Gặp Gate Keeper như onboarding guide",
    action: "Dùng Gate Keeper như lời dẫn để đi từ world story sang beginner guide và download trust.",
    expectedResult: "Người chơi hiểu NPC hiện là narrative/onboarding anchor, không phải live quest giver.",
    blockedScope: "No persisted quest state, no NPC dialogue backend, no account-aware progression."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "03",
    title: "Training Stone là vòng luyện tập an toàn",
    action: "Đọc Training Stone như objective loop nhẹ: tương tác, feedback, biết blocker rồi quay lại roadmap/status.",
    expectedResult: "Người chơi có kỳ vọng đúng về non-combat training loop và biết gửi feedback nào có ích.",
    blockedScope: "No damage formula, skill economy, item drops, PvP, boss or live event reward."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "04",
    title: "Rời loop qua Status và Support",
    action: "Kiểm tra Status, Download Trust và Support trước khi chờ build hoặc góp ý.",
    expectedResult: "Người chơi hiểu release artifact và backend contract vẫn là gate riêng.",
    blockedScope: "No public artifact, no ticket backend, no production auth."
  },

  {
    slug: "start-here-content-hub-guide",
    step: "01",
    title: "Bắt đầu từ Start hub",
    action: "Mở /start để chọn đúng nhu cầu: tìm hiểu game, kiểm tra download, xem roadmap hay đọc guide.",
    expectedResult: "Người chơi có đường đọc ngắn và không phải tự ghép thông tin từ nhiều trang rời rạc.",
    blockedScope: "No personalized account route, no backend recommendation, no CMS navigation."
  },
  {
    slug: "start-here-content-hub-guide",
    step: "02",
    title: "Đi theo route group phù hợp",
    action: "Nếu muốn tải game, đi Download/Download trust; nếu muốn hiểu game, đi Thế giới/Beginner guide; nếu muốn theo dõi tiến độ, đi Roadmap/Status.",
    expectedResult: "Người chơi hiểu mỗi trang giải quyết một nhu cầu rõ ràng thay vì bị lẫn giữa marketing, status và tooling.",
    blockedScope: "No public download artifact, no production auth, no live support ticket."
  },
  {
    slug: "start-here-content-hub-guide",
    step: "03",
    title: "Kiểm tra non-claim trước khi kỳ vọng release",
    action: "Đọc các badge và non-claim trong từng hub để biết phần nào là static public content, phần nào blocked bởi backend/release artifact.",
    expectedResult: "Người chơi biết website đang phát triển thật nhưng chưa hứa production services.",
    blockedScope: "No DB persistence, no real portal integration, no live community backend."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "01",
    title: "Xem public status trước",
    action: "Mở Status và Download trust để biết build, account, support và community đang ở mức nào.",
    expectedResult: "Người chơi hiểu đâu là public info, đâu là internal guardrail và đâu là blocked dependency.",
    blockedScope: "No public game download artifact, no production auth, no live support backend."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "02",
    title: "Đọc roadmap decision gates",
    action: "Mở Roadmap để xem gate nào ready, planned hoặc blocked trước khi kỳ vọng tính năng mới.",
    expectedResult: "Người chơi hiểu WEB-08/backend contract là điều kiện trước portal/account/ops thật.",
    blockedScope: "No DB persistence, no real portal integration, no ops/admin mutation."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "03",
    title: "Góp ý đúng phạm vi",
    action: "Dùng Community/Support như static guidance để góp ý nội dung, UX, wording và test readiness.",
    expectedResult: "Feedback không bị trộn với account recovery, payment, entitlement hoặc moderation live system.",
    blockedScope: "No forum/chat/guild backend, no ticket backend, no account lookup."
  },
  {
    slug: "gate-entry-guide",
    step: "01",
    title: "Đọc mục tiêu vào cổng",
    action: "Bắt đầu từ trang Thế giới để hiểu Spirit Gate, Gate Keeper và Training Stone.",
    expectedResult: "Người chơi hiểu bối cảnh non-combat hiện tại trước khi đọc download/status.",
    blockedScope: "No full world wiki, no production map database."
  },
  {
    slug: "beginner-training-loop-guide",
    step: "02",
    title: "Theo luồng luyện tập ngắn",
    action: "Đọc các bước beginner guide: kiểm tra download, hiểu thế giới, theo dõi roadmap và gửi phản hồi đúng kênh.",
    expectedResult: "Người chơi biết bản hiện tại là guided training loop/non-combat explanation, không phải combat release.",
    blockedScope: "No combat damage, no loot, no inventory/economy."
  },
  {
    slug: "download-readiness-guide",
    step: "03",
    title: "Chỉ tải khi có artifact thật",
    action: "Kiểm tra release artifact, checksum, provenance, known limitations và owner approval.",
    expectedResult: "Trang Download không tạo nút tải giả hoặc entitlement giả.",
    blockedScope: "No public game download artifact, no portal entitlement backend."
  },
  {
    slug: "support-and-community-guide",
    step: "04",
    title: "Gửi phản hồi theo trạng thái thật",
    action: "Dùng Support/Community như static guidance cho tới khi có API/RBAC/audit contract.",
    expectedResult: "Người chơi hiểu ticket, moderation, chat/forum/guild chưa phải live system.",
    blockedScope: "No live support ticket, no moderation backend, no community chat/forum/guild backend."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "01",
    title: "Xác nhận artifact trước CTA",
    action: "Chỉ hiển thị download CTA khi có file build thật, version, platform, size và approval.",
    expectedResult: "Người chơi không bị dẫn tới nút tải giả hoặc placeholder nguy hiểm.",
    blockedScope: "No public game download artifact."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "02",
    title: "Đặt checksum cạnh link tải",
    action: "Hiển thị SHA256 của đúng artifact public sau khi verify upload.",
    expectedResult: "Người chơi có thể kiểm tra file tải thay vì tin vào copy marketing.",
    blockedScope: "No placeholder checksum or unverified hash."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "03",
    title: "Nói rõ giới hạn build",
    action: "Viết release note có known limitations, support expectation và rollback path.",
    expectedResult: "Closed testing có thể bắt đầu minh bạch khi owner duyệt artifact.",
    blockedScope: "No production auth, no DB persistence, no payment/shop/economy."
  }
];

export const downloadTrustGates: DownloadTrustGate[] = [
  {
    id: "goi-build-that",
    title: "Có gói build thật",
    status: "blocked",
    evidenceRequired: "File build game đã được owner duyệt, đúng nền tảng, đúng phiên bản, có dung lượng và ghi chú phát hành.",
    playerFacingCopy: "Hiện chưa có file tải công khai; trang Download chỉ giải thích điều kiện mở tải.",
    mustNotClaim: "Không ghi nút tải ngay, chơi ngay, launcher sẵn sàng hoặc phát hành công khai sẵn sàng."
  },
  {
    id: "sha256-hien-thi",
    title: "SHA256 hiển thị cạnh link tải",
    status: "planned",
    evidenceRequired: "Mã SHA256 tạo từ đúng file public cuối cùng và được kiểm tra lại sau khi upload.",
    playerFacingCopy: "Khi có build, SHA256 sẽ được hiển thị để người chơi kiểm tra file tải.",
    mustNotClaim: "Không tạo SHA256 giả hoặc hash placeholder như thể đã có build."
  },
  {
    id: "nguon-goc-ro-rang",
    title: "Nguồn gốc đọc được bởi người chơi",
    status: "planned",
    evidenceRequired: "Nguồn phát hành, lệnh build, nền tảng, thời điểm tạo và ghi chú rollback.",
    playerFacingCopy: "Release note phải nói rõ build đến từ đâu, dùng cho ai và được tạo khi nào.",
    mustNotClaim: "Không biến runtime pass nội bộ thành readiness phát hành công khai."
  },
  {
    id: "gioi-han-da-biet",
    title: "Giới hạn đã biết đặt cạnh CTA",
    status: "planned",
    evidenceRequired: "Danh sách tính năng chưa có, phạm vi test, lỗi đã biết và đường rollback.",
    playerFacingCopy: "Người chơi đọc được build này có gì, chưa có gì và không nên kỳ vọng phần nào.",
    mustNotClaim: "Không hứa full MMO, combat/economy/social live hoặc open beta khi chưa được duyệt."
  },
  {
    id: "ky-vong-ho-tro",
    title: "Kỳ vọng hỗ trợ đã sẵn sàng",
    status: "blocked",
    evidenceRequired: "Lỗi đã biết, giới hạn tài khoản, kênh liên hệ và disclosure rằng chưa có ticket backend.",
    playerFacingCopy: "Người chơi biết hỏi ở đâu và biết web chưa có backend ticket hoặc tra cứu tài khoản.",
    mustNotClaim: "Không hứa hỗ trợ tài khoản, refund, quyền truy cập hoặc moderation live khi backend chưa có."
  },
  {
    id: "phe-duyet-owner",
    title: "Phê duyệt chủ sở hữu",
    status: "blocked",
    evidenceRequired: "Owner xác nhận Download, Status, Support và Community cùng nói đúng trạng thái build.",
    playerFacingCopy: "Chỉ khi owner duyệt, trang mới chuyển từ giải thích điều kiện sang mở tải thật.",
    mustNotClaim: "Không launch âm thầm, không mở beta giả và không bỏ qua chữ ký owner."
  }
];

export const releaseEvidenceRequirements: ReleaseEvidenceRequirement[] = [
  {
    label: "Gói build",
    owner: "Owner phát hành game",
    requiredEvidence: "Tên file build chính xác, nền tảng, dung lượng, thời điểm tạo và phê duyệt owner.",
    publicDisplayRule: "Chỉ hiển thị CTA tải khi gói build tồn tại và đã qua review SHA256/nguồn gốc."
  },
  {
    label: "SHA256",
    owner: "Owner đóng gói phát hành",
    requiredEvidence: "Mã SHA256 tạo từ file tải cuối cùng và được kiểm tra lại sau khi upload.",
    publicDisplayRule: "SHA256 phải nằm cạnh link tải; không dùng hash placeholder."
  },
  {
    label: "Giới hạn đã biết",
    owner: "Owner sản phẩm/nội dung",
    requiredEvidence: "Danh sách dễ đọc về hệ thống chưa có: xác thực production, DB, combat/economy/social nếu liên quan.",
    publicDisplayRule: "Copy cho người chơi phải nói phần nào dùng được và phần nào chưa nằm trong build."
  },
  {
    label: "Ghi chú rollback/hỗ trợ",
    owner: "Owner hỗ trợ",
    requiredEvidence: "Nơi báo lỗi, phần hỗ trợ không thể kiểm tra và cách rollback/gỡ build test.",
    publicDisplayRule: "Kỳ vọng hỗ trợ phải hiển thị trước khi mở quyền tải."
  }
];

export const statusTrustSurfaces: StatusTrustSurface[] = [
  {
    surface: "Public website",
    visibility: "public",
    sourceOfTruth: "File-backed typed public content in the web repo",
    currentTruth: "Pages can describe game direction, roadmap, guide and download blockers.",
    forbiddenClaim: "No production deployment or live CMS claim."
  },
  {
    surface: "Gói tải game",
    visibility: "blocked",
    sourceOfTruth: "Gói build game đã được duyệt cùng gói SHA256/nguồn gốc",
    currentTruth: "Hiện chưa có gói tải game công khai được duyệt.",
    forbiddenClaim: "Không tải giả, không claim launcher sẵn sàng hoặc release-ready."
  },
  {
    surface: "Tài khoản / quyền Portal",
    visibility: "blocked",
    sourceOfTruth: "Contract Auth/API/DB/RBAC/audit đã được duyệt từ game backend canonical",
    currentTruth: "Portal vẫn là UX shell / fixture-only và không cấp quyền truy cập thật.",
    forbiddenClaim: "Không claim xác thực production, DB persistence hoặc tra cứu tài khoản thật."
  },
  {
    surface: "Runtime/browser guardrails",
    visibility: "internal",
    sourceOfTruth: "Local/preseeded Node, pnpm and Playwright evidence",
    currentTruth: "Useful for regression protection after product copy changes.",
    forbiddenClaim: "Runtime PASS must not be marketed as game release readiness."
  }
];

export const playerSupportExpectations: PlayerSupportExpectation[] = [
  {
    topic: "Tải game",
    expectedNow: "Đọc download readiness, checksum/provenance policy và blocker hiện tại.",
    notAvailable: "Không có public download, launcher, entitlement hoặc paid access.",
    safeNextStep: "Theo dõi Roadmap, Status và release trust guide."
  },
  {
    topic: "Tài khoản",
    expectedNow: "Hiểu rằng dev/login gate trong game prototype không phải production account.",
    notAvailable: "Không có email/password/OAuth, password recovery, session security hoặc DB account lookup.",
    safeNextStep: "Chờ WEB-08 backend contract trước khi tin vào portal thật."
  },
  {
    topic: "Gameplay",
    expectedNow: "Đọc world story, beginner guide và non-combat training loop explanation.",
    notAvailable: "Không có combat release, inventory/economy, guild/chat/forum hoặc live event backend.",
    safeNextStep: "Theo dõi guide/news detail pages để biết scope nào đã mở."
  },
  {
    topic: "Hỗ trợ / cộng đồng",
    expectedNow: "Dùng static FAQ để hiểu cách gửi phản hồi khi closed testing được duyệt.",
    notAvailable: "Không có ticket backend, moderation dashboard, live forum hoặc guild/community system.",
    safeNextStep: "Đọc Support và Community readiness trước khi tham gia test."
  }
];


export const communityOnboardingPaths: CommunityOnboardingPath[] = [
  {
    id: "new-player-first-minute",
    title: "Người chơi mới trong 1 phút đầu",
    audience: "Người vừa nghe tới Linh Giới Online",
    firstAction: "Đọc homepage, mở Thế giới, sau đó vào Download trust trước khi tìm file tải.",
    expectedUnderstanding: "Biết game đang ở giai đoạn public info / guided-loop explanation, chưa phải bản phát hành public.",
    blockedExpectation: "No public download artifact, no production account, no full MMO gameplay."
  },
  {
    id: "closed-test-follower",
    title: "Người muốn tham gia closed testing",
    audience: "Người theo dõi tiến độ và chờ build thử nghiệm",
    firstAction: "Theo dõi Roadmap, Status và release trust guide để biết khi nào có artifact/checksum/owner approval.",
    expectedUnderstanding: "Closed testing chỉ mở khi build thật, known limitations và support expectation được công bố.",
    blockedExpectation: "No fake waitlist, no entitlement portal, no launcher-ready claim."
  },
  {
    id: "feedback-reader",
    title: "Người muốn góp ý",
    audience: "Người đọc tin, guide và muốn phản hồi có ích",
    firstAction: "Đọc Support và Community để hiểu nên phản hồi về wording, UX, bug reproduction hay release blocker nào.",
    expectedUnderstanding: "Feedback hiện là static guidance, chưa có ticket backend hoặc moderation dashboard.",
    blockedExpectation: "No live support ticket, no forum/chat/guild backend, no account lookup."
  },
  {
    id: "returning-reviewer",
    title: "Owner/reviewer quay lại kiểm tra",
    audience: "Người cần biết web đã tiến tới đâu",
    firstAction: "Mở Roadmap decision gates và Status trust surfaces trước khi duyệt bước tiếp theo.",
    expectedUnderstanding: "Biết phần nào public-ready, phần nào internal guardrail, phần nào blocked bởi WEB-08/backend contract.",
    blockedExpectation: "Runtime/browser/e2e is guardrail only; no backend integration claim."
  }
];

export const communityFeedbackChannels: CommunityFeedbackChannel[] = [
  {
    channel: "Public content feedback",
    currentMode: "static-guidance",
    whatToShare: "Góp ý câu chữ, page flow, chỗ gây hiểu nhầm về download/status/roadmap.",
    whatNotToShare: "Không gửi mật khẩu, token, thông tin cá nhân hoặc kỳ vọng account lookup.",
    nextGate: "Accepted support/contact channel contract before any real ticket intake."
  },
  {
    channel: "Closed testing interest",
    currentMode: "planned",
    whatToShare: "Theo dõi release artifact, checksum, known limitations và owner announcement.",
    whatNotToShare: "Không coi roadmap planned là quyền truy cập test hoặc entitlement.",
    nextGate: "Public build artifact plus checksum/provenance and owner approval."
  },
  {
    channel: "Báo lỗi readiness",
    currentMode: "planned",
    whatToShare: "Khi có build test: thiết bị, bước tái hiện, ảnh/log nếu được hướng dẫn.",
    whatNotToShare: "Không upload secrets, payment data, account recovery data hoặc private backend logs.",
    nextGate: "Support process and privacy rules approved before test announcement."
  },
  {
    channel: "Community live systems",
    currentMode: "blocked",
    whatToShare: "Hiện chỉ đọc nguyên tắc cộng đồng và trạng thái blocker.",
    whatNotToShare: "Không kỳ vọng forum/chat/guild/moderation live trong web repo này.",
    nextGate: "Accepted community/forum/moderation backend contract in a future phase."
  }
];

export const roadmapDecisionGates: RoadmapDecisionGate[] = [
  {
    gate: "Public web content confidence",
    status: "ready",
    decisionOwner: "Web/product owner",
    publicMessage: "Public pages can explain game direction, guide, status, download trust and community expectation.",
    releaseImpact: "Cho phép tiếp tục polish nội dung và chuẩn bị closed-test messaging.",
    mustNotClaim: "Không claim production deployment, CMS hoặc live service."
  },
  {
    gate: "Download artifact gate",
    status: "blocked",
    decisionOwner: "Game release owner",
    publicMessage: "Chưa có build public; download CTA vẫn bị chặn cho tới khi có artifact, SHA256 và approval.",
    releaseImpact: "Không mở nút tải hoặc waitlist giả.",
    mustNotClaim: "No public game download artifact, no launcher-ready claim."
  },
  {
    gate: "Community intake gate",
    status: "planned",
    decisionOwner: "Community/support owner",
    publicMessage: "Cộng đồng hiện là static guidance; feedback intake thật cần privacy/support rules.",
    releaseImpact: "Chuẩn bị wording trước, chưa mở ticket/form/backend.",
    mustNotClaim: "No live ticket, no forum/chat/moderation backend."
  },
  {
    gate: "WEB-08 backend contract sync",
    status: "blocked",
    decisionOwner: "Canonical game backend owner",
    publicMessage: "Portal/account/entitlement/ops chỉ mở sau accepted Auth/API/DB/RBAC/audit contract.",
    releaseImpact: "Giữ portal/ops fixture-only cho tới khi contract có thật.",
    mustNotClaim: "No production auth, no DB persistence, no real portal integration."
  }
];

export const stagedReleaseMessages: StagedReleaseMessage[] = [
  {
    stage: "Public information site",
    visibility: "public",
    playerCopy: "Bạn có thể đọc thế giới, roadmap, guides, download trust và support FAQ ngay trên web.",
    ownerChecklist: "Copy không được hứa download, account, DB, combat/economy/social live system.",
    nonClaim: "No public game download artifact, no production auth, no CMS."
  },
  {
    stage: "Closed testing preparation",
    visibility: "internal",
    playerCopy: "Closed testing sẽ chỉ được nói tới khi có build thật, checksum, known limitations và kênh hỗ trợ được duyệt.",
    ownerChecklist: "Chuẩn bị release note, support expectation, privacy-safe bug report guidance.",
    nonClaim: "No fake waitlist, no portal entitlement, no live support backend."
  },
  {
    stage: "Accepted test build",
    visibility: "blocked",
    playerCopy: "Khi build được duyệt, trang Download mới có link, SHA256, provenance và hướng dẫn cài đặt rõ ràng.",
    ownerChecklist: "Verify artifact upload, sidecar SHA, rollback note and owner approval before CTA.",
    nonClaim: "No placeholder checksum, no release-ready claim before artifact evidence."
  },
  {
    stage: "Backend-connected portal",
    visibility: "blocked",
    playerCopy: "Account portal thật sẽ cần backend contract được chấp nhận; hiện portal vẫn là shell/fixture.",
    ownerChecklist: "Wait for WEB-08 Auth/API/DB/RBAC/audit contract and integration gates.",
    nonClaim: "No production auth, no DB persistence, no real ops/admin mutation."
  }
];

export const publicContentHubs: PublicContentHub[] = [
  {
    id: "first-minute-hub",
    title: "Bắt đầu trong 1 phút",
    audience: "Người chơi mới chưa biết Linh Giới Online đang ở trạng thái nào",
    summary: "Đọc nhanh game là gì, có thể tải chưa, và nên xem trang nào tiếp theo trước khi kỳ vọng tài khoản hoặc build thật.",
    primaryRoute: { label: "Start hub", href: "/start", reason: "Một điểm vào gom các route quan trọng theo nhu cầu người đọc." },
    secondaryRoutes: [
      { label: "Thế giới", href: "/game", reason: "Hiểu Spirit Gate, Gate Keeper và Training Stone." },
      { label: "Download trust", href: "/download/trust", reason: "Biết vì sao chưa có nút tải và cần checksum/provenance." },
      { label: "Roadmap", href: "/roadmap", reason: "Xem gate nào ready/planned/blocked." },
      { label: "Dễ đọc", href: "/accessibility", reason: "Kiểm tra heading, scan aid và focus order." },
      { label: "Hiệu năng", href: "/performance", reason: "Hiểu copy budget, CSS-only visual budget và perceived load." }
    ],
    readerOutcome: "Người chơi hiểu public web đang source-ready nhưng chưa có public game download artifact.",
    nonClaim: "No public game download artifact, no production auth, no DB persistence."
  },
  {
    id: "game-understanding-hub",
    title: "Hiểu game trước khi tải",
    audience: "Người muốn biết Linh Giới Online khác gì và hiện có gameplay nào được mô tả",
    summary: "Nhóm route giải thích world story, beginner guide và các giới hạn non-combat trước khi mở combat/economy thật.",
    primaryRoute: { label: "Thế giới", href: "/game", reason: "Đọc bối cảnh và các scene anchor hiện tại." },
    secondaryRoutes: [
      { label: "Beginner guide", href: "/guides/beginner", reason: "Theo 4 bước người chơi mới." },
      { label: "Guide list", href: "/guides", reason: "Chọn guide chi tiết theo nhu cầu." },
      { label: "News detail", href: "/news", reason: "Đọc các cập nhật có player impact và non-claim." }
    ],
    readerOutcome: "Người chơi thấy hướng game rõ hơn mà không nhầm static content thành gameplay wiki production.",
    nonClaim: "No production quest system, no combat damage/loot/economy claim."
  },
  {
    id: "release-trust-hub",
    title: "Kiểm tra tải game và trạng thái release",
    audience: "Người đang tìm file tải, closed testing hoặc thông tin build",
    summary: "Nhóm route tách download readiness, status trust, evidence requirement và support expectation.",
    primaryRoute: { label: "Download", href: "/download", reason: "Xem readiness checklist và các channel dự kiến." },
    secondaryRoutes: [
      { label: "Download trust", href: "/download/trust", reason: "Hiểu artifact/checksum/provenance/approval." },
      { label: "Status", href: "/status", reason: "Tách public/internal/blocked surfaces." },
      { label: "Support", href: "/support", reason: "Biết hỗ trợ nào đang có và chưa có." }
    ],
    readerOutcome: "Người chơi biết không có CTA tải giả và hiểu điều kiện để một build thật được hiển thị.",
    nonClaim: "No fake download CTA, no placeholder checksum, no portal entitlement backend."
  },
  {
    id: "community-roadmap-hub",
    title: "Theo dõi roadmap và cộng đồng",
    audience: "Người muốn góp ý, theo dõi tiến độ hoặc chuẩn bị closed testing",
    summary: "Nhóm route giúp phân biệt public guidance, planned feedback intake và backend/live community blocker.",
    primaryRoute: { label: "Community onboarding", href: "/community/onboarding", reason: "Đi qua onboarding paths, feedback channels và staged release messaging." },
    secondaryRoutes: [
      { label: "Community", href: "/community", reason: "Đọc nguyên tắc và community readiness." },
      { label: "Roadmap", href: "/roadmap", reason: "Xem decision gates trước khi kỳ vọng tính năng." },
      { label: "Support", href: "/support", reason: "Hiểu feedback hiện là static guidance." },
      { label: "Safety support", href: "/support/safety", reason: "Đọc privacy-safe issue reporting và conduct expectations." },
      { label: "Accessibility", href: "/accessibility", reason: "Đọc cách scan nội dung và dùng focus/CTA rõ hơn." }
    ],
    readerOutcome: "Người đọc biết cách theo dõi và góp ý mà không kỳ vọng live forum, ticket hoặc waitlist giả.",
    nonClaim: "No live community/chat/forum/guild backend, no fake waitlist, no ticket backend."
  }
];

export const playerEntryQuestions: PlayerEntryQuestion[] = [
  {
    question: "Tôi mới nghe tới game, nên đọc gì trước?",
    recommendedRoute: "/start",
    answer: "Bắt đầu ở Start hub để chọn đúng nhánh: hiểu game, kiểm tra download, xem roadmap hoặc đọc support/community.",
    avoidExpectation: "Không cần tìm portal/account hoặc download link khi release artifact chưa được duyệt."
  },
  {
    question: "Tôi muốn tải game ngay thì sao?",
    recommendedRoute: "/download/trust",
    answer: "Đọc download trust để biết vì sao chưa có nút tải và cần artifact, SHA256, provenance, limitations, owner approval.",
    avoidExpectation: "Không có fake download CTA, launcher-ready claim hoặc placeholder checksum."
  },
  {
    question: "Tôi muốn hiểu gameplay hiện tại?",
    recommendedRoute: "/game",
    answer: "Đọc Thế giới và Beginner guide để hiểu Spirit Gate, Gate Keeper, Training Stone và current non-combat journey.",
    avoidExpectation: "Không claim combat damage, loot, economy, guild/chat hoặc quest database production."
  },
  {
    question: "Tôi muốn góp ý hoặc theo dõi test?",
    recommendedRoute: "/community/onboarding",
    answer: "Đọc community onboarding để hiểu feedback guidance, staged release messaging và roadmap gates.",
    avoidExpectation: "Không có live ticket backend, forum/chat/guild backend hoặc fake waitlist."
  },
  {
    question: "Tôi đọc trên mobile thấy nhiều route quá thì sao?",
    recommendedRoute: "/accessibility",
    answer: "Đọc accessibility/readability hub để biết cách dùng Start hub, heading, scan aid, CTA đầu trang và boundary copy.",
    avoidExpectation: "Không claim formal WCAG audit, legal compliance certification hoặc personal accessibility settings backend."
  }
];

export const publicRouteGroups: PublicRouteGroup[] = [
  {
    group: "New player entry",
    purpose: "Cho người mới một đường đọc ngắn trước khi đi sâu vào news/guide/status.",
    routes: ["/start", "/", "/accessibility", "/game", "/guides/beginner"],
    readerOutcome: "Hiểu game direction và bước tiếp theo trong dưới một phút.",
    blockedClaim: "No account-aware onboarding or production tutorial backend."
  },
  {
    group: "Release trust",
    purpose: "Tách download/status/support evidence khỏi marketing CTA.",
    routes: ["/download", "/download/trust", "/status", "/support"],
    readerOutcome: "Biết release artifact nào còn thiếu và vì sao chưa có download thật.",
    blockedClaim: "No public artifact, no fake checksum, no entitlement backend."
  },
  {
    group: "Content depth",
    purpose: "Đưa người đọc từ list page sang detail page có player impact và blocked scope.",
    routes: ["/news", "/news/[slug]", "/guides", "/guides/[slug]"],
    readerOutcome: "Đọc được context, action và non-claim thay vì chỉ thấy card summary.",
    blockedClaim: "No CMS, no editorial backend, no live announcement scheduler."
  },
  {
    group: "Community and roadmap",
    purpose: "Giúp người chơi theo dõi tiến độ và feedback đúng kỳ vọng.",
    routes: ["/community", "/community/onboarding", "/support/safety", "/accessibility", "/roadmap"],
    readerOutcome: "Phân biệt ready/planned/blocked và biết feedback hiện là static guidance.",
    blockedClaim: "No live community/chat/forum/guild backend, no fake waitlist."
  }
];



export const gameplayLoopStages: GameplayLoopStage[] = [
  {
    id: "spirit-gate-entry",
    step: "01",
    title: "Spirit Gate entry",
    route: "/game",
    playerAction: "Đọc bối cảnh cổng vào và hiểu đây là điểm bắt đầu của hành trình public web.",
    expectedFeeling: "Có cảm giác bước vào online RPG Việt nhẹ nhàng, sáng rõ và chưa bị ép tải game.",
    currentBoundary: "No public game client download, no production account, no live server claim."
  },
  {
    id: "gate-keeper-orientation",
    step: "02",
    title: "Gate Keeper orientation",
    route: "/guides/world-gameplay-loop-guide",
    playerAction: "Đọc guide loop để hiểu NPC/narrative anchor dẫn người chơi qua thế giới, download trust và support.",
    expectedFeeling: "Biết mình cần đọc gì tiếp theo thay vì đoán giữa roadmap, status hoặc community.",
    currentBoundary: "No persisted dialogue, no quest backend, no account-aware tutorial progression."
  },
  {
    id: "training-stone-practice",
    step: "03",
    title: "Training Stone practice",
    route: "/guides/beginner",
    playerAction: "Hiểu Training Stone như vòng luyện tập tương tác/feedback trước combat thật.",
    expectedFeeling: "Có một mục tiêu ngắn và an toàn để hình dung gameplay loop đầu tiên.",
    currentBoundary: "No HP, damage, skill economy, loot, PvP, boss or inventory claim."
  },
  {
    id: "return-to-trust-status",
    step: "04",
    title: "Return to trust/status",
    route: "/download/trust",
    playerAction: "Quay lại Download Trust, Status và Support để kiểm tra release blockers và cách góp ý.",
    expectedFeeling: "Hiểu rõ vì sao chưa có nút tải và điều kiện nào mở closed testing.",
    currentBoundary: "No fake download CTA, no placeholder checksum, no entitlement portal."
  }
];

export const beginnerExpectations: BeginnerExpectation[] = [
  {
    topic: "Tôi sẽ chơi được gì ngay?",
    promiseNow: "Website giải thích loop vào cổng, đọc guide, kiểm tra download trust và gửi feedback đúng phạm vi.",
    notYet: "Chưa có public artifact, production auth, combat release, economy hoặc live social systems.",
    recommendedReading: "/game/loop"
  },
  {
    topic: "Spirit Gate có phải map thật chưa?",
    promiseNow: "Spirit Gate là visual/narrative anchor cho public onboarding và route-level copy.",
    notYet: "Không claim production map database, live region server hoặc persisted world state từ web repo.",
    recommendedReading: "/game"
  },
  {
    topic: "Training Stone có combat không?",
    promiseNow: "Training Stone được mô tả như vòng luyện tập tương tác nhẹ và kỳ vọng feedback.",
    notYet: "Không claim HP, damage, skill, loot, PvP, boss, inventory hoặc economy.",
    recommendedReading: "/guides/world-gameplay-loop-guide"
  },
  {
    topic: "Khi nào tải được?",
    promiseNow: "Download Trust giải thích artifact, SHA256, provenance, known limitations và owner approval.",
    notYet: "Không có fake download CTA, placeholder checksum hoặc entitlement portal.",
    recommendedReading: "/download/trust"
  }
];

export const guideWorldNavigationLinks: GuideWorldNavigationLink[] = [
  {
    from: "/start",
    to: "/game/loop",
    reason: "Start hub đưa người chơi mới tới loop explanation trước khi tìm download hoặc account.",
    safeExpectation: "Read-first onboarding; no account-aware personalization."
  },
  {
    from: "/game/loop",
    to: "/guides/world-gameplay-loop-guide",
    reason: "Loop page có guide chi tiết để người chơi hiểu từng bước và boundary.",
    safeExpectation: "Static guide; no quest/wiki backend."
  },
  {
    from: "/guides/world-gameplay-loop-guide",
    to: "/download/trust",
    reason: "Sau khi hiểu loop, người chơi kiểm tra release artifact/checksum/provenance trước khi kỳ vọng tải game.",
    safeExpectation: "Trust page; no fake download CTA."
  },
  {
    from: "/game/loop",
    to: "/support",
    reason: "Người chơi có thể đọc cách góp ý về world loop, wording và expected beginner path.",
    safeExpectation: "Static support guidance; no ticket backend."
  }
];

export const gameplayScopeBoundaries: GameplayScopeBoundary[] = [
  {
    surface: "World story",
    currentTruth: "Static public copy describes Spirit Gate, Gate Keeper and Training Stone as player-facing anchors.",
    nextProofNeeded: "Accepted game client evidence and canonical gameplay contract before live-world claims.",
    forbiddenClaim: "No live region/map/database or server population claim."
  },
  {
    surface: "Beginner loop",
    currentTruth: "Website explains a guided non-combat loop and route sequence for first-time readers.",
    nextProofNeeded: "Playable build artifact plus owned tutorial/combat contract before gameplay release claims.",
    forbiddenClaim: "No combat damage, HP, loot, skill economy or inventory progression claim."
  },
  {
    surface: "Guide-to-world navigation",
    currentTruth: "Static routes connect Start, Game Loop, Guides, Download Trust, Status and Support.",
    nextProofNeeded: "CMS/navigation ownership contract before dynamic personalization or live guide publishing.",
    forbiddenClaim: "No CMS, backend recommendation engine or account-aware onboarding claim."
  },
  {
    surface: "Feedback path",
    currentTruth: "Support and Community pages describe safe feedback expectations for world/gameplay copy.",
    nextProofNeeded: "Accepted support/contact/ticket/moderation contract before live intake claims.",
    forbiddenClaim: "No live ticket backend, forum/chat/guild or moderation dashboard claim."
  }
];


export const playerSafetyPrinciples: PlayerSafetyPrinciple[] = [
  {
    id: "privacy-first-reports",
    title: "Báo lỗi không gửi dữ liệu nhạy cảm",
    whyItMatters: "Người chơi mới thường muốn gửi ảnh/log ngay, nhưng web chưa có kênh intake, ticket backend hoặc privacy workflow chính thức.",
    playerCopy: "Khi góp ý, chỉ mô tả route, thiết bị, bước tái hiện và ảnh/log đã che thông tin riêng tư.",
    notClaimed: "No secure ticket inbox, no account lookup, no moderation dashboard."
  },
  {
    id: "closed-test-boundary",
    title: "Closed test phải có expectation rõ",
    whyItMatters: "Nếu chưa có build, known limitations và support owner, người chơi dễ hiểu nhầm roadmap thành quyền truy cập test.",
    playerCopy: "Closed testing sẽ chỉ được công bố khi có artifact, checksum, limitations và hướng dẫn hỗ trợ được duyệt.",
    notClaimed: "No fake waitlist, no entitlement portal, no live SLA claim."
  },
  {
    id: "friendly-conduct",
    title: "Tone cộng đồng thân thiện trước khi mở live system",
    whyItMatters: "Community copy cần đặt nền tảng lịch sự, giúp đỡ người mới và không spam đòi link tải khi chưa có release artifact.",
    playerCopy: "Góp ý theo hướng xây dựng: nói rõ bạn thấy gì, kỳ vọng gì, route nào gây nhầm lẫn và thiết bị đang dùng.",
    notClaimed: "No forum/chat/guild backend, no live moderation workflow."
  }
];

export const supportIssuePaths: SupportIssuePath[] = [
  {
    issue: "Không thấy nút tải game",
    whereToRead: "/download/trust",
    whatToPrepare: "Không cần gửi request riêng; hãy đọc artifact/checksum/provenance gate và roadmap decision gate.",
    privacyBoundary: "Không gửi email, số điện thoại, token hoặc payment data để xin quyền tải."
  },
  {
    issue: "Không hiểu gameplay hiện tại",
    whereToRead: "/game/loop",
    whatToPrepare: "Ghi lại đoạn copy/route khiến bạn nhầm giữa world loop, combat, economy hoặc release readiness.",
    privacyBoundary: "Không gửi save file, account credential hoặc backend log riêng tư."
  },
  {
    issue: "Muốn báo lỗi khi có closed test",
    whereToRead: "/support/safety",
    whatToPrepare: "Thiết bị, hệ điều hành, bước tái hiện, ảnh/video đã che thông tin riêng tư và version artifact nếu có.",
    privacyBoundary: "Không gửi mật khẩu, token, thông tin thanh toán, giấy tờ cá nhân hoặc private chat."
  },
  {
    issue: "Muốn góp ý cộng đồng",
    whereToRead: "/community/onboarding",
    whatToPrepare: "Nêu rõ góp ý về wording, route flow, beginner expectation hoặc download/status clarity.",
    privacyBoundary: "Không kỳ vọng forum/chat/guild live hoặc moderation response khi backend chưa mở."
  }
];

export const closedTestSupportExpectations: ClosedTestSupportExpectation[] = [
  {
    phase: "Before artifact",
    currentMessage: "Chỉ có static public guidance; chưa có file tải hoặc ticket/support intake thật.",
    requiredBeforeOpening: "Accepted build artifact, SHA256, provenance, known limitations and owner approval.",
    cannotPromise: "No access entitlement, no waitlist position, no live SLA."
  },
  {
    phase: "Artifact review",
    currentMessage: "Owner phải kiểm tra filename, platform, checksum, limitations, rollback note và support wording trước CTA.",
    requiredBeforeOpening: "Release evidence visible next to download link and privacy-safe issue reporting instructions.",
    cannotPromise: "No placeholder checksum, no automatic account lookup, no paid access."
  },
  {
    phase: "Closed-test announcement",
    currentMessage: "Nếu mở test, người chơi phải thấy rõ cách báo lỗi, dữ liệu không nên gửi, và phạm vi hỗ trợ.",
    requiredBeforeOpening: "Support owner, intake rule, privacy rule and known issue page approved.",
    cannotPromise: "No production support SLA, no moderation dashboard claim, no refund/payment support."
  }
];

export const communityConductRules: CommunityConductRule[] = [
  {
    rule: "Không spam link tải",
    friendlyVersion: "Hãy kiểm tra Download Trust trước khi hỏi link tải.",
    reason: "Web chưa có public artifact; spam link tải làm người mới hiểu sai trạng thái release.",
    moderationBoundary: "No live moderation backend; this is static conduct guidance."
  },
  {
    rule: "Không gửi bí mật cá nhân",
    friendlyVersion: "Che token, email riêng, mật khẩu, thông tin thanh toán và dữ liệu cá nhân trước khi gửi ảnh/log.",
    reason: "Support workflow thật chưa mở, nên public guidance phải ưu tiên an toàn dữ liệu.",
    moderationBoundary: "No secure ticket inbox or account recovery workflow."
  },
  {
    rule: "Góp ý có cấu trúc",
    friendlyVersion: "Nói route nào, bạn kỳ vọng gì, bạn thấy gì, và bước tái hiện ngắn gọn.",
    reason: "Feedback rõ giúp cải thiện web/game copy mà không cần backend intake giả.",
    moderationBoundary: "No live ticket, no SLA, no live assignment."
  }
];

export const accessibilityReadabilityPrinciples: AccessibilityReadabilityPrinciple[] = [
  {
    id: "heading-first-reading",
    title: "Heading phải nói rõ người chơi sắp hiểu gì",
    playerBenefit: "Người chơi mới có thể scan homepage, Start, Download Trust, Support và Game Loop mà không phải đọc toàn bộ đoạn dài.",
    implementationNote: "Mỗi route quan trọng dùng h1/h2 rõ, eyebrow chỉ bổ trợ, CTA đi sau context và non-claim vẫn gần nội dung nhạy cảm.",
    nonClaim: "No formal WCAG audit certification, no legal accessibility compliance claim."
  },
  {
    id: "mobile-scan-comfort",
    title: "Mobile đọc theo cụm ngắn, không ép nhớ toàn bộ roadmap",
    playerBenefit: "Trên điện thoại, người chơi thấy câu trả lời ngắn: bắt đầu đâu, tải được chưa, báo lỗi thế nào, điều gì chưa mở.",
    implementationNote: "Cards, CTA bands and route groups ưu tiên single-column, full-width controls and short summary-first copy.",
    nonClaim: "No device-specific personalization or account-aware accessibility profile."
  },
  {
    id: "focus-order-before-effects",
    title: "Focus order quan trọng hơn hiệu ứng trang trí",
    playerBenefit: "Người dùng keyboard có thể bỏ qua navigation dài, vào main content và di chuyển qua CTA chính theo thứ tự hợp lý.",
    implementationNote: "Public shell có skip link; links/buttons có focus-visible outline; CTA groups đặt theo hành trình đọc thật.",
    nonClaim: "No assistive-technology lab certification or automated accessibility score claim."
  }
];

export const routeReadabilityChecks: RouteReadabilityCheck[] = [
  {
    route: "/accessibility",
    headingPromise: "Đọc website rõ hơn bằng heading, mobile scan aid và focus order thay vì mò route.",
    firstAction: "Dùng skip link hoặc CTA đầu trang để vào nội dung chính, sau đó chọn route theo câu hỏi của mình.",
    scanAid: "Accessibility/readability boards tách principles, route checks, mobile rules và focus order.",
    boundary: "No formal WCAG audit, no legal compliance certification, no personal accessibility settings backend."
  },
  {
    route: "/start",
    headingPromise: "Chọn đúng đường đọc trước khi tìm download, account hoặc community.",
    firstAction: "Đọc hero, chọn một CTA chính, rồi dùng route group để đi tiếp.",
    scanAid: "Question board map câu hỏi phổ biến tới route tương ứng.",
    boundary: "No account-aware onboarding or backend recommendation engine."
  },
  {
    route: "/download/trust",
    headingPromise: "Hiểu vì sao chưa có nút tải và bằng chứng nào mở được download thật.",
    firstAction: "Đọc trust gates trước khi tìm file tải.",
    scanAid: "Artifact/checksum/provenance cards tách ready/planned/blocked.",
    boundary: "No public game download artifact, no placeholder checksum."
  },
  {
    route: "/support/safety",
    headingPromise: "Báo lỗi và góp ý mà không gửi dữ liệu nhạy cảm.",
    firstAction: "Đọc privacy boundary trước khi chuẩn bị ảnh/log.",
    scanAid: "Issue paths nối lỗi phổ biến tới route đọc an toàn.",
    boundary: "No secure ticket inbox, no account lookup, no moderation dashboard."
  },
  {
    route: "/game/loop",
    headingPromise: "Hiểu loop Spirit Gate → Gate Keeper → Training Stone trước khi kỳ vọng combat thật.",
    firstAction: "Đọc 4 stage loop và beginner expectations.",
    scanAid: "Stage cards dùng số bước và current boundary gần từng hành động.",
    boundary: "No combat damage, HP, loot, skill economy or live world server."
  }
];

export const mobileScannabilityRules: MobileScannabilityRule[] = [
  {
    surface: "Navigation",
    mobileNeed: "Menu dài phải cuộn ngang rõ và không chặn người dùng vào nội dung chính.",
    contentTreatment: "Skip link đưa thẳng tới main content; nav giữ hit target tối thiểu và readable labels.",
    failureToAvoid: "Không bắt người chơi mobile đọc hết navigation trước khi hiểu trang."
  },
  {
    surface: "Hero / CTA",
    mobileNeed: "CTA phải full-width, nhìn thấy lựa chọn chính và không lẫn với claim kỹ thuật.",
    contentTreatment: "CTA groups được stack, summary-first copy và non-claim band nằm gần nội dung nhạy cảm.",
    failureToAvoid: "Không biến runtime/browser evidence thành CTA release-ready."
  },
  {
    surface: "Cards / long guides",
    mobileNeed: "Card dài phải có heading/action/boundary dễ scan.",
    contentTreatment: "Guide/detail boards dùng h3 ngắn, strong label, small boundary và khoảng cách đọc đều.",
    failureToAvoid: "Không đẩy blocker xuống cuối trang khiến người chơi tưởng đã có download/account thật."
  }
];

export const focusOrderCheckpoints: FocusOrderCheckpoint[] = [
  {
    sequence: "01",
    label: "Skip to main content",
    keyboardExpectation: "Tab đầu tiên có thể bỏ qua navigation dài để vào nội dung route hiện tại.",
    nonClaim: "No formal keyboard audit certification."
  },
  {
    sequence: "02",
    label: "Hero CTA order",
    keyboardExpectation: "CTA đầu tiên đi tới Start/Game/Download Trust/Support theo mục tiêu trang, không tới backend giả.",
    nonClaim: "No personal route recommendation backend."
  },
  {
    sequence: "03",
    label: "Detail cards",
    keyboardExpectation: "Các link trong card giữ focus outline rõ và text link mô tả hành động cụ thể.",
    nonClaim: "No automated screen-reader certification claim."
  },
  {
    sequence: "04",
    label: "Footer boundary",
    keyboardExpectation: "Người đọc vẫn thấy non-claims sau khi đi hết trang.",
    nonClaim: "No production deployment or legal compliance claim."
  }
];


export const performanceCopyBudgetPrinciples: PerformanceCopyBudgetPrinciple[] = [
  {
    id: "copy-weight-before-effects",
    title: "Copy nhẹ trước, hiệu ứng sau",
    playerBenefit: "Người chơi hiểu trạng thái game trong vài dòng đầu thay vì bị ngập bởi đoạn dài hoặc thuật ngữ runtime.",
    implementationNote: "Hero, CTA bands and card groups keep summary-first copy, short labels and nearby non-claims for download/account/support surfaces.",
    nonClaim: "No Lighthouse score certification, no Core Web Vitals measured PASS."
  },
  {
    id: "css-only-visual-budget",
    title: "Visual fantasy dùng CSS-only khi chưa có asset thật",
    playerBenefit: "Trang vẫn có cảm giác Linh Giới mà không cần hero image nặng, ảnh placeholder hoặc art pack chưa được duyệt.",
    implementationNote: "Spirit Gate preview, glow panels and badges stay CSS/token-driven until runtime-usable asset contracts exist.",
    nonClaim: "No production art pipeline, no image CDN or approved game asset pack claim."
  },
  {
    id: "static-route-composition",
    title: "Route public ưu tiên static composition",
    playerBenefit: "Các trang hướng dẫn, status, download trust và onboarding mở rõ ràng ngay cả khi chưa có backend thật.",
    implementationNote: "Use file-backed typed content and static routes; do not introduce client-heavy personalization or backend fetching for public copy.",
    nonClaim: "No CMS, no live personalization, no backend recommendation engine."
  },
  {
    id: "mobile-reading-density",
    title: "Mobile density phải giúp đọc nhanh, không nhồi dashboard",
    playerBenefit: "Người đọc trên điện thoại thấy CTA chính, boundary và next route trong từng cụm ngắn.",
    implementationNote: "Cards stack, long boards use clear labels, and dense technical evidence stays in handoff/report rather than public hero copy.",
    nonClaim: "No device lab performance certification or production RUM monitoring."
  }
];

export const staticRouteCompositionRules: StaticRouteCompositionRule[] = [
  {
    route: "/performance",
    staticSurface: "Performance/copy budget hub is a static product page backed by typed fixtures.",
    copyBudget: "Explain copy weight, CSS-only visuals, static route composition and mobile density in short cards.",
    cssAssetRule: "Use existing token-driven panels and badges; no new bitmap hero or remote media dependency.",
    fallbackMessage: "No Core Web Vitals measured PASS or production monitoring claim."
  },
  {
    route: "/download/trust",
    staticSurface: "Download trust remains static until release artifact evidence exists.",
    copyBudget: "Keep artifact, checksum, provenance and owner approval visible before any CTA.",
    cssAssetRule: "Trust cards use CSS borders/status badges instead of heavy release artwork.",
    fallbackMessage: "No fake download CTA, no placeholder checksum."
  },
  {
    route: "/game/loop",
    staticSurface: "World loop explains gameplay expectations without runtime server data.",
    copyBudget: "Stage cards describe Spirit Gate, Gate Keeper and Training Stone with short current-boundary copy.",
    cssAssetRule: "Fantasy feeling comes from CSS Spirit panels until approved runtime assets exist.",
    fallbackMessage: "No live world server, no combat/economy release claim."
  },
  {
    route: "/support/safety",
    staticSurface: "Support safety is guidance-only until approved ticket/support backend exists.",
    copyBudget: "Issue paths stay privacy-first and avoid collecting secrets or account recovery data.",
    cssAssetRule: "Support boards stay text/card-based and do not embed external form widgets.",
    fallbackMessage: "Chưa có ticket inbox an toàn, chưa tra cứu tài khoản, chưa SLA hỗ trợ production."
  }
];

export const perceivedLoadSignals: PerceivedLoadSignal[] = [
  {
    surface: "Hero first impression",
    playerFeeling: "Thấy ngay game là gì, có tải chưa và nên bấm đâu tiếp.",
    copyTreatment: "One primary player message, bounded CTA set and status badge near the h1.",
    mustAvoid: "Do not make runtime evidence or tool status the emotional center of the public page."
  },
  {
    surface: "Guide/detail routes",
    playerFeeling: "Đọc được từng bước mà không phải chờ live wiki hoặc CMS.",
    copyTreatment: "Short sections with expected result, blocked scope and next route link.",
    mustAvoid: "Do not imply live quest database, account-aware guide or backend recommendation."
  },
  {
    surface: "Download/status routes",
    playerFeeling: "Tin được vì blocker nằm cạnh CTA, không bị giấu cuối trang.",
    copyTreatment: "Use explicit trust gates, SHA/provenance requirements and no-download wording.",
    mustAvoid: "Do not show fake release-ready language or placeholder checksum."
  }
];

export const mobileDensityBudgets: MobileDensityBudget[] = [
  {
    surface: "Homepage",
    densityTarget: "Một hero message, tối đa vài CTA quan trọng, rồi chuyển sang Start/Performance hubs.",
    treatment: "Move repeated evidence language out of hero and into route-specific boards.",
    failureToAvoid: "Không biến homepage thành changelog kỹ thuật dài trên mobile."
  },
  {
    surface: "Start hub",
    densityTarget: "Câu hỏi người chơi mới phải dẫn tới route đúng trong một lượt đọc.",
    treatment: "Use entry questions, route groups and CTA bands instead of long prose blocks.",
    failureToAvoid: "Không bắt người chơi nhớ toàn bộ roadmap trước khi biết nên mở trang nào."
  },
  {
    surface: "Download / support",
    densityTarget: "Boundary phải gần hành động nhạy cảm: tải game, tài khoản, support, feedback.",
    treatment: "Keep not-available/not-claimed messages beside CTA and issue paths.",
    failureToAvoid: "Không để người chơi tưởng đã có account portal, ticket backend hoặc public build."
  }
];


export const routeContinuityBridges: RouteContinuityBridge[] = [
  {
    id: "start-to-world-loop",
    fromRoute: "/start",
    toRoute: "/game/loop",
    playerQuestion: "Game này chơi như thế nào trước khi có bản tải public?",
    bridgeCopy: "Đi từ Start hub sang World Loop để hiểu Spirit Gate, Gate Keeper và Training Stone như một hành trình đọc/game expectation an toàn.",
    ctaLabel: "Hiểu world loop",
    conversionBoundary: "No combat release, no live world server, no account-aware progression."
  },
  {
    id: "world-loop-to-download-trust",
    fromRoute: "/game/loop",
    toRoute: "/download/trust",
    playerQuestion: "Sau khi hiểu loop, tôi tải game ở đâu?",
    bridgeCopy: "World Loop phải dẫn người chơi tới Download Trust trước, vì public artifact/checksum/approval vẫn là gate riêng.",
    ctaLabel: "Kiểm tra điều kiện tải",
    conversionBoundary: "No fake download CTA, no placeholder checksum, no launcher claim."
  },
  {
    id: "download-trust-to-status",
    fromRoute: "/download/trust",
    toRoute: "/status",
    playerQuestion: "Nếu chưa tải được thì trạng thái hiện tại là gì?",
    bridgeCopy: "Download Trust chuyển sang Status để tách public info, internal guardrails và blocked backend/release surfaces.",
    ctaLabel: "Xem trạng thái thật",
    conversionBoundary: "Runtime/browser guardrail is not release readiness."
  },
  {
    id: "status-to-support-safety",
    fromRoute: "/status",
    toRoute: "/support/safety",
    playerQuestion: "Tôi nên báo lỗi/góp ý thế nào khi chưa có ticket backend?",
    bridgeCopy: "Status cần nối tới Support Safety để người chơi biết chuẩn bị bug report an toàn và không gửi dữ liệu nhạy cảm.",
    ctaLabel: "Báo lỗi an toàn",
    conversionBoundary: "Chưa có ticket inbox an toàn, chưa tra cứu tài khoản, chưa SLA hỗ trợ production."
  },
  {
    id: "support-safety-to-community-onboarding",
    fromRoute: "/support/safety",
    toRoute: "/community/onboarding",
    playerQuestion: "Sau khi biết support boundary, cộng đồng nên kỳ vọng gì?",
    bridgeCopy: "Support Safety nối về Community Onboarding để feedback, conduct và staged release messaging không bị lẫn với live forum/chat.",
    ctaLabel: "Đọc onboarding cộng đồng",
    conversionBoundary: "No live community/chat/forum/guild backend."
  },
  {
    id: "any-route-to-performance",
    fromRoute: "public route cluster",
    toRoute: "/performance",
    playerQuestion: "Vì sao các trang dùng copy ngắn và không nhồi ảnh lớn?",
    bridgeCopy: "Performance hub giải thích copy budget, CSS-only visuals và mobile reading density để route continuity không biến thành trang nặng.",
    ctaLabel: "Đọc performance/copy budget",
    conversionBoundary: "No Core Web Vitals measured PASS, no Lighthouse certification, no image CDN claim."
  }
];

export const conversionSafeCtas: ConversionSafeCta[] = [
  {
    surface: "Homepage hero",
    primaryAction: "Bắt đầu đúng hướng",
    supportingAction: "Khám phá thế giới / Kiểm tra tải game / Safety support",
    safeWhen: "Safe when CTA opens static public information and keeps blocked claims nearby.",
    mustNotImply: "Must not imply public build availability, account login, entitlement or production portal."
  },
  {
    surface: "Download and Download Trust",
    primaryAction: "Kiểm tra điều kiện tải",
    supportingAction: "Xem Status / Release trust guide",
    safeWhen: "Safe when CTA explains artifact/checksum/provenance/approval requirements before any release link exists.",
    mustNotImply: "Must not show fake download, placeholder checksum, launcher install or closed-test entitlement."
  },
  {
    surface: "Support and Safety",
    primaryAction: "Đọc safety support",
    supportingAction: "Chuẩn bị bug report an toàn / Đọc community onboarding",
    safeWhen: "Safe when CTA teaches what to prepare and what not to share without collecting user data.",
    mustNotImply: "Must not imply ticket backend, secure inbox, account lookup, moderation dashboard or SLA."
  },
  {
    surface: "Game Loop and Guides",
    primaryAction: "Hiểu world loop",
    supportingAction: "Mở beginner/world guide / Download trust",
    safeWhen: "Safe when CTA sets gameplay expectation before release/download/action surfaces.",
    mustNotImply: "Must not imply combat damage, loot, skill economy, quest DB or live world server."
  }
];

export const journeyFrictionChecks: JourneyFrictionCheck[] = [
  {
    route: "/start",
    possibleConfusion: "Người chơi thấy quá nhiều route và không biết bắt đầu từ game, download hay support.",
    clarification: "Start hub ưu tiên câu hỏi người chơi, sau đó mới tới route groups và trust/status surfaces.",
    nextBestRoute: "/journey",
    nonClaim: "No personalized recommendation backend."
  },
  {
    route: "/game/loop",
    possibleConfusion: "World loop có thể bị hiểu nhầm là gameplay/combat đã release.",
    clarification: "Loop copy đặt current boundary cạnh từng stage và chuyển tiếp sang Download Trust thay vì CTA tải giả.",
    nextBestRoute: "/download/trust",
    nonClaim: "No combat/economy/live server claim."
  },
  {
    route: "/download/trust",
    possibleConfusion: "Người chơi kỳ vọng nút tải vì thấy download route.",
    clarification: "Trust gates nói rõ artifact/checksum/provenance/approval là điều kiện trước mọi link tải.",
    nextBestRoute: "/status",
    nonClaim: "No public game download artifact."
  },
  {
    route: "/support/safety",
    possibleConfusion: "Người chơi tưởng có thể gửi ticket hoặc account recovery thật.",
    clarification: "Issue paths chỉ hướng dẫn chuẩn bị thông tin an toàn và nêu rõ chưa có ticket/account backend.",
    nextBestRoute: "/community/onboarding",
    nonClaim: "No secure ticket inbox or account lookup."
  }
];

export const pageCohesionCheckpoints: PageCohesionCheckpoint[] = [
  {
    checkpoint: "Primary route chain",
    routeSet: ["/start", "/journey", "/game/loop", "/download/trust", "/status", "/support/safety"],
    cohesionRule: "Every major player-facing route should offer a next step that explains status or boundary before conversion-sensitive actions.",
    readerOutcome: "Người chơi đi qua một hành trình có thứ tự thay vì nhảy thẳng tới download/account/support chưa có.",
    blockedClaim: "No fake conversion funnel, no production account, no public artifact."
  },
  {
    checkpoint: "Learning route chain",
    routeSet: ["/guides", "/guides/route-continuity-conversion-guide", "/accessibility", "/performance"],
    cohesionRule: "Guides must explain how to read routes and why copy/accessibility/performance constraints protect trust.",
    readerOutcome: "Reviewer và người chơi hiểu vì sao public web ưu tiên copy rõ, link đúng và route nhẹ.",
    blockedClaim: "No CMS, no live wiki, no formal audit/certification claim."
  },
  {
    checkpoint: "Community route chain",
    routeSet: ["/community", "/community/onboarding", "/roadmap", "/support/safety"],
    cohesionRule: "Community CTAs must lead to expectation-setting before any feedback/conduct language.",
    readerOutcome: "Người chơi hiểu staged release, conduct và feedback boundaries trước khi kỳ vọng live social features.",
    blockedClaim: "No live forum/chat/guild/moderation backend."
  }
];



export const playerTrustSignals: PlayerTrustSignal[] = [
  {
    id: "truth-before-download",
    title: "Nói thật trước khi dẫn tới download",
    playerQuestion: "Tôi có thể tải game ngay chưa?",
    trustAnswer: "Chưa có public production download; web chỉ giải thích điều kiện artifact, checksum, provenance và approval.",
    proofBeforeClaim: "Accepted release artifact, SHA256 sidecar, manifest/provenance, known limitations and owner approval.",
    forbiddenShortcut: "No fake download button, no placeholder checksum, no launcher promise."
  },
  {
    id: "status-before-hype",
    title: "Status phải đứng trước hype",
    playerQuestion: "Nếu website nhìn đã khá đầy đủ, release đã gần xong chưa?",
    trustAnswer: "Status page tách public content readiness, internal runtime guardrails và blocked backend/release gates.",
    proofBeforeClaim: "Public status wording must identify source-of-truth and blocked surfaces next to CTA copy.",
    forbiddenShortcut: "No release-ready claim from web polish, browser matrix or static route build."
  },
  {
    id: "support-before-intake",
    title: "Support an toàn trước khi có intake thật",
    playerQuestion: "Tôi báo lỗi, gửi tài khoản hoặc xin vào test ở đâu?",
    trustAnswer: "Support Safety chỉ hướng dẫn chuẩn bị thông tin an toàn và nhắc không gửi secrets/private data khi chưa có kênh chính thức.",
    proofBeforeClaim: "Accepted support intake contract, privacy boundary, owner triage process and moderation/audit path.",
    forbiddenShortcut: "No live ticket inbox, no account lookup, no recovery promise, no moderation dashboard."
  },
  {
    id: "closed-test-before-public",
    title: "Closed test là stage riêng, không phải public launch",
    playerQuestion: "Closed testing có nghĩa là mọi người đều chơi được chưa?",
    trustAnswer: "Closed test cần thông báo giới hạn, known issues, rollback path và cách gửi feedback an toàn trước khi mở rộng.",
    proofBeforeClaim: "Owner-approved tester scope, build checksum, limitation note, feedback protocol and support expectation.",
    forbiddenShortcut: "No open registration, no entitlement automation, no reward/economy promise."
  }
];

export const releaseNarrativeStages: ReleaseNarrativeStage[] = [
  {
    stage: "M0 — Sẵn sàng nội dung",
    visibility: "public",
    playerMessage: "Website đã giúp người chơi hiểu thế giới, vòng chơi, tin cậy tải game, hỗ trợ an toàn và roadmap.",
    requiredProof: "Validator nguồn, static build và review copy theo từng route.",
    nextSafeRoute: "/start",
    nonClaim: "Không claim build public, account portal hoặc backend production."
  },
  {
    stage: "Kiểm tra tin cậy",
    visibility: "internal",
    playerMessage: "Owner chuẩn bị gói build, SHA256, giới hạn đã biết, phạm vi tester và kỳ vọng hỗ trợ.",
    requiredProof: "Gói phát hành, SHA256, manifest, giới hạn, ghi chú rollback và phê duyệt owner.",
    nextSafeRoute: "/download/trust",
    nonClaim: "Không tải công khai, không open beta, không tự động cấp quyền truy cập."
  },
  {
    stage: "Điều kiện closed test",
    visibility: "blocked",
    playerMessage: "Chỉ mở khi có build được duyệt và kênh feedback an toàn; web chưa được tự bật CTA tham gia.",
    requiredProof: "Quy trình tester được duyệt, support intake và ranh giới privacy/moderation.",
    nextSafeRoute: "/support/safety",
    nonClaim: "Không ticket hỗ trợ live, không khôi phục tài khoản, không SLA production."
  },

  {
    stage: "Contract backend",
    visibility: "blocked",
    playerMessage: "Dịch vụ, DB, giám sát và cảnh báo cần contract owner-approved trước khi web claim hệ thống thật.",
    requiredProof: "Accepted Auth/API/DB/RBAC/audit contract, monitoring plan và rehearsal vận hành.",
    nextSafeRoute: "/release/readiness",
    nonClaim: "Không claim production auth, DB persistence hoặc entitlement automation."
  },
  {
    stage: "Owner phê duyệt",
    visibility: "blocked",
    playerMessage: "Owner phải xác nhận Download, Status, Support và Community cùng nói đúng trạng thái build.",
    requiredProof: "Go / No-Go decision, risk assessment và sign-off bởi product owner.",
    nextSafeRoute: "/roadmap",
    nonClaim: "Không silent launch, không open beta copy, không bypass owner sign-off."
  },
  {
    stage: "M1 — Closed test có điều kiện",
    visibility: "blocked",
    playerMessage: "Ứng viên tải công khai chỉ xuất hiện khi bằng chứng phát hành đã đủ và status page ghi rõ giới hạn.",
    requiredProof: "Gói public, SHA256, nguồn gốc, release note, giới hạn đã biết, kế hoạch rollback/hỗ trợ và owner sign-off.",
    nextSafeRoute: "/status",
    nonClaim: "Không launch production, không payment/economy, hôm nay chưa có gói tải game công khai."
  }
];

export const closedTestReadinessChecks: ClosedTestReadinessCheck[] = [
  {
    check: "Build artifact and checksum",
    currentState: "blocked",
    playerExpectation: "Người chơi thấy rõ chưa có build public và không bấm vào link tải giả.",
    ownerGate: "Attach accepted build artifact, SHA256 sidecar and manifest before any download CTA.",
    mustNotPromise: "No placeholder file, no fake checksum, no launcher install."
  },
  {
    check: "Known limitations",
    currentState: "ready-copy",
    playerExpectation: "Người chơi biết closed test có giới hạn, bug và scope nhỏ.",
    ownerGate: "Publish limitation note tied to exact artifact/version before inviting testers.",
    mustNotPromise: "No full MMO, no combat/economy completeness, no live event reward."
  },
  {
    check: "Feedback and safety path",
    currentState: "planned",
    playerExpectation: "Người chơi biết nên gửi gì và không gửi dữ liệu nhạy cảm.",
    ownerGate: "Choose official intake channel, privacy boundary and triage owner before collecting feedback.",
    mustNotPromise: "No secure ticket inbox, no account lookup, no moderation backend."
  },
  {
    check: "Status and support alignment",
    currentState: "planned",
    playerExpectation: "Download, Status và Support nói cùng một sự thật về stage hiện tại.",
    ownerGate: "Update status trust surfaces and support FAQ in the same release package.",
    mustNotPromise: "No production SLA, no instant fix, no automated entitlement."
  }
];

export const trustJourneyCheckpoints: TrustJourneyCheckpoint[] = [
  {
    route: "/release",
    trustQuestion: "Stage hiện tại là gì?",
    answerOnPage: "Content-ready web đang giải thích release gates, không claim public build.",
    nextRoute: "/download/trust",
    boundary: "No production release claim."
  },
  {
    route: "/download/trust",
    trustQuestion: "Cần bằng chứng nào trước khi có link tải?",
    answerOnPage: "Artifact, SHA256, provenance, limitations and owner approval.",
    nextRoute: "/status",
    boundary: "No fake download CTA."
  },
  {
    route: "/status",
    trustQuestion: "Public, internal và blocked khác nhau thế nào?",
    answerOnPage: "Status tách public copy, internal guardrail và blocked backend/release surfaces.",
    nextRoute: "/support/safety",
    boundary: "No release-ready claim from runtime/browser checks."
  },
  {
    route: "/support/safety",
    trustQuestion: "Người chơi nên báo lỗi thế nào cho an toàn?",
    answerOnPage: "Chỉ chuẩn bị mô tả lỗi an toàn; không gửi secrets hoặc dữ liệu nhạy cảm.",
    nextRoute: "/community/onboarding",
    boundary: "No secure ticket/account backend."
  }
];



export const releaseReadinessHubItems: ReleaseReadinessHubItem[] = [
  {
    id: "readiness-stage-truth",
    title: "Stage hiện tại phải rõ trước CTA",
    route: "/release/readiness",
    playerQuestion: "Hiện giờ đã tới giai đoạn tải hoặc test chưa?",
    readinessAnswer: "Chưa. Public web đang ở stage giải thích readiness và cổng owner trước khi có artifact tải game hoặc lời mời closed test.",
    ownerEvidence: "Artifact phát hành, SHA256, manifest, ghi chú giới hạn, đường hỗ trợ và owner phê duyệt.",
    blockedClaim: "Chưa có bản tải công khai, chưa open beta, chưa tự động cấp quyền tài khoản."
  },
  {
    id: "download-proof-chain",
    title: "Tải game cần chuỗi bằng chứng",
    route: "/download/trust",
    playerQuestion: "Link tải thật cần gì?",
    readinessAnswer: "Tải game chỉ được hiển thị khi có artifact được duyệt, checksum, nguồn gốc file, ghi chú giới hạn và wording rollback/hỗ trợ.",
    ownerEvidence: "Artifact được chấp nhận + SHA256 đi kèm + ghi chú nguồn gốc + giới hạn đã biết + owner rollback/hỗ trợ.",
    blockedClaim: "Không CTA tải giả, không checksum placeholder, không hứa launcher."
  },
  {
    id: "tester-expectation-safe",
    title: "Kỳ vọng tester phải an toàn",
    route: "/support/safety",
    playerQuestion: "Tôi cần chuẩn bị gì nếu được mời test?",
    readinessAnswer: "Chuẩn bị mô tả thiết bị, lỗi, bước tái hiện và feedback không chứa secrets; không gửi account/private data khi chưa có kênh chính thức.",
    ownerEvidence: "Phạm vi tester, ranh giới privacy, kênh tiếp nhận, owner triage và copy giới hạn đã biết.",
    blockedClaim: "Chưa có ticket inbox an toàn, chưa tra cứu tài khoản, chưa SLA hỗ trợ production."
  },
  {
    id: "status-support-alignment",
    title: "Trạng thái và Hỗ trợ phải đồng bộ",
    route: "/status",
    playerQuestion: "Nếu Status nói blocked thì Support có được nhận ticket thật không?",
    readinessAnswer: "Không. Status và Support phải cùng nói một sự thật: guidance hiện là static, support intake/ticket backend còn blocked.",
    ownerEvidence: "Bề mặt trạng thái đồng bộ, FAQ hỗ trợ, ranh giới an toàn và next action đã được owner duyệt.",
    blockedClaim: "Không mâu thuẫn giữa copy trạng thái, tải game và hỗ trợ."
  }
];

export const ownerReleaseGates: OwnerReleaseGate[] = [
  {
    gate: "Gói phát hành",
    owner: "Owner game/phát hành",
    currentState: "blocked",
    proofRequired: "Gói build, SHA256, manifest, version note và hướng dẫn rollback.",
    playerVisibleRule: "Hiển thị copy chưa có tải cho đến khi bằng chứng gói build tồn tại.",
    mustNotSkip: "Không dùng file placeholder hoặc SHA256 giả."
  },
  {
    gate: "Giới hạn đã biết",
    owner: "Owner sản phẩm/gameplay",
    currentState: "ready-copy",
    proofRequired: "Ghi chú giới hạn đã duyệt, gắn với đúng gói build và stage.",
    playerVisibleRule: "Đặt copy giới hạn gần CTA phát hành/test.",
    mustNotSkip: "Không hứa full MMO, combat/economy hoặc live world."
  },
  {
    gate: "Tiếp nhận tester",
    owner: "Owner cộng đồng/hỗ trợ",
    currentState: "planned",
    proofRequired: "Kênh tiếp nhận chính thức, ranh giới privacy, quy trình triage và kỳ vọng phản hồi.",
    playerVisibleRule: "Giải thích cần chuẩn bị gì, không yêu cầu gửi secrets.",
    mustNotSkip: "Không hứa secure ticket inbox hoặc khôi phục tài khoản."
  },
  {
    gate: "Owner phê duyệt",
    owner: "Owner phát hành AXIRO/LGO",
    currentState: "blocked",
    proofRequired: "Phê duyệt rõ ràng rằng copy Download, Status, Support và Community khớp trạng thái gói build.",
    playerVisibleRule: "Không chuyển từ wording readiness sang wording phát hành trước khi được phê duyệt.",
    mustNotSkip: "Không launch công khai âm thầm hoặc dùng copy open beta."
  }
];

export const testerExpectationCopy: TesterExpectationCopy[] = [
  {
    topic: "Thiết bị và môi trường",
    playerExpectation: "Tester nên chuẩn bị thiết bị, OS, mạng, bước tái hiện và ảnh/log không chứa secrets.",
    copyOnWeb: "Closed test cần feedback có cấu trúc, không phải lời hứa mọi máy đều chạy ổn.",
    supportBoundary: "No device certification or performance guarantee."
  },
  {
    topic: "Tài khoản và quyền truy cập",
    playerExpectation: "Không tự tạo account hoặc đòi entitlement nếu chưa có thông báo owner-approved.",
    copyOnWeb: "Tài khoản/quyền truy cập cần contract backend riêng; hiện chỉ là giải thích readiness phát hành.",
    supportBoundary: "No production auth, no account lookup, no entitlement automation."
  },
  {
    topic: "Báo lỗi",
    playerExpectation: "Gửi mô tả ngắn, route/screen, bước tái hiện, expected/actual và severity nếu có kênh chính thức.",
    copyOnWeb: "Báo lỗi guidance phải bảo vệ privacy trước khi có secure support system.",
    supportBoundary: "No live ticket backend or production SLA."
  },
  {
    topic: "Gameplay scope",
    playerExpectation: "Hiểu closed test là kiểm tra stage nhỏ, không phải cam kết combat/economy/social đầy đủ.",
    copyOnWeb: "Tester copy phải nêu rõ scope và known limitations cạnh release stage.",
    supportBoundary: "No reward/economy promise, no live event reward, no PvP/boss claim."
  }
];

export const releaseSurfaceAlignment: ReleaseSurfaceAlignment[] = [
  {
    surface: "Download",
    route: "/download/trust",
    mustSay: "Artifact/checksum/provenance/approval còn là gate bắt buộc.",
    mustLinkTo: "/release/readiness",
    contradictionToAvoid: "Không vừa nói chưa có artifact vừa hiển thị CTA tải thật."
  },
  {
    surface: "Status",
    route: "/status",
    mustSay: "Public/internal/blocked surfaces khác nhau và runtime guardrail không phải release readiness.",
    mustLinkTo: "/release/readiness",
    contradictionToAvoid: "Không dùng build/test PASS để claim open beta hoặc release-ready."
  },
  {
    surface: "Support",
    route: "/support/safety",
    mustSay: "Issue reporting hiện là guidance an toàn, chưa phải secure ticket/account recovery.",
    mustLinkTo: "/release/readiness",
    contradictionToAvoid: "Không yêu cầu người chơi gửi secrets/private data qua kênh chưa định nghĩa."
  },
  {
    surface: "Community",
    route: "/community/onboarding",
    mustSay: "Community onboarding là expectation-setting, chưa phải live forum/chat/guild.",
    mustLinkTo: "/release/readiness",
    contradictionToAvoid: "Không biến closed-test interest thành open registration hoặc guaranteed access."
  }
];


export const closedTesterChecklist: ClosedTesterChecklistItem[] = [
  { id: "read-stage-first", title: "Đọc stage trước khi kỳ vọng quyền test", testerQuestion: "Tôi có đang được mời test chưa?", safePreparation: "Đọc /release/readiness và /release/tester-pack để hiểu hiện mới là thông tin chuẩn bị, chưa phải lời mời hoặc form đăng ký.", whereToRead: "/release/readiness", nonClaim: "No live tester intake, no tester slot guarantee, no entitlement automation." },
  { id: "prepare-device-context", title: "Chuẩn bị bối cảnh thiết bị an toàn", testerQuestion: "Nếu sau này có kênh chính thức, tôi nên chuẩn bị thông tin gì?", safePreparation: "Ghi thiết bị, OS, mạng, độ phân giải, route/screen và bước tái hiện theo mẫu; không gửi secrets hoặc dữ liệu riêng tư.", whereToRead: "/release/tester-pack", nonClaim: "No device certification, no performance guarantee, no data collection backend." },
  { id: "report-small-scope", title: "Báo lỗi theo phạm vi stage nhỏ", testerQuestion: "Feedback nên tập trung vào đâu?", safePreparation: "Tập trung vào download trust, status clarity, support wording, beginner journey và known limitations; không kỳ vọng combat/economy/social đầy đủ.", whereToRead: "/game/loop", nonClaim: "No full MMO claim, no combat reward promise, no live event reward." },
  { id: "wait-for-official-channel", title: "Chờ kênh owner-approved", testerQuestion: "Tôi gửi feedback ở đâu?", safePreparation: "Hiện chỉ chuẩn bị nội dung feedback. Chỉ gửi khi website hoặc owner công bố kênh chính thức có privacy boundary rõ ràng.", whereToRead: "/support/safety", nonClaim: "No secure ticket inbox, no account lookup, no moderation dashboard." }
];

export const safeFeedbackTemplates: SafeFeedbackTemplate[] = [
  { field: "Tóm tắt ngắn", guidance: "Mô tả vấn đề trong một câu: route hoặc màn hình nào, chuyện gì xảy ra, mức độ ảnh hưởng.", example: "Trên trang Download Trust, tôi không hiểu khác nhau giữa checksum và owner approval.", privacyBoundary: "Không ghi tên tài khoản, email, token, password hoặc dữ liệu thanh toán." },
  { field: "Bước tái hiện", guidance: "Ghi 3-5 bước rõ ràng để reviewer đi lại đúng hành trình.", example: "Mở /start → bấm Release readiness → đọc Download Trust → quay về Support Safety.", privacyBoundary: "Không đính kèm log thô chứa path riêng tư hoặc thông tin nhận diện cá nhân." },
  { field: "Kỳ vọng / thực tế", guidance: "Tách expected và actual để tránh biến feedback thành góp ý mơ hồ.", example: "Expected: biết chưa có link tải. Actual: CTA khiến tôi tưởng sắp có build public.", privacyBoundary: "Không yêu cầu người chơi chứng minh quyền truy cập hoặc chia sẻ entitlement." },
  { field: "Severity gợi ý", guidance: "Dùng mức nhẹ: blocker, confusing, typo, visual, performance-feel hoặc accessibility-feel.", example: "confusing — wording làm tôi tưởng đây là open registration.", privacyBoundary: "Không thu thập medical/accessibility profile cá nhân; chỉ nói cảm nhận đọc/truy cập ở mức tự nguyện." }
];

export const knownLimitationNotes: KnownLimitationNote[] = [
  { area: "Public build", playerMessage: "Chưa có public game build artifact được duyệt, nên mọi download CTA vẫn là trạng thái giải thích.", ownerNote: "Chỉ đổi copy khi artifact, SHA256, manifest, limitation note và owner sign-off tồn tại.", mustNotClaim: "No public build, no open beta, no fake download CTA." },
  { area: "Closed tester access", playerMessage: "Closed tester information pack không phải form đăng ký, invite hoặc bảo đảm slot test.", ownerNote: "Cần kênh intake chính thức, privacy boundary và triage owner trước khi nhận thông tin tester.", mustNotClaim: "No live tester intake, no tester slot guarantee, no entitlement automation." },
  { area: "Support and safety", playerMessage: "Support hiện là hướng dẫn an toàn; chưa có ticket backend, account lookup hoặc secure inbox.", ownerNote: "Không yêu cầu secrets hoặc dữ liệu nhạy cảm qua public copy.", mustNotClaim: "No secure ticket inbox, no account recovery, no production SLA." },
  { area: "Gameplay scope", playerMessage: "Thông tin world/gameplay loop giải thích Spirit Gate và Training Stone, chưa hứa combat/economy/live event rewards.", ownerNote: "Giữ scope wording cạnh guide/tester pages để tránh reviewer hiểu nhầm.", mustNotClaim: "No combat damage, no loot, no reward/economy promise." }
];

export const deviceReportTemplateFields: DeviceReportTemplateField[] = [
  { field: "Device class", whyItMatters: "Giúp owner đọc feedback theo nhóm desktop/laptop/tablet/mobile mà không cần nhận dữ liệu định danh.", safeFormat: "Laptop Windows 11, MacBook macOS, Android phone, iPhone, iPad hoặc tablet Android.", doNotCollect: "Không thu số serial, IMEI, phone number, email riêng tư hoặc account ID." },
  { field: "OS / browser / screen", whyItMatters: "Giúp tái hiện lỗi layout, focus, readability hoặc perceived load.", safeFormat: "macOS + Chrome, Windows + Edge, Android + Chrome, iOS + Safari; độ phân giải gần đúng nếu biết.", doNotCollect: "Không thu browser profile, cookie, token, extension list hoặc lịch sử duyệt web." },
  { field: "Network context", whyItMatters: "Giúp phân biệt wording/perceived load với lỗi mạng thật khi tải trang static.", safeFormat: "Wi-Fi nhà, 4G/5G, mạng công ty, chậm/ổn định/không ổn định.", doNotCollect: "Không thu IP public, địa chỉ nhà, vị trí chính xác hoặc thông tin nhà mạng nhạy cảm." },
  { field: "Screenshot/log safety", whyItMatters: "Ảnh minh họa giúp debug nhưng phải che thông tin riêng tư trước khi gửi qua kênh chính thức.", safeFormat: "Ảnh đã che tên/email/token; log rút gọn chỉ chứa lỗi liên quan route/screen.", doNotCollect: "Không gửi password, token, payment data, private chat hoặc dữ liệu cá nhân nhạy cảm." }
];


export const faqDiscoveryGroups: FaqDiscoveryGroup[] = [
  { id: "faq-help-hub", title: "FAQ Help hub", playerQuestion: "Tôi chưa biết câu hỏi của mình thuộc nhóm nào?", route: "/support/help", helpfulnessCue: "Bắt đầu ở FAQ Help để chọn nhóm download, tester, safety, account/backend hoặc gameplay expectation.", nonClaim: "No search backend, no AI support bot, no live ticket routing." },
  { id: "download-readiness", title: "Tải game / checksum", playerQuestion: "Tôi tải game ở đâu và biết file có thật không?", route: "/download/trust", helpfulnessCue: "Đọc Download Trust trước, sau đó xem Release Readiness để biết gate artifact, checksum và owner approval.", nonClaim: "No public game download artifact, no fake download button, no placeholder checksum." },
  { id: "closed-test", title: "Closed test / tester pack", playerQuestion: "Tôi có được tham gia test chưa và cần chuẩn bị gì?", route: "/release/tester-pack", helpfulnessCue: "Đọc Tester Pack để chuẩn bị feedback an toàn; chỉ gửi khi owner công bố kênh chính thức.", nonClaim: "No live tester intake, no guaranteed tester slot, no entitlement automation." },
  { id: "safety-support", title: "Safety / support", playerQuestion: "Tôi nên báo lỗi hoặc góp ý thế nào để không gửi nhầm dữ liệu?", route: "/support/safety", helpfulnessCue: "Dùng support safety để chuẩn bị route, bước tái hiện, device class và ảnh/log đã che dữ liệu riêng tư.", nonClaim: "No secure ticket inbox, no account lookup, no production SLA." },
  { id: "account-backend", title: "Tài khoản / backend boundaries", playerQuestion: "Tại sao portal, login hoặc account chưa hoạt động như game thật?", route: "/status", helpfulnessCue: "Status page nói rõ public/internal/blocked surfaces; WEB-08 cần contract backend trước khi tích hợp thật.", nonClaim: "No production auth, no DB persistence, no real account portal integration." },
  { id: "world-loop", title: "World loop / gameplay expectation", playerQuestion: "Game hiện đang mô tả gameplay tới mức nào?", route: "/game/loop", helpfulnessCue: "Game Loop giải thích Spirit Gate, Gate Keeper, Training Stone và những phần chưa claim như combat/economy/live world.", nonClaim: "No combat damage, loot, PvP, boss reward, live world server or production quest database." }
];

export const faqHelpfulnessPrompts: FaqHelpfulnessPrompt[] = [
  { prompt: "Tôi đang tìm câu trả lời về tải game", answerStyle: "Bắt đầu bằng trạng thái hiện tại, sau đó giải thích artifact/checksum/owner gate.", usefulNextStep: "Đi tới /download/trust rồi /release/readiness.", mustAvoid: "Không dùng lời kêu gọi tải ngay khi chưa có artifact thật." },
  { prompt: "Tôi muốn báo lỗi", answerStyle: "Hỏi route/màn hình/bước tái hiện và nhắc che dữ liệu riêng tư.", usefulNextStep: "Đi tới /support/safety hoặc /release/tester-pack để dùng template an toàn.", mustAvoid: "Không yêu cầu password, token, account ID, IP chính xác hoặc dữ liệu thanh toán." },
  { prompt: "Tôi muốn biết có được test không", answerStyle: "Nói rõ tester pack hiện là static guidance, không phải signup hoặc invite.", usefulNextStep: "Đi tới /release/tester-pack và theo dõi readiness gate.", mustAvoid: "Không hứa tester slot, entitlement, reward hoặc open beta." },
  { prompt: "Tôi không biết nên đọc trang nào trước", answerStyle: "Đề xuất Start hub hoặc Journey hub theo câu hỏi của người chơi.", usefulNextStep: "Đi tới /start, /journey hoặc /support/help.", mustAvoid: "Không đẩy người chơi vòng quanh nhiều CTA mà không có route tiếp theo rõ ràng." }
];

export const issueCategoryRoutes: IssueCategoryRoute[] = [
  { category: "Download / checksum", whenPlayerSays: "Không thấy link tải, không hiểu checksum hoặc sợ file giả.", recommendedRoute: "/download/trust", whatToPrepare: "Tên route, đoạn copy gây nhầm, kỳ vọng của người chơi.", privacyBoundary: "Không gửi file thực thi lạ, token, email riêng tư hoặc payment data." },
  { category: "Tester feedback", whenPlayerSays: "Muốn góp ý closed test hoặc báo known limitation.", recommendedRoute: "/release/tester-pack", whatToPrepare: "Device class, OS/browser, screen size gần đúng, bước tái hiện và expected/actual.", privacyBoundary: "Không gửi serial, IMEI, account ID, password hoặc private chat." },
  { category: "Safety / conduct", whenPlayerSays: "Lo về hành vi cộng đồng, báo cáo nội dung hoặc quy tắc ứng xử.", recommendedRoute: "/support/safety", whatToPrepare: "Mô tả tình huống chung và route liên quan; chờ kênh official nếu cần moderation thật.", privacyBoundary: "Không gửi dữ liệu cá nhân nhạy cảm hoặc cáo buộc định danh khi chưa có kênh chính thức." },
  { category: "Account / backend", whenPlayerSays: "Không rõ login, portal, character hoặc account recovery đã thật chưa.", recommendedRoute: "/status", whatToPrepare: "Đọc public/internal/blocked surface trước khi kỳ vọng flow tài khoản.", privacyBoundary: "Không nhập password hoặc email thật vào bất kỳ form giả nào." },
  { category: "World / gameplay", whenPlayerSays: "Không rõ web đang hứa combat, boss, economy hay chỉ mô tả loop đầu.", recommendedRoute: "/game/loop", whatToPrepare: "Câu hỏi về Spirit Gate, Gate Keeper, Training Stone hoặc milestone gameplay.", privacyBoundary: "Không kỳ vọng reward, inventory, trading hoặc PvP khi chưa có milestone được claim." }
];

export const noSearchBackendNotes: NoSearchBackendNote[] = [
  { surface: "/support/help", currentBehavior: "FAQ được nhóm bằng typed local content và route links.", helpfulFallback: "Dùng nhóm câu hỏi, Issue category và Start/Journey hub để tự tìm đường.", notClaimed: "No search backend, no AI support bot, no ticket routing." },
  { surface: "/support", currentBehavior: "Support page hiển thị static guidance và FAQ depth.", helpfulFallback: "Nếu câu hỏi liên quan dữ liệu riêng tư, chỉ chuẩn bị mô tả an toàn và chờ kênh owner-approved.", notClaimed: "No live support desk, no secure inbox, no SLA." },
  { surface: "/status", currentBehavior: "Status phân biệt public/internal/blocked surfaces.", helpfulFallback: "Đọc Status trước khi hiểu nhầm portal/login/release readiness là production.", notClaimed: "No live status API, no monitoring integration." },
  { surface: "/release/tester-pack", currentBehavior: "Tester pack cung cấp checklist và template chuẩn bị.", helpfulFallback: "Dùng template để ghi feedback offline; không gửi dữ liệu nhạy cảm cho tới khi có kênh chính thức.", notClaimed: "No tester intake, no signup form, no entitlement backend." }
];


export const downloadExplainers: DownloadExplainer[] = [
  {
    title: "Vì sao chưa có nút tải?",
    status: "blocked",
    explanation: "Website chưa có public game build artifact kèm checksum và owner approval, nên không được hiển thị CTA tải giả.",
    nextAction: "Theo dõi roadmap hoặc guide download readiness cho tới khi release artifact được chấp nhận."
  },
  {
    title: "Closed testing cần gì?",
    status: "planned",
    explanation: "Closed testing cần package được duyệt, version note, known limitations, rollback path và hướng dẫn support rõ ràng.",
    nextAction: "Chuẩn bị content trước; không mở entitlement/account flow khi chưa có backend contract."
  },
  {
    title: "Tài khoản tải game có tồn tại chưa?",
    status: "blocked",
    explanation: "Download entitlement thật cần Auth/API/DB/RBAC/audit contract từ game backend canonical.",
    nextAction: "Giữ web ở trạng thái static transparency cho tới WEB-08."
  }
];

export const statusExplainers: StatusExplainer[] = [
  {
    label: "Public website",
    visibility: "public",
    detail: "Các trang public đang phát triển nội dung, bố cục, game info, guide và download explanation."
  },
  {
    label: "Game release artifact",
    visibility: "blocked",
    detail: "Chưa có public build/checksum được duyệt, nên status không được ghi release-ready."
  },
  {
    label: "Portal/Ops backend",
    visibility: "blocked",
    detail: "Real account portal, ops mutation, support ticket và audit cần accepted backend contract."
  },
  {
    label: "Runtime/browser guardrails",
    visibility: "internal",
    detail: "Dùng để chống regression sau khi đổi nội dung web; không phải nội dung chính và không thay thế product readiness."
  }
];


// WEB v1.22 — player-facing game experience narrative derived from the approved 2D scenario/design spine.
export const gameExperiencePillars: GameExperiencePillar[] = [
  {
    id: "social",
    title: "Một thành phố để thuộc về",
    tagline: "Social MMORPG",
    summary: "Linh Thành là trái tim của thế giới: nơi gặp bạn bè, bang hội, giao dịch, thời trang, nhà ở và các hoạt động cộng đồng trước khi lại lên đường."
  },
  {
    id: "action",
    title: "Chiến đấu có nhịp và chuyển động",
    tagline: "Action",
    summary: "Side-scrolling combat đặt walk, run, jump, dash, combo và skill vào cùng một nhịp đọc rõ ràng, từ Slime Bóng Tối đến boss và world event."
  },
  {
    id: "progression",
    title: "Lớn lên theo cách của bạn",
    tagline: "Progression",
    summary: "Cấp độ, kỹ năng, trang bị, ngoại hình, linh thú và lựa chọn Lộ tạo nên một hành trình dài, nhưng không tách khỏi đời sống xã hội của Linh Thành."
  }
];

export const classPaths: ClassPath[] = [
  {
    id: "vo",
    name: "Võ",
    role: "Áp sát · phản đòn",
    fantasy: "Đứng vững ở tuyến đầu, dùng nhịp tay và thời điểm để bẻ gãy áp lực của đối thủ.",
    combatIdentity: "Chuỗi đòn cận chiến, phá giáp, làm choáng nhịp và phản đòn đúng thời điểm.",
    visualSignal: "Cam · vàng · bụi lực · sóng chấn",
    battleRhythm: "Tiến vào tầm nguy hiểm, đọc đòn đối phương rồi đổi phòng thủ thành một nhịp phản công nặng và dứt khoát.",
    worldLens: "Nhìn mọi biến cố qua câu hỏi: ai đang cần được bảo vệ ngay lúc này?",
    teamFantasy: "Là người đứng lại khi cả đội cần một điểm tựa — giữ tuyến, phá thế và mở khoảng trống cho đồng đội.",
    signatureVerbs: ["Áp sát", "Đỡ", "Phản", "Phá thế"]
  },
  {
    id: "kiem",
    name: "Kiếm",
    role: "Cơ động · nối đòn",
    fantasy: "Lướt qua chiến trường bằng những đường kiếm chính xác, nhanh và khó đoán.",
    combatIdentity: "Tốc độ, phản kích, đổi vị trí, chuỗi đòn trên không và nhịp kết liễu sắc gọn.",
    visualSignal: "Dư ảnh · vệt kiếm · kiếm khí",
    battleRhythm: "Không đứng yên quá lâu: đổi góc, nối chuỗi, đưa đối thủ vào nhịp của mình rồi kết thúc trước khi thế trận kịp đảo chiều.",
    worldLens: "Xem dị biến như một dấu vết cần truy đến tận nguồn, không chỉ một mối nguy cần dập tắt.",
    teamFantasy: "Là mũi nhọn cơ động của tổ đội — tiếp cận mục tiêu khó, cắt nhịp nguy hiểm và truy đuổi khi trận tuyến vỡ ra.",
    signatureVerbs: ["Lướt", "Chém", "Nối combo", "Kết liễu"]
  },
  {
    id: "phap",
    name: "Pháp",
    role: "Nguyên tố · khống chế",
    fantasy: "Định hình chiến trường bằng linh thuật và các vùng tác động có chủ ý.",
    combatIdentity: "Tầm xa, nguyên tố, vùng tác động, kết giới và khống chế theo khu vực.",
    visualSignal: "Hỏa · băng · lôi · kết giới · trọng lực",
    battleRhythm: "Đọc vị trí và thời điểm trước khi ra tay: dựng vùng nguy hiểm, khóa đường di chuyển rồi bùng nổ khi đối thủ đã bước vào thế trận.",
    worldLens: "Mỗi portal là một hiện tượng phải được giải nghĩa — quy luật nào đang bị bẻ cong và vì sao?",
    teamFantasy: "Là người định hình không gian chiến đấu: ép quái rời vị trí tốt, bảo vệ vùng an toàn và tạo thời cơ cho cả đội.",
    signatureVerbs: ["Niệm", "Khóa vùng", "Bùng nổ", "Bẻ quy luật"]
  },
  {
    id: "co",
    name: "Cơ",
    role: "Cơ giới · triển khai",
    fantasy: "Pha công nghệ vào linh lực, biến chiến trường thành một mạng lưới thiết bị và hỏa lực.",
    combatIdentity: "Vũ khí tầm xa, ụ triển khai, mìn, thiết bị bay, pháo và công cụ đặt trước.",
    visualSignal: "Thiết bị bay · phát bắn ray · cơ khí Á Đông mới",
    battleRhythm: "Chuẩn bị trước một bước: đặt thiết bị, khóa góc bắn, tạo chuỗi hỏa lực rồi liên tục tái bố trí theo biến động của trận đấu.",
    worldLens: "Đo thứ người khác chỉ cảm nhận: cường độ linh lực, dao động portal và dấu vết vật lý của một thế giới đang chồng lên thế giới này.",
    teamFantasy: "Là bộ não chiến thuật thực địa — biến địa hình thành lợi thế và giữ nhịp ổn định khi cuộc chiến kéo dài.",
    signatureVerbs: ["Đo", "Triển khai", "Khóa mục tiêu", "Tái bố trí"]
  },
  {
    id: "linh",
    name: "Linh",
    role: "Triệu hồi · hỗ trợ",
    fantasy: "Lắng nghe linh giới, gọi trợ lực từ những thực thể bên kia và giữ nhịp cho cả đội.",
    combatIdentity: "Triệu hồi, hồi phục, cường hóa, khiên hộ thể, thanh tẩy và trói/giảm lực.",
    visualSignal: "Ngọc bích · linh phù · triệu hồi · thanh tẩy",
    battleRhythm: "Quan sát toàn đội và nhịp nguy hiểm: triệu hồi đúng lúc, giữ lớp bảo hộ, thanh tẩy sai lệch và trói những mục tiêu cần bị chặn.",
    worldLens: "Nghe thấy điều khe nứt đang nói — những tiếng vọng, linh thể và ký ức mà bốn Lộ khác khó tiếp cận trực tiếp.",
    teamFantasy: "Là mạch nối của tổ đội: giữ mọi người sống sót, tăng sức mạnh đúng thời điểm và biến thế giới vô hình thành lợi thế hữu hình.",
    signatureVerbs: ["Gọi", "Che chở", "Thanh tẩy", "Trói"]
  }
];

export const worldRouteStops: WorldRouteStop[] = [
  {
    order: "01",
    name: "Linh Thành",
    kind: "hub",
    summary: "Trái tim xã hội của thế giới — nơi bắt đầu, trở về, gặp gỡ và xây dựng danh tính của Người Thức Tỉnh.",
    mood: "Ánh đèn, tiếng người, linh phù và cảm giác một thành phố vẫn đang sống dù thế giới bên ngoài đổi khác.",
    playerPromise: "Bạn luôn có một nơi để trở về, không chỉ một menu giữa các trận đánh.",
    signatureActivity: "Gặp bạn bè, chuẩn bị loadout, thời trang, guild/social và chọn mục tiêu cho phiên chơi kế tiếp.",
    narrativePressure: "Càng nhiều khe nứt xuất hiện, Linh Thành càng chuyển từ nơi trú ẩn thành nơi người chơi phải chủ động bảo vệ."
  },
  {
    order: "02",
    name: "Đông Môn",
    kind: "gate",
    summary: "Cửa ngõ nhập môn: Người Giữ Cổng, Bia Luyện và những bài học đầu tiên về di chuyển, dash và kỹ năng môn phái.",
    mood: "Ranh giới giữa an toàn và chưa biết — cổng thành phía sau, rừng và linh khí bất ổn phía trước.",
    playerPromise: "Bước ra khỏi hub và cảm nhận Lộ của mình qua chuyển động, tương tác và những nguy hiểm đầu tiên.",
    signatureActivity: "Luyện tập, gặp Người Giữ Cổng, học nhịp di chuyển và nhận dấu hiệu đầu tiên rằng vùng ngoài thành không còn bình thường.",
    narrativePressure: "Một vết nứt nhỏ ở đây là điểm khởi đầu cho chuỗi biến cố đủ lớn để chạm tới toàn Linh Thành."
  },
  {
    order: "03",
    name: "Linh Lâm",
    kind: "field",
    summary: "Vùng ngoài thành nơi Slime Bóng Tối, linh khí bất ổn và dấu vết đầu tiên của Âm Giới bắt đầu xuất hiện.",
    mood: "Rừng ẩm, linh quang xanh ngọc xen những vùng tím bất thường; đẹp nhưng không còn hoàn toàn thuộc về thế giới này.",
    playerPromise: "Có không gian để side-scrolling action, exploration và đọc môi trường cùng tồn tại trong một nhịp chơi.",
    signatureActivity: "Theo dấu linh khí, xử lý quái ngoài thành, khám phá lối phụ và nhận các mảnh thông tin dẫn sâu hơn vào bí ẩn portal.",
    narrativePressure: "Bất thường không còn đứng yên ở cổng thành; nó đang lan, sinh vật thay đổi và những mảnh Âm Giới bắt đầu ở lại."
  },
  {
    order: "04",
    name: "Cổ Di Tích",
    kind: "ruins",
    summary: "Những tầng lịch sử cũ hơn mở ra các bí ẩn về portal, linh lực và mối liên hệ giữa hai thế giới.",
    mood: "Im lặng, cổ xưa và có cảm giác rằng người chơi đang bước vào một bí mật đã tồn tại trước cả Linh Thành hiện đại.",
    playerPromise: "Thế giới không chỉ rộng hơn — nó có lịch sử, tầng nghĩa và những câu trả lời khiến các biến cố hiện tại thay đổi ý nghĩa.",
    signatureActivity: "Giải dấu tích, vượt không gian nhiều lớp, đối mặt guardian/mini-boss và ghép lore thành một bức tranh lớn hơn.",
    narrativePressure: "Những cánh cổng có thể không phải tai nạn mới xuất hiện; dấu vết cho thấy hai thế giới từng liên hệ sâu hơn người hiện tại biết."
  },
  {
    order: "05",
    name: "Âm Giới",
    kind: "realm",
    summary: "Nguồn của các cánh cổng dị thường và mối đe dọa đủ lớn để kéo cả cộng đồng vào cùng một trận chiến.",
    mood: "Không gian lệch chuẩn, tím sâu, cấu trúc quen mà sai và cảm giác chính quy luật của thế giới đang bị viết lại.",
    playerPromise: "Đưa fantasy từ phiêu lưu cá nhân thành xung đột cộng đồng: nhiều vai trò cùng góp phần vào một hiểm họa lớn hơn bất kỳ người chơi nào.",
    signatureActivity: "World event, đóng portal, vượt zone bị xâm lấn và đối mặt những thực thể buộc nhiều Lộ phải phối hợp.",
    narrativePressure: "Nếu cánh cổng không được đóng, Âm Giới không còn là nơi ở phía bên kia — nó bắt đầu trở thành một phần của Linh Thành."
  }
];

export const narrativeChapters: NarrativeChapter[] = [
  {
    chapter: "Chương 01",
    title: "Vết Nứt Đông Môn",
    hook: "Linh khí ngoài thành dao động, Slime Bóng Tối xuất hiện và một mảnh Âm Giới đặt câu hỏi đầu tiên.",
    playerRole: "Rời Linh Thành, điều tra Linh Lâm và trở về với bằng chứng rằng sự bất thường không còn là chuyện nhỏ.",
    openingImage: "Một buổi tối bình thường ở Đông Môn bị cắt đôi bởi vệt tím trên bầu trời; linh phù quanh cổng thành lần lượt sáng lên.",
    stakes: "Nếu đây không phải hiện tượng đơn lẻ, tuyến ngoài thành — và những người vẫn sống nhờ nó — đang là lớp phòng thủ đầu tiên của Linh Thành.",
    closingTurn: "Mảnh Âm Giới Fragment không biến mất khi khe nứt đóng. Nó còn ở lại, như bằng chứng rằng phía bên kia đã chạm được vào thế giới này."
  },
  {
    chapter: "Chương 02",
    title: "Những Cánh Cổng Không Thuộc Về Thế Giới Này",
    hook: "Các cánh cổng nhỏ bắt đầu mở ở nhiều nơi và năm Lộ nhìn cùng một hiểm họa bằng năm cách khác nhau.",
    playerRole: "Bảo vệ, truy tìm, nghiên cứu, đo đạc hoặc lắng nghe — lựa chọn Lộ định hình cách bạn đọc thế giới.",
    openingImage: "Những báo cáo rời rạc cùng xuất hiện: cánh cổng trong rừng, tín hiệu lạ dưới di tích, linh thể nghe thấy tiếng gọi và thiết bị đo cho cùng một kết quả bất khả thi.",
    stakes: "Mối đe dọa không còn có một điểm xuất phát duy nhất; nó đang thử nhiều cách để bước qua và buộc năm Lộ chia sẻ những mảnh sự thật khác nhau.",
    closingTurn: "Khi các dữ kiện ghép lại, câu hỏi đổi từ ‘cánh cổng mở ở đâu?’ thành ‘điều gì đang cố mở chúng từ phía bên kia?’"
  },
  {
    chapter: "Chương 03",
    title: "Âm Giới Xâm Lăng",
    hook: "Cổng Âm Giới đồng loạt xuất hiện, thành phố chuyển từ nơi sinh sống thành nơi cần được bảo vệ.",
    playerRole: "Hợp lực qua nhiều vùng, đóng góp theo vai trò và cùng cộng đồng đối mặt Boss Thế Giới trước khi Linh Thành được phục hồi.",
    openingImage: "Chuông cảnh giới vang khắp Linh Thành. Từng tuyến cổng báo động cùng lúc và bầu trời phía trên thành phố xuất hiện nhiều vòng sáng tím thay vì một khe nứt đơn lẻ.",
    stakes: "Thất bại không còn chỉ mất một chuyến phiêu lưu; nếu các tuyến phòng thủ sụp đổ, nơi người chơi gọi là nhà sẽ trở thành chiến trường của một thế giới khác.",
    closingTurn: "Cuộc xâm lăng có thể bị đẩy lùi, nhưng cánh cổng lớn nhất cho thấy đây không phải kết thúc — chỉ là lần đầu hai thế giới thực sự nhìn thấy nhau."
  }
];

export const sampleSessionBeats: SessionBeat[] = [
  { time: "00–03", title: "Gặp nhau ở Linh Thành", summary: "Vào game, chào bạn bè, đọc hoạt động đang diễn ra và chọn việc muốn làm trong phiên." },
  { time: "03–06", title: "Rời Đông Môn", summary: "Chọn nhiệm vụ ngày hoặc tuyến phiêu lưu, chuẩn bị Lộ/trang bị và bước qua cửa ngõ ngoài thành." },
  { time: "06–12", title: "Tiến vào Linh Lâm", summary: "Di chuyển, chiến đấu, tương tác với môi trường và theo dấu linh khí bất thường." },
  { time: "12–16", title: "Khám phá Cổ Di Tích", summary: "Một cao trào ngắn kiểm tra nhịp di chuyển, kỹ năng và khả năng đọc dấu hiệu từ tàn tích cổ." },
  { time: "16–18", title: "Nhận phần thưởng", summary: "Thu vật phẩm/nguyên liệu/tiến trình và quyết định giữ, dùng hay chuẩn bị cho mục tiêu kế tiếp." },
  { time: "18–20", title: "Trở về Linh Thành mạnh hơn", summary: "Đổi trang phục, gặp bang hội/bạn bè, sắp xếp tiến trình và kết thúc phiên ở nơi có cảm giác thuộc về." }
];

export const publicGameArtAssets: PublicGameArtAsset[] = [
  {
    id: "dong-mon-world-concept",
    label: "Đông Môn skyline",
    webPath: "/game-art/world/dong-mon-skyline.webp",
    upstreamStatus: "DRAFT_OWNER_REVIEW",
    webStatus: "WEB_REFERENCE_APPROVED",
    role: "world-concept",
    publicLabel: "Ý tưởng thế giới · Đông Môn",
    sourceSha256: "6dc7313b27f2b00eb93c0fa8dd0a1f3793c9f7a4f406439068959664cf75ea1a",
    notFinalArt: "Ý tưởng mỹ thuật dùng cho hướng thế giới công khai; không phải ảnh gameplay hoặc môi trường hoàn thiện cuối cùng."
  },
  {
    id: "vo-lv1-starter-development-art",
    label: "Võ Lv1–30 starter art",
    webPath: "/game-art/classes/vo-lv1-starter-atlas.webp",
    upstreamStatus: "APPROVED_RUNTIME_ART",
    webStatus: "WEB_REFERENCE_APPROVED",
    role: "class-development-preview",
    publicLabel: "Bản thiết kế đang phát triển · Võ Lv1–30",
    sourceSha256: "1008388e9401cd58e0e602e77e88cbd4169d1899e18466e400b278506a720089",
    notFinalArt: "Ảnh nguồn runtime đã được duyệt để tham chiếu, vẫn còn tinh chỉnh; không phải key art Lộ hoàn thiện cuối cùng."
  },
  {
    id: "vo-lv1-skill-development-art",
    label: "Võ Lv1 skill/VFX art",
    webPath: "/game-art/classes/vo-lv1-skill-atlas.webp",
    upstreamStatus: "APPROVED_RUNTIME_ART",
    webStatus: "WEB_REFERENCE_APPROVED",
    role: "skill-development-preview",
    publicLabel: "Bản thiết kế kỹ năng/hiệu ứng đang phát triển",
    sourceSha256: "224bdeec4b411723e32d3cc4958066f1601b5f43ec38a4af7b19daf671becd46",
    notFinalArt: "Ảnh nguồn runtime đã được duyệt để xem trước hướng phát triển; không phải ảnh chụp chiến đấu hoàn thiện."
  }
];


// WEB v1.26 — homepage discovery references canonical class/world/story data instead of duplicating deep-route summaries.
export const homeDiscoveryMoments: HomeDiscoveryMoment[] = [
  {
    id: "class-kiem",
    kind: "class",
    sourceRef: "kiem",
    eyebrow: "Một Lộ để bắt đầu",
    href: "/classes",
    actionLabel: "Khám phá đủ 5 Lộ",
    tone: "gold"
  },
  {
    id: "world-co-di-tich",
    kind: "world",
    sourceRef: "Cổ Di Tích",
    eyebrow: "Một nơi để muốn bước tới",
    href: "/game",
    actionLabel: "Mở bản đồ Linh Giới",
    tone: "spirit"
  },
  {
    id: "story-shadow-invasion",
    kind: "story",
    sourceRef: "Chương 03",
    eyebrow: "Một biến cố để cùng nhớ",
    href: "/story",
    actionLabel: "Đi vào cốt truyện",
    tone: "shadow"
  }
];
