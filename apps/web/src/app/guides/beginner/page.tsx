import { BeginnerGuideDepth, DownloadStatusDepth, SupportFaqDepth, WorldStoryDepth } from "../../../components/PublicGameInfoDepthSections";
import { GameCard, LinkButton, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Hướng dẫn người mới" };

export default function BeginnerGuidePage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-beginnerpage-stack">
        <GameCard className="lgo-detail-hero-card lgo-beginner-hero-card">
          <StatusBadge tone="jade">Hướng dẫn nhập môn</StatusBadge>
          <span className="lgo-card-kicker">Cổng Linh · Đá Luyện · trạng thái tải game</span>
          <h1>Hướng dẫn người chơi mới</h1>
          <p className="lgo-hero-lead">
            Đọc theo một luồng ngắn: hiểu Cổng Linh, gặp Người Giữ Cổng, thử Đá Luyện, rồi kiểm tra trạng thái tải game và ranh giới backend trước khi kỳ vọng bản test.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/game" tone="spirit">Xem thế giới</LinkButton>
            <LinkButton href="/guides/world-gameplay-loop-guide" tone="gold">Guide vòng lặp</LinkButton>
            <LinkButton href="/download/trust" tone="jade">Tin cậy tải</LinkButton>
          </div>
          <p className="lgo-guide-detail-boundary"><strong>Ranh giới:</strong> đây là hướng dẫn công khai tĩnh cho người mới, không phải wiki lối chơi live, nhiệm vụ tài khoản, ticket hỗ trợ hoặc hợp đồng backend đã được chấp nhận.</p>
        </GameCard>
        <WorldStoryDepth />
        <BeginnerGuideDepth />
        <DownloadStatusDepth />
        <SupportFaqDepth />
      </Stack>
    </WebAppShell>
  );
}
