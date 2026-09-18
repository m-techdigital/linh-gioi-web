import type {
  ClosedTestReadinessCheck,
  ClosedTesterChecklistItem,
  DeviceReportTemplateField,
  DownloadBuild,
  DownloadExplainer,
  DownloadReadiness,
  DownloadStatusNote,
  DownloadTrustGate,
  KnownLimitationNote,
  OwnerReleaseGate,
  PlayerTrustSignal,
  ReleaseEvidenceRequirement,
  ReleaseNarrativeStage,
  ReleaseReadinessHubItem,
  ReleaseSurfaceAlignment,
  RoadmapDecisionGate,
  SafeFeedbackTemplate,
  StagedReleaseMessage,
  StatusExplainer,
  StatusTrustSurface,
  TesterExpectationCopy,
  TrustJourneyCheckpoint,
} from "../types";

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
    surface: "Website công khai",
    visibility: "public",
    sourceOfTruth: "Nội dung công khai typed/file-backed trong web repo",
    currentTruth: "Các trang có thể mô tả hướng game, roadmap, hướng dẫn và blocker tải game.",
    forbiddenClaim: "Không claim deployment production hoặc CMS live."
  },
  {
    surface: "Gói tải game",
    visibility: "blocked",
    sourceOfTruth: "Gói build game đã được duyệt cùng gói SHA256/nguồn gốc",
    currentTruth: "Hiện chưa có gói tải game công khai được duyệt.",
    forbiddenClaim: "Không tải giả, không claim launcher hoặc sẵn sàng phát hành."
  },
  {
    surface: "Tài khoản / quyền Portal",
    visibility: "blocked",
    sourceOfTruth: "Contract Auth/API/DB/RBAC/audit đã được duyệt từ game backend canonical",
    currentTruth: "Portal vẫn là UX shell / fixture-only và không cấp quyền truy cập thật.",
    forbiddenClaim: "Không claim xác thực production, DB persistence hoặc tra cứu tài khoản thật."
  },
  {
    surface: "Guardrail runtime/browser",
    visibility: "internal",
    sourceOfTruth: "Bằng chứng Node, pnpm và Playwright local/preseeded",
    currentTruth: "Hữu ích để chống regression sau khi đổi copy sản phẩm.",
    forbiddenClaim: "Runtime PASS không được quảng bá như trạng thái sẵn sàng phát hành game."
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
    playerCopy: "Bạn có thể đọc thế giới, roadmap, guides, download trust và FAQ hỗ trợ ngay trên web.",
    ownerChecklist: "Copy không được hứa download, account, DB, combat/economy/social live system.",
    nonClaim: "No public game download artifact, no production auth, no CMS."
  },
  {
    stage: "Closed testing preparation",
    visibility: "internal",
    playerCopy: "Closed testing sẽ chỉ được nói tới khi có build thật, checksum, known limitations và kênh hỗ trợ được duyệt.",
    ownerChecklist: "Chuẩn bị release note, support expectation, privacy-safe báo lỗi guidance.",
    nonClaim: "No fake waitlist, no portal entitlement, no live support backend."
  },
  {
    stage: "Accepted test build",
    visibility: "blocked",
    playerCopy: "Khi build được duyệt, trang Download mới có link, SHA256, provenance và hướng dẫn cài đặt rõ ràng.",
    ownerChecklist: "Verify artifact upload, sidecar SHA, rollback note and owner approval before CTA.",
    nonClaim: "No placeholder checksum, no sẵn sàng phát hành claim before artifact evidence."
  },
  {
    stage: "Backend-connected portal",
    visibility: "blocked",
    playerCopy: "Account portal thật sẽ cần backend contract được chấp nhận; hiện portal vẫn là shell/fixture.",
    ownerChecklist: "Wait for WEB-08 Auth/API/DB/RBAC/audit contract and integration gates.",
    nonClaim: "No production auth, no DB persistence, no real ops/admin mutation."
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
    forbiddenShortcut: "No sẵn sàng phát hành claim from web polish, browser matrix or static route build."
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
    ownerGate: "Update status trust surfaces and FAQ hỗ trợ in the same release package.",
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
    boundary: "No sẵn sàng phát hành claim from runtime/browser checks."
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
    topic: "Phạm vi gameplay",
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
    mustSay: "Bề mặt công khai/nội bộ/tạm khóa khác nhau và guardrail runtime không phải readiness phát hành.",
    mustLinkTo: "/release/readiness",
    contradictionToAvoid: "Không dùng build/test PASS để claim open beta hoặc sẵn sàng phát hành."
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
  { id: "read-stage-first", title: "Đọc stage trước khi kỳ vọng quyền test", testerQuestion: "Tôi có đang được mời test chưa?", safePreparation: "Đọc /release/readiness và /release/tester-pack để hiểu hiện mới là thông tin chuẩn bị, chưa phải lời mời hoặc form đăng ký.", whereToRead: "/release/readiness", nonClaim: "Không mở intake tester, không bảo đảm slot, không tự động cấp quyền." },
  { id: "prepare-device-context", title: "Chuẩn bị bối cảnh thiết bị an toàn", testerQuestion: "Nếu sau này có kênh chính thức, tôi nên chuẩn bị thông tin gì?", safePreparation: "Ghi thiết bị, OS, mạng, độ phân giải, route/screen và bước tái hiện theo mẫu; không gửi secrets hoặc dữ liệu riêng tư.", whereToRead: "/release/tester-pack", nonClaim: "Không chứng nhận thiết bị, không bảo đảm hiệu năng, không có backend thu dữ liệu." },
  { id: "report-small-scope", title: "Báo lỗi theo phạm vi stage nhỏ", testerQuestion: "Feedback nên tập trung vào đâu?", safePreparation: "Tập trung vào download trust, status clarity, support wording, beginner journey và known limitations; không kỳ vọng combat/economy/social đầy đủ.", whereToRead: "/game/loop", nonClaim: "Không claim MMO đầy đủ, không hứa thưởng combat, không hứa thưởng live event." },
  { id: "wait-for-official-channel", title: "Chờ kênh owner-approved", testerQuestion: "Tôi gửi feedback ở đâu?", safePreparation: "Hiện chỉ chuẩn bị nội dung feedback. Chỉ gửi khi website hoặc owner công bố kênh chính thức có privacy boundary rõ ràng.", whereToRead: "/support/safety", nonClaim: "Không có inbox ticket bảo mật, không tra cứu tài khoản, không có moderation dashboard." }
];

