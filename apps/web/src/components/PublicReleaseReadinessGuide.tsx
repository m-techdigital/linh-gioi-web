import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// These are reading destinations, never owner approval or access-grant operations.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/release/readiness", label: "Đọc sẵn sàng phát hành" },
  "04": { href: "/release/tester-pack#tester-checklist", label: "Mở checklist chuẩn bị" }
};
const evidenceChoices = [
  { href: "/release/readiness", label: "Mở bảng cổng phê duyệt", className: "lgo-readiness-guide-action" },
  { href: "/guides/release-trust-and-checksum-guide", label: "Đọc cách đối chiếu bản tải", className: "lgo-readiness-guide-action" }
] as const;
const alignmentChoices = [
  { href: "/download/trust", label: "Đọc Tin cậy tải game", className: "lgo-readiness-guide-action" },
  { href: "/status", label: "Đọc Trạng thái", className: "lgo-readiness-guide-action" },
  { href: "/support/safety", label: "Đọc Hỗ trợ an toàn", className: "lgo-readiness-guide-action" }
] as const;

/** Authored readiness guidance; gate state stays owned by the existing readiness page. */
export function PublicReleaseReadinessGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-readiness-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang kiểm sẵn sàng">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Kiểm sẵn sàng trước lời mời test</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang sẵn sàng" badgeTone="gold" kicker="Cổng duyệt · Bằng chứng · Đồng bộ · Kỳ vọng"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#readiness-guide-step-01", label: "Đọc từ cổng phát hành", tone: "gold" }, { href: "/release/readiness", label: "Mở trang sẵn sàng phát hành", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Bài hướng dẫn không phê duyệt phát hành hoặc mở quyền test. Bằng chứng và trạng thái cổng được đọc tại trang Sẵn sàng phát hành, không được suy ra từ việc đọc xong bài này.</p>}
      visual={<ReadingPriorityPanel headingId="readiness-guide-priorities-heading" overline="Đọc trước một lời mời"
        title="Bốn việc cần đối chiếu"
        items={steps.map(step => ({ label: step.step, value: step.title, href: `#readiness-guide-step-${step.step}` }))}
        note="Mở từng phần hướng dẫn, không phải kết quả phê duyệt hoặc tiến trình đăng ký."/>}/>
    <GuideArticle contentsId="readiness-guide-contents" contentsLabel="Mục lục kiểm sẵn sàng phát hành"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        const group = step.step === "02" ? { label: "Đối chiếu cổng và bằng chứng bản tải", links: evidenceChoices }
          : step.step === "03" ? { label: "Đọc Tải game, Trạng thái và Hỗ trợ cùng nhau", links: alignmentChoices } : undefined;
        return { id: `readiness-guide-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(group ? { actionGroup: group } : destination ? { action: { ...destination, className: "lgo-readiness-guide-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="readiness-guide-related-heading">
      <div><SectionHeading headingId="readiness-guide-related-heading" eyebrow="Chuẩn bị không thay thế phê duyệt" title="Đọc cùng một thông tin phát hành"/>
        <p>Cẩm nang giúp hiểu các điều kiện; trang Sẵn sàng phát hành trình bày các cổng cần đối chiếu. Gói tester chỉ hướng dẫn chuẩn bị, không mở đăng ký hoặc đảm bảo quyền tham gia.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/release/readiness" tone="gold">Đọc các cổng phát hành</LinkButton>
        <LinkButton href="/guides/player-trust-release-guide" tone="neutral">Cẩm nang chờ bản test</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
