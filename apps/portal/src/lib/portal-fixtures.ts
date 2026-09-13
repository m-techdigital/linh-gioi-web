export const PROVISIONAL_WEB_FIXTURE = "PROVISIONAL_WEB_FIXTURE" as const;
export const NOT_CANONICAL_BACKEND_CONTRACT = "NOT_CANONICAL_BACKEND_CONTRACT" as const;
export const NO_ACCEPTED_BACKEND_CONTRACT = "NO_ACCEPTED_BACKEND_CONTRACT" as const;

export const portalAccountFixture = {
  displayName: "Minh Linh Khách",
  accountId: "fixture-player-001",
  emailState: "Chưa kết nối email production",
  securityState: "Fixture only",
  sessionCount: 2,
  characterCount: 2
} as const;

export const portalSessionFixtures = [
  { id: "session-fixture-a", device: "MacBook Pro · fixture", location: "Hà Nội · illustrative", lastSeen: "Vừa xong", state: "Current fixture" },
  { id: "session-fixture-b", device: "Mobile · fixture", location: "Không xác định", lastSeen: "2 giờ trước · illustrative", state: "Review fixture" }
] as const;

export const portalCharacterFixtures = [
  { id: "fixture-a", name: "Vân Quyền", path: "Võ", level: "Lv. 18 · illustrative", zone: "Đông Môn", state: "Ready fixture", lastPlayed: "Hôm nay · illustrative" },
  { id: "fixture-b", name: "Thanh Vũ", path: "Kiếm", level: "Lv. 12 · illustrative", zone: "Linh Thành", state: "Resting fixture", lastPlayed: "Hôm qua · illustrative" }
] as const;

export const portalJourneyFixture = {
  title: "Hành trình người chơi",
  state: NO_ACCEPTED_BACKEND_CONTRACT,
  summary: "Demo data nối tài khoản, bảo mật, nhân vật và hỗ trợ để review FE/UX trong lúc chưa mở BE.",
  artPanels: [
    {
      id: "portal-journey-dong-mon-world-concept",
      title: "Đông Môn",
      description: "World concept dùng làm ngữ cảnh hành trình; không phải gameplay screenshot.",
      src: "/game-art/world/dong-mon-skyline.webp",
      alt: "Khung concept Đông Môn trong Linh Giới",
      width: 1360,
      height: 765,
      claim: "WORLD_CONCEPT"
    },
    {
      id: "portal-journey-vo-starter-development-art",
      title: "Võ khởi đầu",
      description: "Development art preview giúp demo nhân vật có chất game hơn.",
      src: "/game-art/classes/vo-lv1-starter-atlas.webp",
      alt: "Bảng development art Võ cấp đầu",
      width: 1280,
      height: 1280,
      claim: "DEVELOPMENT_ART_PREVIEW"
    },
    {
      id: "portal-journey-vo-skill-development-art",
      title: "Kỹ năng Võ",
      description: "Preview skill atlas cho cảm giác action trong Portal demo.",
      src: "/game-art/classes/vo-lv1-skill-atlas.webp",
      alt: "Bảng development art kỹ năng Võ",
      width: 820,
      height: 820,
      claim: "DEVELOPMENT_ART_PREVIEW"
    }
  ],
  journeySteps: [
    { title: "Xem tài khoản", description: "Kiểm tra identity, email và security posture ở mức fixture.", state: "complete", statusLabel: "Demo sẵn sàng" },
    { title: "Duyệt phiên", description: "Soát thiết bị minh họa; không có token lifecycle hoặc revoke API.", state: "complete", statusLabel: "Demo sẵn sàng" },
    { title: "Chọn nhân vật", description: "Đi từ roster tới detail để kiểm tra layout character.", state: "current", statusLabel: "Đang review" },
    { title: "Gửi hỗ trợ", description: "Luồng support vẫn bị khóa cho tới khi có contract backend.", state: "blocked", statusLabel: "Chưa mở BE" }
  ],
  recentActivity: [
    { title: "Portal demo opened", timestamp: "T+0", description: "Người chơi vào tổng quan fixture, không tạo session thật.", meta: "PROVISIONAL_WEB_FIXTURE" },
    { title: "Security preview checked", timestamp: "T+2", description: "Các field security giữ disabled để tránh thu credential.", meta: "NO_ACCEPTED_BACKEND_CONTRACT" },
    { title: "Character roster reviewed", timestamp: "T+5", description: "Rows chỉ dùng cho FE/e2e, không định nghĩa canonical DTO.", meta: "NOT_CANONICAL_BACKEND_CONTRACT" },
    { title: "Support path discovered", timestamp: "T+8", description: "Điểm chạm support hiện chỉ hướng dẫn người dùng trong UI demo.", meta: "No real Portal integration" }
  ],
  nextActions: [
    { title: "Tài khoản mẫu", description: "Mở fixture account để xem thông tin nhận diện.", href: "/account" },
    { title: "Nhân vật mẫu", description: "Mở roster và character detail minh họa.", href: "/characters" },
    { title: "Hỗ trợ mẫu", description: "Xem support/recovery boundary khi chưa có BE.", href: "/support" }
  ]
} as const;

export const portalHomeVisualPanels = [
  {
    id: "portal-home-world",
    src: "/game-art/world/dong-mon-skyline.webp",
    alt: "Portal home Đông Môn world concept",
    width: 1360,
    height: 765,
    claim: "WORLD_CONCEPT",
    title: "Bắt đầu từ Đông Môn",
    description: "Home Portal cần cho người chơi cảm giác đang quay lại một thế giới cụ thể, nhưng dữ liệu vẫn là fixture."
  },
  {
    id: "portal-home-vo",
    src: "/game-art/classes/vo-lv1-starter-atlas.webp",
    alt: "Portal home development art Võ",
    width: 1280,
    height: 1280,
    claim: "DEVELOPMENT_ART_PREVIEW",
    title: "Nhìn thấy nhân vật trước khi có BE",
    description: "Art preview giúp dashboard bớt khô, không tạo character DTO hay production profile riêng."
  }
] as const;

