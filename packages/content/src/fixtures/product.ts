import type {
  BeginnerExpectation,
  BeginnerGuideSection,
  ClassPath,
  GameExperiencePillar,
  GameplayLoopStage,
  GameplayScopeBoundary,
  GuideWorldNavigationLink,
  HomeDiscoveryMoment,
  NarrativeChapter,
  PlayerEntryQuestion,
  PlayerJourneyStep,
  PublicContentHub,
  PublicGameArtAsset,
  PublicHeroStat,
  PublicRouteGroup,
  SessionBeat,
  WorldPillar,
  WorldRouteStop,
  WorldStoryChapter,
} from "../types";

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

export const publicContentHubs: PublicContentHub[] = [
  {
    id: "first-minute-hub",
    title: "Bắt đầu trong 1 phút",
    audience: "Người chơi mới chưa biết Linh Giới Online đang ở trạng thái nào",
    summary: "Đọc nhanh game là gì, có thể tải chưa, và nên xem trang nào tiếp theo trước khi kỳ vọng tài khoản hoặc build thật.",
    primaryRoute: { label: "trang Bắt đầu", href: "/start", reason: "Một điểm vào gom các route quan trọng theo nhu cầu người đọc." },
    secondaryRoutes: [
      { label: "Thế giới", href: "/game", reason: "Hiểu Spirit Gate, Gate Keeper và Training Stone." },
      { label: "Download trust", href: "/download/trust", reason: "Biết vì sao chưa có nút tải và cần checksum/provenance." },
      { label: "Roadmap", href: "/roadmap", reason: "Xem gate nào ready/planned/blocked." },
      { label: "Dễ đọc", href: "/accessibility", reason: "Kiểm tra heading, scan aid và focus order." },
      { label: "Hiệu năng", href: "/performance", reason: "Hiểu copy budget, hiệu ứng CSS nhẹ budget và perceived load." }
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
    answer: "Bắt đầu ở trang Bắt đầu để chọn đúng nhánh: hiểu game, kiểm tra download, xem roadmap hoặc đọc support/community.",
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
    answer: "Đọc accessibility/readability hub để biết cách dùng trang Bắt đầu, heading, scan aid, CTA đầu trang và boundary copy.",
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
    reason: "trang Bắt đầu đưa người chơi mới tới loop explanation trước khi tìm download hoặc account.",
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
