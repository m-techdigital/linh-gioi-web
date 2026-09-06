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

export function DownloadTrustGateBoard() {
  return (
    <section className="lgo-panel lgo-trust-panel" aria-labelledby="download-trust-gates-heading">
      <SectionHeading eyebrow="WEB v1.10 download trust" title="Download CTA chỉ mở khi có bằng chứng thật">
        Trang Download phải ưu tiên niềm tin của người chơi: artifact, checksum, provenance, limitations và support expectation rõ ràng trước khi có link tải.
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

export function ReleaseEvidenceChecklist() {
  return (
    <section className="lgo-panel lgo-release-evidence" aria-labelledby="release-evidence-heading">
      <SectionHeading eyebrow="Release evidence" title="Bằng chứng phải hiện cạnh download, không nằm trong log nội bộ" />
      <div id="release-evidence-heading" className="lgo-release-evidence-list">
        {releaseEvidenceRequirements.map((item) => (
          <article className="lgo-release-evidence-item" key={item.label}>
            <span className="lgo-card-kicker">{item.owner}</span>
            <h3>{item.label}</h3>
            <p>{item.requiredEvidence}</p>
            <p><strong>Public rule:</strong> {item.publicDisplayRule}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StatusTrustBoard() {
  return (
    <section className="lgo-panel lgo-status-trust" aria-labelledby="status-trust-heading">
      <SectionHeading eyebrow="WEB v1.10 status trust" title="Mỗi status surface có source-of-truth và forbidden claim riêng">
        Status không được biến guardrail kỹ thuật thành release readiness. Public, internal và blocked surfaces phải đọc được ngay.
      </SectionHeading>
      <Grid id="status-trust-heading">
        {statusTrustSurfaces.map((surface) => (
          <GameCard key={surface.surface} className="lgo-status-trust-card">
            <StatusBadge tone={toneForTrust(surface.visibility)}>{surface.visibility}</StatusBadge>
            <h3>{surface.surface}</h3>
            <p><strong>Source of truth:</strong> {surface.sourceOfTruth}</p>
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
      <SectionHeading eyebrow="Support expectation" title="Người chơi biết hôm nay nhận được gì và chưa có gì" />
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
    <section className="lgo-trust-cta" aria-label="Download trust next steps">
      <Stack>
        <StatusBadge tone="spirit">WEB v1.10 product trust</StatusBadge>
        <h2>Download/status copy phải đáng tin trước khi web có release thật.</h2>
        <p>
          Runtime/browser/e2e chỉ giúp chống regression. Người chơi cần thấy artifact, checksum, provenance,
          limitations và support boundary trước khi có bất kỳ link tải nào.
        </p>
        <div className="lgo-product-first-actions">
          <LinkButton href="/download" tone="gold">Download status</LinkButton>
          <LinkButton href="/guides/release-trust-and-checksum-guide" tone="jade">Checksum guide</LinkButton>
          <LinkButton href="/status" tone="spirit">Status surfaces</LinkButton>
        </div>
      </Stack>
    </section>
  );
}
