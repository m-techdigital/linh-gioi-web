import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta, KnownLimitationNotesBoard } from "../../components/PublicClosedTesterInformationPackSections";
import { downloadBuilds, downloadReadiness } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { WebAppShell } from "../../components/WebAppShell";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { DownloadStatusDepth } from "../../components/PublicGameInfoDepthSections";
import { DownloadExplanationDepth } from "../../components/PublicDetailSections";
import { DownloadTrustCta, DownloadTrustGateBoard, ReleaseEvidenceChecklist } from "../../components/PublicTrustSections";
import { StagedReleaseMessagingBoard } from "../../components/PublicOnboardingSections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { PlayerTrustReleaseCta, ClosedTestReadinessBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { PerformanceBudgetCta, StaticRouteCompositionBoard } from "../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, ReleaseSurfaceAlignmentBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Tải game" };

function statusTone(status: string) {
  if (status === "done") return "jade" as const;
  if (status === "blocked") return "shadow" as const;
  return "gold" as const;
}

export default function DownloadPage() {
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <ReleaseSurfaceAlignmentBoard />
        <PlayerTrustReleaseCta />
        <ClosedTestReadinessBoard />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <section className="lgo-download-hero lgo-panel">
          <div>
            <StatusBadge tone="gold">WEB v1.8 download status depth</StatusBadge>
            <h1>Trạng thái tải game</h1>
            <p className="lgo-hero-lead">No public production download is available. Trang này giải thích rõ khi nào có thể tải, điều gì còn bị chặn, và vì sao không có nút tải giả.</p>
          </div>
          <div className="lgo-download-cta-box">
            <strong>Không có nút tải giả</strong>
            <p>Download thật chỉ xuất hiện khi có release artifact, checksum và owner approval.</p>
            <LinkButton href="/roadmap" tone="gold">Xem điều kiện mở tải</LinkButton>
          </div>
        </section>

        <SectionHeading eyebrow="Download" title="Download readiness không che giấu blocker">
          Người chơi cần thấy trạng thái thật: build chưa public, closed testing còn planned, backend contract sync vẫn blocked, và runtime/browser web checks chỉ là guardrail.
        </SectionHeading>

        <section className="lgo-panel">
          <SectionHeading eyebrow="Readiness" title="Download readiness checklist" />
          <div className="lgo-readiness-list">
            {downloadReadiness.map((item) => (
              <article className="lgo-readiness-item" key={item.label}>
                <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DownloadStatusDepth />

        <section className="lgo-panel"><h2>WEB v1.10 trust polish · WEB v1.9 download explanation</h2><p>Release artifact, checksum, provenance, known limitations and owner approval must be visible before any public download can appear.</p></section>

        <DownloadTrustGateBoard />
        <ReleaseEvidenceChecklist />
        <StaticRouteCompositionBoard />
        <DownloadExplanationDepth />
        <DownloadTrustCta />
        <StagedReleaseMessagingBoard />

        <SectionHeading eyebrow="Channels" title="Các kênh tải dự kiến" />
        <Grid>
          {downloadBuilds.map((build) => (
            <GameCard key={build.channel}>
              <StatusBadge tone="gold">{build.status}</StatusBadge>
              <h3>{build.title}</h3>
              <p>{build.note}</p>
            </GameCard>
          ))}
        </Grid>
              <KnownLimitationNotesBoard />
        <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
