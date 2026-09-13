export const PROVISIONAL_WEB_FIXTURE = "PROVISIONAL_WEB_FIXTURE" as const;
export const NO_REAL_OPS_MUTATION = "NO_REAL_OPS_MUTATION" as const;
export const NOT_CANONICAL_BACKEND_CONTRACT = "NOT_CANONICAL_BACKEND_CONTRACT" as const;
export const NO_ACCEPTED_BACKEND_CONTRACT = "NO_ACCEPTED_BACKEND_CONTRACT" as const;

export const opsPlayerFixtures = [
  { id: "fixture-001", displayName: "Fixture Player 001", accountState: "Review fixture", characterSummary: "2 characters · illustrative", trustState: "No canonical trust score", surface: "Account review preview" },
  { id: "fixture-002", displayName: "Fixture Player 002", accountState: "Observe fixture", characterSummary: "1 character · illustrative", trustState: "No canonical trust score", surface: "Character review preview" }
] as const;

export const opsPlayerActivityFixtures = [
  { id: "activity-a", title: "Account review opened", timestamp: "09:30 · fixture", description: "Presentation-only operator review event.", meta: "No audit event store" },
  { id: "activity-b", title: "Character summary inspected", timestamp: "09:34 · fixture", description: "Illustrative review sequence only.", meta: "NO_REAL_OPS_MUTATION" },
  { id: "activity-c", title: "Action remained blocked", timestamp: "09:36 · fixture", description: "Mutation controls stay disabled until canonical RBAC/API contracts exist.", meta: "NOT_CANONICAL_BACKEND_CONTRACT" }
] as const;

export const opsAuditFixtureEvents = [
  { id: "audit-a", title: "Operator fixture signed in", timestamp: "08:10 · fixture", description: "Visual audit event only.", meta: "No actor schema" },
  { id: "audit-b", title: "Player review fixture opened", timestamp: "08:18 · fixture", description: "No real player query was executed.", meta: "No audit backend" },
  { id: "audit-c", title: "Blocked action previewed", timestamp: "08:21 · fixture", description: "No mutation endpoint exists.", meta: "NO_REAL_OPS_MUTATION" }
] as const;

export const opsSupportQueueFixtures = [
  { id: "support-fixture-001", player: "Fixture Player 001", category: "Account access", priority: "Review fixture", age: "12m · illustrative", state: "Awaiting triage" },
  { id: "support-fixture-002", player: "Fixture Player 002", category: "Technical", priority: "Observe fixture", age: "31m · illustrative", state: "Needs context" }
] as const;

export const opsSupportCaseFixture = {
  id: "support-fixture-001",
  player: "Fixture Player 001",
  category: "Account access",
  state: "Awaiting triage",
  priority: "Review fixture",
  owner: "Unassigned · fixture",
  escalation: "Blocked by contract",
  summary: "Illustrative support case for operator UX only; no support backend or player lookup was executed.",
  timeline: [
    { id: "support-a", title: "Case entered fixture queue", timestamp: "10:02 · fixture", description: "Presentation-only event; no ticket store exists.", meta: "No support backend" },
    { id: "support-b", title: "Player context previewed", timestamp: "10:07 · fixture", description: "No account or character query was executed.", meta: "NOT_CANONICAL_BACKEND_CONTRACT" },
    { id: "support-c", title: "Escalation remained blocked", timestamp: "10:12 · fixture", description: "Assignment and escalation controls stay disabled until accepted RBAC/API/audit contracts exist.", meta: "NO_REAL_OPS_MUTATION" }
  ]
} as const;

export const opsGameOperationFixtures = [
  { id: "world-fixture-001", surface: "World session A", state: "Observe fixture", capacity: "24 / 100 · illustrative", region: "East realm · fixture", note: "No canonical world/session model" },
  { id: "event-fixture-001", surface: "World event preview", state: "Scheduled fixture", capacity: "Not applicable", region: "Global · illustrative", note: "No live event scheduler" }
] as const;

export const opsGameOperationActivityFixtures = [
  { id: "gameop-a", title: "World fixture inspected", timestamp: "11:02 · fixture", description: "Presentation-only world/session review.", meta: "No session query API" },
  { id: "gameop-b", title: "Event fixture previewed", timestamp: "11:08 · fixture", description: "No scheduler, publish or rollback operation was executed.", meta: "NO_REAL_OPS_MUTATION" },
  { id: "gameop-c", title: "Operational action remained blocked", timestamp: "11:11 · fixture", description: "Restart, drain, publish and rollback actions stay disabled until accepted contracts exist.", meta: "NOT_CANONICAL_BACKEND_CONTRACT" }
] as const;

