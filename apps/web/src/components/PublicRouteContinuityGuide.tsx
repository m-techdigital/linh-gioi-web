import { guideDetailSteps } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, GuideChapterBody, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// Existing public reading destinations; none is a launch, login or support submission.
const readingRoutes = [
  { label: "01", value: "Bắt đầu", href: "/start" },
  { label: "02", value: "Vòng lặp thế giới", href: "/game/loop" },
  { label: "03", value: "Tin cậy tải game", href: "/download/trust" },
  { label: "04", value: "Trạng thái", href: "/status" },
  { label: "05", value: "Hỗ trợ an toàn", href: "/support/safety" }
] as const;
const firstChoices = [
  { href: "/start", label: "Mở trang Bắt đầu", className: "lgo-route-continuity-guide-action" },
  { href: "/journey", label: "Xem bản đồ hành trình", className: "lgo-route-continuity-guide-action" }
] as const;
const releaseChoices = [
  { href: "/download/trust", label: "Đối chiếu bản tải", className: "lgo-route-continuity-guide-action" },
  { href: "/status", label: "Đọc trạng thái hiện tại", className: "lgo-route-continuity-guide-action" }
] as const;
const readingDestinations: Record<string, { href: string; label: string }> = {
  "02": { href: "/game/loop", label: "Đọc vòng lặp thế giới" },
  "04": { href: "/support/safety", label: "Chuẩn bị phản hồi an toàn" }
};

export function PublicRouteContinuityGuide({ entry }: { entry: ContentEntry }) {
  const steps = guideDetailSteps.filter(step => step.slug === entry.slug);
  return <Stack className="lgo-release-layout lgo-route-continuity-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn cẩm nang luồng đọc">
      <a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Đi tiếp đúng luồng đọc</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Cẩm nang luồng đọc" badgeTone="gold" kicker="Hiểu thế giới · Đối chiếu bản tải · Phản hồi an toàn"
      title={entry.title} lead={entry.summary}
      actions={[{ href: "#continuity-guide-step-01", label: "Đọc từ điểm bắt đầu", tone: "gold" }, { href: "/start", label: "Chọn nhu cầu ở Bắt đầu", tone: "neutral" }]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Các liên kết chỉ mở trang hướng dẫn, không cấp quyền chơi, tải game hoặc hỗ trợ trực tiếp. Bạn có thể chọn phần phù hợp mà không phải đăng nhập.</p>}
      visual={<ReadingPriorityPanel headingId="continuity-guide-routes-heading" overline="Chọn trang cần đọc"
        title="Năm đường đọc chính" items={readingRoutes}
        note="Đường đọc gợi ý, không phải tiến trình tài khoản hoặc các điều kiện đã được duyệt."/>}/>
    <GuideArticle contentsId="continuity-guide-contents" contentsLabel="Mục lục đi tiếp đúng luồng đọc"
      intro={<><span className="lgo-article-intro-label">Phạm vi của bài hướng dẫn</span><p>{entry.body}</p></>}
      sections={steps.map(step => {
        const destination = readingDestinations[step.step];
        const group = step.step === "01" ? { label: "Chọn hướng bắt đầu", links: firstChoices }
          : step.step === "03" ? { label: "Đối chiếu tải game và trạng thái", links: releaseChoices } : undefined;
        return { id: `continuity-guide-step-${step.step}`, marker: step.step, title: step.title,
          body: <GuideChapterBody instruction={step.action} outcome={step.expectedResult} boundary={step.blockedScope}
            {...(group ? { actionGroup: group } : destination ? { action: { ...destination, className: "lgo-route-continuity-guide-action" } } : {})}/>
        };
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="continuity-guide-related-heading">
      <div><SectionHeading headingId="continuity-guide-related-heading" eyebrow="Tìm đúng thông tin trước hành động" title="Đi tiếp với kỳ vọng rõ ràng"/>
        <p>Thư viện cẩm nang giúp chọn bài đọc. Trang Bắt đầu giúp chọn nhu cầu; Hỗ trợ an toàn giải thích cách chuẩn bị phản hồi. Những đường dẫn này không gửi dữ liệu hoặc tạo quyền truy cập.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions">
        <LinkButton href="/start" tone="gold">Chọn hướng ở Bắt đầu</LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm bài hướng dẫn</LinkButton>
        <LinkButton href="/support/safety" tone="neutral">Đọc hướng dẫn an toàn</LinkButton>
      </div>
    </section>
  </Stack>;
}
