import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Sự kiện" };

export default function Page() {
  const entries = localContentRepository.list("events");
  return (
    <WebAppShell>
      <Stack>
        <SectionHeading eyebrow="Local content" title="Sự kiện">No CMS. No backend. PROVISIONAL_WEB_FIXTURE only.</SectionHeading>
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
