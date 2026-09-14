import { NoSearchBackendNoteBoard } from "../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { StatusExplanationDepth } from "../../components/PublicDetailSections";
import { StatusTrustBoard } from "../../components/PublicTrustSections";
import { RoadmapDecisionGateBoard, StagedReleaseMessagingBoard } from "../../components/PublicOnboardingSections";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { WebAppShell } from "../../components/WebAppShell";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { PlayerTrustReleaseCta, TrustJourneyCheckpointBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { PerformanceBudgetCta, PerceivedLoadSignalBoard } from "../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, ReleaseSurfaceAlignmentBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Trạng thái công khai" };

function maintenanceCategoryLabel(category: string) {
  if (category === "maintenance") return "bảo trì";
  return category;
}


export default function Page() {
  const entries = localContentRepository.list("maintenance");
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-statuspage-stack">
        <GameCard className="lgo-detail-hero-card lgo-status-hero-card">
          <StatusBadge tone="jade">WEB v1.145 trạng thái công khai</StatusBadge>
          <span className="lgo-card-kicker">Nội dung tĩnh · không CMS · không máy chủ dữ liệu · không giám sát vận hành</span>
          <h1>Trạng thái công khai</h1>
          <p className="lgo-hero-lead">Trang trạng thái công khai của Linh Giới Online: giải thích bề mặt nào đang hiển thị, bề mặt nào nội bộ hoặc tạm khóa, và giới hạn nào vẫn chưa có hợp đồng production.</p>
          <p>Đây là nội dung tĩnh lưu trong source cho người chơi đọc. Trang không đọc uptime thật, không có CMS, không có máy chủ giám sát và không đại diện cho sức khỏe máy chủ game.</p>
          <div className="lgo-product-first-actions lgo-service-status-actions" aria-label="Boundary trạng thái công khai">
            <span className="lgo-service-status-seal">Không CMS<small>Nội dung cố định</small></span>
            <span className="lgo-service-status-seal">Không máy chủ<small>Không đọc dữ liệu live</small></span>
            <span className="lgo-service-status-seal">Không giám sát<small>Không claim uptime</small></span>
          </div>
        </GameCard>
        <figure className="lgo-status-design-board lgo-service-proof-board lgo-panel" aria-label="Board tín hiệu trạng thái công khai">
          <img
            src="/game-art/design-boards/status-maintenance-signal-board.svg"
            alt="Board tín hiệu trạng thái công khai"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="jade">Board tham chiếu</StatusBadge>
            <strong>Tín hiệu trạng thái là nội dung công khai tĩnh, không phải hệ thống giám sát.</strong>
            <span>
              Board này phân biệt trạng thái công khai, nội bộ và tạm khóa mà không claim CMS, giám sát production,
              backend sự cố hoặc sức khỏe máy chủ live.
            </span>
          </figcaption>
        </figure>
        <section className="lgo-panel lgo-service-proof-card-grid lgo-service-proof-brief-board lgo-status-fixture-board" aria-labelledby="status-fixture-heading">
          <SectionHeading eyebrow="Các hạng mục công khai" title="Trạng thái công khai tĩnh, không liên kết hệ thống">Các hạng mục này giúp người chơi biết bề mặt nào đang hiển thị công khai; chúng không phải dữ liệu giám sát hoặc backend thật.</SectionHeading>
          <Grid id="status-fixture-heading">
            {entries.map((entry) => (
              <GameCard className="lgo-service-proof-card" key={entry.slug}>
                <StatusBadge tone="jade">{maintenanceCategoryLabel(entry.category)}</StatusBadge>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
              </GameCard>
            ))}
          </Grid>
        </section>
        <StatusExplanationDepth />
        <StatusTrustBoard />
        <ReleaseReadinessHubCta />
        <ReleaseSurfaceAlignmentBoard />
        <PlayerTrustReleaseCta />
        <TrustJourneyCheckpointBoard />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <PerceivedLoadSignalBoard />
        <NoSearchBackendNoteBoard />
        <RoadmapDecisionGateBoard />
        <StagedReleaseMessagingBoard />
        <ClosedTesterInformationPackCta />
      </Stack>
    </WebAppShell>
  );
}
