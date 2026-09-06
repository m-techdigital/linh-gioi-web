import {
  beginnerExpectations,
  gameplayLoopStages,
  gameplayScopeBoundaries,
  guideWorldNavigationLinks
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForIndex(index: number) {
  const tones = ["spirit", "jade", "gold", "neutral"] as const;
  return tones[index % tones.length] ?? "spirit";
}

export function GameplayLoopStageBoard() {
  return (
    <section className="lgo-panel lgo-gameplay-loop-board" aria-labelledby="gameplay-loop-stage-heading">
      <SectionHeading eyebrow="WEB v1.13 world/gameplay loop depth" title="Loop hiện tại: vào cổng, được dẫn đường, luyện tập, quay lại trust/status">
        Nội dung này giải thích cảm giác gameplay đầu tiên ở mức public web. Nó không claim combat release, production account,
        DB persistence, live world server hoặc economy.
      </SectionHeading>
      <div id="gameplay-loop-stage-heading" className="lgo-gameplay-loop-grid">
        {gameplayLoopStages.map((stage, index) => (
          <article className="lgo-gameplay-loop-card" key={stage.id}>
            <div className="lgo-gameplay-loop-step">
              <span>{stage.step}</span>
              <StatusBadge tone={toneForIndex(index)}>{stage.route}</StatusBadge>
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.playerAction}</p>
            <p><strong>Cảm giác mong muốn:</strong> {stage.expectedFeeling}</p>
            <small>{stage.currentBoundary}</small>
            <LinkButton href={stage.route} tone={toneForIndex(index)}>Đi tới route</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BeginnerExpectationBoard() {
  return (
    <section className="lgo-panel lgo-beginner-expectation-board" aria-labelledby="beginner-expectation-heading">
      <SectionHeading eyebrow="Beginner expectations" title="Người chơi mới cần biết phần nào có thật, phần nào chưa được claim">
        WEB v1.13 đặt kỳ vọng gameplay theo câu hỏi thực tế trước khi người chơi tìm download, account hoặc community.
      </SectionHeading>
      <Grid id="beginner-expectation-heading">
        {beginnerExpectations.map((item, index) => (
          <GameCard className="lgo-beginner-expectation-card" key={item.topic}>
            <StatusBadge tone={toneForIndex(index)}>{item.recommendedReading}</StatusBadge>
            <h3>{item.topic}</h3>
            <p><strong>Hiện tại:</strong> {item.promiseNow}</p>
            <p><strong>Chưa có:</strong> {item.notYet}</p>
            <LinkButton href={item.recommendedReading} tone={toneForIndex(index)}>Đọc tiếp</LinkButton>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function GuideWorldNavigationBoard() {
  return (
    <section className="lgo-panel lgo-guide-world-nav-board" aria-labelledby="guide-world-navigation-heading">
      <SectionHeading eyebrow="Guide-to-world navigation" title="Đường đọc từ Start hub tới World loop, Guide, Download trust và Support">
        Các link này là static public navigation, không phải backend recommendation, account-aware onboarding hoặc live guide/wiki CMS.
      </SectionHeading>
      <div id="guide-world-navigation-heading" className="lgo-guide-world-nav-list">
        {guideWorldNavigationLinks.map((link) => (
          <article className="lgo-guide-world-nav-item" key={`${link.from}-${link.to}`}>
            <div>
              <StatusBadge tone="gold">{link.from} → {link.to}</StatusBadge>
              <h3>{link.reason}</h3>
              <p>{link.safeExpectation}</p>
            </div>
            <LinkButton href={link.to} tone="jade">Mở bước tiếp</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GameplayScopeBoundaryBoard() {
  return (
    <section className="lgo-panel lgo-gameplay-scope-board" aria-labelledby="gameplay-scope-boundary-heading">
      <SectionHeading eyebrow="Scope boundaries" title="Gameplay copy có boundary rõ trước khi có contract và build thật">
        Mỗi surface nói rõ current truth, proof tiếp theo và claim bị cấm để web phát triển nội dung mà không vượt scope game/backend.
      </SectionHeading>
      <Grid id="gameplay-scope-boundary-heading">
        {gameplayScopeBoundaries.map((item) => (
          <GameCard className="lgo-gameplay-scope-card" key={item.surface}>
            <StatusBadge tone="shadow">{item.surface}</StatusBadge>
            <h3>{item.currentTruth}</h3>
            <p><strong>Proof tiếp theo:</strong> {item.nextProofNeeded}</p>
            <small>{item.forbiddenClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function WorldGameplayLoopCta() {
  return (
    <section className="lgo-detail-next-steps lgo-world-loop-cta" aria-label="World gameplay loop next steps">
      <div>
        <StatusBadge tone="spirit">WEB v1.13 world loop</StatusBadge>
        <h2>Hiểu loop thế giới trước khi kỳ vọng combat hoặc download.</h2>
        <p>Spirit Gate, Gate Keeper và Training Stone được nối thành một hành trình đọc rõ ràng cho người chơi mới.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/game/loop" tone="spirit">Mở world loop</LinkButton>
        <LinkButton href="/guides/world-gameplay-loop-guide" tone="jade">Đọc guide loop</LinkButton>
        <LinkButton href="/download/trust" tone="gold">Kiểm tra download trust</LinkButton>
      </div>
    </section>
  );
}
