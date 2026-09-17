import { downloadBuilds, downloadReadiness } from "@lgo-web/content";

const infoLinks = [
  ["Tin tức", "Cập nhật mới nhất", "/news"],
  ["Cộng đồng", "Thảo luận, giao lưu", "/community"],
  ["Trạng thái", "Theo dõi mức sẵn sàng", "/status"],
  ["Hỗ trợ", "Giải đáp thắc mắc", "/support"],
] as const;

function statusLabel(status: string) {
  if (status === "blocked") return "Đang bị chặn";
  if (status === "not-available") return "Chưa mở";
  if (status === "limited-internal") return "Nội bộ giới hạn";
  return "Đang chuẩn bị";
}

export function PublicDownloadLanding() {
  return <div className="lgo-download-landing">
    <section className="lgo-download-landing-hero">
      <img className="lgo-download-hero-art" src="/game-art/download-target/hero-gate.png" alt="" aria-hidden="true" loading="eager" />
      <div className="lgo-download-hero-copy">
        <span className="lgo-download-eyebrow">TẢI GAME</span>
        <h1>Trạng thái chơi &amp; tải game</h1>
        <div className="lgo-download-release-state">
          <strong>Chưa mở cổng phát hành</strong>
          <p>Hiện tại chưa có bản game dành cho người chơi đại chúng. Vui lòng theo dõi các kênh chính thức để cập nhật thời điểm mở tải.</p>
        </div>
        <div className="lgo-download-landing-actions">
          <a href="/status">Xem trạng thái hiện tại</a>
          <a href="/release">Xem lộ trình phát hành</a>
          <a href="/download/trust">Kiểm tra tin cậy tải game</a>
        </div>
      </div>
    </section>

    <section className="lgo-download-readiness-section" aria-labelledby="download-readiness-title">
      <header>
        <span>MỨC ĐỘ SẴN SÀNG PHÁT HÀNH</span>
        <h2 id="download-readiness-title">Điều kiện phải rõ trước khi mở tải</h2>
        <p>Không có nút tải cho tới khi gói build, mã kiểm tra, phê duyệt, giới hạn đã biết và hỗ trợ đều có bằng chứng phù hợp.</p>
      </header>
      <div className="lgo-download-readiness-grid">
        {downloadReadiness.map((item) => <article className="lgo-download-readiness-card" key={item.label}>
          <small>{statusLabel(item.status)}</small>
          <h3>{item.label}</h3>
          <p>{item.detail}</p>
        </article>)}
      </div>
    </section>

    <section className="lgo-download-lower-grid">
      <div className="lgo-download-build-panel">
        <header><span>KÊNH PHÁT HÀNH</span><h2>Các kênh tải dự kiến</h2></header>
        <div className="lgo-download-build-grid">
          {downloadBuilds.map((build) => <article className="lgo-download-build-card" key={build.channel}>
            <small>{statusLabel(build.status)}</small>
            <h3>{build.title}</h3>
            <p>{build.note}</p>
          </article>)}
        </div>
      </div>

      <div className="lgo-download-info-panel">
        <header><span>KÊNH THÔNG TIN CHÍNH THỨC</span><h2>Theo dõi đúng nguồn</h2></header>
        <div className="lgo-download-info-grid">
          {infoLinks.map(([title, note, href]) => <a className="lgo-download-info-link" href={href} key={href}>
            <strong>{title}</strong><span>{note}</span><b aria-hidden="true">›</b>
          </a>)}
        </div>
      </div>
    </section>
  </div>;
}
