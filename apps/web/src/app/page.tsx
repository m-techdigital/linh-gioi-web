import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, Stack, StatusBadge } from "@lgo-web/ui";
import {
  AvailabilityNote,
  CinematicWorldScene,
  GamePillarGrid,
  SessionLoopRail,
  ShadowInvasionFeature,
  SpiritRouteBreadcrumb,
} from "../components/PublicGameExperienceSections";
import { HomeDiscoveryShowcase } from "../components/HomeDiscoveryShowcase";
import { WebAppShell } from "../components/WebAppShell";

export default function HomePage() {
  const featured = localContentRepository.featured(3);

  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack">
        <section className="lgo-cinematic-hero lgo-cinematic-hero-v123">
          <div className="lgo-cinematic-copy">
            <StatusBadge tone="spirit">2D Side-Scrolling Social Action MMORPG</StatusBadge>
            <p className="lgo-hero-kicker">LINH GIỚI ONLINE</p>
            <h1>Sống một đời khác trong Linh Giới</h1>
            <p className="lgo-hero-lead">
              Một thế giới nơi linh lực chảy giữa thành phố hiện đại, cổ phong Á Đông và những cánh cổng dẫn sang Âm Giới. Gặp gỡ ở Linh Thành, chọn Lộ của bạn, lên đường chiến đấu — rồi trở về nơi mình thuộc về.
            </p>
            <div className="lgo-hero-actions lgo-hero-actions-primary">
              <LinkButton href="/game" tone="gold">Khám phá Linh Giới</LinkButton>
              <LinkButton href="/classes" tone="spirit">Chọn Lộ của bạn</LinkButton>
              <LinkButton href="/story" tone="shadow">Bắt đầu câu chuyện</LinkButton>
            </div>
            <SpiritRouteBreadcrumb />
            <div className="lgo-hero-signals" aria-label="Game identity">
              <span>HD 2D anime</span><i />
              <span>Social hub</span><i />
              <span>Action combat</span><i />
              <span>World events</span>
            </div>
          </div>
          <CinematicWorldScene />
        </section>

        <GamePillarGrid />
        <HomeDiscoveryShowcase />
        <ShadowInvasionFeature />
        <SessionLoopRail />

        <section className="lgo-home-latest" aria-labelledby="home-latest-heading">
          <div className="lgo-section-heading-row">
            <div>
              <p className="lgo-eyebrow">Nhật ký phát triển</p>
              <h2 id="home-latest-heading">Tin mới từ Linh Giới</h2>
              <p>Theo dõi world, class, gameplay và các mốc phát triển mới nhất mà không biến roadmap thành lời hứa release.</p>
            </div>
            <LinkButton href="/news" tone="jade">Xem tất cả tin tức</LinkButton>
          </div>
          <Grid>
            {featured.map((entry) => (
              <GameCard className="lgo-news-card" key={entry.slug}>
                <StatusBadge tone="jade">{entry.category}</StatusBadge>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <LinkButton href={`/news/${entry.slug}`}>Đọc thêm</LinkButton>
              </GameCard>
            ))}
          </Grid>
        </section>

        <AvailabilityNote />
      </Stack>
    </WebAppShell>
  );
}
