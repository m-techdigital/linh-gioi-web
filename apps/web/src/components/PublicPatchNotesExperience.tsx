import type { ContentEntry } from "@lgo-web/content";
import { AnnouncementBoard, ArticleFragmentRestoration, ExperienceHero, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading } from "@lgo-web/ui";

const patchBoundary = "Bản ghi không mở tải build mới hoặc xác nhận phát hành game.";
const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });

export function PublicPatchNotesHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-announcement-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Nhật ký phát triển" badgeTone="gold" kicker="Thay đổi được ghi nhận · Phạm vi được nói rõ"
    title="Ghi chú cập nhật Linh Giới" lead="Trang patch notes giúp người chơi theo dõi thay đổi web công khai và ranh giới phát triển trước khi có nguồn phát hành production."
    actions={[{ href: "#patch-notes-announcements", label: "Đọc nhật ký hiện có", tone: "gold" }, { href: "/release", label: "Hiểu lộ trình phát hành", tone: "neutral" }]}
    detail={<><p className="lgo-library-boundary"><ReleaseIcon name="shield"/><span>{patchBoundary}</span></p><p className="lgo-release-art-note">Tranh minh họa thế giới · Không phải ảnh bản cập nhật đã phát hành</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <ReadingPriorityPanel headingId="patch-notes-expectations-heading" overline="Đọc đúng loại thông tin" title="Nhật ký, chưa phải bản tải"
        items={[{ label: "Nội dung", value: "Ghi nhận thay đổi web" }, { label: "Ngày đăng", value: "Không phải ngày phát hành game" }, { label: "Bản tải", value: "Đối chiếu tại trang Tải game" }]}
        note="Các ghi chú giữ nguyên phạm vi tại thời điểm đăng. Đọc nhật ký không cài bản vá hoặc thay đổi trạng thái chơi."/>
    </>}/>;
}

export function PublicPatchNoteRecords({ entries }: { entries: readonly ContentEntry[] }) {
  return <section id="patch-notes-announcements" className="lgo-release-reading-panel lgo-release-frame" tabIndex={-1} aria-labelledby="patch-notes-records-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="patch-notes-records-heading" eyebrow="Nhật ký công khai" title="Những thay đổi đã được ghi lại"/>
      <p>{entries.length} bản ghi từ nội dung đã công bố.<br/>Không phải số phiên bản game có thể tải.</p></div>
    <AnnouncementBoard label="Nhật ký phát triển công khai" items={entries.map(entry => ({ id: entry.slug, title: entry.title, summary: entry.summary, body: entry.body,
      publication: { iso: entry.publishedAt, label: publicationDate.format(new Date(entry.publishedAt)) } }))}
      copy={{ eyebrow: "Nhật ký phát triển", publicationNote: "Không phải ngày phát hành game", disclosureLabel: "Đọc toàn bộ bản ghi" }}
      boundary={patchBoundary} emptyTitle="Chưa có ghi chú cập nhật công khai" emptyDescription="Nhật ký hiện chưa có bản ghi được công bố. Không tạo phiên bản hoặc thông báo mẫu để lấp chỗ trống."/>
    <ArticleFragmentRestoration targetIds={["patch-notes-announcements"]}/>
  </section>;
}

export function PublicPatchNotesReadingRoutes() {
  return <section className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="patch-notes-reading-heading">
    <SectionHeading headingId="patch-notes-reading-heading" eyebrow="Đọc nhật ký rồi đối chiếu hiện trạng" title="Trước khi tìm một bản tải"/>
    <p>Đây là nhật ký tĩnh lưu trong source. Page không phải hệ thống phát hành production, CMS vận hành, release launcher hoặc hợp đồng backend được chấp nhận.</p>
    <nav className="lgo-announcement-reading-routes lgo-patch-notes-reading-routes" aria-label="Luồng đọc ghi chú cập nhật">
      <LinkButton href="/status" tone="gold">Đọc Trạng thái <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/roadmap" tone="neutral">Xem Roadmap <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/download" tone="neutral">Đọc điều kiện tải <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/download/trust" tone="neutral">Đối chiếu độ tin cậy <ReleaseIcon name="arrow"/></LinkButton>
    </nav>
    <small>NO_ACCEPTED_BACKEND_CONTRACT · Nhật ký không thay thế bằng chứng phát hành, bản vá hoặc changelog backend.</small>
  </section>;
}
