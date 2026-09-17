import { sampleSessionBeats, worldRouteStops } from "@lgo-web/content";

const beatArt = [
  "/game-art/world-target/linh-thanh.png",
  "/game-art/world-target/dong-mon.png",
  "/game-art/world-target/linh-lam.png",
  "/game-art/world-target/co-di-tich.png",
  "/game-art/world-target/am-gioi.png",
  "/game-art/world-target/linh-thanh.png",
];

const routeArt: Record<string,string> = {
  "Linh Thành": "/game-art/world-target/linh-thanh.png",
  "Đông Môn": "/game-art/world-target/dong-mon.png",
  "Linh Lâm": "/game-art/world-target/linh-lam.png",
  "Cổ Di Tích": "/game-art/world-target/co-di-tich.png",
  "Âm Giới": "/game-art/world-target/am-gioi.png",
};

const cyclePhases = [
  { label: "Hội ngộ", className: "cycle-north" },
  { label: "Phiêu lưu", className: "cycle-east" },
  { label: "Chiến lợi", className: "cycle-south" },
  { label: "Mạnh hơn", className: "cycle-west" },
];
export function PublicJourneyLanding() {
  return <div className="lgo-journey-landing">
    <section className="lgo-journey-landing-hero" aria-labelledby="journey-title">
      <img className="lgo-journey-hero-city" src="/game-art/journey-target/hero-city.png" alt=""/>
      <div className="lgo-journey-hero-copy">
        <span className="lgo-journey-eyebrow">HÀNH TRÌNH</span>
        <h1 id="journey-title">20 phút không chỉ để đánh quái</h1>
        <p>Gặp gỡ bằng hữu, khám phá thế giới, thu về chiến lợi và mạnh hơn sau mỗi vòng trải nghiệm trong Linh Giới.</p>
        <div className="lgo-journey-actions">
          <a href="#session-beats">Xem một phiên 20 phút</a>
          <a href="/game">Khám phá thế giới</a>
        </div>
      </div>
      <div className="lgo-journey-live-cycle" aria-label="Vòng trải nghiệm 20 phút">
        <strong><small>Một vòng</small>20 phút</strong>
        {cyclePhases.map((phase)=><span className={`lgo-journey-live-cycle-phase ${phase.className}`} key={phase.label}>{phase.label}</span>)}
      </div>
    </section>
    <section id="session-beats" className="lgo-journey-beats" aria-labelledby="journey-beats-title">
      <header>
        <span>VÒNG TRẢI NGHIỆM 20 PHÚT</span>
        <h2 id="journey-beats-title">Một phiên ngắn, sáu khoảnh khắc có nhịp</h2>
      </header>
      <div className="lgo-journey-beat-grid">
        {sampleSessionBeats.map((beat,index)=><article className="lgo-journey-beat-card" key={beat.time}>
          <img src={beatArt[index]} alt=""/>
          <div><span>{beat.time}</span><h3>{beat.title}</h3><p>{beat.summary}</p></div>
        </article>)}
      </div>
    </section>

    <section className="lgo-journey-route" aria-labelledby="journey-route-title">
      <header><span>TUYẾN ĐƯỜNG THẾ GIỚI</span><h2 id="journey-route-title">Từ Linh Thành, mở ra những nơi để muốn quay lại</h2></header>
      <div className="lgo-journey-route-grid">
        {worldRouteStops.map((stop)=><article className="lgo-journey-route-stop" key={stop.order}>
          <img src={routeArt[stop.name]} alt=""/>
          <div><span>{stop.order}</span><h3>{stop.name}</h3><p>{stop.summary}</p></div>
        </article>)}
      </div>
    </section>
  </div>;
}
