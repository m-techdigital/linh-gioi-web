import { localContentRepository } from "./repository";
import { routePolicy } from "./public-ia";

export const PUBLIC_SITE_ORIGIN = "https://linhgioi.vn";

export type PublicMetadataSource = {
  title: string;
  description: string;
  canonical: string;
  index: boolean;
  openGraphType: "website" | "article";
  publishedAt?: string;
};

type StaticMetadata = { title: string; description: string };

const staticMetadata: Record<string, StaticMetadata> = {
  "/": { title: "Linh Giới Online — MMORPG hành động cộng đồng 2D", description: "Khám phá Linh Giới Online: MMORPG hành động cộng đồng 2D với Linh Thành, năm Lộ nhân vật, hành trình thế giới và câu chuyện Âm Giới." },
  "/game": { title: "Thế giới", description: "Khám phá Linh Thành và các vùng đất của Linh Giới, từ Cổng Linh đến những tuyến hành trình được giới thiệu trên website công khai." },
  "/classes": { title: "Năm Lộ", description: "Tìm hiểu năm Lộ Võ, Kiếm, Pháp, Cơ và Linh, cùng bản sắc chiến đấu và vai trò của từng con đường trong Linh Giới Online." },
  "/story": { title: "Cốt truyện", description: "Đọc mở đầu cốt truyện Linh Giới Online, những biến cố quanh Đông Môn, Linh Thành và dấu hiệu của Âm Giới đang lan tới thế giới." },
  "/game/loop": { title: "Vòng lặp gameplay thế giới", description: "Hiểu vòng lặp khám phá, luyện tập và chiến đấu được định hướng cho Linh Giới Online mà không nhầm website với gameplay đang chạy." },
  "/journey": { title: "Hành trình người chơi", description: "Theo dõi hành trình người chơi từ bước đầu ở Linh Thành tới các nhịp khám phá, luyện tập và mở rộng tuyến đường trong Linh Giới." },
  "/start": { title: "Bắt đầu", description: "Bắt đầu tìm hiểu Linh Giới Online với các bước nhập môn, điều khiển cơ bản, chọn Lộ và những mốc đầu tiên trước khi game mở rộng hơn." },
  "/download": { title: "Trạng thái chơi & tải game", description: "Kiểm tra trạng thái bản tải Linh Giới Online, các điều kiện phát hành và những nguồn chính thức cần đối chiếu trước khi tải hoặc cài đặt." },
  "/download/trust": { title: "Tin cậy tải game", description: "Đọc hướng dẫn xác minh nguồn tải, checksum và bằng chứng phát hành của Linh Giới Online trước khi tin một gói cài đặt hoặc đường dẫn tải." },
  "/release": { title: "Hành trình phát hành", description: "Theo dõi các điều kiện cần thiết trước khi Linh Giới Online chuyển từ giai đoạn nội bộ sang thử nghiệm và phát hành công khai." },
  "/release/readiness": { title: "Sẵn sàng phát hành", description: "Xem các nhóm điều kiện về nội dung, kiểm thử, an toàn và quyền phát hành cần được xác nhận trước khi Linh Giới Online mở rộng phạm vi thử nghiệm." },
  "/release/tester-pack": { title: "Gói tester cộng đồng", description: "Đọc hướng dẫn chuẩn bị cho kiểm thử Linh Giới Online, gồm thiết bị, giới hạn đã biết và cách phản hồi an toàn khi chương trình thử nghiệm phù hợp được mở." },
  "/status": { title: "Trạng thái công khai", description: "Xem các tín hiệu trạng thái công khai của website Linh Giới Online và những giới hạn hiện tại mà không nhầm chúng với hệ thống giám sát game trực tiếp." },
  "/community": { title: "Cộng đồng", description: "Khám phá định hướng cộng đồng Linh Giới Online, không gian Linh Thành và các con đường kết nối người chơi khi các dịch vụ xã hội phù hợp được mở." },
  "/community/onboarding": { title: "Hòa nhập cộng đồng", description: "Tìm hiểu các bước làm quen với cộng đồng Linh Giới Online, cách đọc lộ trình và những giới hạn hiện tại trước khi có dịch vụ cộng đồng trực tiếp." },
  "/roadmap": { title: "Lộ trình sản phẩm", description: "Đọc lộ trình phát triển Linh Giới Online theo điều kiện và cột mốc sản phẩm, không coi kế hoạch này là ngày phát hành hoặc cam kết tiến độ." },
  "/support": { title: "Hỗ trợ", description: "Tìm đường tới FAQ, hướng dẫn an toàn và các nguồn hỗ trợ công khai của Linh Giới Online mà không gửi dữ liệu tài khoản hoặc tạo phiếu hỗ trợ trực tiếp." },
  "/support/help": { title: "FAQ nhanh", description: "Tra cứu nhanh các câu hỏi thường gặp về Linh Giới Online, bản tải, trạng thái chơi và cộng đồng bằng nội dung công khai có sẵn trên website." },
  "/support/safety": { title: "Báo lỗi an toàn", description: "Đọc hướng dẫn phản hồi và báo vấn đề an toàn cho Linh Giới Online mà không chia sẻ mật khẩu, dữ liệu nhạy cảm hoặc gửi tệp riêng tư qua website." },
  "/accessibility": { title: "Dễ đọc và dễ thao tác", description: "Xem hướng dẫn bàn phím, khả năng đọc và cách thao tác các trang công khai của Linh Giới Online; đây không phải chứng nhận tuân thủ chính thức." },
  "/performance": { title: "Hiệu năng và cách đọc nhẹ", description: "Đọc hướng dẫn sử dụng website Linh Giới Online trên nhiều thiết bị và hiểu các lựa chọn tải nội dung; trang không công bố điểm tốc độ vận hành chính thức." },
  "/guides": { title: "Cẩm nang người chơi", description: "Tìm cẩm nang Linh Giới Online theo nhu cầu: bắt đầu, thế giới, luyện tập, tải game, hỗ trợ, an toàn và chuẩn bị cho các giai đoạn phát hành." },
  "/guides/beginner": { title: "Hướng dẫn người mới", description: "Đọc cẩm nang nhập môn Linh Giới Online để hiểu Cổng Linh, bước luyện tập đầu tiên, trạng thái bản tải và các đường đọc dành cho người mới." },
  "/news": { title: "Tin tức Linh Giới", description: "Điểm vào bản tin Linh Giới Online dành cho người chơi; khi chưa có tin game mới, nhật ký phát triển website được tách riêng thành kho lưu trữ." },
  "/events": { title: "Sự kiện Linh Giới", description: "Kho thông báo sự kiện minh họa của Linh Giới Online trong giai đoạn phát triển; chưa phải lịch sự kiện live, đăng ký tham gia hoặc phần thưởng thật." },
  "/patch-notes": { title: "Ghi chú cập nhật Linh Giới", description: "Kho ghi chú thay đổi website Linh Giới Online phục vụ đối chiếu lịch sử phát triển; không phải ghi chú phát hành game hoặc thông báo bản cập nhật chơi được." },
};