export const safeFeedbackTemplates: SafeFeedbackTemplate[] = [
  { field: "Tóm tắt", guidance: "Mô tả vấn đề trong một câu: route hoặc màn hình nào, chuyện gì xảy ra, mức độ ảnh hưởng.", example: "Trên trang Download Trust, tôi không hiểu khác nhau giữa checksum và owner approval.", privacyBoundary: "Không ghi tên tài khoản, email, token, password hoặc dữ liệu thanh toán." },
  { field: "Bước tái hiện", guidance: "Ghi 3-5 bước rõ ràng để reviewer đi lại đúng hành trình.", example: "Mở /start → bấm Sẵn sàng phát hành → đọc Tin cậy tải game → quay về Hỗ trợ an toàn.", privacyBoundary: "Không đính kèm log thô chứa path riêng tư hoặc thông tin nhận diện cá nhân." },
  { field: "Kỳ vọng / thực tế", guidance: "Tách expected và actual để tránh biến feedback thành góp ý mơ hồ.", example: "Kỳ vọng: biết chưa có link tải. Thực tế: CTA khiến tôi tưởng sắp có build public.", privacyBoundary: "Không yêu cầu người chơi chứng minh quyền truy cập hoặc chia sẻ entitlement." },
  { field: "Mức ảnh hưởng", guidance: "Dùng mức nhẹ: chặn luồng, gây hiểu nhầm, lỗi chữ, lỗi hiển thị, cảm giác chậm hoặc khó đọc.", example: "Gây hiểu nhầm — wording làm tôi tưởng đây là đăng ký mở.", privacyBoundary: "Không thu thập medical/accessibility profile cá nhân; chỉ nói cảm nhận đọc/truy cập ở mức tự nguyện." }
];

