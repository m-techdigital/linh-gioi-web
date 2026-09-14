import { SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { ClassPathGrid, WorldRouteJourney } from "../../components/PublicGameExperienceSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Bắt đầu" };


const onboardingScreenshots = [
  {
    src: "/game-art/onboarding/dong-mon-01-initial.png",
    alt: "Dong Mon onboarding initial spawn screenshot",
    title: "01 · Spawn tại Đông Môn",
    caption: "Ảnh runtime từ LinhGioiOnline dùng làm reference đọc route, không phải public build/download claim."
  },
  {
    src: "/game-art/onboarding/dong-mon-02-gate-focus.png",
    alt: "Dong Mon onboarding gate focus screenshot",
    title: "02 · Focus vào Người Giữ Cổng",
    caption: "Khung hình cho thấy điểm neo hướng dẫn đầu tiên trước khi người chơi kỳ vọng hệ thống account thật."
  },
  {
    src: "/game-art/onboarding/dong-mon-03-dialogue.png",
    alt: "Dong Mon onboarding dialogue screenshot",
    title: "03 · Dialogue hướng dẫn",
    caption: "Dialogue là bằng chứng visual cho tutorial flow; nội dung web vẫn là static/demo khi chưa có accepted backend contract."
  }
];

export default function StartPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-startpage-stack">
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

        <figure className="lgo-start-design-board lgo-panel" aria-label="Start tutorial gameplay loop reference art">
          <img
            src="/game-art/design-boards/start-tutorial-gameplay-loop.svg"
            alt="Start tutorial gameplay loop board"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="spirit">Game reference art</StatusBadge>
            <strong>Start route dạy bằng vòng chơi nhỏ, không mở download hay account backend.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để nối tutorial, class skill, Shadow Slime và cổng Linh Thành
              thành một hành trình đọc rõ trước khi có public build, login hoặc entitlement flow.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-start-real-screenshot-panel lgo-panel" aria-label="Dong Mon onboarding real screenshots">
          <SectionHeading eyebrow="Real onboarding screenshots" title="Ảnh thật từ tutorial Đông Môn">
            Ba khung hình được copy từ LinhGioiOnline để web có cảm giác sản phẩm thật hơn, nhưng vẫn chỉ là visual reference tĩnh khi chưa có public build, login hoặc entitlement backend.
          </SectionHeading>
          <div className="lgo-start-real-screenshot-grid">
            {onboardingScreenshots.map((screenshot) => (
              <figure key={screenshot.src} className="lgo-start-real-screenshot-card">
                <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                <figcaption>
                  <strong>{screenshot.title}</strong>
                  <span>{screenshot.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>


        <ClassPathGrid compact />
        <WorldRouteJourney />
      </Stack>
    </WebAppShell>
  );
}
