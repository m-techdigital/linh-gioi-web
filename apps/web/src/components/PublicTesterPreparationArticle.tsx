import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Existing preparation tools own local state; this article does not register or admit testers.
const chapterLinks = [
  [{ href: "/release/tester-pack#tester-checklist", label: "Mở danh sách chuẩn bị", className: "lgo-news-article-action" },
    { href: "/release/tester-pack#tester-device", label: "Đọc thông tin thiết bị cần chuẩn bị", className: "lgo-news-article-action" },
    { href: "/release/tester-pack#tester-limits", label: "Đọc giới hạn đã biết", className: "lgo-news-article-action" }],
  [{ href: "/release/tester-pack#tester-feedback", label: "Mở mẫu góp ý an toàn", className: "lgo-news-article-action" },
    { href: "/guides/closed-tester-information-pack-guide", label: "Đọc cẩm nang chuẩn bị kiểm thử", className: "lgo-news-article-action" },
    { href: "/support/safety", label: "Đọc hướng dẫn bảo vệ thông tin", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Tìm FAQ hỗ trợ", className: "lgo-news-article-action" }]
] as const;

export function PublicTesterPreparationArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Chuẩn bị kiểm thử", kicker: "Đọc trước · Chuẩn bị rõ · Giữ riêng thông tin", contentsLabel: "Mục lục bài viết chuẩn bị kiểm thử",
      introLabel: "Bối cảnh của bản cập nhật web v1.20", coverAlt: "Tranh thế giới Linh Giới minh họa cho bài viết hướng dẫn chuẩn bị kiểm thử",
      coverEyebrow: "CHUẨN BỊ CẨN THẬN · GÓP Ý AN TOÀN", coverTitle: "Hiểu rõ trước một lời mời",
      coverNote: "Tranh minh họa · Không phải lời mời hoặc xác nhận quyền kiểm thử" }}/>;
}