export const opsVisualProofPanels = [
  {
    id: "ops-dong-mon",
    src: "/game-art/world/dong-mon-skyline.webp",
    alt: "Ops visual proof Đông Môn world concept",
    width: 1360,
    height: 765,
    claim: "WORLD_CONCEPT",
    title: "Đọc ca trực bằng bối cảnh thế giới",
    description: "Control Center cần nhìn giống một màn vận hành game, nhưng ảnh chỉ là visual demo; không phải telemetry hay dữ liệu server."
  },
  {
    id: "ops-vo-kit",
    src: "/game-art/classes/vo-lv1-starter-atlas.webp",
    alt: "Ops visual proof development art Võ",
    width: 1280,
    height: 1280,
    claim: "DEVELOPMENT_ART_PREVIEW",
    title: "Nhận diện nhân vật trong review",
    description: "Ảnh development art giúp review queue có ngữ cảnh hình ảnh, vẫn không tạo character DTO hay contract riêng."
  },
  {
    id: "ops-vo-skill",
    src: "/game-art/classes/vo-lv1-skill-atlas.webp",
    alt: "Ops visual proof kỹ năng Võ",
    width: 820,
    height: 820,
    claim: "DEVELOPMENT_ART_PREVIEW",
    title: "Kỹ năng và sự kiện chỉ là minh họa",
    description: "LiveOps preview dùng art để kiểm tra layout/hierarchy; publish, rollback và audit thật vẫn bị chặn bởi backend contract."
  }
] as const;

export const opsReviewQueueFixtures = [
  { title: "Hỗ trợ người chơi", count: opsSupportQueueFixtures.length, href: "/support", description: "Xem hàng đợi hỗ trợ mẫu và thông tin cần làm rõ." },
  { title: "An toàn cộng đồng", count: 1, href: "/trust-safety", description: "Rà soát ngữ cảnh trước khi cân nhắc hành động. Không có xử phạt thật." },
  { title: "Thế giới & sự kiện", count: opsGameOperationFixtures.length, href: "/game-operations", description: "Xem tình huống vận hành minh họa; không phải số liệu máy chủ trực tiếp." }
] as const;

export const opsApprovalSteps = [
  { title: "Rà soát ngữ cảnh", description: "Đọc thông tin minh họa, ghi nhận phần chưa đủ căn cứ.", state: "current", statusLabel: "Đang xem bản mẫu" },
  { title: "Kiểm tra quyền & phê duyệt", description: "Cần quy tắc RBAC và phê duyệt được backend chấp nhận.", state: "blocked", statusLabel: "Chưa khả dụng" },
  { title: "Thực thi & lưu vết", description: "Chỉ thực thi khi quyền, API và audit đã sẵn sàng.", state: "blocked", statusLabel: "Không có thao tác thật" }
] as const;

export const opsSafetyReviewFixture = {
  id: "safety-fixture-001",
  title: "Báo cáo hành vi trong cộng đồng · mẫu",
  state: "Chưa đủ ngữ cảnh · mẫu",
  summary: "Tình huống minh họa cách rà soát một báo cáo. Không đại diện cho người chơi, tin nhắn hoặc vi phạm thật.",
  evidence: "Không có bằng chứng thực tế được tải lên",
  nextStep: "Đọc ngữ cảnh → kiểm tra quyền → phê duyệt khi hệ thống sẵn sàng",
  timeline: [
    { title: "Tiếp nhận báo cáo mẫu", timestamp: "Bước 1 · minh họa", description: "Một tình huống mẫu được chọn để kiểm tra bố cục rà soát." },
    { title: "Đánh dấu thiếu ngữ cảnh", timestamp: "Bước 2 · minh họa", description: "Không suy luận vi phạm hay áp dụng xử phạt từ dữ liệu minh họa." },
    { title: "Hành động bị khóa", timestamp: "Bước 3 · minh họa", description: "Chưa có API xử lý báo cáo, RBAC, phê duyệt hoặc audit chính thức." }
  ]
} as const;