function playerMetadataText(value: string): string {
  return value
    .replace(/\bbackend\b/gi, "hệ thống máy chủ")
    .replace(/\bproduction\b/gi, "vận hành chính thức")
    .replace(/\bfixture\b/gi, "dữ liệu minh họa")
    .replace(/\bruntime\b/gi, "môi trường chạy")
    .replace(/\be2e\b/gi, "kiểm thử đầu-cuối")
    .replace(/WEB v\d+(?:\.\d+)?/gi, "website")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function contentEntryForRoute(pathname: string) {
  if (pathname.startsWith("/guides/")) return localContentRepository.bySlug(pathname.slice("/guides/".length));
  if (pathname.startsWith("/news/")) return localContentRepository.bySlug(pathname.slice("/news/".length));
  return undefined;
}

export function publicMetadataForRoute(pathname: string): PublicMetadataSource {
  const policy = routePolicy(pathname);
  if (!policy) throw new Error(`Unknown public route metadata policy: ${pathname}`);
  const entry = contentEntryForRoute(pathname);
  const base = staticMetadata[pathname];
  const title = entry?.title ?? base?.title;
  const description = entry ? (policy.language === "archive" ? entry.summary : playerMetadataText(entry.summary)) : base?.description;
  if (!title || !description) throw new Error(`Missing public metadata source: ${pathname}`);
  return {
    title,
    description,
    canonical: pathname,
    index: policy.indexability === "index",
    openGraphType: entry ? "article" : "website",
    ...(entry ? { publishedAt: entry.publishedAt } : {}),
  };
}

export function publicLastModifiedForRoute(pathname: string): string | undefined {
  const entry = contentEntryForRoute(pathname);
  if (entry) return entry.publishedAt;
  if (pathname === "/guides") {
    return localContentRepository.list("guides").map((item) => item.publishedAt).sort().at(-1);
  }
  if (pathname === "/news") {
    return localContentRepository.list("news").map((item) => item.publishedAt).sort().at(-1);
  }
  return undefined;
}
