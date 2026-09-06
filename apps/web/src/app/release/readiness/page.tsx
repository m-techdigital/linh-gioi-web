import { FaqDiscoveryGroupBoard } from "../../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterChecklistBoard, ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard, TrustJourneyCheckpointBoard } from "../../../components/PublicPlayerTrustReleaseSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../../components/PublicTrustSections";
import {
  OwnerReleaseGateBoard,
  ReleaseReadinessHubBoard,
  ReleaseReadinessHubCta,
  ReleaseSurfaceAlignmentBoard,
  TesterExpectationCopyBoard
} from "../../../components/PublicReleaseReadinessHubSections";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Release readiness" };

export default function ReleaseReadinessPage() {
  return (
    <WebAppShell>
      <Stack>
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <GameCard className="lgo-detail-hero-card lgo-release-readiness-hero-card">
          <StatusBadge tone="gold">WEB v1.19 release readiness hub</StatusBadge>
          <span className="lgo-card-kicker">Owner gates · tester expectation · Download/Status/Support alignment · No public build</span>
          <h1>Release readiness: đọc gate trước khi kỳ vọng bản test</h1>
          <p className="lgo-hero-lead">
            Trang này gom các điều kiện cần có trước khi website được phép nói về public download, closed test, tester intake hoặc support thật.
          </p>
          <p>
            Mục tiêu là giúp người chơi và reviewer hiểu stage hiện tại: web có thể đã đủ nội dung để giải thích release, nhưng chưa tự biến thành launch, account entitlement hoặc ticket backend.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
            <LinkButton href="/status" tone="spirit">Status</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Readiness before conversion" title="Release clarity phải đi trước mọi CTA nhạy cảm">
          v1.19 tập trung vào product web: owner gates, tester expectation copy, download/status/support alignment và release route clarity.
        </SectionHeading>
        <ReleaseReadinessHubBoard />
        <OwnerReleaseGateBoard />
        <TesterExpectationCopyBoard />
        <FaqDiscoveryGroupBoard />
        <ClosedTesterChecklistBoard />
        <ReleaseSurfaceAlignmentBoard />
        <ReleaseNarrativeStageBoard />
        <TrustJourneyCheckpointBoard />
        <ReleaseReadinessHubCta />
        <PlayerTrustReleaseCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
