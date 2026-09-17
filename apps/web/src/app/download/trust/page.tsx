import { metadataForRoute } from "../../../lib/public-metadata";
import "@lgo-web/ui/download-trust-landing-layout.css";
import { PublicDownloadTrustLanding } from "../../../components/PublicDownloadTrustLanding";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = metadataForRoute("/download/trust");

export default function DownloadTrustPage() {
  return <WebAppShell variant="immersive"><PublicDownloadTrustLanding /></WebAppShell>;
}
