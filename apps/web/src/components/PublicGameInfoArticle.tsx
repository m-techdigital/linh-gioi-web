import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Read existing public information; none of these destinations grants game access.
const chapterLinks = [
  [{ href: "/story", label: "Đọc cốt truyện thế giới", className: "lgo-news-article-action" },
    { href: "/classes", label: "Tìm hiểu năm lộ nhân vật", className: "lgo-news-article-action" },
    { href: "/guides/beginner", label: "Mở hướng dẫn nhập môn", className: "lgo-news-article-action" }],
  [{ href: "/download", label: "Đọc điều kiện tải", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Tìm FAQ hỗ trợ", className: "lgo-news-article-action" },
    { href: "/community/onboarding", label: "Đọc hướng dẫn cộng đồng", className: "lgo-news-article-action" },
    { href: "/status", label: "Đối chiếu trạng thái hiện tại", className: "lgo-news-article-action" }]
] as const;

export function PublicGameInfoArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Thông tin game public", kicker: "Bối cảnh thế giới · Bước nhập môn · Kỳ vọng rõ ràng", contentsLabel: "Mục lục bài viết thông tin game",
      introLabel: "Bối cảnh của bản cập nhật web v1.8", coverAlt: "Tranh thế giới Linh Giới minh họa cho hành trình tìm hiểu game",
      coverEyebrow: "HIỂU THẾ GIỚI · BIẾT BƯỚC TIẾP THEO", coverTitle: "Từ câu chuyện đến hành trình người mới",
      coverNote: "Tranh minh họa · Không phải dữ liệu gameplay hoặc ảnh server đang mở" }}/>;
}
