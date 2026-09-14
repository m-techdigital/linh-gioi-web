import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Sự kiện Linh Giới" };

function eventCategoryLabel(category: string) {
  if (category === "events") return "sự kiện";
  return category;
}

export default function Page() {
  const entries = localContentRepository.list("events");
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-eventspage-stack">
        <GameCard className="lgo-detail-hero-card lgo-events-hero-card">
          <StatusBadge tone="jade">Lịch sự kiện tĩnh</StatusBadge>
          <span className="lgo-card-kicker">Nội dung công khai · chưa có lịch live · chưa có đăng ký tham gia</span>
          <h1>Sự kiện Linh Giới</h1>
          <p className="lgo-hero-lead">Trang sự kiện giúp người chơi hiểu hướng vận hành cộng đồng của Linh Giới Online trước khi có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.</p>
          <p>Đây là nội dung tĩnh lưu trong source. Page không phải hệ quản trị nội dung production, lịch vận hành thật, bộ lập lịch backend hoặc hệ thống đăng ký sự kiện.</p>
          <div className="lgo-product-first-actions" aria-label="Luồng đọc sự kiện">
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
            <LinkButton href="/roadmap" tone="spirit">Xem roadmap</LinkButton>
            <LinkButton href="/community" tone="jade">Cộng đồng</LinkButton>
          </div>
          <p className="lgo-guide-detail-boundary"><strong>Ranh giới:</strong> sự kiện hiện là thông báo định hướng, không mở đăng ký, phần thưởng, lịch live hoặc dữ liệu vận hành backend.</p>
        </GameCard>

        <section className="lgo-panel lgo-service-proof-card-grid lgo-events-board" aria-labelledby="events-heading">
          <SectionHeading eyebrow="Sự kiện công khai" title="Sự kiện hiện là thông báo định hướng cộng đồng">Các card dưới đây giúp người chơi biết chủ đề cộng đồng đang được chuẩn bị; chúng không phải lịch live, đăng ký tham gia hoặc cam kết phần thưởng.</SectionHeading>
          <Grid id="events-heading" className="lgo-events-grid">
            {entries.map((entry) => (
              <GameCard className="lgo-service-proof-card lgo-events-card" key={entry.slug}>
                <StatusBadge tone="jade">{eventCategoryLabel(entry.category)}</StatusBadge>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <small>Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.</small>
              </GameCard>
            ))}
          </Grid>
        </section>

        <section className="lgo-action-band">
          <div>
            <h2>Theo dõi trạng thái trước khi kỳ vọng sự kiện live</h2>
            <p>Người chơi nên đọc Trạng thái và Roadmap để biết bề mặt nào còn tĩnh, nội bộ hoặc tạm khóa trước khi hiểu nhầm sự kiện thành hoạt động live.</p>
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
