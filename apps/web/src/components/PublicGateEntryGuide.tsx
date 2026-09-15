import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/game", label: "Đọc về thế giới" },
  "02": { href: "/game/loop", label: "Đọc vòng lặp nhập môn" },
  "03": { href: "/download/trust", label: "Đối chiếu điều kiện bản tải" }
};

/** Presents this published guide's authored content; links never execute gameplay. */
export function PublicGateEntryGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-gate-entry-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn Cổng Linh">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Cổng Linh nhập môn</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang Cổng Linh" badgeTone="gold" kicker="Cổng vào · Người Giữ Cổng · Đá Luyện"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#gate-entry-step-01", label: "Đọc từ Cổng Linh", tone: "gold" }, { href: "/guides/beginner", label: "Cẩm nang người mới", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Đang đọc cẩm nang, không phải đang chơi. Nội dung không cấp quyền truy cập, mở nhiệm vụ hoặc trao phần thưởng.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa cổng thành Linh Giới giữa núi mây" fetchPriority="high"/>
        <figcaption><span>HIỂU ĐIỂM BẮT ĐẦU</span><strong>Qua cổng bằng kỳ vọng rõ ràng</strong><small>Tranh minh họa · Không phải bản đồ hoặc gameplay trực tuyến</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="gate-entry-contents" contentsLabel="Mục lục Cổng Linh"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `gate-entry-step-${step.step}`, marker: step.step, title: step.title,
          body: <>
            <p className="lgo-article-instruction">{step.action}</p>
            <div className="lgo-article-outcome"><h3><ReleaseIcon name="document"/>Điều cần hiểu</h3><p>{step.expectedResult}</p></div>
            <div className="lgo-article-boundary"><h3><ReleaseIcon name="lock"/>Giới hạn hiện tại</h3><p>{step.blockedScope}</p></div>
            {destination ? <LinkButton className="lgo-gate-entry-action" href={destination.href} tone="neutral">{destination.label}<ReleaseIcon name="arrow"/></LinkButton> : null}
          </> };
      })}/>
    <section id="gate-entry-related" className="lgo-article-related lgo-release-frame" aria-labelledby="gate-entry-related-heading">
      <div><SectionHeading headingId="gate-entry-related-heading" eyebrow="Sau khi hiểu cổng vào" title="Đọc tiếp trước khi tìm bản chơi"/>
        <p>Hướng dẫn luyện tập, trạng thái và nguồn bản tải là các lối đọc tiếp theo. Không có nhiệm vụ hoàn thành, phần thưởng hoặc quyền kiểm thử được cấp từ bài viết này.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/guides/beginner-training-loop-guide" tone="gold">Đọc hướng dẫn luyện tập</LinkButton>
        <LinkButton href="/status" tone="neutral">Đọc trạng thái</LinkButton>
        <LinkButton href="/support/safety" tone="neutral">Chuẩn bị góp ý an toàn</LinkButton>
      </div>
    </section>
  </Stack>;
}
