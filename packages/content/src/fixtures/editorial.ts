import type {
  ContentDetailSection,
  ContentEntry,
  GuideDetailStep,
} from "../types";

export const PROVISIONAL_WEB_FIXTURE = "PROVISIONAL_WEB_FIXTURE" as const;
export const NOT_CANONICAL_BACKEND_CONTRACT = "NOT_CANONICAL_BACKEND_CONTRACT" as const;

export const contentEntries: ContentEntry[] = [
  {
    slug: "web-program-control-tower",
    category: "news",
    title: "Control tower web đã được thiết lập",
    summary: "Repo web độc lập của Linh Giới Online đã có governance, ownership và ranh giới không tuyên bố quá phạm vi.",
    body: "Bản tin này là nội dung source-owned của web program: nó giải thích governance, ownership và ranh giới non-claim mà không biến web repo thành backend contract hoặc thông báo release production.",
    publishedAt: "2026-09-05T00:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "public-ux-content-polish-started",
    category: "news",
    title: "Bắt đầu polish UX và nội dung public",
    summary: "Slice web trước tập trung vào hierarchy trang chủ, thông tin game, roadmap, trạng thái tải game và hướng dẫn hỗ trợ.",
    body: "WEB v1.6 đặt nền UX public cho người chơi: hierarchy trang chủ, thông tin game, roadmap, trạng thái tải game và hướng dẫn hỗ trợ được gom lại rõ hơn nhưng vẫn giữ ranh giới không xác thực production, không DB, không CMS và không tích hợp backend vận hành thật.",
    publishedAt: "2026-09-05T06:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "visual-responsive-polish-started",
    category: "news",
    title: "Bắt đầu polish visual và responsive",
    summary: "Slice này làm rõ visual hierarchy, responsive, thông tin game, trạng thái tải và hỗ trợ.",
    body: "Slice visual responsive nén lại hierarchy, nhịp đọc, bố cục mobile/desktop và trạng thái tải/hỗ trợ. Browser/e2e chỉ kiểm layout; không claim production, không mở CMS, DB hoặc backend thật.",
    publishedAt: "2026-09-05T09:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE]
  },

  {
    slug: "public-game-info-depth-started",
    category: "news",
    title: "Thông tin game public được làm sâu hơn",
    summary: "WEB v1.8 làm sâu lore, hướng dẫn người mới, trạng thái tải, FAQ hỗ trợ và readiness cộng đồng.",
    body: "WEB v1.8 làm sâu nội dung game trên web public: chương truyện thế giới, bước nhập môn, ghi chú tải game, FAQ hỗ trợ và readiness cộng đồng. Kiểm tra trình duyệt chỉ là bằng chứng layout, không tuyên bố hệ thống vận hành chính thức.",
    publishedAt: "2026-09-05T10:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "news-guide-detail-pages-started",
    category: "news",
    title: "News và guide detail được làm sâu hơn",
    summary: "WEB v1.9 biến trang danh sách thành trải nghiệm detail dễ đọc cho tin tức, hướng dẫn, trạng thái và tải game.",
    body: "WEB v1.9 làm sâu các trang detail public: bài news có ngữ cảnh, guide có bước đọc tiếp, trạng thái có giải thích và tải game có ranh giới rõ. Nội dung vẫn là web public tĩnh, không mở CMS, DB, hỗ trợ live hoặc artifact tải game thật.",
    publishedAt: "2026-09-05T11:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "status-download-trust-polish-started",
    category: "news",
    title: "Copy trạng thái và download trust rõ hơn",
    summary: "WEB v1.10 làm rõ niềm tin tải game, bằng chứng artifact, trạng thái public và kỳ vọng hỗ trợ mà không thêm backend claim.",
    body: "WEB v1.10 giải thích khi nào download đáng tin: phải có artifact thật, checksum, nguồn phát hành, giới hạn rõ và owner approval. Status và support chỉ nói phần public có thể kiểm chứng; chưa mở xác thực vận hành, DB, CMS hoặc hỗ trợ live.",
    publishedAt: "2026-09-05T12:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "closed-tester-information-pack-started",
    category: "news",
    title: "Gói thông tin người kiểm thử đã sẵn sàng",
    summary: "WEB v1.20 giải thích người chơi kiểm thử tương lai nên đọc gì, chuẩn bị gì và tránh chia sẻ gì trước khi có kênh đăng ký thật.",
    body: "Gói thông tin người kiểm thử giữ web public hữu ích mà không mở đăng ký. Trang giải thích danh sách chuẩn bị, mẫu góp ý an toàn, giới hạn đã biết và mẫu báo cáo thiết bị, đồng thời giữ ranh giới: chưa có hệ thống tuyển người kiểm thử, chưa có quyền tài khoản và không thu thập bí mật hoặc dữ liệu nhạy cảm.",
    publishedAt: "2026-09-05T23:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "monorepo-foundation-env-limited",
    category: "patch-notes",
    title: "Nền tảng web đã sẵn sàng cho kiểm runtime local",
    summary: "Monorepo pnpm/Turborepo/Next.js đã có source kiểm soát, còn runtime gate vẫn phải được xác minh bằng môi trường local hoặc preseeded.",
    body: "Web repo không claim production auth, DB persistence, backend integration, CMS hoặc deployment.",
    publishedAt: "2026-09-05T01:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "browser-matrix-guardrail-passed",
    category: "patch-notes",
    title: "Browser matrix trở thành guardrail hỗ trợ",
    summary: "Public web, portal shell và ops shell đã có browser checks để tiếp tục polish sản phẩm với ít rủi ro regression hơn.",
    body: "Browser matrix bảo vệ thay đổi UX web; nó không phải production deployment, live content, account, database hoặc operations readiness claim.",
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
    title: "Trạng thái bảo trì chỉ là fixture local",
    summary: "Trang trạng thái và bảo trì chuẩn bị nội dung vận hành tương lai nhưng chưa nối hạ tầng live.",
    body: "No production deployment or ops mutation is claimed by this fixture.",
    publishedAt: "2026-09-05T03:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE]
  },
  {
    slug: "gate-entry-guide",
    category: "guides",
    title: "Vào Cổng Linh đúng kỳ vọng",
    summary: "Guide giúp người chơi mới đọc Cổng Linh như điểm vào thế giới, gặp Người Giữ Cổng và chuyển sang Đá Luyện mà không hiểu nhầm thành bản đồ live hoặc nhiệm vụ thật.",
    body: "Nội dung này chỉ mô tả flow công khai hiện tại của web: vào cổng, hiểu vai trò Gate Keeper, xem Training Stone và đọc trạng thái tải game. Nó không công bố wiki nhiệm vụ, combat, phần thưởng hoặc dữ liệu backend vận hành.",
    publishedAt: "2026-09-05T04:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "beginner-training-loop-guide",
    category: "guides",
    title: "Vòng luyện tập nhập môn",
    summary: "Guide giúp người chơi mới đi qua vòng luyện tập hiện tại: vào thế giới, gặp Gate Keeper, đọc vai trò Training Stone và biết nên kiểm tra trạng thái tải game ở đâu.",
    body: "Đây là hướng dẫn public tĩnh cho flow non-combat đang hiển thị trên web. Nó không công bố quest persistence, sát thương, phần thưởng, inventory, kinh tế hoặc backend tiến trình thật.",
    publishedAt: "2026-09-05T08:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "download-readiness-guide",
    category: "guides",
    title: "Sẵn sàng tải game đúng bằng chứng",
    summary: "Guide giúp người chơi hiểu vì sao link tải thật cần gói build, checksum, ghi chú phát hành, known limitations và owner approval trước khi xuất hiện trên web.",
    body: "Đây là hướng dẫn public tĩnh cho cổng tải game. Nó không tạo launcher giả, entitlement, open registration, account gate hoặc lời hứa phát hành production khi artifact chưa được duyệt.",
    publishedAt: "2026-09-05T11:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "support-and-community-guide",
    category: "guides",
    title: "Hỗ trợ và cộng đồng đúng kỳ vọng",
    summary: "Guide giúp người chơi hiểu support hiện là hướng dẫn tĩnh, feedback cần đúng phạm vi, còn ticket, moderation, chat, guild và forum live vẫn bị khóa bởi backend contract.",
    body: "Nội dung này chuẩn bị kỳ vọng cho cộng đồng trước closed test: đọc FAQ, gửi phản hồi an toàn, theo dõi roadmap/status và không hiểu nhầm web thành hệ thống hỗ trợ hoặc cộng đồng live.",
    publishedAt: "2026-09-05T11:20:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "release-trust-and-checksum-guide",
    category: "guides",
    title: "Tin cậy phát hành và checksum",
    summary: "Guide giúp người chơi hiểu vì sao mọi link tải phải đi kèm gói build thật, checksum, nguồn gốc file, giới hạn đã biết và phê duyệt chủ sở hữu.",
    body: "Nội dung này biến tin cậy phát hành thành flow đọc công khai: kiểm file build, đối chiếu checksum, đọc nguồn gốc/giới hạn và chỉ tin CTA tải khi chủ sở hữu đã duyệt đủ bằng chứng.",
    publishedAt: "2026-09-05T12:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "community-roadmap-onboarding-started",
    category: "news",
    title: "Onboarding cộng đồng và roadmap rõ hơn",
    summary: "WEB v1.11 nối homepage, community, roadmap, support và staged release messaging để người chơi biết đi đâu và kỳ vọng gì.",
    body: "Bản cập nhật public web này tập trung vào hành trình người chơi mới: đọc thế giới, kiểm tra download trust, xem roadmap gates và hiểu cách gửi phản hồi khi cộng đồng vẫn là hướng dẫn tĩnh.",
    publishedAt: "2026-09-05T13:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "community-roadmap-onboarding-guide",
    category: "guides",
    title: "Lộ trình cộng đồng đúng kỳ vọng",
    summary: "Guide giúp người chơi mới hiểu trạng thái, lộ trình, phản hồi và phát hành theo giai đoạn mà không nhầm với diễn đàn live hoặc cổng tài khoản.",
    body: "Đi theo thứ tự: đọc Trạng thái chơi và Tin cậy tải game, xem các mốc quyết định trên lộ trình, hiểu cộng đồng hiện là hướng dẫn tĩnh, rồi chờ thông báo chủ sở hữu trước khi tham gia test.",
    publishedAt: "2026-09-05T13:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "content-ia-hub-polish-started",
    category: "news",
    title: "Content hub và lộ trình đọc được làm rõ",
    summary: "WEB v1.12 gom các trang quan trọng thành trang Bắt đầu để người chơi mới biết đọc gì trước, đi đâu tiếp và không hiểu nhầm trạng thái release.",
    body: "Bản cập nhật này tập trung vào information architecture của public website: trang Bắt đầu, nhóm route theo nhu cầu, câu hỏi người chơi mới và đường dẫn tới guide/news/download/status/community. Kiểm tra trình duyệt chỉ là bằng chứng layout, không phải lời hứa vận hành backend.",
    publishedAt: "2026-09-05T14:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "start-here-content-hub-guide",
    category: "guides",
    title: "Bắt đầu đọc web Linh Giới",
    summary: "Guide giúp người chơi mới dùng trang Bắt đầu để chọn đúng hướng đọc: thế giới, tin cậy tải game, lộ trình, trạng thái, hỗ trợ hoặc cộng đồng.",
    body: "Hãy bắt đầu từ /start, chọn mục tiêu đọc rõ ràng, rồi kiểm tra ranh giới trước khi kỳ vọng phát hành, tài khoản hoặc backend thật.",
    publishedAt: "2026-09-05T14:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "world-gameplay-loop-depth-started",
    category: "news",
    title: "World loop và kỳ vọng gameplay rõ hơn",
    summary: "WEB v1.13 làm rõ hành trình Spirit Gate, Gate Keeper, Training Stone, route đọc tiếp và ranh giới gameplay để người chơi không nhầm nội dung web với combat release.",
    body: "Bản cập nhật này tập trung vào nội dung game public: vòng lặp người chơi mới, kỳ vọng hiện tại, đường nối từ guide sang world và ranh giới phạm vi trước khi có combat, economy hoặc backend contract thật.",
    publishedAt: "2026-09-05T15:20:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "world-gameplay-loop-guide",
    category: "guides",
    title: "Vòng lặp thế giới nhập môn",
    summary: "Guide giúp người chơi hiểu vòng đọc hiện tại: vào Cổng Linh, gặp Người Gác Cổng, tương tác Đá Luyện Tập, rồi kiểm trạng thái tải game và phản hồi đúng phạm vi.",
    body: "Đi theo /game/loop để hiểu cảm giác gameplay đang được mô tả. Đây là hướng dẫn công khai tĩnh, không phải cơ sở dữ liệu nhiệm vụ, hướng dẫn chiến đấu thật hoặc hệ thống tiến trình vận hành.",
    publishedAt: "2026-09-05T15:25:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "player-safety-support-faq-polish-started",
    category: "news",
    title: "FAQ an toàn và hỗ trợ rõ hơn",
    summary: "WEB v1.14 tập trung vào wording an toàn người chơi, chất lượng FAQ hỗ trợ, báo lỗi an toàn dữ liệu và kỳ vọng hỗ trợ thử nghiệm.",
    body: "WEB v1.14 giữ trọng tâm ở website public. Slice này thêm hub an toàn/hỗ trợ, hướng dẫn báo lỗi an toàn dữ liệu, kỳ vọng hỗ trợ thử nghiệm và ranh giới cộng đồng mà không tuyên bố có ticket hỗ trợ trực tiếp, tra cứu account, dashboard điều phối hoặc tích hợp backend.",
    publishedAt: "2026-09-05T14:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "player-safety-support-guide",
    category: "guides",
    title: "An toàn và hỗ trợ cho người chơi mới",
    summary: "Guide giúp người chơi đọc FAQ hỗ trợ, chuẩn bị báo lỗi an toàn, hiểu phạm vi hỗ trợ thử nghiệm và tránh gửi thông tin nhạy cảm khi chưa có backend thật.",
    body: "Hãy đi theo luồng Hỗ trợ → Báo lỗi an toàn → Cộng đồng → Trạng thái trước khi kỳ vọng ticket live, tra cứu tài khoản hoặc moderation vận hành.",
    publishedAt: "2026-09-05T14:05:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "accessibility-readability-polish-started",
    category: "news",
    title: "Dễ đọc và dễ tiếp cận hơn",
    summary: "WEB v1.15 làm rõ tiêu đề, nhịp đọc mobile, thứ tự focus và độ thoải mái khi đọc các route public.",
    body: "WEB v1.15 tiếp tục hoàn thiện website public thật. Slice này gom hướng dẫn dễ đọc, mốc quét nội dung theo route, quy tắc đọc trên mobile và kỳ vọng focus order mà không tuyên bố audit WCAG chính thức, pháp lý accessibility, hỗ trợ production hoặc tích hợp backend.",
    publishedAt: "2026-09-05T21:00:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "accessibility-readability-guide",
    category: "guides",
    title: "Đọc web Linh Giới dễ hơn",
    summary: "Guide giúp người chơi dùng tiêu đề, trang Bắt đầu, skip link, thẻ mobile và ranh giới an toàn/tải game để đọc nhanh hơn.",
    body: "Bắt đầu từ trang Bắt đầu hoặc trang Dễ đọc, quét tiêu đề từng route, ưu tiên CTA đầu trang và đọc ranh giới trước khi kỳ vọng tải game, tài khoản, chiến đấu hoặc hỗ trợ live.",
    publishedAt: "2026-09-05T21:05:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "performance-copy-asset-budget-polish-started",
    category: "news",
    title: "Web nhẹ và rõ hơn",
    summary: "WEB v1.16 làm route public dễ đọc hơn bằng ngân sách chữ gọn, hiệu ứng CSS nhẹ, cấu trúc tĩnh và kỳ vọng tải trang rõ cho người chơi.",
    body: "WEB v1.16 giữ trọng tâm ở public web thật. Slice này làm rõ ngân sách nội dung, giới hạn hiệu ứng, nhịp card tĩnh và cảm nhận tải trang mà không tuyên bố điểm Web Vitals production, giám sát vận hành, phát hành CDN, chứng nhận phân tích bundle hoặc tích hợp CDN ảnh.",
    publishedAt: "2026-09-05T21:40:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "performance-copy-budget-guide",
    category: "guides",
    title: "Giữ web nhẹ và rõ",
    summary: "Guide giúp người chơi và reviewer hiểu vì sao web dùng nội dung ngắn, hiệu ứng CSS nhẹ, route tĩnh và ranh giới rõ cạnh CTA nhạy cảm.",
    body: "Đọc trang Hiệu năng để hiểu cách public web giữ route nhẹ, thẻ dễ quét, visual không phụ thuộc ảnh nặng và trạng thái tải game không bị trình bày như đã sẵn sàng phát hành.",
    publishedAt: "2026-09-05T21:45:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "route-continuity-conversion-polish-started",
    category: "news",
    title: "Route tiếp theo rõ và an toàn hơn",
    summary: "WEB v1.17 nối các route public thành hành trình an toàn: Bắt đầu, vòng lặp thế giới, tin cậy tải game, trạng thái, hỗ trợ an toàn và hiệu năng đều dẫn đúng bước tiếp.",
    body: "WEB v1.17 cải thiện nhịp nối giữa các page, thứ bậc CTA và bước đọc an toàn để người chơi biết nên xem gì tiếp theo mà không hiểu nhầm thành luồng tải game, tài khoản, hỗ trợ live, giao dịch hoặc backend vận hành thật.",
    publishedAt: "2026-09-05T22:05:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "route-continuity-conversion-guide",
    category: "guides",
    title: "Đi tiếp đúng luồng đọc",
    summary: "Guide giúp người chơi đi theo Bắt đầu → Vòng lặp thế giới → Tin cậy tải game → Trạng thái → Hỗ trợ mà không hiểu nhầm CTA thành quyền tải, tài khoản hoặc hỗ trợ live.",
    body: "Dùng guide này để biết CTA nào chỉ là đường đọc tiếp, CTA nào phải chờ artifact, backend hoặc owner gate. Đây là hướng dẫn public tĩnh, không phải conversion funnel production.",
    publishedAt: "2026-09-05T22:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "player-trust-release-narrative-started",
    category: "news",
    title: "Niềm tin phát hành rõ ràng hơn",
    summary: "WEB v1.18 giải thích lộ trình nội dung sẵn sàng → chuẩn bị kiểm thử giới hạn → ứng viên tải công khai mà không tuyên bố hệ thống phát hành production.",
    body: "WEB v1.18 làm rõ tín hiệu niềm tin, giai đoạn phát hành và điểm kiểm chứng để người chơi biết hôm nay có gì thật, cần bằng chứng gì tiếp theo và tuyên bố nào vẫn bị chặn.",
    publishedAt: "2026-09-05T16:30:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "player-trust-release-guide",
    category: "guides",
    title: "Tin cậy trước khi chờ bản test",
    summary: "Guide giúp người chơi đọc đúng lộ trình content-ready → chuẩn bị closed test → kiểm chứng tải game → trạng thái hỗ trợ mà không hiểu nhầm thành bản phát hành công khai.",
    body: "Bắt đầu từ trang Phát hành, sau đó kiểm Tin cậy tải game, Trạng thái và Hỗ trợ an toàn. Guide này chỉ là nội dung public tĩnh, không mở quyền tải, đăng ký test, ticket support hoặc cam kết production.",
    publishedAt: "2026-09-05T16:35:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "release-readiness-hub-polish-started",
    category: "news",
    title: "Hub sẵn sàng phát hành rõ ràng hơn",
    summary: "WEB v1.19 gom cổng phê duyệt, kỳ vọng kiểm thử và sự đồng bộ Tải game · Trạng thái · Hỗ trợ vào một hub sẵn sàng riêng.",
    body: "WEB v1.19 làm rõ /release/readiness để người chơi và reviewer thấy cổng nào công khai, cổng nào nội bộ hoặc bị chặn trước khi tải game, kiểm thử, hỗ trợ hay CTA cộng đồng được xem là thật.",
    publishedAt: "2026-09-05T23:05:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "release-readiness-hub-guide",
    category: "guides",
    title: "Kiểm sẵn sàng trước lời mời test",
    summary: "Guide giúp người chơi đọc đúng cổng phát hành, phê duyệt, kỳ vọng kiểm thử và liên kết Tải game · Trạng thái · Hỗ trợ trước khi chờ bản test.",
    body: "Bắt đầu từ trang Sẵn sàng phát hành để xem cổng nào đã có bằng chứng, cổng nào còn chờ hoặc bị khóa và vì sao tải game hoặc closed test chưa được xác nhận khi artifact, checksum, kênh hỗ trợ và phê duyệt còn thiếu.",
    publishedAt: "2026-09-05T23:10:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "closed-tester-information-pack-guide",
    category: "guides",
    title: "Chuẩn bị gói thông tin closed tester",
    summary: "Guide giúp người chơi đọc checklist tester, mẫu feedback an toàn, giới hạn đã biết và thông tin thiết bị cần chuẩn bị mà không hiểu nhầm thành form đăng ký.",
    body: "Bắt đầu từ gói thông tin tester để biết nên ghi nhận bước tái hiện, mức độ lỗi, thiết bị và giới hạn hiện tại như thế nào. Trang này là nội dung public tĩnh, không mở đăng ký, không cấp quyền test và không thu mật khẩu, token hoặc dữ liệu nhạy cảm.",
    publishedAt: "2026-09-05T23:05:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },


  {
    slug: "faq-search-helpfulness-polish-started",
    category: "news",
    title: "FAQ dễ tìm và hữu ích hơn",
    summary: "WEB v1.21 giúp người chơi tìm FAQ đúng nhóm, hiểu bước tiếp theo và nhận hỗ trợ tĩnh rõ ràng mà không tạo backend tìm kiếm giả.",
    body: "WEB v1.21 làm rõ /support/help, nhóm câu hỏi theo nhu cầu người chơi, giải thích route theo loại vấn đề và nhắc rằng tìm kiếm hiện chỉ là chỉ dẫn tĩnh cho đến khi có hợp đồng backend tìm kiếm được chấp nhận.",
    publishedAt: "2026-09-05T23:55:00.000Z",
    status: "published",
    featured: true,
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },
  {
    slug: "faq-search-helpfulness-guide",
    category: "guides",
    title: "Tìm FAQ đúng nhóm và gửi feedback hữu ích",
    summary: "Guide giúp người chơi tìm câu trả lời theo nhóm vấn đề, chọn route hỗ trợ đúng và gửi feedback cải thiện FAQ mà không phụ thuộc backend tìm kiếm.",
    body: "Bắt đầu từ /support/help để chọn nhóm câu hỏi: tải game, phát hành, an toàn, gói tester, hiệu năng hoặc ranh giới tài khoản/backend. Guide này là chỉ dẫn tĩnh, không bật tìm kiếm trực tuyến, chatbot hỗ trợ, tuyến phiếu hỗ trợ hoặc tra cứu tài khoản.",
    publishedAt: "2026-09-05T23:58:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE, NOT_CANONICAL_BACKEND_CONTRACT]
  },

  {
    slug: "spirit-festival-event-placeholder",
    category: "events",
    title: "Lễ hội Linh Khí",
    summary: "Thông báo định hướng cộng đồng về một lễ hội Linh Khí tương lai; chưa có lịch live, đăng ký tham gia, phần thưởng hoặc bộ lập lịch backend.",
    body: "Đây là fixture công khai để người chơi hiểu chủ đề sự kiện có thể xuất hiện sau này. Nội dung này không phải lịch vận hành live hoặc hợp đồng backend được chấp nhận.",
    publishedAt: "2026-09-05T05:00:00.000Z",
    status: "published",
    tags: [PROVISIONAL_WEB_FIXTURE]
  }
];

export const contentDetailSections: ContentDetailSection[] = [
  {
    slug: "news-guide-detail-pages-started",
    heading: "Detail page giải thích sâu hơn summary",
    body: "Bài viết này ghi lại lý do các trang tin và guide cần có section chi tiết, tác động với người chơi và ranh giới không tuyên bố quá phạm vi ngay trong page thật.",
    playerImpact: "Người chơi không chỉ đọc tiêu đề; họ thấy nên đọc route nào tiếp theo và vì sao chưa có backend, CMS hoặc hỗ trợ live.",
    nonClaim: "Không mở CMS, không có workflow biên tập backend và không có dữ liệu live support."
  },
  {
    slug: "news-guide-detail-pages-started",
    heading: "News, guide, status và download phải cùng nhịp đọc",
    body: "News detail dùng chung hero, detail cards, related news và next-step CTA để liên kết các route public mà không biến nội dung thành log kỹ thuật.",
    playerImpact: "Người chơi chuyển từ tin tức sang hướng dẫn, trạng thái hoặc tải game với cùng một rhythm UI trên desktop/mobile.",
    nonClaim: "Không công bố artifact tải game, không mở xác thực vận hành chính thức và không tạo quyền tải game."
  },

  {
    slug: "public-game-info-depth-started",
    heading: "Thông tin game public nối lore với hành trình người mới",
    body: "Bài viết này giải thích vì sao lore, lớp nhân vật, hướng dẫn nhập môn, trạng thái tải và hỗ trợ phải được trình bày như một hành trình đọc chung thay vì các mảnh fixture rời rạc.",
    playerImpact: "Người chơi hiểu trước bối cảnh Linh Giới, biết đọc route nào tiếp theo và không nhầm nội dung giới thiệu với dữ liệu gameplay production thật.",
    nonClaim: "Không công bố cơ sở dữ liệu nhiệm vụ, chỉ số nhân vật, tài khoản thật hoặc dữ liệu server vận hành thật."
  },
  {
    slug: "public-game-info-depth-started",
    heading: "Readiness cộng đồng phải giữ ranh giới web public",
    body: "Thông tin game public có thể chuẩn bị kỳ vọng cộng đồng, nhưng mọi CTA tải game, hỗ trợ và trạng thái vẫn phải nói rõ khi nào chỉ là nội dung tĩnh.",
    playerImpact: "Người chơi thấy cùng nhịp đọc với các bài tin chi tiết khác, có tin liên quan và bước tiếp theo mà không bị dẫn tới đăng ký hoặc download giả.",
    nonClaim: "Không mở tải game, không mở xác thực vận hành chính thức, không có CMS và không tích hợp backend vận hành thật."
  },

  {
    slug: "visual-responsive-polish-started",
    heading: "Thứ bậc thị giác giúp người chơi đọc đúng trọng tâm",
    body: "Slice này đặt lại nhịp hero, card và CTA để thông tin game, trạng thái tải và hỗ trợ dễ quét hơn trên first-fold mà không biến trang tin thành log kỹ thuật.",
    playerImpact: "Người chơi nhìn thấy nội dung quan trọng trước, hiểu trạng thái web public và không bị lẫn giữa polish giao diện với readiness production.",
    nonClaim: "Không tuyên bố vận hành chính thức, không có CMS, không có DB và không có backend live."
  },
  {
    slug: "visual-responsive-polish-started",
    heading: "Responsive polish phải giữ cùng shell public",
    body: "Trang detail dùng lại header, menu, footer, card rhythm và related-news flow chung để desktop/mobile cùng một trải nghiệm đọc, chỉ khác mật độ phù hợp màn hình.",
    playerImpact: "Người chơi trên mobile vẫn đọc được bài, related news và bước tiếp theo trong một cột rõ ràng, không bị phình font hoặc tràn ngang.",
    nonClaim: "Không dùng e2e, ảnh chụp hoặc validator để thay thế việc hoàn thiện layout thật trong trình duyệt."
  },

  {
    slug: "public-ux-content-polish-started",
    heading: "UX public chuyển từ danh sách thô sang hành trình đọc",
    body: "Slice v1.6 gom các điểm người chơi cần đọc trước: trang chủ, thông tin game, roadmap, tải game và hỗ trợ. Mục tiêu là giúp người mới hiểu trạng thái dự án mà không bị dẫn sang claim backend hoặc download thật.",
    playerImpact: "Người chơi có thể đi từ tin tức sang các route cốt lõi theo thứ tự dễ hiểu, thay vì gặp danh sách fixture hoặc CTA mơ hồ.",
    nonClaim: "Không có xác thực production, không có DB, không có CMS và không tích hợp backend vận hành thật."
  },
  {
    slug: "public-ux-content-polish-started",
    heading: "Nội dung public phải đồng bộ với shell và menu chung",
    body: "Bài viết này giữ cùng header, menu, footer và rhythm card của news detail để người đọc thấy đây là một phần của official web, không phải ghi chú kỹ thuật rời rạc.",
    playerImpact: "Người chơi đọc được ranh giới sản phẩm ngay trên page thật, với spacing, font và related-news flow nhất quán trên desktop/mobile.",
    nonClaim: "Không xem dịch chữ, chỉ sửa design hoặc chỉ chạy validator là hoàn thiện UI/UX Layout."
  },
  {
    slug: "closed-tester-information-pack-started",
    heading: "Gói người kiểm thử là hướng dẫn, không phải kênh đăng ký",
    body: "v1.20 gom danh sách chuẩn bị, mẫu góp ý an toàn, giới hạn đã biết và mẫu báo cáo thiết bị vào một route public để chuẩn bị truyền thông kiểm thử giới hạn trước khi kênh chính thức tồn tại.",
    playerImpact: "Người chơi biết nên đọc gì và tránh gửi gì trước khi có thông báo kiểm thử chính thức.",
    nonClaim: "Không mở kênh đăng ký trực tiếp, không bảo đảm suất kiểm thử và không mở đăng ký công khai."
  },
  {
    slug: "closed-tester-information-pack-started",
    heading: "Ranh giới riêng tư được đặt cạnh phần góp ý",
    body: "Các trường góp ý chỉ yêu cầu mô tả route, bước tái hiện, kết quả mong đợi/thực tế và nhóm thiết bị an toàn; nội dung public không yêu cầu bí mật hoặc dữ liệu nhạy cảm.",
    playerImpact: "Góp ý tương lai dễ phân loại hơn mà không tạo cảm giác phải chia sẻ tài khoản hoặc mã bảo mật.",
    nonClaim: "Không thu mật khẩu, mã bảo mật, dữ liệu thanh toán hoặc dữ liệu cá nhân nhạy cảm."
  },
  {
    slug: "faq-search-helpfulness-polish-started",
    heading: "FAQ được nhóm theo nhu cầu người chơi",
    body: "WEB v1.21 gom câu hỏi theo mục tiêu như tải game, phát hành, an toàn, gói kiểm thử, hiệu năng và ranh giới tài khoản để người chơi chọn đúng nhánh đọc.",
    playerImpact: "Người chơi không phải đoán từ khóa kỹ thuật; họ đi thẳng tới nhóm câu hỏi phù hợp với vấn đề đang gặp.",
    nonClaim: "Không có backend tìm kiếm, hộp chat tự động hoặc tra cứu tài khoản thật."
  },
  {
    slug: "faq-search-helpfulness-polish-started",
    heading: "Bước tiếp theo hữu ích nhưng không giả hệ thống hỗ trợ",
    body: "Trang hỗ trợ giải thích route theo loại vấn đề và giữ CTA ở mức đọc tiếp, trạng thái hoặc hướng dẫn an toàn cho đến khi có hợp đồng hỗ trợ thật.",
    playerImpact: "Người chơi thấy nên đọc gì tiếp theo mà không hiểu nhầm thành phiếu hỗ trợ, hộp chat hoặc cam kết phản hồi production.",
    nonClaim: "Không có tuyến phiếu hỗ trợ, không có hộp chat live và không có SLA hỗ trợ production."
  },
  {
    slug: "release-readiness-hub-polish-started",
    heading: "Hub sẵn sàng phát hành gom các cổng quan trọng về một chỗ",
    body: "WEB v1.19 thêm /release/readiness để người chơi thấy rõ cổng phê duyệt, kỳ vọng kiểm thử và sự đồng bộ giữa Tải game, Trạng thái, Hỗ trợ trước khi có bản tải công khai.",
    playerImpact: "Người chơi không bị dẫn từ câu chuyện phát hành sang tải game hoặc kiểm thử khi còn thiếu điều kiện chứng minh.",
    nonClaim: "Không có bản tải công khai, không mở beta công khai và không tự động cấp quyền."
  },
  {
    slug: "release-readiness-hub-polish-started",
    heading: "Tải game, Trạng thái và Hỗ trợ phải cùng nói một sự thật",
    body: "Hub sẵn sàng phát hành làm rõ mỗi bề mặt cần nói gì, dẫn tới đâu và mâu thuẫn nào phải tránh trước khi mở kỳ vọng kiểm thử.",
    playerImpact: "Người chơi hiểu điểm chặn tại đúng route thay vì suy diễn từ CTA hoặc guardrail build.",
    nonClaim: "Không có phiếu hỗ trợ giả, không có checksum giữ chỗ và không tuyên bố sẵn sàng phát hành."
  },
  {
    slug: "route-continuity-conversion-polish-started",
    heading: "Route continuity biến menu dài thành hành trình đọc có thứ tự",
    body: "WEB v1.17 nối Bắt đầu, vòng lặp thế giới, tin cậy tải game, trạng thái, hỗ trợ an toàn, cộng đồng, dễ đọc và hiệu năng bằng thứ bậc CTA rõ hơn.",
    playerImpact: "Người chơi mới biết nên đọc gì tiếp theo và vì sao chưa nên kỳ vọng tải game, tài khoản hoặc hỗ trợ live thật.",
    nonClaim: "Không có luồng chuyển đổi giả, không có artifact public và không có backend tài khoản/hỗ trợ."
  },
  {
    slug: "route-continuity-conversion-polish-started",
    heading: "Bước tiếp an toàn nghĩa là không hứa nhầm",
    body: "CTA vẫn cần rõ, nhưng mỗi CTA nhạy cảm phải mở thông tin, trạng thái và bằng chứng tin cậy trước khi có hành động phát hành thật.",
    playerImpact: "Tải game, hỗ trợ và cộng đồng không còn giống lời hứa production; chúng trở thành các bước hiểu trạng thái hiện tại.",
    nonClaim: "Không có quyền tải, giao dịch, launcher, hộp thư bảo mật hoặc moderation live."
  },
  {
    slug: "content-ia-hub-polish-started",
    heading: "Trang Bắt đầu biến website thành hành trình đọc có thứ tự",
    body: "WEB v1.12 thêm một hub trung tâm để người chơi mới chọn mục tiêu: hiểu game, kiểm tra tải game, xem roadmap, đọc guide hoặc biết cách góp ý.",
    playerImpact: "Người chơi không phải đoán nên đọc News, Guides, Download hay Status trước; mỗi nhóm route có mục đích và boundary rõ.",
    nonClaim: "Không có CMS, không cá nhân hóa live và không có recommendation backend theo tài khoản."
  },
  {
    slug: "content-ia-hub-polish-started",
    heading: "Route được nhóm theo câu hỏi người chơi mới",
    body: "Hub gom các lối đọc như hiểu game, đọc hướng dẫn, kiểm tra tải game, xem trạng thái và theo dõi cộng đồng để CTA dẫn tới thông tin đúng trước khi có hành động release thật.",
    playerImpact: "Người chơi thấy bước tiếp theo an toàn ngay trong bài viết, thay vì nhảy vào download, portal hoặc support khi các phần đó chưa có contract thật.",
    nonClaim: "Không có CMS, không có feed live, không có portal account và không có backend gợi ý cá nhân."
  },
  {
    slug: "community-roadmap-onboarding-started",
    heading: "Onboarding cộng đồng nối các trang public",
    body: "Homepage, Community, Roadmap, Support, Status và Download trust được kết nối thành một hành trình đọc có thứ tự thay vì các trang rời rạc.",
    playerImpact: "Người chơi biết đọc gì trước, hiểu điều kiện test/download và không nhầm roadmap với lời hứa release.",
    nonClaim: "Không có community backend live, không có waitlist giả và không có tài khoản production."
  },
  {
    slug: "community-roadmap-onboarding-started",
    heading: "Thông điệp phát hành theo giai đoạn giữ kỳ vọng an toàn",
    body: "Mỗi stage nói rõ public/internal/blocked để tách content-ready, artifact-ready và backend-connected readiness.",
    playerImpact: "Người chơi thấy trạng thái thật thay vì bị dẫn tới download hoặc portal chưa tồn tại.",
    nonClaim: "Không có artifact tải game public, không có entitlement portal và không có CMS."
  },
  {
    slug: "web-program-control-tower",
    heading: "Vì sao web repo đứng độc lập?",
    body: "Trang tin này giải thích rằng website là lớp public/player-facing riêng, không được sao chép game source hoặc tự dựng backend thay game server canonical.",
    playerImpact: "Người đọc hiểu vì sao web có thể phát triển nhanh nhưng vẫn không hứa tính năng account, DB hoặc portal thật.",
    nonClaim: "Không có backend độc lập, không có xác thực production, không có lưu trữ DB."
  },
  {
    slug: "web-program-control-tower",
    heading: "Control tower giữ header, footer, menu và workflow thống nhất",
    body: "Governance web yêu cầu mỗi page đi theo shell public đã chấp nhận, dùng Base First cho layout lặp lại và chỉ sửa design target vừa đủ khi nó lệch UI chung.",
    playerImpact: "Người chơi thấy cùng một header, menu, footer và nhịp đọc trên các trang public thay vì mỗi route một kiểu trình bày.",
    nonClaim: "Không tính tiến độ design-only, không sao chép game backend, không tạo owner component trùng lặp."
  },
  {
    slug: "status-download-trust-polish-started",
    heading: "Download trust không phải marketing CTA",
    body: "WEB v1.10 làm rõ rằng nút tải chỉ được xuất hiện khi artifact, checksum, nguồn phát hành, giới hạn và owner approval đều tồn tại.",
    playerImpact: "Người chơi biết trang Download đáng tin vì nó nói thật về blocker thay vì giấu sau lời mời tải giả.",
    nonClaim: "Không có artifact tải game public, không có triển khai production và không có backend cấp quyền tải."
  },
  {
    slug: "status-download-trust-polish-started",
    heading: "Status cần phân biệt public, internal và blocked",
    body: "Trang trạng thái không gom browser guardrail với readiness phát hành; mỗi surface cần nguồn xác thực và claim bị chặn riêng.",
    playerImpact: "Người đọc hiểu cái gì đang public, cái gì chỉ là kiểm thử nội bộ, và cái gì bị chặn bởi backend hoặc artifact phát hành.",
    nonClaim: "Browser/e2e chỉ là bằng chứng guardrail, không phải readiness phát hành public."
  },
  {
    slug: "player-safety-support-faq-polish-started",
    heading: "FAQ an toàn đặt ranh giới hỗ trợ trước kỳ vọng ticket",
    body: "WEB v1.14 gom các câu hỏi về báo lỗi an toàn, dữ liệu riêng tư, hỗ trợ thử nghiệm và kênh cộng đồng thành một luồng đọc rõ cho người chơi mới.",
    playerImpact: "Người chơi biết cách chuẩn bị mô tả lỗi và che dữ liệu nhạy cảm trước khi có kênh hỗ trợ vận hành thật.",
    nonClaim: "Không có ticket hỗ trợ trực tiếp, không tra cứu account, không có dashboard điều phối và không có tích hợp backend."
  },
  {
    slug: "player-safety-support-faq-polish-started",
    heading: "Hỗ trợ thử nghiệm nói rõ điều gì đang bị chặn",
    body: "Bài viết nối Support, Support Safety, Status và Download Trust để người chơi hiểu hỗ trợ hiện là hướng dẫn public tĩnh, không phải hệ thống xử lý yêu cầu thật.",
    playerImpact: "Người chơi không gửi nhầm thông tin cá nhân hoặc kỳ vọng phản hồi SLA khi chưa có owner-approved support channel.",
    nonClaim: "Không có hộp thư bảo mật, không có live moderation, không có SLA production và không có quyền tải game."
  },
  {
    slug: "accessibility-readability-polish-started",
    heading: "Nhịp đọc ưu tiên tiêu đề, khoảng thở và focus",
    body: "Bài viết gom heading rõ, đoạn ngắn, thứ tự tab và CTA dễ quét để người chơi đọc được nội dung public mà không bị đẩy vào trang quá dài hoặc chữ quá dày.",
    playerImpact: "Người chơi mới có thể quét hero, detail cards, tin liên quan và bước tiếp theo trên desktop/mobile mà không mất phương hướng.",
    nonClaim: "Không tuyên bố audit WCAG chính thức, chứng nhận pháp lý accessibility, production SLA hoặc hỗ trợ backend."
  },
  {
    slug: "accessibility-readability-polish-started",
    heading: "Mobile và keyboard giữ cùng một đường đọc",
    body: "Luồng đọc nối Start, Accessibility, Guides và News bằng cùng shell public, focus state rõ và density card gọn để mỗi route giữ cấu trúc quen thuộc.",
    playerImpact: "Người chơi dùng mobile hoặc bàn phím vẫn thấy header, menu, footer, hero và các card theo cùng nhịp UI đã được chấp nhận.",
    nonClaim: "Không mở tính năng tài khoản, không kiểm thử thiết bị hỗ trợ chính thức và không thay thế kiểm định accessibility chuyên sâu."
  },
  {
    slug: "performance-copy-asset-budget-polish-started",
    heading: "Ngân sách chữ giữ route nhẹ và dễ quét",
    body: "Bài viết gom copy ngắn, detail cards gọn và CTA rõ để người chơi hiểu trạng thái public mà không phải đọc một trang dài như log kỹ thuật.",
    playerImpact: "Người chơi thấy nội dung chính ngay trong first-fold, đọc tiếp bằng card liên quan và không nhầm kiểm chứng hiệu năng bằng trình duyệt với cam kết vận hành production.",
    nonClaim: "Không tuyên bố điểm Web Vitals production, giám sát vận hành, phát hành CDN, chứng nhận phân tích bundle hoặc tích hợp CDN ảnh."
  },
  {
    slug: "performance-copy-asset-budget-polish-started",
    heading: "Hiệu ứng và asset giữ vai trò nền, không lấn nội dung",
    body: "Layout ưu tiên shell public, typography gọn, card density ổn định và hiệu ứng nhẹ để các route tin tức giữ cùng nhịp đọc trên desktop/mobile.",
    playerImpact: "Người chơi dùng máy yếu hoặc mobile vẫn thấy tiêu đề, ranh giới, tin liên quan và bước tiếp theo mà không bị hình ảnh nặng che mất nội dung.",
    nonClaim: "Không có đo đạc RUM production, không có pipeline CDN, không có ngân sách CI production và không có quyền tải game."
  },
  {
    slug: "world-gameplay-loop-depth-started",
    heading: "Gameplay loop được mô tả theo cảm giác người chơi, không theo log tooling",
    body: "WEB v1.13 diễn giải hành trình từ Spirit Gate tới Gate Keeper và Training Stone như một vòng đọc, hiểu và chuẩn bị phản hồi cho người mới.",
    playerImpact: "Người chơi hiểu bước hiện tại là giải thích vòng lặp thế giới có hướng dẫn, chưa phải phát hành chiến đấu, kinh tế hoặc dịch vụ MMO live.",
    nonClaim: "Không có sát thương chiến đấu, máu nhân vật, vật phẩm rơi, túi đồ/kinh tế, cơ sở dữ liệu nhiệm vụ hoặc claim máy chủ thế giới live."
  },
  {
    slug: "world-gameplay-loop-depth-started",
    heading: "Route-level copy nối guide, world và trust pages",
    body: "Start, Game, Guides, Download Trust, Status và Support được nối bằng nội dung giải thích vòng lặp và boundary để người chơi biết đọc gì tiếp theo.",
    playerImpact: "Người mới không bị đưa thẳng tới tải game hoặc tài khoản; họ đi qua world loop, guide và release trust trước.",
    nonClaim: "Không có CTA tải game giả, không có xác thực vận hành và không có hệ thống gợi ý backend."
  },
  {
    slug: "player-trust-release-narrative-started",
    heading: "Lộ trình phát hành giải thích giai đoạn, không quảng cáo launch",
    body: "WEB v1.18 thêm /release để nói rõ nội dung web sẵn sàng khác với chuẩn bị kiểm thử giới hạn và ứng viên tải công khai.",
    playerImpact: "Người chơi hiểu vì sao website đã có nhiều trang nhưng vẫn chưa có bản tải công khai hoặc quyền tài khoản.",
    nonClaim: "Không có bản tải công khai, không mở beta công khai và không có luồng cấp quyền."
  },
  {
    slug: "player-trust-release-narrative-started",
    heading: "Hành trình tin cậy nối Tải game, Trạng thái và Hỗ trợ",
    body: "Hub phát hành dẫn người chơi qua Tin cậy tải game, Trạng thái và Hỗ trợ an toàn theo thứ tự có bằng chứng trước khi có tuyên bố.",
    playerImpact: "Người chơi không bị ép vào CTA nhạy cảm; họ thấy blocker và bằng chứng cần có ngay trước khi chờ tải game, kiểm thử hoặc hỗ trợ.",
    nonClaim: "Không có tải game giả, không có hộp thư ticket bảo mật và không có SLA production."
  }
];

export const guideDetailSteps: GuideDetailStep[] = [
  {
    slug: "release-readiness-hub-guide",
    step: "01",
    title: "Mở readiness hub trước",
    action: "Đọc trang Sẵn sàng phát hành để xem stage phát hành, cổng phê duyệt và kỳ vọng kiểm thử trước khi tìm tải game hoặc closed test.",
    expectedResult: "Người chơi hiểu website đang chuẩn bị thông điệp phát hành, chưa mở bản build công khai.",
    blockedScope: "Chưa có download công khai, thử nghiệm mở hoặc cấp quyền tự động."
  },
  {
    slug: "release-readiness-hub-guide",
    step: "02",
    title: "Kiểm bằng chứng cổng phê duyệt",
    action: "Đối chiếu artifact, checksum, giới hạn đã biết, kênh hỗ trợ và trạng thái với bảng cổng phê duyệt.",
    expectedResult: "Reviewer biết cổng nào cần bằng chứng trước khi chuyển sang copy cho người kiểm thử.",
    blockedScope: "Chưa có bypass phê duyệt, checksum thật hoặc lời mời test thật."
  },
  {
    slug: "release-readiness-hub-guide",
    step: "03",
    title: "Đọc Tải game · Trạng thái · Hỗ trợ như một bộ",
    action: "Đi qua Tin cậy tải game, Trạng thái và Hỗ trợ an toàn để tránh mâu thuẫn giữa CTA, blocker và kỳ vọng hỗ trợ.",
    expectedResult: "Public copy không hứa bản tải, tài khoản hoặc ticket khi các surface đó còn blocked.",
    blockedScope: "Chưa có SLA hỗ trợ production, tra cứu tài khoản hoặc ticket backend live."
  },
  {
    slug: "release-readiness-hub-guide",
    step: "04",
    title: "Hiểu closed test là stage có điều kiện",
    action: "Đọc kỳ vọng kiểm thử để biết closed test cần phạm vi, giới hạn, đường feedback và phê duyệt riêng.",
    expectedResult: "Người chơi chờ thông báo đúng stage, không hiểu nhầm thành đăng ký mở hoặc launch.",
    blockedScope: "Chưa có đăng ký mở, phần thưởng/kinh tế hoặc phát hành production."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "01",
    title: "Đọc tester pack như checklist chuẩn bị",
    action: "Mở /release/tester-pack để xem checklist, mẫu feedback an toàn, giới hạn đã biết và trường thông tin thiết bị cần chuẩn bị.",
    expectedResult: "Người chơi hiểu đây là hướng dẫn tĩnh, không phải form đăng ký hoặc lời mời test.",
    blockedScope: "Chưa có tiếp nhận tester live, đăng ký mở hoặc tự động cấp quyền."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "02",
    title: "Giữ feedback an toàn",
    action: "Dùng mẫu feedback an toàn: tóm tắt, bước tái hiện, kết quả mong đợi/thực tế và mức độ lỗi gợi ý.",
    expectedResult: "Feedback dễ đọc hơn mà không thu mật khẩu, token, dữ liệu thanh toán hoặc dữ liệu tài khoản riêng.",
    blockedScope: "Chưa có hộp ticket bảo mật, tra cứu tài khoản hoặc backend thu thập."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "03",
    title: "Đối chiếu giới hạn đã biết",
    action: "Đọc ghi chú giới hạn để biết bản build công khai, quyền tester, hỗ trợ và phạm vi gameplay đang ở trạng thái nào.",
    expectedResult: "Tester tương lai không kỳ vọng thử nghiệm mở, phần thưởng/kinh tế hoặc cam kết chiến đấu/thế giới live.",
    blockedScope: "Chưa có bản build công khai, cam kết phần thưởng/kinh tế hoặc thế giới live."
  },
  {
    slug: "closed-tester-information-pack-guide",
    step: "04",
    title: "Quay lại readiness trước mọi CTA",
    action: "Đi từ /release/tester-pack về /release/readiness, /download/trust và /support/safety để kiểm tra cổng nào còn khóa.",
    expectedResult: "Người chơi hiểu cần kênh được owner phê duyệt trước khi gửi feedback thật.",
    blockedScope: "Chưa có bỏ qua phê duyệt owner, suất tester bảo đảm hoặc SLA hỗ trợ production."
  },
  {
    slug: "faq-search-helpfulness-guide",
    step: "01",
    title: "Chọn nhóm câu hỏi trước",
    action: "Mở /support/help và chọn nhóm tải game, phát hành, an toàn, gói tester, hiệu năng hoặc ranh giới tài khoản/backend theo vấn đề đang gặp.",
    expectedResult: "Người chơi đi vào nhóm FAQ đúng ngữ cảnh trước khi bấm CTA hỗ trợ hoặc suy diễn từ một câu hỏi lẻ.",
    blockedScope: "Chưa có tìm kiếm trực tuyến, lập chỉ mục backend hoặc gợi ý cá nhân hóa."
  },
  {
    slug: "faq-search-helpfulness-guide",
    step: "02",
    title: "Đọc route hỗ trợ đúng vấn đề",
    action: "Đi từ câu hỏi tới Hỗ trợ, An toàn, Tin cậy tải game, Trạng thái hoặc Gói tester theo route được gợi ý.",
    expectedResult: "Người chơi hiểu trang nào là nguồn đọc tiếp theo và trang nào chưa phải ticket thật hoặc công cụ tra cứu tài khoản.",
    blockedScope: "Chưa có tuyến phiếu hỗ trợ, chatbot hỗ trợ hoặc tra cứu tài khoản trực tuyến."
  },
  {
    slug: "faq-search-helpfulness-guide",
    step: "03",
    title: "Hiểu search chỉ là hướng dẫn tĩnh",
    action: "Đọc ghi chú không có backend tìm kiếm để biết FAQ hiện là content tĩnh, chưa phải công cụ tìm kiếm sản phẩm.",
    expectedResult: "Người chơi không kỳ vọng autocomplete, ranking cá nhân hoặc kết quả từ dữ liệu tài khoản.",
    blockedScope: "Chưa có backend tìm kiếm, lịch sử người dùng hoặc dữ liệu hỗ trợ production."
  },
  {
    slug: "faq-search-helpfulness-guide",
    step: "04",
    title: "Gửi feedback giúp cải thiện FAQ",
    action: "Khi câu trả lời chưa đủ rõ, gửi feedback theo nhóm vấn đề, route liên quan và nội dung còn thiếu.",
    expectedResult: "Feedback có ích cho nội dung public mà không gửi mật khẩu, token, dữ liệu thanh toán hoặc dữ liệu cá nhân nhạy cảm.",
    blockedScope: "Chưa có tiếp nhận trực tuyến, SLA hỗ trợ production hoặc workflow moderation thật."
  },
  {
    slug: "player-trust-release-guide",
    step: "01",
    title: "Đọc stage phát hành hiện tại",
    action: "Mở trang Phát hành để phân biệt content-ready, chuẩn bị closed test, test giới hạn và ứng viên tải công khai.",
    expectedResult: "Người chơi hiểu web đã rõ lộ trình nhưng chưa phải bản phát hành sẵn sàng chơi.",
    blockedScope: "Chưa có bản build công khai, thử nghiệm mở hoặc phát hành production."
  },
  {
    slug: "player-trust-release-guide",
    step: "02",
    title: "Kiểm chứng trước khi tin CTA tải",
    action: "Đọc Tin cậy tải game để biết artifact, checksum, nguồn gốc build, giới hạn đã biết và owner approval cần có gì.",
    expectedResult: "CTA tải game được hiểu là điều kiện cần kiểm chứng, không phải link tải thật.",
    blockedScope: "Chưa có nút tải thật, checksum thật, launcher hoặc quyền tải theo tài khoản."
  },
  {
    slug: "player-trust-release-guide",
    step: "03",
    title: "Xem trạng thái và ranh giới hỗ trợ",
    action: "Mở Trạng thái và Hỗ trợ an toàn để biết phần nào public, internal, blocked và cách chuẩn bị feedback không chứa dữ liệu nhạy cảm.",
    expectedResult: "Người chơi biết báo lỗi/góp ý an toàn trước khi có ticket live hoặc tra cứu tài khoản.",
    blockedScope: "Chưa có ticket inbox an toàn, tra cứu tài khoản hoặc SLA hỗ trợ production."
  },
  {
    slug: "player-trust-release-guide",
    step: "04",
    title: "Theo dõi điều kiện closed test",
    action: "Đọc checklist test giới hạn để biết build artifact, giới hạn, giao thức feedback và trạng thái hỗ trợ còn thiếu gì.",
    expectedResult: "Người chơi chờ đúng stage thay vì kỳ vọng đăng ký mở, quyền vào test tự động hoặc phần thưởng.",
    blockedScope: "Chưa có đăng ký mở, đảm bảo suất test, phần thưởng/kinh tế hoặc cấp quyền tự động."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "01",
    title: "Bắt đầu từ câu hỏi người chơi",
    action: "Mở trang Bắt đầu hoặc bản đồ hành trình để chọn nhu cầu: hiểu game, kiểm tải, xem trạng thái, báo lỗi hay đọc roadmap.",
    expectedResult: "Người chơi đi vào route phù hợp trước khi chạm CTA nhạy cảm.",
    blockedScope: "Chưa có gợi ý cá nhân hóa, định tuyến theo tài khoản hoặc phân quyền theo nhân vật."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "02",
    title: "Đi qua vòng lặp thế giới",
    action: "Đọc vòng lặp thế giới để hiểu Cổng Linh, Người Gác Cổng và Đá Luyện Tập trước khi kỳ vọng tải game hoặc combat live.",
    expectedResult: "Người chơi hiểu web đang mô tả cảm nhận thế giới, chưa mở bản phát hành chơi thật.",
    blockedScope: "Chưa có combat live, nhiệm vụ, loot, economy hoặc tiến trình tài khoản."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "03",
    title: "Kiểm gate tải game và trạng thái",
    action: "Nếu muốn tải game, đọc Tin cậy tải game và Trạng thái để biết artifact, checksum, owner gate và blocker hiện tại.",
    expectedResult: "CTA tải game không bị hiểu nhầm thành launcher, quyền tải hoặc cam kết release.",
    blockedScope: "Chưa có public build, checksum thật, entitlement backend hoặc deployment claim."
  },
  {
    slug: "route-continuity-conversion-guide",
    step: "04",
    title: "Đóng vòng bằng hỗ trợ an toàn",
    action: "Khi gặp blocker, đọc Hỗ trợ an toàn để chuẩn bị mô tả lỗi và biết dữ liệu nào không nên gửi.",
    expectedResult: "Người chơi biết cách góp ý an toàn mà không kỳ vọng ticket live, tra cứu tài khoản hoặc SLA production.",
    blockedScope: "Chưa có inbox bảo mật, lookup tài khoản, moderation dashboard hoặc kênh hỗ trợ live."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "01",
    title: "Vào Cổng Linh",
    action: "Đọc /game/loop như điểm vào thế giới tĩnh hiện tại và giữ kỳ vọng ở mức nhập môn, chưa phải bản phát hành chiến đấu.",
    expectedResult: "Người chơi hiểu đây là mốc cảm nhận tông thế giới, cảnh nhập môn và đường đọc tiếp theo.",
    blockedScope: "Chưa có bản đồ live, sát thương chiến đấu, HP, loot, túi đồ, kinh tế hoặc cơ sở dữ liệu nhiệm vụ."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "02",
    title: "Gặp Người Gác Cổng",
    action: "Dùng Người Gác Cổng như biển chỉ dẫn onboarding để hiểu ranh giới trước khi chờ nhiệm vụ, hội thoại hoặc phần thưởng.",
    expectedResult: "Người chơi hiểu NPC hiện là điểm neo kể chuyện và nhập môn, không phải nhân vật giao nhiệm vụ vận hành.",
    blockedScope: "Chưa có trạng thái nhiệm vụ lưu trữ, backend hội thoại NPC hoặc tiến trình theo tài khoản."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "03",
    title: "Tương tác Đá Luyện Tập",
    action: "Đọc Đá Luyện Tập như gợi ý thao tác an toàn: thử nhịp luyện, nhận biết blocker, rồi quay lại trạng thái hoặc lộ trình.",
    expectedResult: "Người chơi có kỳ vọng đúng về vòng luyện tập chưa chiến đấu và biết gửi phản hồi hữu ích.",
    blockedScope: "Chưa có công thức sát thương, kinh tế kỹ năng, rơi đồ, PvP, boss hoặc thưởng sự kiện vận hành."
  },
  {
    slug: "world-gameplay-loop-guide",
    step: "04",
    title: "Kiểm trạng thái tải game",
    action: "Đi tiếp tới Trạng thái, Tin cậy tải game và Hỗ trợ trước khi chờ bản build, quyền tải hoặc kênh phản hồi live.",
    expectedResult: "Người chơi hiểu artifact phát hành và hợp đồng máy chủ vẫn là gate riêng.",
    blockedScope: "Chưa có artifact công khai, quyền tải, checksum thật, backend ticket hoặc xác thực vận hành."
  },

  {
    slug: "player-safety-support-guide",
    step: "01",
    title: "Đọc FAQ hỗ trợ trước",
    action: "Bắt đầu từ FAQ hỗ trợ để hiểu trạng thái tải game, ranh giới tài khoản và những câu hỏi đã có câu trả lời công khai.",
    expectedResult: "Người chơi không gửi trùng vấn đề đã được giải thích trong trạng thái public hiện tại.",
    blockedScope: "Chưa có ticket inbox live, SLA hỗ trợ production hoặc tra cứu tài khoản."
  },
  {
    slug: "player-safety-support-guide",
    step: "02",
    title: "Chuẩn bị báo lỗi an toàn",
    action: "Chỉ chuẩn bị thiết bị, bước tái hiện, ảnh cần thiết và mô tả lỗi; không gửi mật khẩu, token hoặc dữ liệu nhạy cảm.",
    expectedResult: "Feedback đủ hữu ích cho closed test tương lai nhưng không thu thập dữ liệu rủi ro.",
    blockedScope: "Chưa có secure upload, account lookup, ticket backend hoặc chính sách lưu trữ production."
  },
  {
    slug: "player-safety-support-guide",
    step: "03",
    title: "Theo dõi cộng đồng đúng phạm vi",
    action: "Dùng Community/Roadmap như kênh thông báo và góp ý tĩnh, không hiểu nhầm thành chat, forum, guild hoặc moderation live.",
    expectedResult: "Người chơi biết nơi theo dõi tin mới mà không kỳ vọng moderation hay guild vận hành.",
    blockedScope: "Chưa có chat, forum, guild, moderation backend hoặc RBAC/audit contract."
  },
  {
    slug: "player-safety-support-guide",
    step: "04",
    title: "Kiểm trạng thái trước khi chờ phản hồi",
    action: "Quay lại Trạng thái, Tin cậy tải game và Hỗ trợ để biết gate nào còn tạm khóa trước khi chờ phản hồi chính thức.",
    expectedResult: "Người chơi hiểu hỗ trợ hiện là hướng dẫn public an toàn, không phải hệ thống ticket vận hành.",
    blockedScope: "Chưa có live support ticket, moderation dashboard, quyền tải, xác thực production hoặc backend contract accepted."
  },

  {
    slug: "accessibility-readability-guide",
    step: "01",
    title: "Quét tiêu đề trước",
    action: "Đọc h1, h2 và các nhãn trạng thái để biết trang đang nói về tải game, trạng thái, hướng dẫn hay hỗ trợ.",
    expectedResult: "Người chơi chọn đúng nhánh đọc trước khi bấm CTA hoặc kỳ vọng hệ thống live.",
    blockedScope: "Chưa có audit pháp lý, chứng nhận WCAG hoặc personalization theo tài khoản."
  },
  {
    slug: "accessibility-readability-guide",
    step: "02",
    title: "Dùng trang Bắt đầu",
    action: "Nếu chưa biết đi đâu, quay lại trang Bắt đầu để chọn nhóm đọc theo tải game, trạng thái, vòng lặp thế giới hoặc hỗ trợ.",
    expectedResult: "Người chơi không phải đọc toàn bộ site theo thứ tự tuyến tính hoặc đoán đường dẫn.",
    blockedScope: "Chưa có recommendation backend, CMS điều hướng cá nhân hóa hoặc account route production."
  },
  {
    slug: "accessibility-readability-guide",
    step: "03",
    title: "Đọc trên mobile theo thẻ",
    action: "Ưu tiên thẻ đầu trang, CTA chính và các board compact; bỏ qua phần chưa liên quan sau khi đã hiểu ranh giới.",
    expectedResult: "Mobile không bị cảm giác dài, rối hoặc phải cuộn quá sâu trước khi thấy bước tiếp theo.",
    blockedScope: "Chưa có app native, tùy biến font theo tài khoản hoặc preference sync backend."
  },
  {
    slug: "accessibility-readability-guide",
    step: "04",
    title: "Đọc ranh giới trước kỳ vọng live",
    action: "Kiểm tra ranh giới về tải game, tài khoản, chiến đấu, hỗ trợ và cộng đồng trước khi hiểu một CTA là hệ thống vận hành.",
    expectedResult: "Người chơi biết đâu là hướng dẫn public tĩnh và đâu là gate chờ backend/game owner duyệt.",
    blockedScope: "Chưa có public build, production auth, combat live, ticket live hoặc backend contract accepted."
  },

  {
    slug: "performance-copy-budget-guide",
    step: "01",
    title: "Giữ nội dung ngắn",
    action: "Đọc mỗi card theo ý chính trước, dùng câu ngắn và nhãn rõ để không biến trang public thành tài liệu vận hành dài.",
    expectedResult: "Người chơi hiểu trạng thái chính mà không phải đọc nhiều đoạn giải thích kỹ thuật.",
    blockedScope: "Chưa có CMS production, cá nhân hóa nội dung hoặc editorial backend."
  },
  {
    slug: "performance-copy-budget-guide",
    step: "02",
    title: "Ưu tiên visual nhẹ",
    action: "Dùng theme, gradient và layout CSS trong shared UI trước khi thêm ảnh nặng hoặc asset mới cho một guide tĩnh.",
    expectedResult: "Trang vẫn có phân cấp thị giác nhưng không phụ thuộc tải ảnh lớn để hiểu nội dung chính.",
    blockedScope: "Chưa có CDN ảnh production, bundle analysis chứng nhận hoặc image pipeline vận hành."
  },
  {
    slug: "performance-copy-budget-guide",
    step: "03",
    title: "Giữ route tĩnh dễ kiểm",
    action: "Ưu tiên route tĩnh, fixture rõ ranh giới và CTA dẫn đúng trạng thái thay vì tạo flow backend giả.",
    expectedResult: "Reviewer kiểm được source, browser và build mà không nhầm thành hệ thống live.",
    blockedScope: "Chưa có production monitoring, server analytics hoặc backend contract accepted."
  },
  {
    slug: "performance-copy-budget-guide",
    step: "04",
    title: "Đặt ranh giới cạnh CTA",
    action: "Với tải game, tài khoản, hỗ trợ hoặc trạng thái phát hành, đặt non-claim gần CTA để người chơi không hiểu nhầm readiness.",
    expectedResult: "CTA vẫn hữu ích nhưng không biến thành lời hứa tải game, đăng nhập hoặc hỗ trợ production.",
    blockedScope: "Chưa có public build, entitlement, production auth, ticket live hoặc deployment claim."
  },

  {
    slug: "start-here-content-hub-guide",
    step: "01",
    title: "Bắt đầu từ trang Bắt đầu",
    action: "Mở /start để chọn đúng nhu cầu: tìm hiểu game, kiểm tra tải game, xem lộ trình hoặc đọc hướng dẫn.",
    expectedResult: "Người chơi có đường đọc ngắn và không phải tự ghép thông tin từ nhiều trang rời rạc.",
    blockedScope: "Chưa có route tài khoản cá nhân, gợi ý từ máy chủ hoặc điều hướng CMS."
  },
  {
    slug: "start-here-content-hub-guide",
    step: "02",
    title: "Đi theo nhóm trang phù hợp",
    action: "Nếu muốn tải game, đọc Tải game/Tin cậy tải game; nếu muốn hiểu game, đọc Thế giới/Guide nhập môn; nếu muốn theo dõi tiến độ, đọc Lộ trình/Trạng thái.",
    expectedResult: "Người chơi hiểu mỗi trang giải quyết một nhu cầu rõ ràng thay vì bị lẫn giữa marketing, status và tooling.",
    blockedScope: "Chưa có gói tải công khai, xác thực production hoặc ticket hỗ trợ live."
  },
  {
    slug: "start-here-content-hub-guide",
    step: "03",
    title: "Kiểm tra ranh giới trước kỳ vọng phát hành",
    action: "Đọc badge và ranh giới trong từng hub để biết phần nào là nội dung công khai tĩnh, phần nào còn bị khóa bởi backend hoặc gói phát hành.",
    expectedResult: "Người chơi biết website đang phát triển thật nhưng chưa hứa dịch vụ production.",
    blockedScope: "Chưa có lưu DB, tích hợp portal thật hoặc community backend live."
  },
  {
    slug: "start-here-content-hub-guide",
    step: "04",
    title: "Đi tiếp bằng đường dẫn an toàn",
    action: "Sau khi chọn hướng đọc, đi tới Trạng thái chơi, Tin cậy tải game hoặc FAQ hỗ trợ để kiểm chứng kỳ vọng trước khi chờ test.",
    expectedResult: "Người chơi biết bước đọc kế tiếp mà không bị dẫn tới nút tải, đăng nhập hoặc lời hứa release giả.",
    blockedScope: "Chưa có nút tải thật, đăng nhập production, quyền tải hoặc lịch test được duyệt."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "01",
    title: "Xem trạng thái công khai trước",
    action: "Mở Trạng thái chơi và Tin cậy tải game để biết gói build, tài khoản, hỗ trợ và cộng đồng đang ở mức nào.",
    expectedResult: "Người chơi hiểu đâu là thông tin công khai, đâu là guardrail nội bộ và đâu là phụ thuộc đang tạm khóa.",
    blockedScope: "Chưa có gói tải game công khai, xác thực production hoặc support backend live."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "02",
    title: "Đọc mốc quyết định lộ trình",
    action: "Mở Lộ trình để xem gate nào đã sẵn sàng, dự kiến hoặc tạm khóa trước khi kỳ vọng tính năng mới.",
    expectedResult: "Người chơi hiểu hợp đồng backend WEB-08 là điều kiện trước portal, tài khoản hoặc ops thật.",
    blockedScope: "Chưa có DB persistence, portal integration thật hoặc ops/admin mutation."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "03",
    title: "Góp ý đúng phạm vi",
    action: "Dùng Community/Support như hướng dẫn tĩnh để góp ý nội dung, UX, wording và mức sẵn sàng test.",
    expectedResult: "Phản hồi không bị trộn với khôi phục tài khoản, thanh toán, quyền tải hoặc moderation live.",
    blockedScope: "Chưa có forum/chat/guild backend, ticket backend hoặc tra cứu tài khoản."
  },
  {
    slug: "community-roadmap-onboarding-guide",
    step: "04",
    title: "Chờ thông báo chủ sở hữu",
    action: "Theo dõi Lộ trình, Trạng thái chơi và Cộng đồng để biết khi nào có gói build, đợt test hoặc kênh phản hồi được duyệt.",
    expectedResult: "Người chơi không tự suy diễn ngày mở test, quyền tải hoặc lời mời tài khoản khi chưa có thông báo chính thức.",
    blockedScope: "Chưa có lịch test được duyệt, quyền tải, tài khoản production hoặc moderation live."
  },
  {
    slug: "gate-entry-guide",
    step: "01",
    title: "Nhìn Cổng Linh như điểm vào hướng dẫn",
    action: "Mở /game trước, đọc Cổng Linh như cảnh nhập môn và không tìm map live hay nhiệm vụ vận hành trong bước này.",
    expectedResult: "Người chơi hiểu đây là điểm vào thế giới public hiện tại, không phải bản đồ production.",
    blockedScope: "Chưa có bản đồ live, wiki nhiệm vụ hoặc dữ liệu tiến trình tài khoản."
  },
  {
    slug: "gate-entry-guide",
    step: "02",
    title: "Gặp Người Giữ Cổng để hiểu phạm vi",
    action: "Đọc vai trò Gate Keeper như người giải thích ranh giới: flow hiện tại đang hướng dẫn kỳ vọng, chưa mở chiến đấu hoặc phần thưởng.",
    expectedResult: "Người chơi biết vì sao web nói rõ boundary trước khi dẫn sang trạng thái tải game.",
    blockedScope: "Chưa có combat, reward, inventory hoặc quest persistence được backend chấp nhận."
  },
  {
    slug: "gate-entry-guide",
    step: "03",
    title: "Chuyển sang Đá Luyện và trạng thái tải",
    action: "Sau khi hiểu cổng, tiếp tục sang Training Stone, /status và /download/trust để xem readiness thay vì tìm link tải giả.",
    expectedResult: "Người chơi đi tiếp theo luồng proof-before-download và không hiểu nhầm thành closed test đã mở.",
    blockedScope: "Chưa có public build, launcher, entitlement hoặc support ticket production."
  },
  {
    slug: "beginner-training-loop-guide",
    step: "01",
    title: "Bắt đầu từ thế giới hiện tại",
    action: "Đọc /game để hiểu Cổng Linh là điểm vào và flow hiện tại vẫn là hướng dẫn kỳ vọng cho người chơi mới.",
    expectedResult: "Người chơi biết mình đang xem onboarding public, không phải bản đồ nhiệm vụ production.",
    blockedScope: "Chưa có bản đồ live, nhiệm vụ tài khoản hoặc quest persistence."
  },
  {
    slug: "beginner-training-loop-guide",
    step: "02",
    title: "Gặp Gate Keeper trước khi luyện",
    action: "Dùng Gate Keeper như mốc giải thích phạm vi: đọc boundary trước khi mong đợi combat, loot hoặc build tải game.",
    expectedResult: "Người chơi hiểu vì sao web nói rõ non-combat trước khi giới thiệu Training Stone.",
    blockedScope: "Chưa có combat damage, loot, inventory hoặc economy."
  },
  {
    slug: "beginner-training-loop-guide",
    step: "03",
    title: "Đọc Training Stone như hướng luyện tập",
    action: "Xem Training Stone là điểm hướng dẫn thao tác và kỳ vọng, chưa phải hệ thống progression vận hành.",
    expectedResult: "Người chơi nắm được vòng luyện tập ngắn mà không hiểu nhầm thành nhân vật đã lưu tiến trình.",
    blockedScope: "Chưa có character save, reward persistence hoặc account progression backend."
  },
  {
    slug: "beginner-training-loop-guide",
    step: "04",
    title: "Kiểm tra status và download trust",
    action: "Sau khi đọc flow luyện tập, đi tới /status và /download/trust để biết build public, checksum và owner gate đang ở trạng thái nào.",
    expectedResult: "Người chơi đi tiếp theo luồng proof-before-download thay vì tìm nút tải hoặc đăng ký giả.",
    blockedScope: "Chưa có public build, launcher, entitlement hoặc open registration."
  },
  {
    slug: "download-readiness-guide",
    step: "01",
    title: "Xác nhận gói build thật",
    action: "Chỉ coi Download là sẵn sàng khi có file build đúng nền tảng, đúng phiên bản, đúng dung lượng và được owner duyệt.",
    expectedResult: "Người chơi không bị dẫn tới nút tải placeholder hoặc file chưa xác minh.",
    blockedScope: "Chưa có public build artifact hoặc launcher production."
  },
  {
    slug: "download-readiness-guide",
    step: "02",
    title: "Đặt checksum cạnh link tải",
    action: "Hiển thị checksum của đúng artifact sau khi kiểm provenance, để người chơi có thể đối chiếu file tải.",
    expectedResult: "Download trust dựa trên bằng chứng kỹ thuật, không dựa vào copy marketing.",
    blockedScope: "Chưa có checksum thật, nguồn gốc file hoặc xác minh gói build."
  },
  {
    slug: "download-readiness-guide",
    step: "03",
    title: "Đọc ghi chú phát hành trước",
    action: "Gắn release note, known limitations và rollback/support expectation cạnh CTA tải game.",
    expectedResult: "Người chơi biết giới hạn build trước khi cài, đặc biệt khi closed test chưa mở rộng.",
    blockedScope: "Chưa có release note được duyệt, support SLA hoặc closed-test intake live."
  },
  {
    slug: "download-readiness-guide",
    step: "04",
    title: "Giữ entitlement ở trạng thái khóa",
    action: "Nếu chưa có backend account/entitlement được chấp nhận, chỉ dẫn người chơi đọc /status và /download/trust thay vì đăng ký giả.",
    expectedResult: "Trang tải game minh bạch về blocker và không hứa quyền chơi khi hợp đồng backend chưa sẵn sàng.",
    blockedScope: "Chưa có portal entitlement, account gate, open registration hoặc backend contract accepted."
  },
  {
    slug: "support-and-community-guide",
    step: "01",
    title: "Đọc FAQ trước khi gửi phản hồi",
    action: "Bắt đầu từ /support/help để xem câu hỏi thường gặp, trạng thái tải game và boundary trước khi mô tả lỗi.",
    expectedResult: "Người chơi không gửi trùng vấn đề đã được giải thích trong trạng thái public hiện tại.",
    blockedScope: "Chưa có ticket inbox live hoặc SLA hỗ trợ production."
  },
  {
    slug: "support-and-community-guide",
    step: "02",
    title: "Gửi phản hồi an toàn",
    action: "Chỉ chuẩn bị mô tả lỗi, thiết bị, bước tái hiện và ảnh cần thiết; không gửi mật khẩu, token hoặc dữ liệu nhạy cảm.",
    expectedResult: "Feedback có thể dùng cho closed test tương lai mà không thu thập dữ liệu rủi ro.",
    blockedScope: "Chưa có secure upload, account lookup hoặc ticket backend."
  },
  {
    slug: "support-and-community-guide",
    step: "03",
    title: "Theo dõi cộng đồng như kênh thông báo",
    action: "Đọc Community/Roadmap như thông tin định hướng và decision gates, không hiểu nhầm thành chat/forum/guild live.",
    expectedResult: "Người chơi biết nơi theo dõi tin mới nhưng không kỳ vọng moderation hay guild vận hành.",
    blockedScope: "Chưa có chat, forum, guild, moderation backend hoặc RBAC/audit contract."
  },
  {
    slug: "support-and-community-guide",
    step: "04",
    title: "Gửi phản hồi theo trạng thái thật",
    action: "Dùng Support/Community như static guidance cho tới khi có API/RBAC/audit contract được chấp nhận.",
    expectedResult: "Người chơi hiểu ticket, moderation, chat/forum/guild chưa phải live system.",
    blockedScope: "Chưa có live support ticket, moderation backend hoặc community backend."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "01",
    title: "Xác nhận gói build trước nút tải",
    action: "Chỉ hiển thị CTA tải khi có file build thật, phiên bản, nền tảng, dung lượng và phê duyệt chủ sở hữu.",
    expectedResult: "Người chơi không bị dẫn tới nút tải giả hoặc placeholder nguy hiểm.",
    blockedScope: "Chưa có gói tải game công khai được duyệt."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "02",
    title: "Đặt checksum cạnh link tải",
    action: "Hiển thị SHA256 của đúng gói build sau khi kiểm upload/nguồn gốc file, không dùng hash mẫu.",
    expectedResult: "Người chơi có thể đối chiếu file tải thay vì tin vào copy marketing.",
    blockedScope: "Chưa có checksum thật, nguồn gốc file hoặc xác minh gói build."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "03",
    title: "Nói rõ giới hạn bản build",
    action: "Viết ghi chú phát hành có giới hạn đã biết, kỳ vọng hỗ trợ và hướng rollback trước khi mở test.",
    expectedResult: "Closed testing có thể bắt đầu minh bạch khi owner duyệt artifact.",
    blockedScope: "Chưa claim production auth, DB persistence, payment/shop/economy."
  },
  {
    slug: "release-trust-and-checksum-guide",
    step: "04",
    title: "Đồng bộ trạng thái và hỗ trợ",
    action: "Liên kết Trạng thái chơi, Tin cậy tải game và FAQ hỗ trợ để người chơi biết gate nào còn tạm khóa hoặc dự kiến.",
    expectedResult: "Người chơi hiểu bản phát hành chưa sẵn sàng nếu thiếu gói build, checksum, kênh hỗ trợ hoặc phê duyệt chủ sở hữu.",
    blockedScope: "Chưa có quyền tải, launcher, ticket backend hoặc claim triển khai production."
  }
];