export const knownLimitationNotes: KnownLimitationNote[] = [
  { area: "Bản build công khai", playerMessage: "Chưa có public game build artifact được duyệt, nên mọi download CTA vẫn là trạng thái giải thích.", ownerNote: "Chỉ đổi copy khi artifact, SHA256, manifest, limitation note và owner sign-off tồn tại.", mustNotClaim: "Không có public build, không open beta, không đặt CTA tải giả." },
  { area: "Quyền tester kín", playerMessage: "Gói tester cộng đồng không phải form đăng ký, lời mời hoặc bảo đảm slot test.", ownerNote: "Cần kênh intake chính thức, privacy boundary và triage owner trước khi nhận thông tin tester.", mustNotClaim: "Không mở intake tester, không bảo đảm slot, không tự động cấp quyền." },
  { area: "Hỗ trợ và an toàn", playerMessage: "Hỗ trợ hiện là hướng dẫn an toàn; chưa có ticket backend, tra cứu tài khoản hoặc inbox bảo mật.", ownerNote: "Không yêu cầu secrets hoặc dữ liệu nhạy cảm qua public copy.", mustNotClaim: "Không có ticket inbox bảo mật, không phục hồi tài khoản, không có SLA production." },
  { area: "Phạm vi gameplay", playerMessage: "Thông tin vòng chơi giải thích Cổng Linh Khí và Đá Luyện, chưa hứa combat/kinh tế/thưởng live event.", ownerNote: "Giữ scope wording cạnh guide/tester pages để tránh reviewer hiểu nhầm.", mustNotClaim: "Không có sát thương combat, không loot, không hứa thưởng/kinh tế." }
];

export const deviceReportTemplateFields: DeviceReportTemplateField[] = [
  { field: "Loại thiết bị", whyItMatters: "Giúp owner đọc feedback theo nhóm desktop/laptop/tablet/mobile mà không cần nhận dữ liệu định danh.", safeFormat: "Laptop Windows 11, MacBook macOS, điện thoại Android, iPhone, iPad hoặc tablet Android.", doNotCollect: "Không thu số serial, IMEI, phone number, email riêng tư hoặc account ID." },
  { field: "OS / trình duyệt / màn hình", whyItMatters: "Giúp tái hiện lỗi layout, focus, readability hoặc perceived load.", safeFormat: "macOS + Chrome, Windows + Edge, Android + Chrome, iOS + Safari; độ phân giải gần đúng nếu biết.", doNotCollect: "Không thu browser profile, cookie, token, extension list hoặc lịch sử duyệt web." },
  { field: "Bối cảnh mạng", whyItMatters: "Giúp phân biệt wording/perceived load với lỗi mạng thật khi tải trang static.", safeFormat: "Wi-Fi nhà, 4G/5G, mạng công ty, chậm/ổn định/không ổn định.", doNotCollect: "Không thu IP public, địa chỉ nhà, vị trí chính xác hoặc thông tin nhà mạng nhạy cảm." },
  { field: "An toàn ảnh/log", whyItMatters: "Ảnh minh họa giúp debug nhưng phải che thông tin riêng tư trước khi gửi qua kênh chính thức.", safeFormat: "Ảnh đã che tên/email/token; log rút gọn chỉ chứa lỗi liên quan route/screen.", doNotCollect: "Không gửi password, token, dữ liệu thanh toán, private chat hoặc dữ liệu cá nhân nhạy cảm." }
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
    label: "Website công khai",
    visibility: "public",
    detail: "Các trang công khai đang phát triển nội dung, bố cục, thông tin game, hướng dẫn và giải thích tải game."
  },
  {
    label: "Gói phát hành game",
    visibility: "blocked",
    detail: "Chưa có build/checksum công khai được duyệt, nên trạng thái không được ghi là sẵn sàng phát hành."
  },
  {
    label: "Backend Portal/Ops",
    visibility: "blocked",
    detail: "Portal tài khoản thật, thao tác Ops, ticket hỗ trợ và audit cần contract backend đã được duyệt."
  },
  {
    label: "Guardrail runtime/browser",
    visibility: "internal",
    detail: "Dùng để chống regression sau khi đổi nội dung web; không phải nội dung chính và không thay thế readiness sản phẩm."
  }
];


// WEB v1.22 — player-facing game experience narrative derived from the approved 2D scenario/design spine.
