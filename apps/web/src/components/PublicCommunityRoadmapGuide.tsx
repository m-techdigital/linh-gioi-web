import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// These destinations explain current boundaries; they do not enroll users or grant access.
const readingDestinations: Record<string, { href: string; label: string }> = {
  "01": { href: "/status", label: "Đọc trạng thái hiện tại" },
  "02": { href: "/roadmap", label: "Đọc các mốc lộ trình" },
  "03": { href: "/support/safety", label: "Chuẩn bị phản hồi an toàn" },
  "04": { href: "/community", label: "Đọc định hướng cộng đồng" }
};

/** Published orientation only: no live schedule, membership or tester entitlement. */
export function PublicCommunityRoadmapGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-community-roadmap-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang lộ trình cộng đồng">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Lộ trình cộng đồng</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang cộng đồng" badgeTone="gold" kicker="Trạng thái · Lộ trình · Góp ý · Thông báo"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#community-roadmap-step-01", label: "Đọc từ trạng thái", tone: "gold" }, { href: "/community/onboarding", label: "Hướng dẫn hòa nhập", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Bài hướng dẫn không mở đăng ký, không cấp quyền kiểm thử. Các mốc đọc không phải lịch mở test hoặc lời mời tham gia.</p>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh minh họa thế giới Linh Giới trong cẩm nang cộng đồng" fetchPriority="high"/>
        <figcaption><span>HIỂU LỘ TRÌNH TRƯỚC KHI KỲ VỌNG</span><strong>Đọc điều kiện, không đoán ngày</strong><small>Tranh minh họa · Không phải sự kiện cộng đồng đang diễn ra</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId="community-roadmap-contents" contentsLabel="Mục lục lộ trình cộng đồng"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        return { id: `community-roadmap-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(destination ? { action: { ...destination, className: "lgo-community-roadmap-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="community-roadmap-related-heading">
      <div><SectionHeading headingId="community-roadmap-related-heading" eyebrow="Sau khi đọc các mốc" title="Theo dõi bằng thông tin có nguồn"/>
        <p>Đọc cách hòa nhập, điều kiện bản tải và các cổng duyệt phát hành. Những đường dẫn này không tạo tài khoản, lưu đăng ký hoặc hứa ngày mở thử nghiệm.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/community/onboarding" tone="gold">Đọc cách hòa nhập</LinkButton>
        <LinkButton href="/download/trust" tone="neutral">Đối chiếu điều kiện bản tải</LinkButton>
        <LinkButton href="/release/readiness" tone="neutral">Đọc các cổng duyệt</LinkButton>
      </div>
    </section>
  </Stack>;
}
