import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hướng dẫn" };

export default function GuidesPage() {
  const entries = localContentRepository.list("guides");
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack">
        <PublicPlayerHero
          className="lgo-guide-hero"
          badge="Guides & codex"
          badgeTone="jade"
          kicker="HIỂU THẾ GIỚI TRƯỚC KHI TỐI ƯU NHÂN VẬT"
          title="Hướng dẫn cho Người Thức Tỉnh"
          lead="Bắt đầu với world, class, onboarding và trạng thái phát hành; các tài liệu kỹ thuật/roadmap sâu hơn vẫn có thể tìm thấy nhưng không còn đứng trước trải nghiệm người chơi."
          actions={[
            { href: "/start", label: "Bắt đầu chơi", tone: "gold" },
            { href: "/classes", label: "Năm Lộ", tone: "spirit" },
            { href: "/game", label: "Bản đồ thế giới", tone: "jade" }
          ]}
        />
        <SectionHeading eyebrow="Thư viện hướng dẫn" title="Từ nhập môn tới release trust">
          Nội dung cũ vẫn được giữ để đảm bảo continuity, nhưng player-facing guides được đặt trong một hierarchy rõ ràng hơn.
        </SectionHeading>
        <Grid>
          {entries.map((entry) => (
            <GameCard key={entry.slug}>
              <StatusBadge tone="jade">{entry.category}</StatusBadge>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <LinkButton href={`/guides/${entry.slug}`} tone="jade">Mở guide</LinkButton>
            </GameCard>
          ))}
        </Grid>
      </Stack>
    </WebAppShell>
  );
}
