export type ContentCategory = "news" | "events" | "patch-notes" | "notices" | "maintenance" | "guides" | "download-builds";
export type PublishStatus = "published" | "draft" | "scheduled";

export type ContentEntry = {
  slug: string;
  category: ContentCategory;
  title: string;
  summary: string;
  body: string;
  publishedAt: string;
  status: PublishStatus;
  featured?: boolean;
  tags: string[];
};

export type DownloadBuild = {
  channel: "coming-soon" | "closed-testing" | "development";
  title: string;
  status: "not-available" | "limited-internal";
  note: string;
};

export type PublicHeroStat = {
  label: string;
  value: string;
  note: string;
};

export type WorldPillar = {
  title: string;
  eyebrow: string;
  summary: string;
  detail: string;
};

export type PlayerJourneyStep = {
  step: string;
  title: string;
  summary: string;
};

export type DownloadReadiness = {
  label: string;
  status: "done" | "blocked" | "planned";
  detail: string;
};

export type SupportTopic = {
  title: string;
  summary: string;
  action: string;
};

export type PublicRoadmapItem = {
  version: string;
  title: string;
  status: "current" | "next" | "planned" | "blocked";
  summary: string;
};

export type VisualPolishItem = {
  label: string;
  title: string;
  summary: string;
};

export type ResponsiveBreakpoint = {
  device: "desktop" | "tablet" | "mobile";
  label: string;
  layout: string;
  priority: string;
};

export type PublicPageFocus = {
  route: string;
  title: string;
  playerNeed: string;
  polish: string;
};

export type CommunityPrinciple = {
  title: string;
  summary: string;
};

export type WorldStoryChapter = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  playerTakeaway: string;
  nonClaim: string;
};

export type BeginnerGuideSection = {
  step: string;
  title: string;
  action: string;
  playerTip: string;
  blockedScope: string;
};

export type DownloadStatusNote = {
  label: string;
  owner: string;
  condition: string;
  playerMessage: string;
};

export type SupportFaq = {
  question: string;
  answer: string;
  scope: string;
};

export type CommunityReadinessStep = {
  title: string;
  purpose: string;
  currentState: string;
  futureGate: string;
};

export type ContentDetailSection = {
  slug: string;
  heading: string;
  body: string;
  playerImpact: string;
  nonClaim: string;
};

export type GuideDetailStep = {
  slug: string;
  step: string;
  title: string;
  action: string;
  expectedResult: string;
  blockedScope: string;
};

export type DownloadExplainer = {
  title: string;
  status: "blocked" | "planned" | "ready";
  explanation: string;
  nextAction: string;
};

export type StatusExplainer = {
  label: string;
  visibility: "public" | "internal" | "blocked";
  detail: string;
};


export type DownloadTrustGate = {
  id: string;
  title: string;
  status: "blocked" | "planned" | "ready";
  evidenceRequired: string;
  playerFacingCopy: string;
  mustNotClaim: string;
};

export type ReleaseEvidenceRequirement = {
  label: string;
  owner: string;
  requiredEvidence: string;
  publicDisplayRule: string;
};

export type StatusTrustSurface = {
  surface: string;
  visibility: "public" | "internal" | "blocked";
  sourceOfTruth: string;
  currentTruth: string;
  forbiddenClaim: string;
};

export type PlayerSupportExpectation = {
  topic: string;
  expectedNow: string;
  notAvailable: string;
  safeNextStep: string;
};


export type CommunityOnboardingPath = {
  id: string;
  title: string;
  audience: string;
  firstAction: string;
  expectedUnderstanding: string;
  blockedExpectation: string;
};

export type CommunityFeedbackChannel = {
  channel: string;
  currentMode: "static-guidance" | "planned" | "blocked";
  whatToShare: string;
  whatNotToShare: string;
  nextGate: string;
};

export type RoadmapDecisionGate = {
  gate: string;
  status: "ready" | "planned" | "blocked";
  decisionOwner: string;
  publicMessage: string;
  releaseImpact: string;
  mustNotClaim: string;
};

export type StagedReleaseMessage = {
  stage: string;
  visibility: "public" | "internal" | "blocked";
  playerCopy: string;
  ownerChecklist: string;
  nonClaim: string;
};

