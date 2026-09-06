import {
  mobileDensityBudgets,
  perceivedLoadSignals,
  performanceCopyBudgetPrinciples,
  staticRouteCompositionRules
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForIndex(index: number) {
  const tones = ["spirit", "jade", "gold", "neutral"] as const;
  return tones[index % tones.length] ?? "spirit";
}

export function PerformanceCopyBudgetPrincipleBoard() {
  return (
    <section className="lgo-panel lgo-performance-principle-board" aria-labelledby="performance-copy-budget-heading">
      <SectionHeading eyebrow="WEB v1.16 performance/copy budget" title="Trang nhẹ để người chơi hiểu nhanh hơn">
        Performance polish ở đây là product-facing: copy ngắn hơn, visual CSS-only, route static rõ hơn và mobile density dễ scan. Không claim Core Web Vitals PASS.
      </SectionHeading>
      <Grid id="performance-copy-budget-heading">
        {performanceCopyBudgetPrinciples.map((item, index) => (
          <GameCard className="lgo-performance-card" key={item.id}>
            <StatusBadge tone={toneForIndex(index)}>{item.id}</StatusBadge>
            <h3>{item.title}</h3>
            <p><strong>Lợi ích:</strong> {item.playerBenefit}</p>
            <p><strong>Áp dụng:</strong> {item.implementationNote}</p>
            <small>{item.nonClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function StaticRouteCompositionBoard() {
  return (
    <section className="lgo-panel lgo-static-route-composition-board" aria-labelledby="static-route-composition-heading">
      <SectionHeading eyebrow="Static route composition" title="Route public phải rõ, nhẹ và không phụ thuộc backend giả">
        Các route nhạy cảm như Download Trust, Support Safety và World Loop tiếp tục dùng typed local content; backend thật vẫn blocked bởi contract.
      </SectionHeading>
      <div id="static-route-composition-heading" className="lgo-static-route-list">
        {staticRouteCompositionRules.map((item, index) => (
          <article className="lgo-static-route-item" key={item.route}>
            <div>
              <StatusBadge tone={toneForIndex(index)}>{item.route}</StatusBadge>
              <h3>{item.staticSurface}</h3>
              <p><strong>Copy budget:</strong> {item.copyBudget}</p>
              <p><strong>CSS / asset rule:</strong> {item.cssAssetRule}</p>
              <small>{item.fallbackMessage}</small>
            </div>
            <LinkButton href={item.route} tone={toneForIndex(index)}>Mở route</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PerceivedLoadSignalBoard() {
  return (
    <section className="lgo-panel lgo-perceived-load-board" aria-labelledby="perceived-load-heading">
      <SectionHeading eyebrow="Perceived load" title="Cảm giác tải nhanh đến từ thông điệp rõ trước">
        Người chơi không cần đọc log kỹ thuật để hiểu trạng thái. Mỗi surface cần nói điều quan trọng trước, blocker sau đó nằm gần CTA.
      </SectionHeading>
      <Grid id="perceived-load-heading">
        {perceivedLoadSignals.map((item, index) => (
          <GameCard className="lgo-perceived-load-card" key={item.surface}>
            <StatusBadge tone={toneForIndex(index)}>{item.surface}</StatusBadge>
            <h3>{item.playerFeeling}</h3>
            <p>{item.copyTreatment}</p>
            <small>{item.mustAvoid}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function MobileDensityBudgetBoard() {
  return (
    <section className="lgo-panel lgo-mobile-density-board" aria-labelledby="mobile-density-heading">
      <SectionHeading eyebrow="Mobile reading density" title="Mobile cần route ngắn, CTA rõ, blocker gần hành động">
        Performance polish không chỉ là số đo; với public site hiện tại, density thấp hơn giúp người chơi mới bớt hiểu nhầm release/account/support status.
      </SectionHeading>
      <Grid id="mobile-density-heading">
        {mobileDensityBudgets.map((item, index) => (
          <GameCard className="lgo-mobile-density-card" key={item.surface}>
            <StatusBadge tone={toneForIndex(index)}>{item.surface}</StatusBadge>
            <h3>{item.densityTarget}</h3>
            <p>{item.treatment}</p>
            <small>{item.failureToAvoid}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function PerformanceBudgetCta() {
  return (
    <section className="lgo-detail-next-steps lgo-performance-cta" aria-label="Performance copy asset budget next steps">
      <div>
        <StatusBadge tone="jade">WEB v1.16 performance/copy budget</StatusBadge>
        <h2>Giữ web nhẹ, rõ và không dùng asset/CTA giả.</h2>
        <p>Performance hub giải thích copy weight, CSS-only visual budget, static route composition và mobile reading density.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/performance" tone="jade">Mở Performance</LinkButton>
        <LinkButton href="/accessibility" tone="spirit">Đọc dễ hơn</LinkButton>
        <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
      </div>
    </section>
  );
}
