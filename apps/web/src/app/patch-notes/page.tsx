import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, PageHeader, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Patch notes" };

export default function Page() {
  const entries = localContentRepository.list("patch-notes");
  return (
    <WebAppShell>
      <Stack>
        <PageHeader
          badge="Local content"
          badgeTone="spirit"
          eyebrow="PROVISIONAL_WEB_FIXTURE · No CMS · No backend"
          title="Patch notes"
          description="Patch notes hiện là fixture public để giữ continuity phát triển web, chưa phải nguồn release production hoặc CMS live."
        />
        <SectionHeading eyebrow="Fixture entries" title="Ghi chú phát triển tĩnh">No CMS. No backend. PROVISIONAL_WEB_FIXTURE only.</SectionHeading>
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
