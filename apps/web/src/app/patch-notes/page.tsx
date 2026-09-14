import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Ghi chú cập nhật Linh Giới" };

function patchCategoryLabel(category: string) {
  if (category === "patch-notes") return "ghi chú";
  return category;
}

export default function Page() {
  const entries = localContentRepository.list("patch-notes");
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-patchnotespage-stack">
        <GameCard className="lgo-detail-hero-card lgo-patchnotes-hero-card">
          <StatusBadge tone="spirit">Nhật ký cập nhật tĩnh</StatusBadge>
          <span className="lgo-card-kicker">Nội dung công khai · chưa có CMS · chưa có release live</span>
          <h1>Ghi chú cập nhật Linh Giới</h1>
          <p className="lgo-hero-lead">Trang patch notes giúp người chơi theo dõi thay đổi web công khai và ranh giới phát triển trước khi có nguồn phát hành production.</p>
          <p>Đây là nhật ký tĩnh lưu trong source. Page không phải hệ thống phát hành production, CMS vận hành, release launcher hoặc hợp đồng backend được chấp nhận.</p>
          <div className="lgo-product-first-actions" aria-label="Luồng đọc patch notes">
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
            <LinkButton href="/roadmap" tone="spirit">Xem roadmap</LinkButton>
            <LinkButton href="/download" tone="jade">Tải game</LinkButton>
          </div>
          <p className="lgo-guide-detail-boundary"><strong>Ranh giới:</strong> patch notes hiện là nhật ký phát triển công khai, không mở tải build mới, không xác nhận release live và không thay thế changelog backend.</p>
        </GameCard>

        <section className="lgo-panel lgo-service-proof-card-grid lgo-patchnotes-board" aria-labelledby="patch-notes-heading">
          <SectionHeading eyebrow="Nhật ký công khai" title="Bản ghi hiện là nhật ký phát triển công khai">Các card dưới đây cho biết thay đổi web đang được ghi nhận; chúng không phải thông báo phát hành game live, launcher update hoặc cam kết backend.</SectionHeading>
          <Grid id="patch-notes-heading" className="lgo-patchnotes-grid">
            {entries.map((entry) => (
              <GameCard className="lgo-service-proof-card lgo-patchnotes-card" key={entry.slug}>
                <StatusBadge tone="spirit">{patchCategoryLabel(entry.category)}</StatusBadge>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <small>Chưa có release live, launcher update hoặc hợp đồng backend được chấp nhận.</small>
              </GameCard>
            ))}
          </Grid>
        </section>

        <section className="lgo-action-band">
          <div>
            <h2>Đọc trạng thái trước khi hiểu nhầm thành bản phát hành</h2>
            <p>Người chơi nên đối chiếu Trạng thái, Roadmap và Tải game để biết phần nào còn là nội dung tĩnh, phần nào chưa có build hoặc backend production.</p>
          </div>
          <div className="lgo-product-first-actions">
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
            <LinkButton href="/support" tone="jade">FAQ hỗ trợ</LinkButton>
          </div>
        </section>
      </Stack>
    </WebAppShell>
  );
}
