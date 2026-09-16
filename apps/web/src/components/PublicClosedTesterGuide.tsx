import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Reading destinations only. The tester page owns its existing local controls and templates.
const chapterChoices: Readonly<Record<string, { label: string; links: { href: string; label: string; className: string }[] }>> = {
  "01": { label: "Đọc checklist và thông tin thiết bị", links: [
    { href: "/release/tester-pack#tester-checklist", label: "Mở checklist chuẩn bị", className: "lgo-tester-guide-action" },
    { href: "/release/tester-pack#tester-device", label: "Đọc thông tin thiết bị cần chuẩn bị", className: "lgo-tester-guide-action" }
  ] },
  "02": { label: "Đọc mẫu phản hồi và giữ riêng dữ liệu", links: [
    { href: "/release/tester-pack#tester-feedback", label: "Mở mẫu phản hồi an toàn", className: "lgo-tester-guide-action" },
    { href: "/support/safety", label: "Đọc nguyên tắc bảo vệ dữ liệu", className: "lgo-tester-guide-action" }
  ] },
  "03": { label: "Đối chiếu giới hạn và trạng thái", links: [
    { href: "/release/tester-pack#tester-limits", label: "Đọc giới hạn đã biết", className: "lgo-tester-guide-action" },
    { href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-tester-guide-action" }
  ] },
  "04": { label: "Đối chiếu điều kiện trước khi gửi phản hồi", links: [
    { href: "/release/readiness", label: "Kiểm tra cổng phát hành", className: "lgo-tester-guide-action" },
    { href: "/download/trust", label: "Đối chiếu tin cậy bản tải", className: "lgo-tester-guide-action" },
    { href: "/support/safety", label: "Đọc hướng dẫn hỗ trợ an toàn", className: "lgo-tester-guide-action" }
  ] }
};

/** Source-authored preparation guide; no registration, private-data intake or test entitlement. */
export function PublicClosedTesterGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-tester-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang chuẩn bị tester">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Chuẩn bị thông tin tester</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Sổ tay chuẩn bị tester" badgeTone="gold" kicker="Checklist · Phản hồi · Giới hạn · Điều kiện"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#tester-guide-step-01", label: "Đọc từ checklist chuẩn bị", tone: "gold" }, { href: "/release/tester-pack", label: "Mở gói hướng dẫn tester", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Hướng dẫn chuẩn bị, không phải form đăng ký. Đọc bài hoặc đánh dấu checklist không cấp suất test; không gửi mật khẩu, token hay dữ liệu riêng tư.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh thế giới Linh Giới minh họa cho cẩm nang chuẩn bị tester" fetchPriority="high"/>
        <figcaption><span>CHUẨN BỊ RÕ · PHẢN HỒI AN TOÀN</span><strong>Sổ tay trước một lời mời</strong><small>Tranh minh họa · Không phải lời mời thử nghiệm hoặc bản game được phát hành</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="tester-guide-contents" contentsLabel="Mục lục chuẩn bị thông tin tester"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const actionGroup = chapterChoices[step.step];
        return { id: `tester-guide-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(actionGroup ? { actionGroup } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="tester-guide-related-heading">
      <div><SectionHeading headingId="tester-guide-related-heading" eyebrow="Chuẩn bị đúng, chờ kênh được duyệt" title="Ghi nhận rõ ràng, không gửi vội"/>
        <p>Gói tester có checklist, mẫu văn bản và hướng dẫn thiết bị. Những công cụ local đó giúp chuẩn bị, không thay thế kênh tiếp nhận được phê duyệt hoặc xác nhận quyền tham gia.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/release/tester-pack" tone="gold">Đọc gói hướng dẫn tester</LinkButton>
        <LinkButton href="/guides/release-readiness-hub-guide" tone="neutral">Cẩm nang kiểm sẵn sàng</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
