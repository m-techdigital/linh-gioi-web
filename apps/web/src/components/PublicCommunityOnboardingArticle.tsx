import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// The destinations own their existing reading controls; this article enrolls nobody.
const chapterLinks = [
  [{ href: "/", label: "Trở về trang chủ", className: "lgo-news-article-action" },
    { href: "/community", label: "Đọc nguyên tắc cộng đồng", className: "lgo-news-article-action" },
    { href: "/community/onboarding", label: "Đi theo ba bước hòa nhập", className: "lgo-news-article-action" },
    { href: "/support/safety", label: "Chuẩn bị phản hồi an toàn", className: "lgo-news-article-action" }],
  [{ href: "/roadmap", label: "Đọc các cổng và giai đoạn", className: "lgo-news-article-action" },
    { href: "/status", label: "Đối chiếu trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/download/trust", label: "Kiểm tra độ tin cậy bản tải", className: "lgo-news-article-action" },
    { href: "/release/readiness", label: "Đọc điều kiện sẵn sàng", className: "lgo-news-article-action" }]
] as const;

export function PublicCommunityOnboardingArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Cộng đồng và lộ trình", kicker: "Biết đường đọc · Hiểu điều kiện · Cùng giữ niềm tin", contentsLabel: "Mục lục bài viết cộng đồng và lộ trình",
      introLabel: "Bối cảnh của bản cập nhật web v1.11", coverAlt: "Tranh thế giới Linh Giới minh họa cho hành trình hòa nhập cộng đồng",
      coverEyebrow: "ĐỌC ĐỂ HIỂU · ĐỒNG HÀNH ĐÚNG KỲ VỌNG", coverTitle: "Cùng bắt đầu từ thông tin rõ ràng",
      coverNote: "Tranh minh họa · Không phải cộng đồng trực tuyến hoặc lời mời kiểm thử" }}/>;
}
