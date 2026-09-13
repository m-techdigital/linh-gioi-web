import { Stack } from "@lgo-web/ui";
import { ClassPathGrid, WorldRouteJourney } from "../../components/PublicGameExperienceSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Bắt đầu" };

export default function StartPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack">
        <PublicPlayerHero
          className="lgo-start-hero"
          badge="Người Thức Tỉnh"
          badgeTone="spirit"
          kicker="BẮT ĐẦU TẠI LINH THÀNH — ĐÔNG MÔN"
          title="Học cách di chuyển. Chọn nhịp chiến đấu. Mở cánh cửa vào thành."
          lead="Tutorial đưa bạn tới Người Giữ Cổng, Bia Luyện, walk/run/jump/dash, skill class và Shadow Slime trước khi mở Linh Thành. Nó dạy bằng hành động thay vì dồn tất cả hệ thống vào một màn hình hướng dẫn."
          detail={(
            <div className="lgo-onboarding-steps" aria-label="Tutorial flow">
              <span>01 · Người Giữ Cổng</span><span>02 · Bia Luyện</span><span>03 · Move / Jump / Dash</span><span>04 · Class Skill</span><span>05 · Shadow Slime</span><span>06 · Mở Linh Thành</span>
            </div>
          )}
          actions={[
            { href: "/classes", label: "Tìm hiểu năm Lộ", tone: "gold" },
            { href: "/journey", label: "Xem một phiên chơi mẫu", tone: "jade" },
            { href: "/download", label: "Trạng thái tải game", tone: "spirit" }
          ]}
        />

        <ClassPathGrid compact />
        <WorldRouteJourney />
      </Stack>
    </WebAppShell>
  );
}
