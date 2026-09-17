import { downloadTrustGates } from "@lgo-web/content";

function statusLabel(status: string) {
  if (status === "blocked") return "Đang bị chặn";
  if (status === "planned") return "Đã lên kế hoạch";
  if (status === "ready") return "Sẵn sàng";
  return status;
}

const trustPrinciples = [
  ["Sạch & xác thực", "Chỉ tin file có bằng chứng."],
  ["Minh bạch cộng đồng", "Nguồn gốc và giới hạn đọc được."],
  ["Chơi an toàn", "Không biến blocker thành lời hứa."],
] as const;

export function PublicDownloadTrustLanding() {
  return <div className="lgo-download-trust-landing">
    <section className="lgo-download-trust-hero">
      <div className="lgo-download-trust-art" aria-hidden="true">
        <img className="lgo-download-trust-character" src="/game-art/download-trust-target/hero-character.png" alt="" loading="eager" />
        <img className="lgo-download-trust-seal" src="/game-art/download-trust-target/hero-seal.png" alt="" loading="eager" />
      </div>
      <div className="lgo-download-trust-hero-copy">
        <span className="lgo-download-trust-eyebrow">NIỀM TIN TẢI GAME</span>
        <h1>Tin cậy tải game</h1>
        <strong className="lgo-download-trust-promise">Không tải giả</strong>
        <p className="lgo-download-trust-lead">Chỉ mở cổng tải khi build, SHA256, nguồn gốc, giới hạn, hỗ trợ và phê duyệt đều có bằng chứng thật.</p>
        <div className="lgo-download-trust-actions">
          <a href="/download">Trạng thái tải game</a>
          <a href="/guides/release-trust-and-checksum-guide">Hướng dẫn SHA256</a>
          <a href="/status">Bề mặt trạng thái</a>
        </div>
        <div className="lgo-download-trust-principles" aria-label="Nguyên tắc tin cậy">
          {trustPrinciples.map(([title, note]) => <span key={title}>
            <b>{title}</b><small>{note}</small>
          </span>)}
        </div>
      </div>
    </section>

    <section className="lgo-download-trust-gates" aria-labelledby="download-trust-gates-title">
      <header>
        <span>CỔNG KIỂM TIN</span>
        <div><h2 id="download-trust-gates-title">Sáu kiểm tra trước khi chơi</h2>
          <p>Người chơi phải thấy được bằng chứng và ranh giới thật trước mọi quyết định tải.</p>
        </div>
      </header>
      <div className="lgo-download-trust-gate-grid">
        {downloadTrustGates.map((gate, index) => <article className="lgo-download-trust-gate-card" key={gate.id}>
          <span className={`lgo-download-trust-gate-state is-${gate.status}`}>{statusLabel(gate.status)}</span>
          <b className="lgo-download-trust-gate-index">0{index + 1}</b>
          <h3>{gate.title}</h3>
          <p><strong>Cần có:</strong> {gate.evidenceRequired}</p>
          <p><strong>Người chơi thấy:</strong> {gate.playerFacingCopy}</p>
        </article>)}
      </div>
    </section>

    <section className="lgo-download-trust-reason" aria-labelledby="download-trust-reason-title">
      <div>
        <span>VÌ SAO CẦN TRANG NÀY</span>
        <h2 id="download-trust-reason-title">Niềm tin phải xuất hiện trước link tải</h2>
        <p>Website chỉ giải thích trạng thái có thể kiểm chứng hôm nay. Khi chưa có artifact thật, trang này giữ cổng đóng và chỉ đường tới nguồn chính thức.</p>
      </div>
      <ul>
        <li><strong>Minh bạch</strong><span>Kiểm từng điều kiện trước khi tin.</span></li>
        <li><strong>Trung thực</strong><span>Không biến runtime nội bộ thành phát hành.</span></li>
        <li><strong>An toàn</strong><span>Đối chiếu nguồn trước mọi file về sau.</span></li>
      </ul>
    </section>
  </div>;
}
