import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Native reading routes; the chapter-three link returns to this article's contents.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/accessibility", label: "Đọc hướng dẫn điều hướng" },
  "02": { href: "/start", label: "Mở trang Bắt đầu" },
  "03": { href: "#readability-guide-contents", label: "Chọn phần cần đọc" }
};
const boundaryChoices = [
  { href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-readability-guide-action" },
  { href: "/download/trust", label: "Đối chiếu bản tải", className: "lgo-readability-guide-action" },
  { href: "/support/safety", label: "Đọc hướng dẫn an toàn", className: "lgo-readability-guide-action" }
] as const;

/** Reading assistance using the existing article; no preferences or conformance claims. */
export function PublicReadabilityGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-readability-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang cách đọc web">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Đọc web dễ hơn</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang cách đọc" badgeTone="gold" kicker="Quét tiêu đề · Chọn hướng · Đọc trên mobile · Hiểu giới hạn"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#readability-guide-step-01", label: "Đọc từ cách quét tiêu đề", tone: "gold" }, { href: "/accessibility", label: "Mở trang Dễ đọc", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Hướng dẫn cách đọc, không phải chứng nhận khả năng truy cập. Bài viết không tạo thiết lập tài khoản, thay đổi toàn website hoặc cấp quyền chơi.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa Linh Giới trong cẩm nang cách đọc web" fetchPriority="high"/>
        <figcaption><span>CHỌN PHẦN PHÙ HỢP, GIỮ ĐỦ NỘI DUNG</span><strong>Đọc rõ, đi đúng hướng</strong><small>Tranh minh họa · Không phải đánh giá hoặc chứng nhận truy cập</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="readability-guide-contents" contentsLabel="Mục lục cách đọc web"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `readability-guide-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(step.step === "04" ? { actionGroup: { label: "Đọc ranh giới trước kỳ vọng", links: boundaryChoices } }
              : destination ? { action: { ...destination, className: "lgo-readability-guide-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="readability-guide-related-heading">
      <div><SectionHeading headingId="readability-guide-related-heading" eyebrow="Chọn đường đọc tiếp theo" title="Đọc theo nhu cầu, không cần đoán đường đi"/>
        <p>Trang Dễ đọc có hướng dẫn điều hướng và khung thực hành bàn phím. Trang Bắt đầu và thư viện cẩm nang giúp tìm nội dung; các liên kết không lưu lựa chọn hoặc cấp quyền tài khoản.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/accessibility" tone="gold">Mở hướng dẫn và thực hành</LinkButton>
        <LinkButton href="/start" tone="neutral">Mở trang Bắt đầu</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
