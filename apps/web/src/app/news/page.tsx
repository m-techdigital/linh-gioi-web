import { contentDetailSections, localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../components/WebAppShell";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";

export const metadata = { title: "Tin tức" };

export default function NewsPage() {
  const entries = localContentRepository.list("news");
  return (
    <WebAppShell>
      <Stack>
        <ContentIaStartCta />
        <SectionHeading eyebrow="WEB v1.12 content IA hub · WEB v1.9 news detail UX" title="Tin tức">News list is now a route into deeper public explanations, not just short fixture cards. No CMS and no backend API integration.</SectionHeading>
        <Grid>
          {entries.map((entry) => (
            <GameCard key={entry.slug}>
              <StatusBadge tone="jade">PROVISIONAL_WEB_FIXTURE</StatusBadge>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <p><strong>{contentDetailSections.some((section) => section.slug === entry.slug) ? "Có detail section" : "Summary-only fixture"}</strong></p>
              <LinkButton href={`/news/${entry.slug}`}>Chi tiết</LinkButton>
            </GameCard>
          ))}
        </Grid>
      </Stack>
    </WebAppShell>
  );
}
