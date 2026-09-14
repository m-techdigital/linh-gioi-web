import { Stack, StatusBadge } from "@lgo-web/ui";
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
      <Stack className="lgo-player-facing-stack lgo-storypage-stack">
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

        <figure className="lgo-story-fracture-design-board lgo-panel" aria-label="Dong Mon fracture story concept reference art">
          <img
            src="/game-art/world/dong-mon-skyline.webp"
            alt="Dong Mon fracture story concept art"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="shadow">Story reference art</StatusBadge>
            <strong>Vết Nứt Đông Môn là narrative setup, không phải quest state live.</strong>
            <span>
              Concept art này dùng visual thật từ LinhGioiOnline để neo mở đầu câu chuyện vào Đông Môn while keeping
              portal events, player progress, account state and production world simulation outside this FE-only page.
            </span>
          </figcaption>
        </figure>
        <ShadowInvasionFeature />
      </Stack>
    </WebAppShell>
  );
}
