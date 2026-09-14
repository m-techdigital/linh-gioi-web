import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, PageHeader, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Sự kiện" };

export default function Page() {
  const entries = localContentRepository.list("events");
  return (
    <WebAppShell>
      <Stack>
        <PageHeader
          badge="Local content"
          badgeTone="jade"
          eyebrow="PROVISIONAL_WEB_FIXTURE · No CMS · No backend"
          title="Sự kiện"
          description="Các event hiện là nội dung tĩnh để người chơi hiểu hướng vận hành cộng đồng, chưa phải lịch live hoặc CMS production."
        />
        <SectionHeading eyebrow="Fixture entries" title="Danh sách sự kiện tĩnh">No CMS. No backend. PROVISIONAL_WEB_FIXTURE only.</SectionHeading>
        <Grid>
          {entries.map((entry) => (
            <GameCard key={entry.slug}>
              <StatusBadge tone="jade">{entry.category}</StatusBadge>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </GameCard>
          ))}
        </Grid>
      </Stack>
    </WebAppShell>
  );
}
