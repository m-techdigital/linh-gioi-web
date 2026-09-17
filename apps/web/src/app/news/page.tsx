import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/forms.css";
import "@lgo-web/ui/reading-catalog.css";
import "@lgo-web/ui/announcement-board.css";
import { PublicNewsDiscovery } from "../../components/PublicNewsDiscovery";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/news");

export default function NewsPage() {
  return <WebAppShell><PublicNewsDiscovery/></WebAppShell>;
}
