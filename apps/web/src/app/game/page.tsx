import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/public-entry-layout.css";
import { PublicWorldLanding } from "../../components/PublicWorldLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/game");

export default function GamePage() {
  return <WebAppShell variant="immersive"><PublicWorldLanding/></WebAppShell>;
}
