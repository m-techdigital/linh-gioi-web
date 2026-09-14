import { Stack, StatusBadge } from "@lgo-web/ui";
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
      <Stack className="lgo-player-facing-stack lgo-gamepage-stack">
        <PublicPlayerHero
          className="lgo-cinematic-hero lgo-cinematic-hero-inner"
          copyClassName="lgo-cinematic-copy"
          badge="Thế giới Linh Giới"
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

        <aside className="lgo-game-world-boundary lgo-panel" aria-label="Giới hạn bản đồ thế giới công khai">
          <StatusBadge tone="spirit">Lộ trình công khai</StatusBadge>
          <strong>Bản đồ thế giới là lộ trình khám phá công khai, chưa phải bản đồ mở hoặc máy chủ thế giới thật.</strong>
          <span>
            Trang này dùng hình ảnh và kịch bản thế giới LinhGioiOnline để nối Linh Thành, Đông Môn, Linh Lâm,
            Cổ Di Tích và Âm Giới mà không hứa có truyền bản đồ thời gian thực, vị trí tài khoản, trạng thái nhiệm vụ
            hoặc máy chủ thế giới chính thức.
          </span>
        </aside>
        <GamePillarGrid />

        <section className="lgo-world-fantasy-panel">
          <div>
            <p className="lgo-eyebrow">Cấu trúc thế giới</p>
            <h2>Mạng vùng thay vì một thế giới mở phẳng</h2>
            <p>
              Thế giới được tổ chức thành các điểm vùng và tuyến khám phá: Linh Thành, các cổng Đông/Tây/Nam/Bắc, khu dân cư, thương phố, học viện, sân luyện, Linh Lâm, Cổ Di Tích và các cõi cao hơn. Mỗi nơi có vai trò xã hội, phiêu lưu hoặc cốt truyện riêng.
            </p>
          </div>
          <div className="lgo-world-layer-stack" aria-label="Các lớp parallax 2D">
            <span>Bầu trời / Sương</span>
            <span>Nền xa</span>
            <span>Nền giữa</span>
            <span>Nền gần</span>
            <span>Mặt phẳng chơi</span>
            <span>Tiền cảnh</span>
          </div>
        </section>

        <ShadowInvasionFeature />
      </Stack>
    </WebAppShell>
  );
}
