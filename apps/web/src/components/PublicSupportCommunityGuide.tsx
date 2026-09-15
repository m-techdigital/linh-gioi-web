import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Editorial destinations only: none accepts a report, credentials or a community registration.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/support/help", label: "Đọc câu hỏi thường gặp" },
  "02": { href: "/support/safety", label: "Chuẩn bị phản hồi an toàn" },
  "03": { href: "/community", label: "Đọc về cộng đồng" },
  "04": { href: "/status", label: "Đối chiếu trạng thái hiện tại" }
};

/** Renders the published support guide without providing a ticket or live community service. */
export function PublicSupportCommunityGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-support-community-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang hỗ trợ">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Hỗ trợ và cộng đồng</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang cộng đồng" badgeTone="gold" kicker="Đọc FAQ · Giữ riêng tư · Theo dõi · Góp ý"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#support-community-step-01", label: "Đọc từ câu hỏi thường gặp", tone: "gold" }, { href: "/support/safety", label: "Hướng dẫn an toàn", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Hướng dẫn đọc và chuẩn bị phản hồi, không phải nơi gửi yêu cầu hỗ trợ. Không nhận mật khẩu, token hoặc tệp riêng tư.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa Linh Giới trong cẩm nang hỗ trợ và cộng đồng" fetchPriority="high"/>
        <figcaption><span>HIỂU PHẠM VI, GIỮ THÔNG TIN AN TOÀN</span><strong>Cùng hiểu để góp ý tốt hơn</strong><small>Tranh minh họa · Không phải kênh cộng đồng đang hoạt động</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="support-community-contents" contentsLabel="Mục lục hỗ trợ và cộng đồng"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `support-community-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(destination ? { action: { ...destination, className: "lgo-support-community-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="support-community-related-heading">
      <div><SectionHeading headingId="support-community-related-heading" eyebrow="Sau khi hiểu phạm vi" title="Đọc tiếp, không gửi thông tin riêng tư"/>
        <p>Đọc hướng dẫn hỗ trợ, nguyên tắc hòa nhập và lộ trình hiện tại. Các đường dẫn này không mở phiếu hỗ trợ, trò chuyện hay đăng ký tham gia.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/support" tone="gold">Tìm hướng dẫn hỗ trợ</LinkButton>
        <LinkButton href="/community/onboarding" tone="neutral">Đọc cách hòa nhập</LinkButton>
        <LinkButton href="/roadmap" tone="neutral">Theo dõi lộ trình</LinkButton>
      </div>
    </section>
  </Stack>;
}
