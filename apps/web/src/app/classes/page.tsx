import { LinkButton, Stack } from "@lgo-web/ui";
import { ClassArtSpotlight, ClassPathGrid } from "../../components/PublicGameExperienceSections";
import { ClassIdentityDeck } from "../../components/PublicGameDepthSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Năm Lộ" };

export default function ClassesPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-classespage-stack">
        <PublicPlayerHero
          className="lgo-paths-hero"
          badge="Võ · Kiếm · Pháp · Cơ · Linh"
          badgeTone="gold"
          kicker="NĂM LỘ · MỘT LINH GIỚI"
          title="Chọn cách bạn nhìn và bảo vệ thế giới"
          lead="Lộ không chỉ là bộ skill. Khi những cánh cổng xuất hiện, Võ bảo vệ dân cư, Kiếm truy tìm kẻ đứng sau, Pháp nghiên cứu portal, Cơ đo năng lượng và Linh nghe tiếng gọi từ phía bên kia."
          visual={(
            <div className="lgo-five-path-orbit" aria-hidden="true">
              <span>Võ</span><span>Kiếm</span><span>Pháp</span><span>Cơ</span><span>Linh</span><i />
            </div>
          )}
        />

        <ClassPathGrid />
        <ClassIdentityDeck />
        <ClassArtSpotlight />

        <section className="lgo-path-philosophy">
          <p className="lgo-eyebrow">Triết lý Năm Lộ</p>
          <h2>Cùng một thân cơ sở — khác biệt đến từ Lộ, trang bị, chuyển động và nhịp chiến đấu</h2>
          <p>
            Nhân vật nam/nữ dùng thân cơ sở chung; mỗi Lộ được thể hiện qua lớp trang bị, vũ khí, dáng nhận diện, hiệu ứng kỹ năng và nhịp hành động. Cách này giữ tự do phối trang phục và tiến trình phát triển mà không khóa người chơi vào một thân riêng cho từng Lộ.
          </p>
          <div className="lgo-hero-actions">
            <LinkButton href="/story" tone="shadow">Xem năm Lộ trong cốt truyện</LinkButton>
            <LinkButton href="/game" tone="spirit">Khám phá thế giới</LinkButton>
          </div>
        </section>
      </Stack>
    </WebAppShell>
  );
}
