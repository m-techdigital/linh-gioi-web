export const PROVISIONAL_WEB_FIXTURE = "PROVISIONAL_WEB_FIXTURE" as const;
export const NOT_CANONICAL_BACKEND_CONTRACT = "NOT_CANONICAL_BACKEND_CONTRACT" as const;

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
