import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Internal reading destinations, not build files or approval operations.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/download", label: "Đọc trạng thái bản tải" },
  "02": { href: "/download/trust", label: "Đọc yêu cầu đối chiếu" },
  "03": { href: "/release", label: "Đọc thông tin phát hành" },
  "04": { href: "/status", label: "Đọc trạng thái hiện tại" }
};

/** Published source guidance: rendering it never verifies, signs or distributes a build. */
export function PublicReleaseTrustGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-release-trust-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang tin cậy">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Tin cậy phát hành</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang tin cậy" badgeTone="gold" kicker="Gói build · SHA256 · Giới hạn · Phê duyệt"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#release-trust-step-01", label: "Đọc từ bằng chứng bản tải", tone: "gold" }, { href: "/download/trust", label: "Tin cậy bản tải", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Hướng dẫn đối chiếu, không phải chứng nhận gói build. Không có hash mẫu, nút tải tệp hoặc quyền chơi được cấp ở đây.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa Linh Giới cho cẩm nang tin cậy phát hành" fetchPriority="high"/>
        <figcaption><span>ĐỌC NGUỒN GỐC TRƯỚC KHI TẢI</span><strong>Tin cậy cần đủ bằng chứng</strong><small>Tranh minh họa · Không phải chứng nhận bản phát hành</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="release-trust-contents" contentsLabel="Mục lục tin cậy phát hành"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `release-trust-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(destination ? { action: { ...destination, className: "lgo-release-trust-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="release-trust-related-heading">
      <div><SectionHeading headingId="release-trust-related-heading" eyebrow="Từ yêu cầu tới thông tin đang có" title="Đối chiếu trước khi kỳ vọng tải"/>
        <p>Đọc điều kiện phát hành, câu hỏi thường gặp và cẩm nang bản tải. Bài viết không thay thế gói build thật, SHA256 tương ứng hoặc phê duyệt của chủ sở hữu.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/release/readiness" tone="gold">Đọc các điều kiện phát hành</LinkButton>
        <LinkButton href="/support/help" tone="neutral">Đọc câu hỏi thường gặp</LinkButton>
        <LinkButton href="/guides/download-readiness-guide" tone="neutral">Cẩm nang điều kiện bản tải</LinkButton>
      </div>
    </section>
  </Stack>;
}
