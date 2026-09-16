import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/guides", label: "Tìm nội dung cần đọc" },
  "02": { href: "/performance#performance-preview", label: "Mở khung thử minh họa" },
  "03": { href: "/status", label: "Đọc trạng thái hiện tại" }
};
const boundaryChoices = [
  { href: "/download/trust", label: "Đối chiếu bản tải", className: "lgo-performance-guide-action" },
  { href: "/release/readiness", label: "Đọc điều kiện phát hành", className: "lgo-performance-guide-action" },
  { href: "/support/safety", label: "Đọc hướng dẫn an toàn", className: "lgo-performance-guide-action" }
] as const;

/** Source-authored principles: no image download is required to read this guide. */
export function PublicPerformanceGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-performance-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang đọc nhẹ">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Giữ web nhẹ và rõ</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero lgo-performance-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang đọc nhẹ" badgeTone="gold" kicker="Nội dung · Phân cấp · Đường đọc · Ranh giới"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#performance-guide-step-01", label: "Đọc bốn nguyên tắc", tone: "gold" }, { href: "/performance", label: "Mở khung thử cách đọc", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Bài hướng dẫn cách đọc, không phải kết quả đo tốc độ. Không có điểm Lighthouse, số đo tải trang hoặc chứng nhận tối ưu được tạo ở đây.</p>}
      visual={<ReadingPriorityPanel headingId="performance-guide-priority-heading" overline="Ngân sách cho sự chú ý"
        title={<>Rõ trước.<br/><em>Nhẹ đúng chỗ.</em></>}
        items={steps.map(step => ({ label: step.step, value: step.title }))}
        note="Bốn nguyên tắc trong bài viết, không phải điểm số hoặc tiến độ tối ưu."/>}/>
    <GuideArticle contentsId="performance-guide-contents" contentsLabel="Mục lục giữ web nhẹ và rõ"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `performance-guide-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(step.step === "04" ? { actionGroup: { label: "Đối chiếu ranh giới trước hành động", links: boundaryChoices } }
              : destination ? { action: { ...destination, className: "lgo-performance-guide-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="performance-guide-related-heading">
      <div><SectionHeading headingId="performance-guide-related-heading" eyebrow="Đọc rõ rồi chọn đường đi" title="Thử cách đọc, không suy ra tốc độ"/>
        <p>Khung thử ở trang Hiệu năng cho phép đổi khoảng cách và chọn tải thêm minh họa. Các thao tác đó không đo tốc độ production, không thay đổi tài khoản và không cấp quyền chơi.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/performance" tone="gold">Mở khung thử cách đọc</LinkButton>
        <LinkButton href="/accessibility" tone="neutral">Đọc hướng dẫn điều hướng</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
