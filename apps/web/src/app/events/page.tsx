import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/performance-layout.css";
import "@lgo-web/ui/reading-catalog.css";
import "@lgo-web/ui/announcement-board.css";
import { localContentRepository } from "@lgo-web/content";
import { Stack } from "@lgo-web/ui";
import { PublicEventAnnouncements, PublicEventsHero, PublicEventsReadingRoutes } from "../../components/PublicEventsExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Sự kiện Linh Giới" };

export default function EventsPage() {
  const entries = localContentRepository.list("events");
  return <WebAppShell><Stack className="lgo-release-layout lgo-events-experience">
    <PublicEventsHero/>
    <PublicEventAnnouncements entries={entries}/>
    <PublicEventsReadingRoutes/>
  </Stack></WebAppShell>;
}
