import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/performance-layout.css";
import "@lgo-web/ui/reading-catalog.css";
import "@lgo-web/ui/announcement-board.css";
import { localContentRepository } from "@lgo-web/content";
import { Stack } from "@lgo-web/ui";
import { PublicPatchNoteRecords, PublicPatchNotesArchive, PublicPatchNotesHero, PublicPatchNotesReadingRoutes } from "../../components/PublicPatchNotesExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/patch-notes");

export default function Page() {
  const entries = localContentRepository.list("patch-notes");
  return <WebAppShell><Stack className="lgo-release-layout lgo-patch-notes-experience">
    <PublicPatchNotesHero/>
    <PublicPatchNoteRecords entries={entries}/>
    <PublicPatchNotesReadingRoutes/>
    <PublicPatchNotesArchive entries={entries}/>
  </Stack></WebAppShell>;
}
