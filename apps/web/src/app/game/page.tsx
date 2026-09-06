import { playerJourneySteps, worldPillars } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";
import { ResponsiveProofStrip, SpiritStagePreview } from "../../components/PublicVisualSections";
import { BeginnerGuideDepth, WorldStoryDepth } from "../../components/PublicGameInfoDepthSections";
import { GameplayLoopStageBoard, GameplayScopeBoundaryBoard, WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";

export const metadata = { title: "Thế giới" };

export default function GamePage() {
  return (
    <WebAppShell>
      <Stack>
        <SpiritPanel className="lgo-hero-panel lgo-hero-with-stage">
          <div className="lgo-hero-copy">
            <StatusBadge tone="spirit">Vietnamese spiritual fantasy · WEB v1.13 world gameplay loop depth · WEB v1.8 game info depth</StatusBadge>
            <h1>Thế giới Linh Giới</h1>
            <p className="lgo-hero-lead">
            Linh Giới được trình bày như một online RPG thân thiện: người chơi bước qua Spirit Gate,
            gặp Gate Keeper, tương tác với Training Stone, hiểu loop non-combat đầu tiên và quay lại status/download trust trước khi combat thật được mở bằng contract rõ ràng.
            </p>
          </div>
          <SpiritStagePreview />
        </SpiritPanel>

        <WorldStoryDepth />

        <WorldGameplayLoopCta />

        <GameplayLoopStageBoard />

        <SectionHeading eyebrow="World pillars" title="Các điểm neo trải nghiệm hiện tại" />
        <Grid>
          {worldPillars.map((pillar) => (
            <GameCard key={pillar.title}>
              <span className="lgo-card-kicker">{pillar.eyebrow}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
              <p>{pillar.detail}</p>
            </GameCard>
          ))}
        </Grid>

        <section className="lgo-panel">
          <SectionHeading eyebrow="Current player loop" title="Luồng hiện tại được mô tả cho người chơi" />
          <div className="lgo-timeline">
            {playerJourneySteps.map((step) => (
              <article className="lgo-timeline-item" key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <BeginnerGuideDepth />

        <GameplayScopeBoundaryBoard />

        <ResponsiveProofStrip />

        <SectionHeading title="Current scope / non-claims" />
        <Grid>
          <GameCard>
            <h3>Đã định hướng</h3>
            <p>Friendly online RPG, spirit cyan, warm gold, jade/teal, dark navy panels và public UX rõ ràng hơn.</p>
          </GameCard>
          <GameCard>
            <h3>Chưa claim</h3>
            <p>No production auth, DB persistence, real portal integration, ops/admin mutation, payment/shop/economy.</p>
          </GameCard>
          <GameCard>
            <h3>Backend rule</h3>
            <p>Java/Spring Boot game backend remains canonical and requires WEB-08 explicit contract sync.</p>
          </GameCard>
        </Grid>
      </Stack>
    </WebAppShell>
  );
}
