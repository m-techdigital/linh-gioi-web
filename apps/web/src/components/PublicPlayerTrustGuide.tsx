import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Reading links explain evidence requirements; they never approve a build or enroll a tester.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/release", label: "Đọc giai đoạn phát hành" },
  "02": { href: "/download/trust", label: "Đối chiếu điều kiện bản tải" }
};
const supportChoices = [
  { href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-player-trust-action" },
  { href: "/support/safety", label: "Chuẩn bị phản hồi an toàn", className: "lgo-player-trust-action" }
] as const;
const preparationChoices = [
  { href: "/release/tester-pack#tester-checklist", label: "Mở checklist chuẩn bị", className: "lgo-player-trust-action" },
  { href: "/release/readiness", label: "Đọc điều kiện thử nghiệm", className: "lgo-player-trust-action" }
] as const;

export function PublicPlayerTrustGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-player-trust-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang chờ bản test">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Tin cậy trước bản test</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang trước bản test" badgeTone="gold" kicker="Giai đoạn · Bằng chứng · Hỗ trợ · Chuẩn bị"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#player-trust-step-01", label: "Đọc từ giai đoạn phát hành", tone: "gold" }, { href: "/release", label: "Mở trang Phát hành", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Đọc hướng dẫn không cấp suất test hoặc quyền tải. Trang này không mở đăng ký, phát gói game hoặc nhận dữ liệu tài khoản.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh thế giới Linh Giới minh họa cho bài hướng dẫn chờ bản test" fetchPriority="high"/>
        <figcaption><span>HIỂU GIAI ĐOẠN · CHỜ ĐỦ BẰNG CHỨNG</span><strong>Lộ trình không phải quyền truy cập</strong><small>Tranh minh họa · Không phải bản test hoặc lời mời tham gia</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="player-trust-contents" contentsLabel="Mục lục tin cậy trước bản test"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        const group = step.step === "03" ? { label: "Đọc trạng thái và chuẩn bị phản hồi", links: supportChoices }
          : step.step === "04" ? { label: "Đọc checklist và điều kiện thử nghiệm", links: preparationChoices } : undefined;
        return { id: `player-trust-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(group ? { actionGroup: group } : destination ? { action: { ...destination, className: "lgo-player-trust-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="player-trust-related-heading">
      <div><SectionHeading headingId="player-trust-related-heading" eyebrow="Kiểm thông tin trước kỳ vọng" title="Chuẩn bị đúng, không nhầm thành đăng ký"/>
        <p>Gói tester hướng dẫn chuẩn bị và phản hồi; trang sẵn sàng phát hành giải thích các điều kiện còn phải đáp ứng. Những nội dung này không bảo đảm suất test hoặc tự cấp quyền chơi.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/release/tester-pack" tone="gold">Đọc gói hướng dẫn tester</LinkButton>
        <LinkButton href="/guides/release-trust-and-checksum-guide" tone="neutral">Cẩm nang đối chiếu bản tải</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
