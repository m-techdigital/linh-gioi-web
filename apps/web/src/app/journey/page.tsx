import { Stack, StatusBadge } from "@lgo-web/ui";
import { SessionLoopRail, WorldRouteJourney } from "../../components/PublicGameExperienceSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hành trình người chơi" };

export default function JourneyPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-journeypage-stack">
        <PublicPlayerHero
          className="lgo-journey-hero"
          badge="Hành trình người chơi"
          badgeTone="jade"
          kicker="MỘT PHIÊN CHƠI · NHIỀU LÝ DO ĐỂ TRỞ LẠI"
          title="20 phút không chỉ để đánh quái"
          lead="Vào Linh Thành, gặp bạn bè, chọn mục tiêu, rời Đông Môn, đi Linh Lâm, nhận chiến lợi rồi quay lại thành để đổi trang phục, gặp bang hội và chuẩn bị cho lần lên đường kế tiếp."
          actions={[
            { href: "/game", label: "Xem tuyến thế giới", tone: "spirit" },
            { href: "/classes", label: "Chọn Lộ", tone: "gold" }
          ]}
          visual={(
            <div className="lgo-journey-cycle" aria-hidden="true">
              <span>Hội ngộ</span><span>Phiêu lưu</span><span>Chiến lợi</span><span>Mạnh hơn</span><i />
            </div>
          )}
        />

        <SessionLoopRail />
        <WorldRouteJourney />

        <figure className="lgo-journey-design-board lgo-panel" aria-label="Bảng tham chiếu vòng hành trình">
          <img
            src="/game-art/design-boards/journey-session-route-flow.svg"
            alt="Bảng tuyến hành trình một phiên chơi"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="jade">Ảnh tham chiếu trò chơi</StatusBadge>
            <strong>Hành trình là vòng trải nghiệm có nhịp, không phải backend tài khoản hay bang hội.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để nối hội ngộ, phiêu lưu, chiến lợi và mạnh hơn thành một phiên đọc rõ,
              không claim bang hội live, lưu tài khoản, kho đồ hoặc tổ đội backend.
            </span>
          </figcaption>
        </figure>
      </Stack>
    </WebAppShell>
  );
}
