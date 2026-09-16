import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Read existing release information; none of these links installs or authorizes a game build.
const chapterLinks = [
  [{ href: "/download", label: "Đọc điều kiện tải", className: "lgo-news-article-action" },
    { href: "/download/trust", label: "Đối chiếu độ tin cậy bản tải", className: "lgo-news-article-action" },
    { href: "/release/readiness", label: "Xem điều kiện sẵn sàng", className: "lgo-news-article-action" }],
  [{ href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/release", label: "Đọc thông tin phát hành", className: "lgo-news-article-action" },
    { href: "/support/safety", label: "Đọc hướng dẫn an toàn", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Tìm FAQ hỗ trợ", className: "lgo-news-article-action" }]
] as const;

export function PublicStatusTrustArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Trạng thái và bản tải", kicker: "Đúng nguồn · Rõ bằng chứng · Hiểu giới hạn", contentsLabel: "Mục lục bài viết trạng thái và bản tải",
      introLabel: "Bối cảnh của bản cập nhật web v1.10", coverAlt: "Tranh thế giới Linh Giới minh họa cho bài viết về thông tin bản tải",
      coverEyebrow: "ĐỌC ĐÚNG NGUỒN · ĐỐI CHIẾU TRƯỚC KHI TẢI", coverTitle: "Tin cậy bắt đầu từ thông tin rõ ràng",
      coverNote: "Tranh minh họa · Không phải chứng nhận bản tải hoặc trạng thái máy chủ" }}/>;
}
