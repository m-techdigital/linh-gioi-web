import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Reading destinations only. None is an artifact, signing service or entitlement action.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/download", label: "Đọc trang bản tải" },
  "02": { href: "/download/trust", label: "Đọc cách đối chiếu bản tải" },
  "03": { href: "/release", label: "Đọc hành trình phát hành" },
  "04": { href: "/status", label: "Đọc trạng thái hiện tại" }
};

/** Preserves the published guide's evidence requirements, without inventing a downloadable build. */
export function PublicDownloadReadinessGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-download-readiness-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang bản tải">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Điều kiện bản tải</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang bản tải" badgeTone="gold" kicker="Gói bản dựng · Checksum · Ghi chú · Quyền truy cập"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#download-readiness-step-01", label: "Đọc các điều kiện", tone: "gold" }, { href: "/download/trust", label: "Đối chiếu bản tải", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Bài viết giải thích điều kiện, không cấp bản tải hoặc quyền chơi. Không có checksum được tạo để thay cho bằng chứng thật.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa Linh Giới trong cẩm nang điều kiện bản tải" fetchPriority="high"/>
        <figcaption><span>ĐỌC BẰNG CHỨNG TRƯỚC KHI KỲ VỌNG CHƠI</span><strong>Bốn điều kiện cần đối chiếu</strong><small>Tranh minh họa · Không phải bản dựng đã phát hành</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="download-readiness-contents" contentsLabel="Mục lục điều kiện bản tải"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `download-readiness-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(destination ? { action: { ...destination, className: "lgo-download-readiness-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="download-readiness-related-heading">
      <div><SectionHeading headingId="download-readiness-related-heading" eyebrow="Sau khi đọc các điều kiện" title="Tiếp tục bằng thông tin có nguồn"/>
        <p>Đọc các cổng duyệt, hướng dẫn hỗ trợ và bài viết liên quan. Những đường dẫn này không mở đăng ký hoặc thay thế phê duyệt phát hành.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/release/readiness" tone="gold">Đọc các cổng duyệt</LinkButton>
        <LinkButton href="/support/safety" tone="neutral">Chuẩn bị góp ý an toàn</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