export type ContentHubRoute = {
  label: string;
  href: string;
  reason: string;
};

export type PublicContentHub = {
  id: string;
  title: string;
  audience: string;
  summary: string;
  primaryRoute: ContentHubRoute;
  secondaryRoutes: ContentHubRoute[];
  readerOutcome: string;
  nonClaim: string;
};

export type PlayerEntryQuestion = {
  question: string;
  recommendedRoute: string;
  answer: string;
  avoidExpectation: string;
};

export type PublicRouteGroup = {
  group: string;
  purpose: string;
  routes: string[];
  readerOutcome: string;
  blockedClaim: string;
};


export type GameplayLoopStage = {
  id: string;
  step: string;
  title: string;
  route: string;
  playerAction: string;
  expectedFeeling: string;
  currentBoundary: string;
};

export type BeginnerExpectation = {
  topic: string;
  promiseNow: string;
  notYet: string;
  recommendedReading: string;
};

export type GuideWorldNavigationLink = {
  from: string;
  to: string;
  reason: string;
  safeExpectation: string;
};

export type GameplayScopeBoundary = {
  surface: string;
  currentTruth: string;
  nextProofNeeded: string;
  forbiddenClaim: string;
};


export type PlayerSafetyPrinciple = {
  id: string;
  title: string;
  whyItMatters: string;
  playerCopy: string;
  notClaimed: string;
};

export type SupportIssuePath = {
  issue: string;
  whereToRead: string;
  whatToPrepare: string;
  privacyBoundary: string;
};

export type ClosedTestSupportExpectation = {
  phase: string;
  currentMessage: string;
  requiredBeforeOpening: string;
  cannotPromise: string;
};

export type CommunityConductRule = {
  rule: string;
  friendlyVersion: string;
  reason: string;
  moderationBoundary: string;
};

export type AccessibilityReadabilityPrinciple = {
  id: string;
  title: string;
  playerBenefit: string;
  implementationNote: string;
  nonClaim: string;
};

export type RouteReadabilityCheck = {
  route: string;
  headingPromise: string;
  firstAction: string;
  scanAid: string;
  boundary: string;
};

export type MobileScannabilityRule = {
  surface: string;
  mobileNeed: string;
  contentTreatment: string;
  failureToAvoid: string;
};

export type FocusOrderCheckpoint = {
  sequence: string;
  label: string;
  keyboardExpectation: string;
  nonClaim: string;
};


export type PerformanceCopyBudgetPrinciple = {
  id: string;
  title: string;
  playerBenefit: string;
  implementationNote: string;
  nonClaim: string;
};

export type StaticRouteCompositionRule = {
  route: string;
  staticSurface: string;
  copyBudget: string;
  cssAssetRule: string;
  fallbackMessage: string;
};

export type PerceivedLoadSignal = {
  surface: string;
  playerFeeling: string;
  copyTreatment: string;
  mustAvoid: string;
};

export type MobileDensityBudget = {
  surface: string;
  densityTarget: string;
  treatment: string;
  failureToAvoid: string;
};



export type RouteContinuityBridge = {
  id: string;
  fromRoute: string;
  toRoute: string;
  playerQuestion: string;
  bridgeCopy: string;
  ctaLabel: string;
  conversionBoundary: string;
};

export type ConversionSafeCta = {
  surface: string;
  primaryAction: string;
  supportingAction: string;
  safeWhen: string;
  mustNotImply: string;
};

export type JourneyFrictionCheck = {
  route: string;
  possibleConfusion: string;
  clarification: string;
  nextBestRoute: string;
  nonClaim: string;
};

export type PageCohesionCheckpoint = {
  checkpoint: string;
  routeSet: string[];
  cohesionRule: string;
  readerOutcome: string;
  blockedClaim: string;
};


export type PlayerTrustSignal = {
  id: string;
  title: string;
  playerQuestion: string;
  trustAnswer: string;
  proofBeforeClaim: string;
  forbiddenShortcut: string;
};

export type ReleaseNarrativeStage = {
  stage: string;
  visibility: "public" | "internal" | "blocked";
  playerMessage: string;
  requiredProof: string;
  nextSafeRoute: string;
  nonClaim: string;
};

