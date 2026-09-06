import { BeginnerGuideDepth, DownloadStatusDepth, SupportFaqDepth, WorldStoryDepth } from "../../../components/PublicGameInfoDepthSections";
import { SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Hướng dẫn người mới" };

export default function BeginnerGuidePage() {
  return (
    <WebAppShell>
      <Stack>
        <SpiritPanel>
          <StatusBadge tone="jade">WEB v1.8 beginner guide</StatusBadge>
          <h1>Hướng dẫn người chơi mới</h1>
          <p className="lgo-hero-lead">
            Một luồng đọc ngắn giúp người chơi hiểu Linh Giới Online hiện có gì, nên bắt đầu từ đâu,
            vì sao chưa có nút tải public, và hệ thống nào chưa được claim production.
          </p>
        </SpiritPanel>
        <WorldStoryDepth />
        <BeginnerGuideDepth />
        <DownloadStatusDepth />
        <SupportFaqDepth />
      </Stack>
    </WebAppShell>
  );
}
