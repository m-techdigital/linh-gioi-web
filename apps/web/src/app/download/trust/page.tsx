import "@lgo-web/ui/download-trust-landing-layout.css";
import { PublicDownloadTrustLanding } from "../../../components/PublicDownloadTrustLanding";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Tin cậy tải game" };

export default function DownloadTrustPage() {
  return <WebAppShell variant="immersive"><PublicDownloadTrustLanding /></WebAppShell>;
}