export type ClosedTestReadinessCheck = {
  check: string;
  currentState: "ready-copy" | "planned" | "blocked";
  playerExpectation: string;
  ownerGate: string;
  mustNotPromise: string;
};

export type TrustJourneyCheckpoint = {
  route: string;
  trustQuestion: string;
  answerOnPage: string;
  nextRoute: string;
  boundary: string;
};


export type FaqDiscoveryGroup = {
  id: string;
  title: string;
  playerQuestion: string;
  route: string;
  helpfulnessCue: string;
  nonClaim: string;
};

export type FaqHelpfulnessPrompt = {
  prompt: string;
  answerStyle: string;
  usefulNextStep: string;
  mustAvoid: string;
};

export type IssueCategoryRoute = {
  category: string;
  whenPlayerSays: string;
  recommendedRoute: string;
  whatToPrepare: string;
  privacyBoundary: string;
};

export type NoSearchBackendNote = {
  surface: string;
  currentBehavior: string;
  helpfulFallback: string;
  notClaimed: string;
};

export interface ContentRepository {
  list(category?: ContentCategory): ContentEntry[];
  featured(limit?: number): ContentEntry[];
  bySlug(slug: string): ContentEntry | undefined;
  categories(): ContentCategory[];
}


export type ReleaseReadinessHubItem = {
  id: string;
  title: string;
  route: string;
  playerQuestion: string;
  readinessAnswer: string;
  ownerEvidence: string;
  blockedClaim: string;
};

export type OwnerReleaseGate = {
  gate: string;
  owner: string;
  currentState: "ready-copy" | "planned" | "blocked";
  proofRequired: string;
  playerVisibleRule: string;
  mustNotSkip: string;
};

export type TesterExpectationCopy = {
  topic: string;
  playerExpectation: string;
  copyOnWeb: string;
  supportBoundary: string;
};

export type ReleaseSurfaceAlignment = {
  surface: string;
  route: string;
  mustSay: string;
  mustLinkTo: string;
  contradictionToAvoid: string;
};

export type ClosedTesterChecklistItem = {
  id: string;
  title: string;
  testerQuestion: string;
  safePreparation: string;
  whereToRead: string;
  nonClaim: string;
};

export type SafeFeedbackTemplate = {
  field: string;
  guidance: string;
  example: string;
  privacyBoundary: string;
};

export type KnownLimitationNote = {
  area: string;
  playerMessage: string;
  ownerNote: string;
  mustNotClaim: string;
};

export type DeviceReportTemplateField = {
  field: string;
  whyItMatters: string;
  safeFormat: string;
  doNotCollect: string;
};

export type GameExperiencePillar = {
  id: "social" | "action" | "progression";
  title: string;
  tagline: string;
  summary: string;
};

export type ClassPath = {
  id: "vo" | "kiem" | "phap" | "co" | "linh";
  name: string;
  role: string;
  fantasy: string;
  combatIdentity: string;
  visualSignal: string;
  battleRhythm: string;
  worldLens: string;
  teamFantasy: string;
  signatureVerbs: string[];
};

export type WorldRouteStop = {
  order: string;
  name: string;
  kind: "hub" | "gate" | "field" | "ruins" | "realm";
  summary: string;
  mood: string;
  playerPromise: string;
  signatureActivity: string;
  narrativePressure: string;
};

export type NarrativeChapter = {
  chapter: string;
  title: string;
  hook: string;
  playerRole: string;
  openingImage: string;
  stakes: string;
  closingTurn: string;
};

export type SessionBeat = {
  time: string;
  title: string;
  summary: string;
};

export interface PublicGameArtAsset {
  id: string;
  label: string;
  webPath: string;
  upstreamStatus: "APPROVED_RUNTIME_ART" | "DRAFT_OWNER_REVIEW";
  webStatus: "WEB_REFERENCE_APPROVED";
  role: "world-concept" | "class-development-preview" | "skill-development-preview";
  publicLabel: string;
  sourceSha256: string;
  notFinalArt: string;
}

export type HomeDiscoveryMoment = {
  id: string;
  kind: "class" | "world" | "story";
  sourceRef: string;
  eyebrow: string;
  href: string;
  actionLabel: string;
  tone: "spirit" | "gold" | "jade" | "shadow";
};
