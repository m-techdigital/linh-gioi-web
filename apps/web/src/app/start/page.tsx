import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/start-landing-layout.css";
import { PublicStartLanding } from "../../components/PublicStartLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/start");

export default function StartPage() {
  return <WebAppShell variant="immersive"><PublicStartLanding /></WebAppShell>;
}
