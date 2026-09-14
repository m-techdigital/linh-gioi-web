import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { communityPrinciples } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { CommunityReadinessDepth } from "../../components/PublicGameInfoDepthSections";
import { CommunityFeedbackGuidance, CommunityOnboardingPathBoard, CommunityRoadmapOnboardingCta } from "../../components/PublicOnboardingSections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { LinkButton } from "@lgo-web/ui";
import { CommunityConductBoard, PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";

export const metadata = { title: "Cộng đồng" };

export default function CommunityPage() {
  return (
    <WebAppShell>
      <Stack>
        <SpiritPanel>
          <StatusBadge tone="jade">WEB v1.14 player safety support · WEB v1.12 content IA hub · WEB v1.11 community onboarding · WEB v1.8 community readiness</StatusBadge>
          <h1>Cộng đồng Linh Giới</h1>
          <p className="lgo-hero-lead">
            Khu vực cộng đồng được chuẩn bị để gom thông báo, hướng dẫn tham gia test và quy tắc ứng xử.
            Chưa có chat, forum, guild, friend list, ticket backend hoặc live community backend.
          </p>
        </SpiritPanel>
        <PlayerTrustReleaseCta />
        <SectionHeading eyebrow="Community readiness" title="Những gì web có thể nói ngay" />
        <Grid>
          <GameCard>
            <h3>Thông báo test</h3>
            <p>Chỉ hiển thị khi có release artifact và owner duyệt nội dung. No CMS, no backend scheduler.</p>
          </GameCard>
          <GameCard>
            <h3>Quy tắc ứng xử</h3>
            <p>Chuẩn bị tone thân thiện, không mở moderation/admin mutation khi chưa có ops contract.</p>
          </GameCard>
          <GameCard>
            <h3>Kênh phản hồi</h3>
            <p>Hiện là static guidance. Real feedback/ticket flow cần accepted API/RBAC/audit contract.</p>
          </GameCard>
        </Grid>

        <CommunityReadinessDepth />

        <CommunityOnboardingPathBoard />

        <ContentIaStartCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />

        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />

        <CommunityFeedbackGuidance />

        <CommunityConductBoard />

        <section className="lgo-action-band"><div><h2>Onboarding cộng đồng</h2><p>Người chơi mới nên đọc status, download trust và roadmap gates trước khi kỳ vọng closed test hoặc backend thật.</p></div><LinkButton href="/community/onboarding" tone="jade">Mở onboarding</LinkButton></section>

        <section className="lgo-panel">
          <SectionHeading eyebrow="Tone" title="Nguyên tắc cộng đồng" />
          <Grid>
            {communityPrinciples.map((item) => (
              <GameCard key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </GameCard>
            ))}
          </Grid>
        </section>
      <CommunityRoadmapOnboardingCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
