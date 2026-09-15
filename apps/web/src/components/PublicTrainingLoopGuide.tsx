import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Editorial destinations for the authored steps, not game commands or canonical contracts.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/game", label: "Đọc về thế giới" },
  "02": { href: "/guides/gate-entry-guide", label: "Đọc cẩm nang Cổng Linh" },
  "03": { href: "/game/loop", label: "Xem hướng dẫn vòng lặp" },
  "04": { href: "/download/trust", label: "Đối chiếu điều kiện bản tải" }
};

/** Source-authored reading guide. It does not perform training or save player progress. */
export function PublicTrainingLoopGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-training-loop-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang luyện tập">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Luyện tập nhập môn</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang luyện tập" badgeTone="gold" kicker="Thế giới · Người dẫn đường · Đá luyện · Bản tải"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#training-loop-step-01", label: "Đọc từ bước đầu", tone: "gold" }, { href: "/guides/gate-entry-guide", label: "Cẩm nang Cổng Linh", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Đang đọc hướng dẫn, không phải đang luyện trong game. Không ghi nhận nhiệm vụ, trao thưởng hoặc lưu tiến trình.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa cảnh quan Linh Giới cho cẩm nang nhập môn" fetchPriority="high"/>
        <figcaption><span>HIỂU VÒNG ĐỌC, GIỮ ĐÚNG KỲ VỌNG</span><strong>Bốn chặng trước khi tìm bản chơi</strong><small>Tranh minh họa · Không phải bằng chứng gameplay đang chạy</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="training-loop-contents" contentsLabel="Mục lục luyện tập"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `training-loop-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(destination ? { action: { ...destination, className: "lgo-training-loop-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="training-loop-related-heading">
      <div><SectionHeading headingId="training-loop-related-heading" eyebrow="Sau khi đọc vòng luyện tập" title="Đối chiếu trước khi chờ bản chơi"/>
        <p>Trạng thái, điều kiện bản tải và hướng dẫn phản hồi là những nơi đọc tiếp. Bài viết không mở thử nghiệm hoặc cấp quyền truy cập.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/status" tone="gold">Đọc trạng thái</LinkButton>
        <LinkButton href="/guides/download-readiness-guide" tone="neutral">Đọc điều kiện bản tải</LinkButton>
        <LinkButton href="/support/safety" tone="neutral">Chuẩn bị góp ý an toàn</LinkButton>
      </div>
    </section>
  </Stack>;
}
