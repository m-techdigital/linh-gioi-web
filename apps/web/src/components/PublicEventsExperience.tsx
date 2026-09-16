import type { ContentEntry } from "@lgo-web/content";
import { AnnouncementBoard, ArticleFragmentRestoration, ExperienceHero, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading } from "@lgo-web/ui";

const eventBoundary = "Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.";
const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });

export function PublicEventsHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-announcement-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Bảng tin cộng đồng" badgeTone="gold" kicker="Chủ đề tương lai · Kỳ vọng rõ ràng"
    title="Sự kiện Linh Giới" lead="Trang sự kiện giúp người chơi hiểu hướng vận hành cộng đồng của Linh Giới Online trước khi có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện."
    actions={[{ href: "#events-announcements", label: "Đọc thông báo hiện có", tone: "gold" }, { href: "/community", label: "Khám phá cộng đồng", tone: "neutral" }]}
    detail={<><p className="lgo-library-boundary"><ReleaseIcon name="shield"/><span>{eventBoundary}</span></p><p className="lgo-release-art-note">Tranh minh họa thế giới · Không phải hình sự kiện đang diễn ra</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <ReadingPriorityPanel headingId="events-expectations-heading" overline="Đọc trước khi hẹn lịch" title="Thông báo, chưa phải lời mời"
        items={[{ label: "Lịch tổ chức", value: "Chưa có lịch live" }, { label: "Tham gia", value: "Chưa mở đăng ký" }, { label: "Phần thưởng", value: "Chưa có cam kết" }]}
        note="Chủ đề trong bảng tin là định hướng. Ngày đăng nội dung không phải ngày tổ chức sự kiện."/>
    </>}/>;
}
export function PublicEventAnnouncements({ entries }: { entries: readonly ContentEntry[] }) {
  return <section id="events-announcements" className="lgo-release-reading-panel lgo-release-frame" tabIndex={-1} aria-labelledby="events-announcements-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="events-announcements-heading" eyebrow="Thông báo công khai" title="Chủ đề đang được giới thiệu"/>
      <p>{entries.length} thông báo từ nội dung đã công bố.<br/>Không phải số sự kiện đang hoạt động.</p></div>
    <AnnouncementBoard label="Thông báo định hướng sự kiện" items={entries.map(entry => ({ id: entry.slug, title: entry.title, summary: entry.summary, body: entry.body,
      publication: { iso: entry.publishedAt, label: publicationDate.format(new Date(entry.publishedAt)) } }))}
      boundary={eventBoundary} emptyTitle="Chưa có thông báo sự kiện công khai" emptyDescription="Bảng tin hiện chưa có nội dung được công bố. Không tạo lịch hoặc thông báo mẫu để lấp chỗ trống."/>
    <ArticleFragmentRestoration targetIds={["events-announcements"]}/>
  </section>;
}
export function PublicEventsReadingRoutes() {
  return <section className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="events-reading-heading">
    <SectionHeading headingId="events-reading-heading" eyebrow="Đọc thông tin trước khi kỳ vọng tham gia" title="Đối chiếu cùng cộng đồng"/>
    <p>Đây là nội dung tĩnh lưu trong source. Page không phải hệ quản trị nội dung production, lịch vận hành thật, bộ lập lịch backend hoặc hệ thống đăng ký sự kiện.</p>
    <nav className="lgo-announcement-reading-routes lgo-events-reading-routes" aria-label="Luồng đọc sự kiện">
      <LinkButton href="/status" tone="gold">Đọc Trạng thái <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/roadmap" tone="neutral">Xem Roadmap <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/community" tone="neutral">Đọc về Cộng đồng <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/support/help" tone="neutral">FAQ hỗ trợ <ReleaseIcon name="arrow"/></LinkButton>
    </nav>
    <small>NO_ACCEPTED_BACKEND_CONTRACT · Đọc bảng tin không tạo đăng ký, quyền tham gia hoặc phần thưởng.</small>
  </section>;
}
