import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

const chapterLinks = [
  [{ href: "/status", label: "Đối chiếu trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/release", label: "Hiểu phạm vi phát hành", className: "lgo-news-article-action" }],
  [{ href: "/guides", label: "Mở thư viện hướng dẫn", className: "lgo-news-article-action" },
    { href: "/news", label: "Về thư viện bản tin", className: "lgo-news-article-action" }]
] as const;

export function PublicControlTowerArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Nền tảng web độc lập", kicker: "Nền tảng · Phạm vi · Cách đọc thống nhất", contentsLabel: "Mục lục bài viết Control tower",
      introLabel: "Bài viết giải thích governance web độc lập", coverAlt: "Tranh thế giới Linh Giới minh họa cho bài viết về nền tảng web",
      coverEyebrow: "MỘT THẾ GIỚI · CÙNG MỘT LỐI ĐỌC", coverTitle: "Nền tảng rõ, trải nghiệm liền mạch",
      coverNote: "Tranh minh họa · Không phải bảng điều hành hoặc trạng thái máy chủ" }}/>;
}
