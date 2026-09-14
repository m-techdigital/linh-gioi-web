import { contentDetailSections, localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Tin tức Linh Giới" };

function newsCategoryLabel(category: string) {
  if (category === "news") return "tin tức";
  return category;
}

export default function NewsPage() {
  const entries = localContentRepository.list("news").slice(0, 3);
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-newspage-stack">
        <GameCard className="lgo-detail-hero-card lgo-news-hero-card">
          <StatusBadge tone="jade">Bản tin công khai</StatusBadge>
          <span className="lgo-card-kicker">Nội dung tĩnh · chưa có CMS · chưa có feed live</span>
          <h1>Tin tức Linh Giới</h1>
          <p className="lgo-hero-lead">Trang tin tức giúp người chơi đọc nhanh các mốc phát triển web, trạng thái bề mặt công khai và đường dẫn sang detail phù hợp.</p>
          <p>Đây là bản tin tĩnh lưu trong source. Page không phải CMS production, feed live, thông cáo vận hành game hoặc hợp đồng backend được chấp nhận.</p>
          <div className="lgo-product-first-actions" aria-label="Luồng đọc tin tức">
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
            <LinkButton href="/roadmap" tone="spirit">Xem roadmap</LinkButton>
            <LinkButton href="/support" tone="jade">FAQ hỗ trợ</LinkButton>
          </div>
          <p className="lgo-guide-detail-boundary"><strong>Ranh giới:</strong> tin tức hiện là nhật ký web công khai, không phải CMS, không phải thông cáo live server và không thay thế kênh vận hành chính thức.</p>
        </GameCard>

        <section className="lgo-panel lgo-service-proof-card-grid lgo-news-board" aria-labelledby="news-heading">
          <SectionHeading eyebrow="Bản tin công khai" title="Bản tin hiện là nhật ký web công khai">Ba card dưới đây tóm tắt mốc phát triển web gần nhất; chúng không phải thông báo live server, patch game hoặc cam kết backend production.</SectionHeading>
          <Grid id="news-heading" className="lgo-newsfeed-grid">
            {entries.map((entry) => {
              const hasDetail = contentDetailSections.some((section) => section.slug === entry.slug);
              return (
                <GameCard className="lgo-service-proof-card lgo-newsfeed-card" key={entry.slug}>
                  <StatusBadge tone="jade">{newsCategoryLabel(entry.category)}</StatusBadge>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <small>{hasDetail ? "Có trang detail để đọc sâu hơn." : "Tóm tắt công khai, chưa có detail riêng."}</small>
                  <LinkButton href={`/news/${entry.slug}`} tone="jade">Đọc chi tiết</LinkButton>
                </GameCard>
              );
            })}
          </Grid>
        </section>

        <section className="lgo-action-band">
          <div>
            <h2>Đối chiếu trạng thái trước khi hiểu nhầm thành tin vận hành live</h2>
            <p>Người chơi nên đọc Trạng thái và Roadmap để phân biệt bản tin web tĩnh với release game, lịch vận hành hoặc dữ liệu backend production.</p>
          </div>
          <div className="lgo-product-first-actions">
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
            <LinkButton href="/guides" tone="jade">Hướng dẫn</LinkButton>
          </div>
        </section>
      </Stack>
    </WebAppShell>
  );
}
