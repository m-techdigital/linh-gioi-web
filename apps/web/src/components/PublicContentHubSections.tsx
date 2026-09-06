import { playerEntryQuestions, publicContentHubs, publicRouteGroups } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForIndex(index: number) {
  const tones = ["spirit", "jade", "gold", "neutral"] as const;
  return tones[index % tones.length] ?? "spirit";
}

export function PublicContentHubBoard() {
  return (
    <section className="lgo-panel lgo-content-hub-board" aria-labelledby="public-content-hub-heading">
      <SectionHeading eyebrow="WEB v1.12 content IA hub" title="Chọn đúng đường đọc trước khi đi sâu">
        Start hub gom các trang quan trọng theo nhu cầu thật của người chơi: hiểu game, kiểm tra tải game, theo dõi roadmap hoặc góp ý cộng đồng.
      </SectionHeading>
      <div id="public-content-hub-heading" className="lgo-content-hub-grid">
        {publicContentHubs.map((hub, index) => (
          <article className="lgo-content-hub-card" key={hub.id}>
            <StatusBadge tone={toneForIndex(index)}>{hub.audience}</StatusBadge>
            <h3>{hub.title}</h3>
            <p>{hub.summary}</p>
            <div className="lgo-hub-primary-route">
              <strong>{hub.primaryRoute.label}</strong>
              <p>{hub.primaryRoute.reason}</p>
              <LinkButton href={hub.primaryRoute.href} tone={toneForIndex(index)}>Mở route chính</LinkButton>
            </div>
            <div className="lgo-hub-route-list" aria-label={`${hub.title} secondary routes`}>
              {hub.secondaryRoutes.map((route) => (
                <a href={route.href} key={route.href}>
                  <span>{route.label}</span>
                  <small>{route.reason}</small>
                </a>
              ))}
            </div>
            <p><strong>Kết quả đọc:</strong> {hub.readerOutcome}</p>
            <small>{hub.nonClaim}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PlayerEntryQuestionBoard() {
  return (
    <section className="lgo-panel lgo-entry-question-board" aria-labelledby="player-entry-question-heading">
      <SectionHeading eyebrow="Entry clarity" title="Người chơi hỏi gì, web đưa tới đâu">
        Các câu hỏi phổ biến được map thẳng tới route phù hợp để giảm nhầm lẫn giữa content, status, download và backend blocker.
      </SectionHeading>
      <div id="player-entry-question-heading" className="lgo-entry-question-list">
        {playerEntryQuestions.map((item) => (
          <article className="lgo-entry-question-item" key={item.question}>
            <div>
              <StatusBadge tone="jade">recommended {item.recommendedRoute}</StatusBadge>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <small>{item.avoidExpectation}</small>
            </div>
            <LinkButton href={item.recommendedRoute} tone="jade">Đi tới trang này</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PublicRouteGroupBoard() {
  return (
    <section className="lgo-panel lgo-route-group-board" aria-labelledby="public-route-group-heading">
      <SectionHeading eyebrow="IA grouping" title="Nhóm route theo mục đích đọc">
        Route grouping giúp owner/reviewer và người chơi mới thấy mỗi trang có vai trò riêng, không biến toàn bộ website thành danh sách link rời rạc.
      </SectionHeading>
      <Grid id="public-route-group-heading">
        {publicRouteGroups.map((group) => (
          <GameCard className="lgo-route-group-card" key={group.group}>
            <StatusBadge tone="gold">{group.group}</StatusBadge>
            <h3>{group.purpose}</h3>
            <ul>
              {group.routes.map((route) => <li key={route}>{route}</li>)}
            </ul>
            <p><strong>Người đọc hiểu:</strong> {group.readerOutcome}</p>
            <small>{group.blockedClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function ContentIaStartCta() {
  return (
    <section className="lgo-detail-next-steps lgo-content-ia-cta" aria-label="Content IA start hub next steps">
      <div>
        <StatusBadge tone="spirit">WEB v1.12 content IA</StatusBadge>
        <h2>Không biết bắt đầu từ đâu? Đi qua Start hub trước.</h2>
        <p>Hub này nối homepage, game info, download trust, status, roadmap, guide và community onboarding thành một hành trình đọc rõ ràng.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/start" tone="spirit">Bắt đầu tại Start hub</LinkButton>
        <LinkButton href="/download/trust" tone="gold">Kiểm tra download trust</LinkButton>
      </div>
    </section>
  );
}
