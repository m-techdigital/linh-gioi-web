import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/classes-landing-layout.css";
import { PublicClassesLanding } from "../../components/PublicClassesLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/classes");

export default function ClassesPage() {
  return <WebAppShell variant="immersive"><PublicClassesLanding/></WebAppShell>;
}
