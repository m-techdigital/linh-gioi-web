import {
  downloadTrustGates,
  playerSupportExpectations,
  releaseEvidenceRequirements,
  statusTrustSurfaces
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";

function toneForTrust(value: string) {
  if (value === "ready" || value === "public") return "jade" as const;
  if (value === "planned" || value === "internal") return "gold" as const;
  return "shadow" as const;
}

function vietnameseTrustLabel(value: string) {
  if (value === "public") return "công khai";
  if (value === "internal") return "nội bộ";
  if (value === "blocked") return "tạm khóa";
  if (value === "ready") return "sẵn sàng";
  if (value === "planned") return "đã lên kế hoạch";
  return value;
}

export function DownloadTrustGateBoard() {
  return (
    <section className="lgo-panel lgo-trust-panel" aria-labelledby="download-trust-gates-heading">
      <SectionHeading eyebrow="Cổng kiểm tin tải game" title="CTA tải game chỉ mở khi có bằng chứng thật">
        Trang Download phải ưu tiên niềm tin của người chơi: gói build, SHA256, nguồn gốc, giới hạn đã biết và kỳ vọng hỗ trợ rõ ràng trước khi có link tải.
      </SectionHeading>
      <Grid id="download-trust-gates-heading">
        {downloadTrustGates.map((gate) => (
          <GameCard key={gate.id} className="lgo-trust-card">
            <StatusBadge tone={toneForTrust(gate.status)}>{gate.status}</StatusBadge>
            <h3>{gate.title}</h3>
            <p><strong>Cần có:</strong> {gate.evidenceRequired}</p>
            <p><strong>Người chơi thấy:</strong> {gate.playerFacingCopy}</p>
            <small>{gate.mustNotClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}


export function ReleaseTrustDesignBoard() {
  return (
    <figure className="lgo-release-trust-board lgo-panel" aria-label="Bảng thiết kế cổng tin cậy phát hành">
      <img
        src="/game-art/design-boards/release-trust-gate.svg"
        alt="Bảng thiết kế cổng tin cậy phát hành"
        loading="eager"
        decoding="async"
      />
      <figcaption>
        <StatusBadge tone="spirit">Ảnh tham chiếu game</StatusBadge>
        <strong>Kiểm gate trước khi tải công khai</strong>
        <span>Bảng tham chiếu nhỏ từ tài liệu LinhGioiOnline; mô tả cổng phát hành mà không claim có build tải được.</span>
      </figcaption>
    </figure>
  );
}

export function ReleaseEvidenceChecklist() {
  return (
    <section className="lgo-panel lgo-release-evidence" aria-labelledby="release-evidence-heading">
      <SectionHeading eyebrow="Bằng chứng phát hành" title="Bằng chứng phải hiện cạnh nút tải, không nằm trong log nội bộ" />
      <div id="release-evidence-heading" className="lgo-release-evidence-list">
        {releaseEvidenceRequirements.map((item) => (
          <article className="lgo-release-evidence-item" key={item.label}>
            <span className="lgo-card-kicker">{item.owner}</span>
            <h3>{item.label}</h3>
            <p>{item.requiredEvidence}</p>
            <p><strong>Quy tắc public:</strong> {item.publicDisplayRule}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StatusTrustBoard() {
  return (
    <section className="lgo-panel lgo-service-proof-card-grid lgo-status-trust" aria-labelledby="status-trust-heading">
      <SectionHeading eyebrow="Tin cậy trạng thái" title="Mỗi bề mặt có nguồn sự thật và claim bị cấm riêng">
        Trạng thái không được biến guardrail kỹ thuật thành readiness phát hành. Các bề mặt công khai, nội bộ và tạm khóa phải đọc được ngay.
      </SectionHeading>
      <Grid id="status-trust-heading">
        {statusTrustSurfaces.map((surface) => (
          <GameCard key={surface.surface} className="lgo-service-proof-card lgo-status-trust-card">
            <StatusBadge tone={toneForTrust(surface.visibility)}>{vietnameseTrustLabel(surface.visibility)}</StatusBadge>
            <h3>{surface.surface}</h3>
            <p><strong>Nguồn sự thật:</strong> {surface.sourceOfTruth}</p>
            <p>{surface.currentTruth}</p>
            <small>{surface.forbiddenClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function PlayerSupportExpectationBoard() {
  return (
    <section className="lgo-panel lgo-support-expectations" aria-labelledby="support-expectations-heading">
      <SectionHeading eyebrow="Kỳ vọng hỗ trợ" title="Người chơi biết hôm nay nhận được gì và chưa có gì" />
      <div id="support-expectations-heading" className="lgo-support-expectation-list">
        {playerSupportExpectations.map((item) => (
          <article className="lgo-support-expectation-item" key={item.topic}>
            <h3>{item.topic}</h3>
            <p><strong>Hiện tại:</strong> {item.expectedNow}</p>
            <p><strong>Chưa có:</strong> {item.notAvailable}</p>
            <p><strong>Bước an toàn:</strong> {item.safeNextStep}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DownloadTrustCta() {
  return (
    <section className="lgo-trust-cta" aria-label="Bước tiếp theo về tin cậy tải game">
      <Stack>
        <StatusBadge tone="spirit">WEB v1.10 niềm tin sản phẩm</StatusBadge>
        <h2>Download/status copy phải đáng tin trước khi web có release thật.</h2>
        <p>
          Runtime/browser/e2e chỉ giúp chống regression. Người chơi cần thấy gói build, SHA256, nguồn gốc,
          giới hạn và ranh giới hỗ trợ trước khi có bất kỳ link tải nào.
        </p>
        <div className="lgo-product-first-actions">
          <LinkButton href="/download" tone="gold">Trạng thái tải game</LinkButton>
          <LinkButton href="/guides/release-trust-and-checksum-guide" tone="jade">Hướng dẫn SHA256</LinkButton>
          <LinkButton href="/status" tone="spirit">Bề mặt trạng thái</LinkButton>
        </div>
      </Stack>
    </section>
  );
}
