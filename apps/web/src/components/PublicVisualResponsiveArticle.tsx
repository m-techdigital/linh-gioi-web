import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Real reading destinations, not controls for game graphics or device settings.
const chapterLinks = [
  [{ href: "/game", label: "Đọc thông tin thế giới", className: "lgo-news-article-action" },
    { href: "/download", label: "Đọc điều kiện tải", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Tìm FAQ hỗ trợ", className: "lgo-news-article-action" }],
  [{ href: "/accessibility", label: "Xem cách đọc và điều hướng", className: "lgo-news-article-action" },
    { href: "/performance", label: "Mở khung thử cách đọc", className: "lgo-news-article-action" },
    { href: "/news", label: "Về thư viện bản tin", className: "lgo-news-article-action" }]
] as const;

export function PublicVisualResponsiveArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Visual và responsive", kicker: "Trọng tâm rõ · Nhịp đọc dễ theo · Cùng một thế giới", contentsLabel: "Mục lục bài viết visual và responsive",
      introLabel: "Bối cảnh của lượt hoàn thiện visual và responsive", coverAlt: "Tranh thế giới Linh Giới minh họa cho bài viết về trải nghiệm đọc website",
      coverEyebrow: "MỘT THẾ GIỚI · NHIỀU KÍCH THƯỚC MÀN HÌNH", coverTitle: "Đọc rõ trọng tâm, đi tiếp liền mạch",
      coverNote: "Tranh minh họa · Không phải giao diện game hoặc điểm đo hiệu năng" }}/>;
}
