import { SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { CinematicWorldScene, ClassPathGrid, WorldRouteJourney } from "../../components/PublicGameExperienceSections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Bắt đầu" };


const onboardingScreenshots = [
  {
    src: "/game-art/onboarding/dong-mon-01-initial.png",
    alt: "Ảnh xuất hiện ban đầu tại Đông Môn",
    title: "01 · Xuất hiện tại Đông Môn",
    caption: "Ảnh runtime từ LinhGioiOnline dùng làm tham chiếu đọc tuyến, không phải cam kết bản tải công khai."
  },
  {
    src: "/game-art/onboarding/dong-mon-02-gate-focus.png",
    alt: "Ảnh nhấn vào cổng Đông Môn",
    title: "02 · Chú ý Người Giữ Cổng",
    caption: "Khung hình cho thấy điểm neo hướng dẫn đầu tiên trước khi người chơi kỳ vọng hệ thống account thật."
  },
  {
    src: "/game-art/onboarding/dong-mon-03-dialogue.png",
    alt: "Ảnh hội thoại hướng dẫn tại Đông Môn",
    title: "03 · Hội thoại hướng dẫn",
    caption: "Hội thoại là bằng chứng hình ảnh cho tuyến hướng dẫn; nội dung web vẫn là tham chiếu tĩnh khi chưa có backend contract được chấp nhận."
  }
];

export default function StartPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-startpage-stack">
        <PublicPlayerHero
          className="lgo-start-hero lgo-cinematic-hero"
          copyClassName="lgo-cinematic-copy"
          visual={<CinematicWorldScene compact />}
          badge="Người Thức Tỉnh"
          badgeTone="spirit"
          kicker="BẮT ĐẦU TẠI LINH THÀNH — ĐÔNG MÔN"
          title="Bắt đầu"
          lead="Học cách di chuyển, làm quen với Người Giữ Cổng, vượt qua Bia Luyện, thử kỹ năng Lộ và đối mặt Slime Bóng Tối trước khi mở lối vào Linh Thành."
          detail={(
            <div className="lgo-onboarding-steps" aria-label="Tuyến hướng dẫn tân thủ">
              <span>01 · Người Giữ Cổng</span><span>02 · Bia Luyện</span><span>03 · Di chuyển / Nhảy / Lướt nhanh</span><span>04 · Kỹ năng Lộ</span><span>05 · Slime Bóng Tối</span><span>06 · Mở Linh Thành</span>
            </div>
          )}
          actions={[
            { href: "/classes", label: "Tìm hiểu năm Lộ", tone: "gold" },
            { href: "/journey", label: "Xem một phiên chơi mẫu", tone: "jade" },
            { href: "/download", label: "Trạng thái tải game", tone: "spirit" }
          ]}
        />

        <figure className="lgo-start-design-board lgo-panel" aria-label="Bảng tham chiếu tuyến bắt đầu">
          <img
            src="/game-art/design-boards/start-tutorial-gameplay-loop.svg"
            alt="Bảng tuyến hướng dẫn bắt đầu"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="spirit">Ảnh tham chiếu trò chơi</StatusBadge>
            <strong>Tuyến bắt đầu dạy bằng vòng chơi nhỏ, không mở tải game hay backend tài khoản.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để nối hướng dẫn, kỹ năng Lộ, Slime Bóng Tối và cổng Linh Thành
              thành một hành trình đọc rõ trước khi có bản tải công khai, đăng nhập hoặc quyền truy cập thật.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-start-real-screenshot-panel lgo-panel" aria-label="Ảnh thật tuyến hướng dẫn Đông Môn">
          <SectionHeading eyebrow="Ảnh hướng dẫn thật" title="Ảnh thật từ tutorial Đông Môn">
            Ba khung hình được copy từ LinhGioiOnline để web có cảm giác sản phẩm thật hơn, nhưng vẫn chỉ là tham chiếu hình ảnh tĩnh khi chưa có bản tải công khai, đăng nhập hoặc backend quyền truy cập.
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
