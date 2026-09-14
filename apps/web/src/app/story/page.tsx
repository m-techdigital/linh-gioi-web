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
          badge="Cốt truyện Linh Giới"
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

        <figure className="lgo-story-fracture-design-board lgo-panel" aria-label="Ảnh ý tưởng Vết Nứt Đông Môn">
          <img
            src="/game-art/world/dong-mon-skyline.webp"
            alt="Ảnh ý tưởng Vết Nứt Đông Môn trong cốt truyện Linh Giới"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="shadow">Ảnh ý tưởng cốt truyện</StatusBadge>
            <strong>Vết Nứt Đông Môn là phần mở đầu cốt truyện, không phải trạng thái nhiệm vụ thật.</strong>
            <span>
              Ảnh ý tưởng này dùng hình ảnh thật từ LinhGioiOnline để neo mở đầu câu chuyện vào Đông Môn,
              đồng thời giữ sự kiện cổng, tiến trình người chơi, trạng thái tài khoản và mô phỏng thế giới chính thức ngoài phạm vi trang FE này.
            </span>
          </figcaption>
        </figure>
        <ShadowInvasionFeature />
      </Stack>
    </WebAppShell>
  );
}
