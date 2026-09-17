import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/journey-landing-layout.css";
import { PublicJourneyLanding } from "../../components/PublicJourneyLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/journey");

export default function JourneyPage() {
  return <WebAppShell variant="immersive"><PublicJourneyLanding/></WebAppShell>;
}
