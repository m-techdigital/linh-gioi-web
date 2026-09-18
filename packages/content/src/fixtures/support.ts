import type {
  AccessibilityReadabilityPrinciple,
  ClosedTestSupportExpectation,
  CommunityConductRule,
  CommunityFeedbackChannel,
  CommunityOnboardingPath,
  CommunityPrinciple,
  CommunityReadinessStep,
  ConversionSafeCta,
  FaqDiscoveryGroup,
  FaqHelpfulnessPrompt,
  FocusOrderCheckpoint,
  IssueCategoryRoute,
  JourneyFrictionCheck,
  MobileDensityBudget,
  MobileScannabilityRule,
  NoSearchBackendNote,
  PageCohesionCheckpoint,
  PerceivedLoadSignal,
  PerformanceCopyBudgetPrinciple,
  PlayerSafetyPrinciple,
  PlayerSupportExpectation,
  RouteContinuityBridge,
  RouteReadabilityCheck,
  StaticRouteCompositionRule,
  SupportFaq,
  SupportIssuePath,
  SupportTopic,
} from "../types";

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


export const supportFaqs: SupportFaq[] = [
  {
    question: "Hiện có tải được game không?",
    answer: "Chưa. Trang Tải game chỉ hiển thị điều kiện sẵn sàng và blocker cho đến khi có gói public hoặc closed-test kèm checksum.",
    scope: "static public guidance"
  },
  {
    question: "Dev login trong game có phải tài khoản thật không?",
    answer: "Không. Cổng đăng nhập phát triển và mẫu tài khoản/nhân vật không đồng nghĩa với xác thực production, email/mật khẩu, OAuth hoặc lưu DB thật.",
    scope: "auth non-claim"
  },
  {
    question: "Có chiến đấu, bang hội, chat hoặc kinh tế chưa?",
    answer: "Chưa được claim trên web công khai. Các hệ thống này cần milestone/hợp đồng riêng trước khi đưa vào nội dung public như tính năng thật.",
    scope: "gameplay non-claim"
  },
  {
    question: "Vì sao web nhắc nhiều tới contract?",
    answer: "Vì Portal, Ops, tài khoản, DB và cộng đồng live cần backend canonical. Web không tự tạo backend giả để tạo cảm giác hoàn chỉnh.",
    scope: "governance"
  },
  {
    question: "Khi báo lỗi nên gửi gì?",
    answer: "Ở giai đoạn static guidance, chỉ chuẩn bị route, thiết bị, bước tái hiện và ảnh/log không chứa bí mật. Không gửi mật khẩu, token, dữ liệu thanh toán hoặc thông tin cá nhân nhạy cảm.",
    scope: "privacy-safe issue reporting"
  },
  {
    question: "Closed test có hỗ trợ live không?",
    answer: "Chưa. Hỗ trợ closed-test chỉ được nói tới khi có gói build, giới hạn đã biết, owner hỗ trợ và quy tắc riêng tư được duyệt. Web không claim SLA, ticket backend hoặc tra cứu tài khoản thật.",
    scope: "hỗ trợ thử nghiệm non-claim"
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
    whatNotToShare: "Không upload secrets, dữ liệu thanh toán, account recovery data hoặc private backend logs.",
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

export const playerSafetyPrinciples: PlayerSafetyPrinciple[] = [
  {
    id: "privacy-first-reports",
    title: "Báo lỗi không gửi dữ liệu nhạy cảm",
    whyItMatters: "Người chơi mới thường muốn gửi ảnh/log ngay, nhưng web chưa có kênh intake, ticket backend hoặc privacy workflow chính thức.",
    playerCopy: "Khi góp ý, chỉ mô tả route, thiết bị, bước tái hiện và ảnh/log đã che thông tin riêng tư.",
    notClaimed: "Không có inbox ticket bảo mật, không tra cứu tài khoản, không có moderation dashboard."
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
    privacyBoundary: "Không gửi email, số điện thoại, token hoặc dữ liệu thanh toán để xin quyền tải."
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
    boundary: "Không có inbox ticket bảo mật, không tra cứu tài khoản, không có moderation dashboard."
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
    failureToAvoid: "Không biến runtime/browser evidence thành CTA sẵn sàng phát hành."
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
    nonClaim: "No báo cáo đo hiệu năng score certification, no PASS đo Web Vitals."
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
    implementationNote: "Use file-backed typed content and route tĩnh; do not introduce client-heavy personalization or backend fetching for public copy.",
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
    copyBudget: "Explain copy weight, hiệu ứng CSS nhẹs, static route composition and mobile density in short cards.",
    cssAssetRule: "Use existing token-driven panels and badges; no new bitmap hero or remote media dependency.",
    fallbackMessage: "No PASS đo Web Vitals or production monitoring claim."
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
    mustAvoid: "Do not show fake sẵn sàng phát hành language or placeholder checksum."
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
    surface: "trang Bắt đầu",
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
    bridgeCopy: "Đi từ trang Bắt đầu sang World Loop để hiểu Spirit Gate, Gate Keeper và Training Stone như một hành trình đọc/game expectation an toàn.",
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
    bridgeCopy: "Status cần nối tới Support Safety để người chơi biết chuẩn bị báo lỗi an toàn và không gửi dữ liệu nhạy cảm.",
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
    bridgeCopy: "Performance hub giải thích copy budget, hiệu ứng CSS nhẹs và mobile reading density để route continuity không biến thành trang nặng.",
    ctaLabel: "Đọc performance/copy budget",
    conversionBoundary: "No PASS đo Web Vitals, no báo cáo đo hiệu năng certification, no image CDN claim."
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
    supportingAction: "Chuẩn bị báo lỗi an toàn / Đọc community onboarding",
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
    clarification: "trang Bắt đầu ưu tiên câu hỏi người chơi, sau đó mới tới route groups và trust/status surfaces.",
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



export const faqDiscoveryGroups: FaqDiscoveryGroup[] = [
  { id: "faq-help-hub", title: "Trung tâm FAQ nhanh", playerQuestion: "Tôi chưa biết câu hỏi của mình thuộc nhóm nào?", route: "/support/help", helpfulnessCue: "Bắt đầu ở FAQ nhanh để chọn nhóm tải game, tester, an toàn, tài khoản/backend hoặc kỳ vọng lối chơi.", nonClaim: "Không có backend tìm kiếm, không có bot hỗ trợ AI, không có định tuyến ticket live." },
  { id: "download-readiness", title: "Tải game / checksum", playerQuestion: "Tôi tải game ở đâu và biết file có thật không?", route: "/download/trust", helpfulnessCue: "Đọc Tin cậy tải game trước, sau đó xem Sẵn sàng phát hành để biết gate gói build, checksum và duyệt owner.", nonClaim: "Không có gói tải game công khai, không có nút tải giả, không có checksum placeholder." },
  { id: "closed-test", title: "Closed test / gói tester", playerQuestion: "Tôi có được tham gia test chưa và cần chuẩn bị gì?", route: "/release/tester-pack", helpfulnessCue: "Đọc Gói tester để chuẩn bị phản hồi an toàn; chỉ gửi khi owner công bố kênh chính thức.", nonClaim: "Không có kênh nhận tester live, không bảo đảm suất tester, không có tự động cấp quyền." },
  { id: "safety-support", title: "An toàn / hỗ trợ", playerQuestion: "Tôi nên báo lỗi hoặc góp ý thế nào để không gửi nhầm dữ liệu?", route: "/support/safety", helpfulnessCue: "Dùng hỗ trợ an toàn để chuẩn bị route, bước tái hiện, loại thiết bị và ảnh/log đã che dữ liệu riêng tư.", nonClaim: "Không có hộp thư ticket bảo mật, không tra cứu tài khoản, không có SLA production." },
  { id: "account-backend", title: "Tài khoản / ranh giới backend", playerQuestion: "Tại sao portal, login hoặc account chưa hoạt động như game thật?", route: "/status", helpfulnessCue: "Trang trạng thái nói rõ bề mặt công khai/nội bộ/tạm khóa; WEB-08 cần hợp đồng backend trước khi tích hợp thật.", nonClaim: "Không có xác thực production, không lưu DB thật, không tích hợp portal tài khoản thật." },
  { id: "world-loop", title: "Vòng lặp thế giới / kỳ vọng lối chơi", playerQuestion: "Game hiện đang mô tả lối chơi tới mức nào?", route: "/game/loop", helpfulnessCue: "Vòng lặp game giải thích Cổng Linh, Người Gác Cổng, Đá Luyện Tập và những phần chưa claim như chiến đấu/kinh tế/thế giới live.", nonClaim: "Không có sát thương chiến đấu, loot, PvP, thưởng boss, máy chủ thế giới live hoặc cơ sở dữ liệu nhiệm vụ production." }
];

export const faqHelpfulnessPrompts: FaqHelpfulnessPrompt[] = [
  { prompt: "Tôi đang tìm câu trả lời về tải game", answerStyle: "Bắt đầu bằng trạng thái hiện tại, sau đó giải thích gói build/checksum/gate owner.", usefulNextStep: "Đi tới /download/trust rồi /release/readiness.", mustAvoid: "Không dùng lời kêu gọi tải ngay khi chưa có gói build thật." },
  { prompt: "Tôi muốn báo lỗi", answerStyle: "Hỏi route/màn hình/bước tái hiện và nhắc che dữ liệu riêng tư.", usefulNextStep: "Đi tới /support/safety hoặc /release/tester-pack để dùng mẫu an toàn.", mustAvoid: "Không yêu cầu mật khẩu, token, ID tài khoản, IP chính xác hoặc dữ liệu thanh toán." },
  { prompt: "Tôi muốn biết có được test không", answerStyle: "Nói rõ gói tester hiện là hướng dẫn tĩnh, không phải đăng ký hoặc thư mời.", usefulNextStep: "Đi tới /release/tester-pack và theo dõi readiness gate.", mustAvoid: "Không hứa suất tester, quyền truy cập, phần thưởng hoặc open beta." },
  { prompt: "Tôi không biết nên đọc trang nào trước", answerStyle: "Đề xuất trang Bắt đầu hoặc Hành trình theo câu hỏi của người chơi.", usefulNextStep: "Đi tới /start, /journey hoặc /support/help.", mustAvoid: "Không đẩy người chơi vòng quanh nhiều CTA mà không có route tiếp theo rõ ràng." }
];

export const issueCategoryRoutes: IssueCategoryRoute[] = [
  { category: "Tải game / checksum", whenPlayerSays: "Không thấy link tải, không hiểu checksum hoặc sợ file giả.", recommendedRoute: "/download/trust", whatToPrepare: "Tên route, đoạn copy gây nhầm, kỳ vọng của người chơi.", privacyBoundary: "Không gửi file thực thi lạ, token, email riêng tư hoặc dữ liệu thanh toán." },
  { category: "Phản hồi tester", whenPlayerSays: "Muốn góp ý closed test hoặc báo giới hạn đã biết.", recommendedRoute: "/release/tester-pack", whatToPrepare: "Loại thiết bị, OS/browser, kích thước màn hình gần đúng, bước tái hiện và kỳ vọng/thực tế.", privacyBoundary: "Không gửi serial, IMEI, ID tài khoản, mật khẩu hoặc chat riêng." },
  { category: "An toàn / ứng xử", whenPlayerSays: "Lo về hành vi cộng đồng, báo cáo nội dung hoặc quy tắc ứng xử.", recommendedRoute: "/support/safety", whatToPrepare: "Mô tả tình huống chung và route liên quan; chờ kênh chính thức nếu cần moderation thật.", privacyBoundary: "Không gửi dữ liệu cá nhân nhạy cảm hoặc cáo buộc định danh khi chưa có kênh chính thức." },
  { category: "Tài khoản / backend", whenPlayerSays: "Không rõ đăng nhập, portal, nhân vật hoặc khôi phục tài khoản đã thật chưa.", recommendedRoute: "/status", whatToPrepare: "Đọc bề mặt công khai/nội bộ/tạm khóa trước khi kỳ vọng luồng tài khoản.", privacyBoundary: "Không nhập mật khẩu hoặc email thật vào bất kỳ form giả nào." },
  { category: "Thế giới / lối chơi", whenPlayerSays: "Không rõ web đang hứa chiến đấu, boss, kinh tế hay chỉ mô tả vòng lặp đầu.", recommendedRoute: "/game/loop", whatToPrepare: "Câu hỏi về Cổng Linh, Người Gác Cổng, Đá Luyện Tập hoặc milestone lối chơi.", privacyBoundary: "Không kỳ vọng phần thưởng, túi đồ, giao dịch hoặc PvP khi chưa có milestone được claim." }
];

export const noSearchBackendNotes: NoSearchBackendNote[] = [
  { surface: "/support/help", currentBehavior: "FAQ được nhóm bằng nội dung local typed và link route.", helpfulFallback: "Dùng nhóm câu hỏi, nhóm vấn đề và trang Bắt đầu/Hành trình để tự tìm đường.", notClaimed: "Không có backend tìm kiếm, không có bot hỗ trợ AI, không định tuyến ticket." },
  { surface: "/support", currentBehavior: "Trang hỗ trợ hiển thị hướng dẫn tĩnh và FAQ sâu.", helpfulFallback: "Nếu câu hỏi liên quan dữ liệu riêng tư, chỉ chuẩn bị mô tả an toàn và chờ kênh owner-approved.", notClaimed: "Không có bàn hỗ trợ live, không có hộp thư bảo mật, không có SLA." },
  { surface: "/status", currentBehavior: "Trạng thái phân biệt bề mặt công khai/nội bộ/tạm khóa.", helpfulFallback: "Đọc Status trước khi hiểu nhầm portal/login/release readiness là production.", notClaimed: "Không có API trạng thái live, không tích hợp giám sát." },
  { surface: "/release/tester-pack", currentBehavior: "Gói tester cung cấp checklist và mẫu chuẩn bị.", helpfulFallback: "Dùng template để ghi feedback offline; không gửi dữ liệu nhạy cảm cho tới khi có kênh chính thức.", notClaimed: "Không nhận tester, không form đăng ký, không backend cấp quyền." }
];
