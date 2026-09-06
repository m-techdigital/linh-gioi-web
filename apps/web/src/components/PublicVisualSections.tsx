import { publicPageFocus, responsiveBreakpoints, visualPolishItems } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

export function SpiritStagePreview() {
  return (
    <div className="lgo-stage-preview" aria-label="Spirit Gate visual preview">
      <div className="lgo-stage-orb" aria-hidden="true" />
      <div className="lgo-stage-gate" aria-hidden="true">
        <span />
      </div>
      <div className="lgo-stage-ground">
        <strong>Spirit Gate</strong>
        <p>Gate Keeper · Training Stone · non-combat loop</p>
      </div>
    </div>
  );
}

export function VisualPolishGrid() {
  return (
    <section className="lgo-panel lgo-visual-panel" aria-labelledby="visual-polish-heading">
      <SectionHeading eyebrow="WEB v1.7 visual responsive polish" title="Web cần tạo cảm giác game trước khi nói về tooling">
        Runtime/browser E2E là guardrail. Nội dung chính của v1.7 là hierarchy, readability, CTA và bố cục responsive.
      </SectionHeading>
      <div id="visual-polish-heading" className="lgo-visual-grid">
        {visualPolishItems.map((item) => (
          <article className="lgo-visual-card" key={item.label}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ResponsiveProofStrip() {
  return (
    <section className="lgo-panel lgo-responsive-panel" aria-labelledby="responsive-proof-heading">
      <SectionHeading eyebrow="Responsive intent" title="Desktop, tablet và mobile có vai trò rõ ràng" />
      <div id="responsive-proof-heading" className="lgo-device-strip">
        {responsiveBreakpoints.map((item) => (
          <article className={`lgo-device-card lgo-device-${item.device}`} key={item.device}>
            <StatusBadge tone={item.device === "mobile" ? "jade" : item.device === "tablet" ? "gold" : "spirit"}>{item.label}</StatusBadge>
            <h3>{item.layout}</h3>
            <p>{item.priority}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PublicPageFocusGrid() {
  return (
    <section className="lgo-panel" aria-labelledby="page-focus-heading">
      <SectionHeading eyebrow="Page UX focus" title="Mỗi trang public có một nhiệm vụ chính" />
      <Grid className="lgo-page-focus-grid" id="page-focus-heading">
        {publicPageFocus.map((item) => (
          <GameCard key={item.route}>
            <span className="lgo-card-kicker">{item.route}</span>
            <h3>{item.title}</h3>
            <p>{item.playerNeed}</p>
            <p><strong>{item.polish}</strong></p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function ProductFirstNotice() {
  return (
    <section className="lgo-product-first-band" aria-label="Product focus notice">
      <div>
        <StatusBadge tone="gold">Product-first</StatusBadge>
        <h2>Phát triển web thật: nội dung, bố cục, cảm giác game và đường đi cho người chơi.</h2>
        <p>
          Tooling đã đủ làm hàng rào. Các vòng tiếp theo nên ưu tiên hình ảnh, copy, thông tin game,
          trang tải game, roadmap, support và community readiness.
        </p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/game" tone="spirit">Xem thế giới</LinkButton>
        <LinkButton href="/download" tone="gold">Kiểm tra download</LinkButton>
      </div>
    </section>
  );
}
