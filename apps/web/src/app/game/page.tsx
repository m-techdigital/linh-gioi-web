import { Stack } from "@lgo-web/ui";
import {
  CinematicWorldScene,
  GamePillarGrid,
  ShadowInvasionFeature,
  WorldRouteJourney
} from "../../components/PublicGameExperienceSections";
import { WorldAtlasStories } from "../../components/PublicGameDepthSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Thế giới" };

export default function GamePage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack">
        <PublicPlayerHero
          className="lgo-cinematic-hero lgo-cinematic-hero-inner"
          copyClassName="lgo-cinematic-copy"
          badge="World of Linh Giới"
          badgeTone="spirit"
          kicker="LINH THÀNH · VÀ NHỮNG VÙNG ĐẤT BÊN NGOÀI"
          title="Một thế giới có nơi để trở về"
          lead="Linh Thành là trung tâm xã hội; Đông Môn là cửa ngõ nhập môn; Linh Lâm và Cổ Di Tích kéo bạn ra xa khỏi vùng an toàn; Âm Giới là lời nhắc rằng hai thế giới chưa bao giờ thực sự tách biệt."
          actions={[
            { href: "/journey", label: "Theo hành trình một phiên chơi", tone: "gold" },
            { href: "/story", label: "Đọc cốt truyện", tone: "shadow" }
          ]}
          visual={<CinematicWorldScene compact />}
        />

        <WorldRouteJourney />
        <WorldAtlasStories />
        <GamePillarGrid />

        <section className="lgo-world-fantasy-panel">
          <div>
            <p className="lgo-eyebrow">World structure</p>
            <h2>Zone Network thay vì một open world phẳng</h2>
            <p>
              Thế giới được tổ chức thành các node và tuyến vùng: Linh Thành, các cổng Đông/Tây/Nam/Bắc, khu dân cư, thương phố, học viện, training field, Linh Lâm, Cổ Di Tích và các realm cao hơn. Mỗi nơi có vai trò xã hội, phiêu lưu hoặc cốt truyện riêng.
            </p>
          </div>
          <div className="lgo-world-layer-stack" aria-label="2D parallax layers">
            <span>Sky / Fog</span>
            <span>Far Background</span>
            <span>Mid Background</span>
            <span>Near Background</span>
            <span>Gameplay Plane</span>
            <span>Foreground</span>
          </div>
        </section>

        <ShadowInvasionFeature />
      </Stack>
    </WebAppShell>
  );
}
