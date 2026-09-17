const startSteps = [
  ["01", "Học cách di chuyển", "Làm quen thao tác cơ bản"],
  ["02", "Người Giữ Cổng", "Nhận hướng dẫn"],
  ["03", "Bia Luyện", "Rèn luyện kỹ năng"],
  ["04", "Slime Bóng Tối", "Trận chiến đầu tiên"],
  ["05", "Mở Linh Thành", "Tiến vào thành phố"],
] as const;

const controls = [
  { label: "Di chuyển", keys: ["W", "A", "S", "D"], note: "Di chuyển nhân vật" },
  { label: "Nhảy", keys: ["Space"], note: "Nhảy, vượt chướng ngại" },
  { label: "Lướt nhanh", keys: ["Shift"], note: "Lướt nhanh" },
  { label: "Kỹ năng Lộ", keys: ["Q"], note: "Sử dụng kỹ năng Lộ nhân vật" },
] as const;
const milestones = [
  ["Người Giữ Cổng", "Nhận chỉ dẫn và nhiệm vụ đầu tiên", "/game-art/start-target/keeper.png"],
  ["Bia Luyện", "Rèn luyện kỹ năng chiến đấu", "/game-art/start-target/training-stone.png"],
  ["Slime Bóng Tối", "Thử thách đầu tiên của bạn", "/game-art/start-target/shadow-slime.png"],
  ["Mở Linh Thành", "Hoàn thành và tiến vào thành phố", "/game-art/start-target/open-gate.png"],
] as const;

export function PublicStartLanding() {
  return <div className="lgo-start-landing">
    <section className="lgo-start-landing-hero">
      <img className="lgo-start-hero-art" src="/game-art/start-target/hero-gate.png" alt="" aria-hidden="true" loading="eager" />
      <div className="lgo-start-hero-copy">
        <span className="lgo-start-eyebrow">✦ HƯỚNG DẪN TÂN THỦ</span>
        <h1>Bắt đầu</h1>
        <p>Học cách di chuyển, làm quen với Người Giữ Cổng, vượt qua Bia Luyện và tiến vào Linh Thành.</p>
        <div className="lgo-start-actions">
          <a href="#guide">Xem hướng dẫn</a><a href="/download">Trạng thái chơi</a>
        </div>
      </div>
    </section>
    <nav className="lgo-start-step-rail" aria-label="Tuyến hướng dẫn tân thủ">
      {startSteps.map(([number, title, note]) => <div className="lgo-start-step" key={number}>
        <span>{number}</span><div><strong>{title}</strong><small>{note}</small></div>
      </div>)}
    </nav>

    <section id="guide" className="lgo-start-guide-panel" tabIndex={-1}>
      <header><span>HƯỚNG DẪN BƯỚC 1</span><h2>Học cách di chuyển</h2><p>Làm quen với thao tác cơ bản để tự tin khám phá thế giới Linh Giới.</p></header>
      <div className="lgo-start-control-grid">
        {controls.map((control) => <article key={control.label}>
          <div className="lgo-start-key-row">{control.keys.map((key) => <kbd key={key}>{key}</kbd>)}</div>
          <h3>{control.label}</h3><p>{control.note}</p>
        </article>)}
      </div>
      <p className="lgo-start-guide-note">Đây là hướng dẫn đọc trên web; thao tác chỉ có ý nghĩa trong game khi bản chơi được mở.</p>
    </section>

    <section className="lgo-start-milestones" aria-labelledby="start-milestones-title">
      <header><span>NHỮNG MỐC TIẾP THEO</span><h2 id="start-milestones-title">Từ Đông Môn đến Linh Thành</h2></header>
      <div className="lgo-start-milestone-grid">
        {milestones.map(([title, note, src]) => <article className="lgo-start-milestone-card" key={title}>
          <img src={src} alt="" aria-hidden="true" loading="lazy" />
          <div><h3>{title}</h3><p>{note}</p></div>
        </article>)}
      </div>
    </section>
  </div>;
}
