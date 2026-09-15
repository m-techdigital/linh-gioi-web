import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/start", label: "Mở trang Bắt đầu" },
  "03": { href: "/release/readiness", label: "Đọc phạm vi phát hành" },
  "04": { href: "/support/help", label: "Đọc câu hỏi thường gặp" }
};
// The authored second step names three alternatives. These links do not store a choice.
const readingChoices = [
  { href: "/game", label: "Tìm hiểu thế giới", className: "lgo-start-here-action" },
  { href: "/download/trust", label: "Đối chiếu bản tải", className: "lgo-start-here-action" },
  { href: "/roadmap", label: "Theo dõi lộ trình", className: "lgo-start-here-action" }
] as const;

export function PublicStartHereGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-start-here-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang bắt đầu đọc web">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Bắt đầu đọc web</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang đường đọc" badgeTone="gold" kicker="Bắt đầu · Chọn hướng · Hiểu phạm vi · Đọc tiếp"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#start-here-step-01", label: "Đọc từ bước đầu", tone: "gold" }, { href: "/start", label: "Mở trang Bắt đầu", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Chỉ chọn đường đọc, không tạo tài khoản hoặc lưu sở thích. Các liên kết không mở đăng nhập, bản tải hay quyền chơi.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa Linh Giới trong cẩm nang bắt đầu đọc web" fetchPriority="high"/>
        <figcaption><span>ĐỌC ĐÚNG HƯỚNG, HIỂU ĐÚNG PHẠM VI</span><strong>Một hướng đọc, một nhu cầu</strong><small>Tranh minh họa · Không phải bản đồ hoặc phiên chơi</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="start-here-contents" contentsLabel="Mục lục bắt đầu đọc web"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `start-here-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(step.step === "02" ? { actionGroup: { label: "Chọn nhóm trang phù hợp", links: readingChoices } }
              : destination ? { action: { ...destination, className: "lgo-start-here-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="start-here-related-heading">
      <div><SectionHeading headingId="start-here-related-heading" eyebrow="Sau khi chọn hướng đọc" title="Tìm bài phù hợp và đối chiếu trạng thái"/>
        <p>Thư viện cẩm nang, trạng thái và hướng dẫn phản hồi là các đường đọc tiếp. Không có hồ sơ cá nhân, tiến trình tài khoản hoặc lời mời kiểm thử được tạo từ lựa chọn này.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/guides" tone="gold">Tìm bài hướng dẫn</LinkButton>
        <LinkButton href="/status" tone="neutral">Đọc trạng thái hiện tại</LinkButton>
        <LinkButton href="/support/safety" tone="neutral">Chuẩn bị phản hồi an toàn</LinkButton>
      </div>
    </section>
  </Stack>;
}
