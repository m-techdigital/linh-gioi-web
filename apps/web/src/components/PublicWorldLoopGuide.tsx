import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

/** This view presents the existing authored guide, not a substitute game client. */
export function PublicWorldLoopGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-world-loop-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn bài viết">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Vòng lặp thế giới</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang nhập môn" badgeTone="gold" kicker="Cổng vào · Người dẫn đường · Luyện tập · Bản tải"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#world-loop-step-01", label: "Bắt đầu đọc", tone: "gold" }, { href: "/game/loop", label: "Xem vòng lặp", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Hướng dẫn công khai, không phải combat trực tiếp hay tiến trình theo tài khoản.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Minh họa kiến trúc Linh Giới giữa núi mây" fetchPriority="high"/>
        <figcaption><span>HIỂU ĐƯỜNG ĐI, GIỮ ĐÚNG KỲ VỌNG</span><strong>Bốn phần, một hành trình đọc</strong><small>Tranh minh họa · Không phải bằng chứng bản dựng đang chạy</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="world-loop-contents" contentsLabel="Mục lục vòng lặp thế giới"
      intro={<><span className="lgo-article-intro-label">Trước khi bắt đầu</span><p>{entry.body}</p></>}
      sections={steps.map(step => ({
        id: `world-loop-step-${step.step}`, marker: step.step, title: step.title,
        body: <>
          <p className="lgo-article-instruction">{step.action}</p>
          <div className="lgo-article-outcome"><h3><ReleaseIcon name="document"/>Điều cần hiểu</h3><p>{step.expectedResult}</p></div>
          <div className="lgo-article-boundary"><h3><ReleaseIcon name="lock"/>Giới hạn hiện tại</h3><p>{step.blockedScope}</p></div>
        </>
      }))}/>
    <section id="world-loop-guide-related" className="lgo-article-related lgo-release-frame" aria-labelledby="world-loop-related-heading">
      <div><SectionHeading headingId="world-loop-related-heading" eyebrow="Từ cẩm nang tới bước đọc tiếp" title="Đối chiếu trước khi kỳ vọng chơi"/>
        <p>Đọc điều kiện bản tải và hướng dẫn phản hồi; bài viết không cấp quyền chơi, hoàn thành nhiệm vụ hoặc nhận thưởng.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/game/loop" tone="gold">Xem vòng lặp</LinkButton>
        <LinkButton href="/download/trust" tone="neutral">Tin cậy bản tải</LinkButton>
        <LinkButton href="/support/safety" tone="neutral">Phản hồi an toàn</LinkButton>
      </div>
    </section>
  </Stack>;
}
