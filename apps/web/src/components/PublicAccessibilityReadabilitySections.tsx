import {
  accessibilityReadabilityPrinciples,
  focusOrderCheckpoints,
  mobileScannabilityRules,
  routeReadabilityChecks
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForIndex(index: number) {
  const tones = ["spirit", "jade", "gold", "neutral"] as const;
  return tones[index % tones.length] ?? "spirit";
}

export function AccessibilityReadabilityPrincipleBoard() {
  return (
    <section className="lgo-panel lgo-accessibility-principle-board" aria-labelledby="accessibility-principles-heading">
      <SectionHeading eyebrow="WEB v1.15 accessibility/readability" title="Dễ đọc trước, hiệu ứng sau">
        Người chơi cần hiểu route, CTA, blocker và non-claim nhanh hơn trên desktop/mobile. Đây là source-owned readability polish, không phải chứng nhận audit chính thức.
      </SectionHeading>
      <Grid id="accessibility-principles-heading">
        {accessibilityReadabilityPrinciples.map((item, index) => (
          <GameCard className="lgo-accessibility-card" key={item.id}>
            <StatusBadge tone={toneForIndex(index)}>{item.id}</StatusBadge>
            <h3>{item.title}</h3>
            <p><strong>Lợi ích cho người chơi:</strong> {item.playerBenefit}</p>
            <p><strong>Áp dụng trên web:</strong> {item.implementationNote}</p>
            <small>{item.nonClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function RouteReadabilityBoard() {
  return (
    <section className="lgo-panel lgo-route-readability-board" aria-labelledby="route-readability-heading">
      <SectionHeading eyebrow="Route clarity" title="Mỗi route phải trả lời một câu hỏi chính">
        Route-level scan aid giúp người chơi biết nên đọc đâu, bấm gì trước và boundary nào cần nhớ.
      </SectionHeading>
      <div id="route-readability-heading" className="lgo-route-readability-list">
        {routeReadabilityChecks.map((item, index) => (
          <article className="lgo-route-readability-item" key={item.route}>
            <div>
              <StatusBadge tone={toneForIndex(index)}>{item.route}</StatusBadge>
              <h3>{item.headingPromise}</h3>
              <p><strong>Hành động đầu:</strong> {item.firstAction}</p>
              <p><strong>Scan aid:</strong> {item.scanAid}</p>
              <small>{item.boundary}</small>
            </div>
            <LinkButton href={item.route} tone={toneForIndex(index)}>Mở route</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MobileScannabilityBoard() {
  return (
    <section className="lgo-panel lgo-mobile-scan-board" aria-labelledby="mobile-scan-heading">
      <SectionHeading eyebrow="Mobile scannability" title="Mobile phải đọc được theo cụm ngắn">
        Những rule này giữ navigation, hero, CTA, card và long guide rõ ràng hơn mà không biến web thành dashboard kỹ thuật.
      </SectionHeading>
      <Grid id="mobile-scan-heading">
        {mobileScannabilityRules.map((item, index) => (
          <GameCard className="lgo-mobile-scan-card" key={item.surface}>
            <StatusBadge tone={toneForIndex(index)}>{item.surface}</StatusBadge>
            <h3>{item.mobileNeed}</h3>
            <p>{item.contentTreatment}</p>
            <small>{item.failureToAvoid}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function FocusOrderBoard() {
  return (
    <section className="lgo-panel lgo-focus-order-board" aria-labelledby="focus-order-heading">
      <SectionHeading eyebrow="Keyboard / focus order" title="Tab order phải theo hành trình đọc thật">
        Focus order ưu tiên skip link, hero CTA, detail card actions và footer boundary; không mở backend giả hoặc personal settings.
      </SectionHeading>
      <div id="focus-order-heading" className="lgo-focus-order-list">
        {focusOrderCheckpoints.map((item, index) => (
          <article className="lgo-focus-order-item" key={item.sequence}>
            <span>{item.sequence}</span>
            <div>
              <h3>{item.label}</h3>
              <p>{item.keyboardExpectation}</p>
              <small>{item.nonClaim}</small>
            </div>
            <StatusBadge tone={toneForIndex(index)}>focus checkpoint</StatusBadge>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AccessibilityReadabilityCta() {
  return (
    <section className="lgo-detail-next-steps lgo-accessibility-cta" aria-label="Accessibility readability next steps">
      <div>
        <StatusBadge tone="spirit">WEB v1.15 accessibility/readability</StatusBadge>
        <h2>Đọc web dễ hơn trước khi tìm download, account hoặc support thật.</h2>
        <p>Accessibility/readability hub gom heading clarity, mobile scan aid, focus order và route-level reading comfort.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/accessibility" tone="spirit">Mở Accessibility</LinkButton>
        <LinkButton href="/start" tone="jade">Start hub</LinkButton>
        <LinkButton href="/support/safety" tone="gold">Safety support</LinkButton>
      </div>
    </section>
  );
}
