import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/download-landing-layout.css";
import { PublicDownloadLanding } from "../../components/PublicDownloadLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/download");

export default function DownloadPage() {
  return <WebAppShell variant="immersive"><PublicDownloadLanding /></WebAppShell>;
}
