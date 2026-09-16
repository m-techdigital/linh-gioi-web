import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Explanatory destinations only: no report intake, file upload or account lookup.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/support/help", label: "Đọc câu hỏi thường gặp" },
  "02": { href: "/support/safety", label: "Chuẩn bị báo lỗi an toàn" }
};
const readingGroups: Record<string, { label: string; links: readonly { href: string; label: string; className: string }[] }> = {
  "03": { label: "Các trang định hướng cộng đồng", links: [
    { href: "/community", label: "Đọc về cộng đồng", className: "lgo-player-safety-action" },
    { href: "/roadmap", label: "Theo dõi lộ trình", className: "lgo-player-safety-action" }
  ] },
  "04": { label: "Đối chiếu trước khi chờ hỗ trợ", links: [
    { href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-player-safety-action" },
    { href: "/download/trust", label: "Đối chiếu bản tải", className: "lgo-player-safety-action" },
    { href: "/support", label: "Đọc phạm vi hỗ trợ", className: "lgo-player-safety-action" }
  ] }
};

/** Preserves authored safety guidance and exposes its actual reading destinations. */
export function PublicPlayerSafetyGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-player-safety-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang an toàn người chơi">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">An toàn người chơi</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang an toàn" badgeTone="gold" kicker="Đọc FAQ · Giữ riêng tư · Theo dõi · Đối chiếu"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#player-safety-step-01", label: "Đọc từ FAQ hỗ trợ", tone: "gold" }, { href: "/support/safety", label: "Hướng dẫn báo lỗi an toàn", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Hướng dẫn chuẩn bị, không nhận báo lỗi hoặc dữ liệu riêng tư. Không có nơi nhập mật khẩu, token hay tải tệp lên trong bài viết.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa Linh Giới trong cẩm nang an toàn người chơi" fetchPriority="high"/>
        <figcaption><span>HIỂU PHẠM VI, GIỮ THÔNG TIN RIÊNG TƯ</span><strong>Chuẩn bị rõ, góp ý an toàn</strong><small>Tranh minh họa · Không phải hệ thống hỗ trợ trực tuyến</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="player-safety-contents" contentsLabel="Mục lục an toàn người chơi"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step], group = readingGroups[step.step];
        return { id: `player-safety-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(group ? { actionGroup: group } : destination ? { action: { ...destination, className: "lgo-player-safety-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="player-safety-related-heading">
      <div><SectionHeading headingId="player-safety-related-heading" eyebrow="Đọc tiếp theo nhu cầu" title="Giữ đúng phạm vi trước khi phản hồi"/>
        <p>Các đường dẫn giúp đọc hướng dẫn, hiểu cách hòa nhập và tìm thông tin đã công bố. Không tạo phiếu hỗ trợ, lưu hồ sơ hay xác nhận dữ liệu của bạn đã được xử lý.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/support/safety" tone="gold">Đọc hướng dẫn chuẩn bị</LinkButton>
        <LinkButton href="/community/onboarding" tone="neutral">Đọc cách hòa nhập</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
      </div>
    </section>
  </Stack>;
}
