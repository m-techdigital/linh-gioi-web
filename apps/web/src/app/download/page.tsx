import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta, KnownLimitationNotesBoard } from "../../components/PublicClosedTesterInformationPackSections";
import { downloadBuilds, downloadReadiness } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
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

export const metadata = { title: "Trạng thái chơi & tải game" };

function statusTone(status: string) {
  if (status === "done") return "jade" as const;
  if (status === "blocked") return "shadow" as const;
  return "gold" as const;
}

export default function DownloadPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-downloadpage-stack">
        <PublicPlayerHero
          className="lgo-download-hero lgo-panel lgo-download-player-hero"
          badge="Public access"
          badgeTone="gold"
          kicker="KHI NÀO CÓ THỂ BƯỚC VÀO LINH GIỚI?"
          title="Trạng thái chơi & tải game"
          lead="No public production download is available. Bản public hiện chưa được mở. Khi có build được duyệt, trang này sẽ hiển thị đúng artifact, checksum, phiên bản và ghi chú phát hành — không dùng nút tải giả để tạo cảm giác game đã sẵn sàng."
          actions={[
            { href: "/status", label: "Xem trạng thái hiện tại", tone: "jade" },
            { href: "/release", label: "Xem lộ trình phát hành", tone: "gold" },
            { href: "/game", label: "Khám phá Linh Giới", tone: "spirit" }
          ]}
          visual={(
            <div className="lgo-download-cta-box lgo-download-gate-visual">
              <span className="lgo-download-seal" aria-hidden="true">界</span>
              <strong>Chưa mở cổng public</strong>
              <p>Download thật chỉ xuất hiện khi có release artifact, checksum và owner approval.</p>
              <small>Không cần đoán link tải · Không cần tìm mirror không chính thức</small>
            </div>
          )}
        />

        <section className="lgo-panel lgo-download-readiness-target-panel" aria-labelledby="download-readiness-heading">
          <SectionHeading eyebrow="Readiness" title="Trước khi nút tải xuất hiện">
            Trang public giữ một checklist minh bạch để người chơi biết chính xác điều gì đã sẵn sàng và điều gì còn bị chặn.
          </SectionHeading>
          <div className="lgo-readiness-list" id="download-readiness-heading">
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
        <DownloadTrustGateBoard />
        <ReleaseEvidenceChecklist />

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

        <section className="lgo-release-detail-stack" aria-label="Chi tiết release và hỗ trợ">
          <ReleaseReadinessHubCta />
          <ReleaseSurfaceAlignmentBoard />
          <PlayerTrustReleaseCta />
          <ClosedTestReadinessBoard />
          <StagedReleaseMessagingBoard />
          <DownloadExplanationDepth />
          <DownloadTrustCta />
          <KnownLimitationNotesBoard />
          <ClosedTesterInformationPackCta />
          <ContentIaStartCta />
          <FaqHelpfulnessCta />
          <RouteContinuityCta />
          <WorldGameplayLoopCta />
          <PlayerSafetySupportCta />
          <AccessibilityReadabilityCta />
          <PerformanceBudgetCta />
          <StaticRouteCompositionBoard />
        </section>
      </Stack>
    </WebAppShell>
  );
}
