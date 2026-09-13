import { Stack } from "@lgo-web/ui";
import {
  CinematicWorldScene,
  NarrativeChapterGrid,
  ShadowInvasionFeature
} from "../../components/PublicGameExperienceSections";
import { StoryArcTimeline } from "../../components/PublicGameDepthSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Cốt truyện" };

export default function StoryPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack">
        <PublicPlayerHero
          className="lgo-cinematic-hero lgo-story-hero"
          copyClassName="lgo-cinematic-copy"
          badge="Opening narrative"
          badgeTone="shadow"
          kicker="HAI THẾ GIỚI TỪNG TỒN TẠI CẠNH NHAU"
          title="Cho đến ngày những cánh cửa bắt đầu mở"
          lead="Tiếng chuông vang lên trong màn tối. Một khe nứt tím cắt ngang bầu trời Linh Thành. Linh phù thành phố đồng loạt sáng — và điều từng chỉ tồn tại trong truyền thuyết bắt đầu bước qua cánh cổng."
          actions={[
            { href: "#chapters", label: "Bắt đầu từ Vết Nứt Đông Môn", tone: "gold" },
            { href: "/classes", label: "Chọn Lộ", tone: "spirit" }
          ]}
          visual={<CinematicWorldScene compact />}
        />

        <div id="chapters"><NarrativeChapterGrid /></div>
        <StoryArcTimeline />
        <ShadowInvasionFeature />
      </Stack>
    </WebAppShell>
  );
}
