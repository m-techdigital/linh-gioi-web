import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Guidance stays with its current owners; reading does not submit reports or redact files.
const chapterLinks = [
  [{ href: "/support/safety", label: "Tự kiểm tra trước khi báo lỗi", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Đọc FAQ báo lỗi và dữ liệu", className: "lgo-news-article-action" },
    { href: "/guides/player-safety-support-guide", label: "Mở cẩm nang an toàn người chơi", className: "lgo-news-article-action" },
    { href: "/community", label: "Đọc nguyên tắc cộng đồng", className: "lgo-news-article-action" }],
  [{ href: "/support", label: "Tìm hiểu phạm vi hỗ trợ", className: "lgo-news-article-action" },
    { href: "/status", label: "Đối chiếu trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/download/trust", label: "Kiểm tra độ tin cậy bản tải", className: "lgo-news-article-action" },
    { href: "/release/tester-pack", label: "Đọc hướng dẫn chuẩn bị kiểm thử", className: "lgo-news-article-action" }]
] as const;

export function PublicSafetySupportArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "An toàn và hỗ trợ", kicker: "Giữ riêng dữ liệu · Hiểu đúng hỗ trợ · Chuẩn bị rõ ràng", contentsLabel: "Mục lục bài viết an toàn và hỗ trợ",
      introLabel: "Bối cảnh của bản cập nhật web v1.14", coverAlt: "Tranh thế giới Linh Giới minh họa cho bài viết an toàn và hỗ trợ người chơi",
      coverEyebrow: "AN TOÀN THÔNG TIN · RÕ ĐƯỜNG ĐỌC", coverTitle: "Chia sẻ vấn đề, giữ riêng dữ liệu",
      coverNote: "Tranh minh họa · Không phải kênh tiếp nhận hoặc xử lý hỗ trợ" }}/>;
}
