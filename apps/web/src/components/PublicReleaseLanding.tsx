import { releaseNarrativeStages, releaseReadinessHubItems } from "@lgo-web/content";

function stateLabel(state: string) {
  if (state === "public") return "Công khai";
  if (state === "internal") return "Nội bộ";
  return "Đang bị chặn";
}

export function PublicReleaseLanding() {
  const first = releaseNarrativeStages[0]!;
  const last = releaseNarrativeStages[releaseNarrativeStages.length - 1]!;

  return <div className="lgo-release-landing">
    <section className="lgo-release-landing-hero">
      <div className="lgo-release-hero-art" aria-hidden="true">
        <img className="lgo-release-hero-city" src="/game-art/marketing/discovery-world.png" alt="" loading="eager" />
        <img className="lgo-release-hero-character" src="/game-art/marketing/hero-traveler.png" alt="" loading="eager" />
      </div>
      <div className="lgo-release-hero-copy">
        <span className="lgo-release-eyebrow">LINH GIỚI ONLINE · HÀNH TRÌNH PHÁT HÀNH</span>
        <h1>Hành trình phát hành</h1>
        <h2>Từ sẵn sàng nội dung tới closed test</h2>
        <p>Mỗi bước chỉ tiến khi bằng chứng tương ứng đã rõ. Trang này mô tả cổng phát hành hiện tại, không phải lời mời test hay thông báo mở tải game.</p>
        <div className="lgo-release-landing-actions">
          <a href="/release/readiness">Sẵn sàng phát hành</a>
          <a href="/download/trust">Tin cậy tải game</a>
          <a href="/status">Trạng thái hiện tại</a>
        </div>
        <p className="lgo-release-truth-note">Hôm nay chưa có gói tải game công khai, chưa open beta và chưa có quyền truy cập production.</p>
      </div>
      <div className="lgo-release-stage-gateway" aria-label="Cổng giai đoạn M0 tới M1">
        <article className="is-m0"><b>M0</b><span>{first.stage.replace("M0 — ", "")}</span><small>Đã có nội dung để đọc và kiểm chứng.</small></article>
        <i aria-hidden="true">→</i>
        <article className="is-m1"><b>M1</b><span>{last.stage.replace("M1 — ", "")}</span><small>Chỉ mở khi đủ bằng chứng và owner phê duyệt.</small></article>
      </div>
    </section>

    <section className="lgo-release-stage-section" aria-labelledby="release-stage-title">
      <header className="lgo-release-section-heading">
        <div><span>BẰNG CHỨNG TRƯỚC LỜI HỨA</span><h2 id="release-stage-title">Sáu cổng trước closed test</h2></div>
        <p>Tiến độ có thể kiểm chứng; không suy đoán từ việc website đã hoàn thiện giao diện.</p>
      </header>
      <div className="lgo-release-stage-grid">
        {releaseNarrativeStages.map((stage, index) => <article className="lgo-release-stage-card" key={stage.stage}>
          <div className="lgo-release-stage-top"><span className="lgo-release-stage-state">{stateLabel(stage.visibility)}</span><b>0{index + 1}</b></div>
          <h3>{stage.stage}</h3>
          <p><strong>Cần có:</strong> {stage.requiredProof}</p>
          <small>{stage.visibility === "public" ? "Đang mô tả công khai" : stage.visibility === "internal" ? "Chưa tải công khai" : "Chưa đủ điều kiện để mở"}</small>
          <a href={stage.nextSafeRoute}>Đọc bước liên quan</a>
        </article>)}
      </div>
    </section>

    <section className="lgo-release-readiness-strip" aria-labelledby="release-readiness-title">
      <header><span>READINESS PHÁT HÀNH</span><h2 id="release-readiness-title">Bốn điểm phải cùng sẵn sàng</h2></header>
      <div>{releaseReadinessHubItems.map((item, index) => <article key={item.id}>
        <b>0{index + 1}</b><h3>{item.title}</h3><a href={item.route}>Xem bằng chứng</a>
      </article>)}</div>
    </section>

    <section className="lgo-release-closing-band">
      <div className="lgo-release-quote"><span>LINH GIỚI ONLINE</span><blockquote>“Một cõi ổn định không được xây trong một ngày, mà bằng nhiều bước cẩn trọng.”</blockquote></div>
      <img src="/game-art/start-target/open-gate.png" alt="" loading="eager" />
      <div><span>CLOSED TEST</span><h2>Một cột mốc, không phải lời hứa mở cửa</h2><p>Ít người hơn lúc đầu, nhưng nhiều bằng chứng hơn cho mỗi bước tiếp theo.</p></div>
    </section>
  </div>;
}
