import {
  conversionSafeCtas,
  journeyFrictionChecks,
  pageCohesionCheckpoints,
  routeContinuityBridges
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForIndex(index: number) {
  const tones = ["spirit", "jade", "gold", "neutral"] as const;
  return tones[index % tones.length] ?? "spirit";
}

export function RouteContinuityBridgeBoard() {
  return (
    <section className="lgo-panel lgo-route-continuity-board" aria-labelledby="route-continuity-heading">
      <SectionHeading eyebrow="WEB v1.17 route continuity" title="Mỗi trang phải dẫn người chơi tới bước đúng tiếp theo">
        Route continuity giúp người chơi đi từ Start sang World Loop, Download Trust, Status và Support Safety mà không gặp CTA giả hoặc kỳ vọng release sai.
      </SectionHeading>
      <div id="route-continuity-heading" className="lgo-route-continuity-list">
        {routeContinuityBridges.map((item, index) => (
          <article className="lgo-route-continuity-item" key={item.id}>
            <div className="lgo-route-continuity-copy">
              <StatusBadge tone={toneForIndex(index)}>{item.fromRoute} → {item.toRoute}</StatusBadge>
              <h3>{item.playerQuestion}</h3>
              <p>{item.bridgeCopy}</p>
              <small>{item.conversionBoundary}</small>
            </div>
            <LinkButton href={item.toRoute === "public route cluster" ? "/performance" : item.toRoute} tone={toneForIndex(index)}>{item.ctaLabel}</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ConversionSafeCtaBoard() {
  return (
    <section className="lgo-panel lgo-conversion-safe-board" aria-labelledby="conversion-safe-heading">
      <SectionHeading eyebrow="Conversion-safe CTA hierarchy" title="CTA được phép rõ, nhưng không được hứa nhầm">
        Public web cần dẫn người chơi đi tiếp, nhưng không được biến Download, Account, Support hay Community thành funnel giả khi artifact/backend chưa có.
      </SectionHeading>
      <Grid id="conversion-safe-heading">
        {conversionSafeCtas.map((item, index) => (
          <GameCard className="lgo-conversion-safe-card" key={item.surface}>
            <StatusBadge tone={toneForIndex(index)}>{item.surface}</StatusBadge>
            <h3>{item.primaryAction}</h3>
            <p><strong>Hỗ trợ:</strong> {item.supportingAction}</p>
            <p><strong>An toàn khi:</strong> {item.safeWhen}</p>
            <small>{item.mustNotImply}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function JourneyFrictionBoard() {
  return (
    <section className="lgo-panel lgo-journey-friction-board" aria-labelledby="journey-friction-heading">
      <SectionHeading eyebrow="Journey friction checks" title="Gỡ các điểm dễ hiểu nhầm trước khi người chơi bấm tiếp">
        Mỗi route nhạy cảm cần nói rõ câu hỏi, lời giải thích và trang tiếp theo để không tạo cảm giác đã có release/account/support thật.
      </SectionHeading>
      <div id="journey-friction-heading" className="lgo-journey-friction-list">
        {journeyFrictionChecks.map((item, index) => (
          <article className="lgo-journey-friction-item" key={item.route}>
            <div>
              <StatusBadge tone={toneForIndex(index)}>{item.route}</StatusBadge>
              <h3>{item.possibleConfusion}</h3>
              <p>{item.clarification}</p>
              <small>{item.nonClaim}</small>
            </div>
            <LinkButton href={item.nextBestRoute} tone={toneForIndex(index)}>Đi tiếp an toàn</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PageCohesionCheckpointBoard() {
  return (
    <section className="lgo-panel lgo-page-cohesion-board" aria-labelledby="page-cohesion-heading">
      <SectionHeading eyebrow="Page-to-page cohesion" title="Các cụm route phải hỗ trợ cùng một hành trình đọc">
        Cohesion giúp homepage, Start, guides, download, status, support và community không còn là các đảo nội dung rời rạc.
      </SectionHeading>
      <Grid id="page-cohesion-heading">
        {pageCohesionCheckpoints.map((item, index) => (
          <GameCard className="lgo-page-cohesion-card" key={item.checkpoint}>
            <StatusBadge tone={toneForIndex(index)}>{item.checkpoint}</StatusBadge>
            <h3>{item.cohesionRule}</h3>
            <ul>
              {item.routeSet.map((route) => <li key={route}>{route}</li>)}
            </ul>
            <p><strong>Kết quả đọc:</strong> {item.readerOutcome}</p>
            <small>{item.blockedClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function RouteContinuityCta() {
  return (
    <section className="lgo-detail-next-steps lgo-route-continuity-cta" aria-label="Route continuity and conversion-safe next steps">
      <div>
        <StatusBadge tone="spirit">WEB v1.17 route continuity</StatusBadge>
        <h2>Đi tiếp theo đúng thứ tự: Start → World Loop → Download Trust → Status → Support Safety.</h2>
        <p>Journey hub gom CTA hierarchy, route bridging và non-claim gần hành động nhạy cảm để web dẫn đường rõ nhưng không hứa nhầm.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/journey" tone="spirit">Mở Journey hub</LinkButton>
        <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
        <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
      </div>
    </section>
  );
}
