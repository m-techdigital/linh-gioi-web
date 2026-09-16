import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// These are reading destinations, not game actions or saved character progress.
const chapterLinks = [
  [{ href: "/game", label: "Khám phá thế giới Linh Giới", className: "lgo-news-article-action" },
    { href: "/game/loop", label: "Đọc bốn bước vòng lặp", className: "lgo-news-article-action" },
    { href: "/guides/world-gameplay-loop-guide", label: "Mở cẩm nang vòng lặp thế giới", className: "lgo-news-article-action" },
    { href: "/guides/beginner", label: "Đọc hướng dẫn nhập môn", className: "lgo-news-article-action" }],
  [{ href: "/start", label: "Chọn đường đọc từ Bắt đầu", className: "lgo-news-article-action" },
    { href: "/download/trust", label: "Đối chiếu độ tin cậy bản tải", className: "lgo-news-article-action" },
    { href: "/status", label: "Kiểm tra trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/support", label: "Đọc hướng dẫn hỗ trợ", className: "lgo-news-article-action" }]
] as const;

export function PublicWorldLoopArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Vòng lặp thế giới", kicker: "Tìm cổng vào · Theo người dẫn đường · Hiểu cách luyện tập", contentsLabel: "Mục lục bài viết vòng lặp thế giới",
      introLabel: "Bối cảnh của bản cập nhật web v1.13", coverAlt: "Tranh cổng thành Linh Giới minh họa cho bài viết về vòng lặp thế giới",
      coverEyebrow: "ĐỌC HÀNH TRÌNH · HIỂU ĐÚNG PHẠM VI", coverTitle: "Hiểu đường đi trước khi bước tới",
      coverNote: "Tranh minh họa · Không phải phiên chơi hoặc bản phát hành chiến đấu" }}/>;
}
