import { Stack } from "@lgo-web/ui";
import { SessionLoopRail, WorldRouteJourney } from "../../components/PublicGameExperienceSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hành trình người chơi" };

export default function JourneyPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack">
        <PublicPlayerHero
          className="lgo-journey-hero"
          badge="Player journey"
          badgeTone="jade"
          kicker="MỘT PHIÊN CHƠI · NHIỀU LÝ DO ĐỂ TRỞ LẠI"
          title="20 phút không chỉ để đánh quái"
          lead="Vào Linh Thành, gặp bạn bè, chọn mục tiêu, đi Linh Lâm, chiến đấu, nhận item rồi quay lại thành để đổi trang phục, gặp guild và chuẩn bị cho lần lên đường kế tiếp."
          actions={[
            { href: "/game", label: "Xem tuyến thế giới", tone: "spirit" },
            { href: "/classes", label: "Chọn Lộ", tone: "gold" }
          ]}
          visual={(
            <div className="lgo-journey-cycle" aria-hidden="true">
              <span>Social</span><span>Adventure</span><span>Reward</span><span>Upgrade</span><i />
            </div>
          )}
        />

        <SessionLoopRail />
        <WorldRouteJourney />
      </Stack>
    </WebAppShell>
  );
}