export const portalSecurityContinuityPanels = [
  {
    id: "portal-security-world",
    src: "/game-art/world/dong-mon-skyline.webp",
    alt: "Security route Đông Môn context",
    width: 1360,
    height: 765,
    claim: "WORLD_CONCEPT",
    title: "Bảo mật là một chặng trong hành trình",
    description: "Security route cần nối lại với thế giới và phiên chơi, không đứng riêng như một form kỹ thuật."
  },
  {
    id: "portal-security-skill",
    src: "/game-art/classes/vo-lv1-skill-atlas.webp",
    alt: "Security route skill preview",
    width: 820,
    height: 820,
    claim: "DEVELOPMENT_ART_PREVIEW",
    title: "Không thu credential trong fixture",
    description: "Visual preview thay cho input thật; route chỉ giải thích trạng thái bảo mật khi chưa có Auth contract."
  }
] as const;

export const portalSecurityContinuityActions = [
  { title: "Phiên đăng nhập", description: "Xem session fixture kế tiếp; không có token lifecycle thật.", href: "/account/sessions" },
  { title: "Hành trình", description: "Quay lại bản đồ hành trình để thấy security trong tổng thể Portal.", href: "/journey" }
] as const;


export const portalSupportTopics = [
  { id: "account-access", title: "Truy cập tài khoản", description: "Khôi phục quyền truy cập, session và security fixture." },
  { id: "character-help", title: "Nhân vật", description: "Điều hướng trợ giúp nhân vật; chưa có character mutation API." },
  { id: "safety", title: "An toàn người chơi", description: "Chỉ dẫn tới support/safety workflow; không mở moderation mutation." },
  { id: "technical", title: "Kỹ thuật", description: "Thu thập mô tả lỗi ở mức UX fixture, không upload log thật." },
] as const;

export const portalSupportCaseFixtures = [
  {
    id: "support-case-001",
    title: "Không vào được tài khoản · fixture",
    state: "Review fixture",
    category: "Truy cập tài khoản",
    updatedAt: "10 phút trước · illustrative",
    nextStep: "Chờ canonical support contract",
    timeline: [
      { title: "Case fixture created", timestamp: "T+0", description: "Chỉ kiểm tra hierarchy và case state UX." },
      { title: "Identity review blocked", timestamp: "T+5", description: "Không lookup account thật khi Auth/API contract chưa mở." },
      { title: "Recovery handoff pending", timestamp: "T+10", description: "Có thể chuyển người chơi sang recovery fixture để hiểu flow." },
    ],
  },
] as const;

export const portalRecoveryFixture = {
  id: "recovery-fixture-001",
  state: "Blocked by contract",
  channel: "Email / account identity · illustrative",
  ownershipCheck: "Not available",
  tokenDelivery: "Not available",
  stages: [
    { title: "Nhận diện tài khoản", timestamp: "Bước 1", description: "Disabled field chỉ mô phỏng điểm bắt đầu; không lookup dữ liệu thật." },
    { title: "Xác minh quyền sở hữu", timestamp: "Bước 2", description: "Blocked cho tới khi canonical auth/recovery contract tồn tại." },
    { title: "Gửi recovery token", timestamp: "Bước 3", description: "Không gửi email/token trong web fixture." },
    { title: "Đặt lại credential", timestamp: "Bước 4", description: "Không có credential mutation hay password reset backend." },
  ],
} as const;

// Presentation scenarios only: these steps never indicate a real authenticated session.
export const portalAccessJourneys = {
  login: [
    { title: "Thông tin đăng nhập", description: "Xem trước thông tin cần chuẩn bị. Không nhập mật khẩu thật.", state: "current", statusLabel: "Đang xem bản mẫu" },
    { title: "Xác minh truy cập", description: "Đăng nhập chưa mở; chưa có phiên truy cập được tạo.", state: "blocked", statusLabel: "Chưa khả dụng" },
    { title: "Tài khoản & nhân vật", description: "Có thể khám phá bản mẫu Portal ngay lúc này.", state: "upcoming", statusLabel: "Bước tiếp theo dự kiến" }
  ],
  register: [
    { title: "Thông tin cơ bản", description: "Email và tên hiển thị chỉ minh họa bố cục đăng ký.", state: "current", statusLabel: "Đang xem bản mẫu" },
    { title: "Điều khoản & xác minh", description: "Điều khoản và cách xác minh sẽ được công bố khi đăng ký mở.", state: "blocked", statusLabel: "Chưa khả dụng" },
    { title: "Bắt đầu hành trình", description: "Sau khi đăng ký được mở, hướng dẫn sẽ dẫn tới tài khoản và nhân vật.", state: "upcoming", statusLabel: "Bước tiếp theo dự kiến" }
  ],
  recovery: [
    { title: "Nhận diện tài khoản", description: "Xem trước bước cung cấp thông tin; không tìm tài khoản thật.", state: "current", statusLabel: "Đang xem bản mẫu" },
    { title: "Xác minh quyền sở hữu", description: "Chưa có phương thức xác minh hoặc gửi email khôi phục.", state: "blocked", statusLabel: "Chưa khả dụng" },
    { title: "Trở lại Portal", description: "Chỉ tiếp tục khi quyền truy cập được xác nhận trong hệ thống chính thức.", state: "upcoming", statusLabel: "Bước tiếp theo dự kiến" }
  ]
} as const;
