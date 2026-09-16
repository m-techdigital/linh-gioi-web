import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Reading destinations only. The existing FAQ page owns local category selection.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/support/help#faq-answers", label: "Mở các nhóm câu hỏi" },
  "03": { href: "/support/help#help-boundary", label: "Đọc ranh giới tìm kiếm và hỗ trợ" }
};
const supportChoices = [
  { href: "/support", label: "Đọc phạm vi hỗ trợ", className: "lgo-faq-guide-action" },
  { href: "/support/safety", label: "Đọc hướng dẫn an toàn", className: "lgo-faq-guide-action" },
  { href: "/download/trust", label: "Đối chiếu tin cậy bản tải", className: "lgo-faq-guide-action" },
  { href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-faq-guide-action" },
  { href: "/release/tester-pack", label: "Đọc gói hướng dẫn tester", className: "lgo-faq-guide-action" }
] as const;
const feedbackChoices = [
  { href: "/release/tester-pack#tester-feedback", label: "Đọc mẫu phản hồi an toàn", className: "lgo-faq-guide-action" },
  { href: "/support/safety", label: "Đọc nguyên tắc bảo vệ dữ liệu", className: "lgo-faq-guide-action" }
] as const;

/** Source-authored FAQ guidance, not a second directory, search service or feedback form. */
export function PublicFaqGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-faq-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang tìm FAQ">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Tìm câu trả lời hữu ích</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang FAQ" badgeTone="gold" kicker="Chọn nhóm · Đọc tiếp · Hiểu ranh giới · Phản hồi"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#faq-guide-step-01", label: "Đọc từ cách chọn câu hỏi", tone: "gold" }, { href: "/support/help#faq-answers", label: "Mở FAQ theo chủ đề", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Cẩm nang không phải tìm kiếm trực tuyến hoặc kênh nhận phản hồi. Bộ lọc chủ đề ở trang FAQ chỉ chọn nội dung đã có; không gửi truy vấn, tra cứu tài khoản hoặc tiếp nhận dữ liệu riêng tư.</p>}
      visual={<ReadingPriorityPanel headingId="faq-guide-priorities-heading" overline="Hỏi đúng đường · Đọc rõ hơn"
        title="Từ câu hỏi đến đường đọc"
        items={steps.map(step => ({ label: step.step, value: step.title, href: `#faq-guide-step-${step.step}` }))}
        note="Mở từng phần cẩm nang, không phải kết quả tìm kiếm hoặc trạng thái gửi phản hồi."/>}/>
    <GuideArticle contentsId="faq-guide-contents" contentsLabel="Mục lục tìm FAQ hữu ích"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        const group = step.step === "02" ? { label: "Đọc tiếp theo đúng vấn đề", links: supportChoices }
          : step.step === "04" ? { label: "Chuẩn bị phản hồi không chứa dữ liệu riêng tư", links: feedbackChoices } : undefined;
        return { id: `faq-guide-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(group ? { actionGroup: group } : destination ? { action: { ...destination, className: "lgo-faq-guide-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="faq-guide-related-heading">
      <div><SectionHeading headingId="faq-guide-related-heading" eyebrow="Đọc đúng trước khi gửi" title="Có hướng dẫn, chưa có tiếp nhận trực tuyến"/>
        <p>FAQ giúp tìm nội dung hiện có. Mẫu phản hồi chỉ hướng dẫn ghi nhận; chỉ gửi khi có kênh chính thức được công bố. Không đưa mật khẩu, token hoặc dữ liệu cá nhân vào phản hồi.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/support/help" tone="gold">Mở thư viện FAQ</LinkButton>
        <LinkButton href="/guides/support-and-community-guide" tone="neutral">Cẩm nang hỗ trợ và cộng đồng</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
