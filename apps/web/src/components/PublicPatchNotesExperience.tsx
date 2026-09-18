import type { ContentEntry } from "@lgo-web/content";
import { AnnouncementBoard, ArticleFragmentRestoration, ExperienceHero, LinkButton, ReadingPriorityPanel, ReleaseIcon, SectionHeading } from "@lgo-web/ui";

const patchBoundary = "Bản ghi không mở tải build mới hoặc xác nhận phát hành game.";
const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });

export function PublicPatchNotesHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-announcement-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Ghi chú phát hành" badgeTone="gold" kicker="Trạng thái game trước · Lịch sử Web tách riêng"
    title="Ghi chú cập nhật Linh Giới" lead="Hiện chưa có ghi chú phát hành game được xác nhận. Trang này tách trạng thái game dành cho người chơi khỏi hai bản ghi kỹ thuật Web đang được giữ để đối chiếu lịch sử."
    actions={[{ href: "#patch-notes-announcements", label: "Xem trạng thái cập nhật", tone: "gold" }, { href: "/release", label: "Hiểu lộ trình phát hành", tone: "neutral" }]}
    detail={<p className="lgo-release-art-note">Tranh minh họa thế giới · Không phải ảnh bản cập nhật đã phát hành</p>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <ReadingPriorityPanel headingId="patch-notes-expectations-heading" overline="Đọc đúng loại thông tin" title="Game trước, Web archive sau"
        items={[{ label: "Game release note", value: "Chưa được xác nhận" }, { label: "Nhật ký Web", value: "Giữ trong archive" }, { label: "Bản tải", value: "Đối chiếu tại trang Tải game" }]}
        note="Ngày đăng bản ghi Web không phải ngày phát hành game. Trang này không cài bản vá hoặc thay đổi trạng thái chơi."/>
    </>}/>;
}

export function PublicPatchNoteRecords({ entries }: { entries: readonly ContentEntry[] }) {
  return <section id="patch-notes-announcements" className="lgo-release-reading-panel lgo-release-frame" tabIndex={-1} aria-labelledby="patch-notes-records-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="patch-notes-records-heading" eyebrow="Trạng thái phát hành game" title="Chưa có ghi chú phát hành game"/>
      <p>0 bản cập nhật game được xác nhận.<br/>{entries.length} bản ghi kỹ thuật Web được giữ riêng trong archive.</p></div>
    <div className="lgo-announcement-empty lgo-release-frame">
      <h3>Chưa có game patch được công bố</h3>
      <p>{patchBoundary} Khi có release note gắn với game client được xác nhận, trạng thái người chơi sẽ được cập nhật từ nguồn phát hành phù hợp thay vì suy diễn từ lịch sử Web.</p>
    </div>
    <ArticleFragmentRestoration targetIds={["patch-notes-announcements"]}/>
  </section>;
}

export function PublicPatchNotesReadingRoutes() {
  return <section className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="patch-notes-reading-heading">
    <SectionHeading headingId="patch-notes-reading-heading" eyebrow="Kiểm tra hiện trạng trước khi tìm bản vá" title="Đối chiếu trạng thái phát hành"/>
    <p>Đây là trang đọc tĩnh trong source. Không có game release backend, launcher/version API, CMS vận hành hoặc bản vá tải xuống được tạo từ đây.</p>
    <nav className="lgo-announcement-reading-routes lgo-patch-notes-reading-routes" aria-label="Luồng đọc ghi chú cập nhật">
      <LinkButton href="/status" tone="gold">Đọc Trạng thái <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/roadmap" tone="neutral">Xem Roadmap <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/download" tone="neutral">Đọc điều kiện tải <ReleaseIcon name="arrow"/></LinkButton>
      <LinkButton href="/download/trust" tone="neutral">Đối chiếu độ tin cậy <ReleaseIcon name="arrow"/></LinkButton>
    </nav>
    <small>NO_ACCEPTED_BACKEND_CONTRACT · Trang không thay thế bằng chứng phát hành, bản vá hoặc changelog backend.</small>
  </section>;
}
export function PublicPatchNotesArchive({ entries }: { entries: readonly ContentEntry[] }) {
  return <details id="patch-notes-web-archive" className="lgo-catalog-summary lgo-release-reading-panel lgo-release-frame">
    <summary>Nhật ký kỹ thuật Web · {entries.length} bản ghi <span aria-hidden="true">+</span></summary>
    <div className="lgo-patch-notes-web-archive-body">
      <p>Hai bản ghi này mô tả nền tảng Web/browser trong giai đoạn phát triển. Chúng không phải game patch, game version, client release hay bằng chứng có bản tải mới.</p>
      <AnnouncementBoard label="Nhật ký kỹ thuật Web" items={entries.map(entry => ({ id: entry.slug, title: entry.title, summary: entry.summary, body: entry.body,
        publication: { iso: entry.publishedAt, label: publicationDate.format(new Date(entry.publishedAt)) } }))}
        copy={{ eyebrow: "Nhật ký phát triển", publicationNote: "Không phải ngày phát hành game", disclosureLabel: "Đọc toàn bộ bản ghi" }}
        boundary={patchBoundary} emptyTitle="Chưa có bản ghi kỹ thuật Web" emptyDescription="Không tạo version, patch note hoặc thông báo mẫu để lấp chỗ trống."/>
    </div>
  </details>;
}
