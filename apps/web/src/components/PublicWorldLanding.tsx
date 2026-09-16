import { worldRouteStops } from "@lgo-web/content";
import { LinkButton } from "@lgo-web/ui";

const worldArt: Record<string, string> = {
  "Linh Thành": "/game-art/world-target/linh-thanh.png",
  "Đông Môn": "/game-art/world-target/dong-mon.png",
  "Linh Lâm": "/game-art/world-target/linh-lam.png",
  "Cổ Di Tích": "/game-art/world-target/co-di-tich.png",
  "Âm Giới": "/game-art/world-target/am-gioi.png"
};


const targetCopy: Record<string, { journey: string; atlas: string }> = {
  "Linh Thành": { journey: "Trái tim của Linh Giới", atlas: "Phồn hoa, hội tụ, và là nơi những câu chuyện bắt đầu." },
  "Đông Môn": { journey: "Khởi đầu hành trình", atlas: "Cánh cửa mở ra những chân trời mới." },
  "Linh Lâm": { journey: "Rừng linh thú huyền bí", atlas: "Nơi thiên nhiên và linh khí hòa làm một." },
  "Cổ Di Tích": { journey: "Tàn tích của thời cổ", atlas: "Những bí ẩn vẫn còn đang ngủ yên." },
  "Âm Giới": { journey: "Nơi ranh giới mờ nhạt", atlas: "Bóng tối cũng có câu chuyện của nó." }
};

const worldPillars = [
  ["Gặp gỡ & Kết bạn", "Những người bạn thật, những hành trình thật"],
  ["Hành động & Chiến đấu", "Kỹ năng, phối hợp, làm chủ trận chiến"],
  ["Trưởng thành & Tiến hóa", "Đa dạng hệ thống, tự do phát triển"],
  ["Cùng viết nên câu chuyện", "Thế giới thay đổi nhờ những người như bạn"]
] as const;

export function PublicWorldLanding() {
  return <div className="lgo-world-landing">
    <section className="lgo-world-landing-hero" aria-labelledby="world-landing-title">
      <div className="lgo-world-landing-art" aria-hidden="true">
        <img className="lgo-world-hero-city" src="/game-art/world-target/hero-city.png" width={892} height={390} alt="" fetchPriority="high"/>
        <img className="lgo-world-hero-character" src="/game-art/world-target/hero-character.png" width={310} height={365} alt="" fetchPriority="high"/>
      </div>
      <div className="lgo-world-landing-copy">
        <span className="lgo-world-eyebrow">THẾ GIỚI</span>
        <h1 id="world-landing-title">Một thế giới <br/><em>có nơi để trở về</em></h1>
        <p>Khám phá Linh Giới, gặp gỡ bằng hữu, chiến đấu, trưởng thành và viết nên câu chuyện của riêng bạn giữa vạn giới giao hòa.</p>
        <div className="lgo-world-landing-actions">
          <LinkButton href="/game/loop" tone="spirit">Đọc vòng lặp thế giới</LinkButton>
          <LinkButton href="/journey" tone="gold">Theo hành trình</LinkButton>
        </div>
      </div>
    </section>

    <section className="lgo-world-journey-section" aria-label="Hành trình khám phá">
      <header className="lgo-world-section-header">
        <div><span>HÀNH TRÌNH KHÁM PHÁ</span><h2>Những vùng đất đang chờ bạn</h2></div>
        <p>Từ nơi để trở về tới ranh giới mờ nhạt của hai thế giới.</p>
      </header>
      <div className="lgo-world-journey">
        {worldRouteStops.map((stop,index)=><article className="lgo-world-journey-stop" aria-label={`${stop.name}. ${stop.summary}`} key={stop.name}>
          <div className="lgo-world-journey-art"><img src={worldArt[stop.name]} alt="" loading={index<2?"eager":"lazy"}/><span>{String(index+1).padStart(2,"0")}</span></div>
          <div><h3>{stop.name}</h3><p>{targetCopy[stop.name]?.journey ?? stop.summary}</p></div>
        </article>)}
      </div>
    </section>

    <section className="lgo-world-atlas" aria-labelledby="world-atlas-title">
      <header className="lgo-world-section-header lgo-world-atlas-header">
        <div><span>KHÁM PHÁ NHỮNG VÙNG ĐẤT HUYỀN THOẠI CỦA LINH GIỚI</span><h2 id="world-atlas-title">Bản đồ thế giới</h2></div>
        <a href="/game/loop">Đọc tuyến khám phá <span aria-hidden="true">→</span></a>
      </header>
      <div className="lgo-world-region-grid">
        {worldRouteStops.map((stop)=><article className="lgo-world-region-card" aria-label={`${stop.name}. ${stop.mood}`} key={stop.name}>
          <img src={worldArt[stop.name]} alt="" loading="lazy"/>
          <div><h3>{stop.name}</h3><p>{targetCopy[stop.name]?.atlas ?? stop.mood}</p></div>
        </article>)}
      </div>
    </section>

    <section className="lgo-world-pillars" aria-label="Nhịp sống Linh Giới">
      {worldPillars.map(([title,copy],index)=><article key={title}><span aria-hidden="true">◇</span><div><h3>{title}</h3><p>{copy}</p></div>{index<worldPillars.length-1?<i aria-hidden="true"/>:null}</article>)}
    </section>
  </div>;
}
