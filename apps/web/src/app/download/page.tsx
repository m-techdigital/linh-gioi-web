import "@lgo-web/ui/download-landing-layout.css";
import { PublicDownloadLanding } from "../../components/PublicDownloadLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Trạng thái chơi & tải game" };

export default function DownloadPage() {
  return <WebAppShell variant="immersive"><PublicDownloadLanding /></WebAppShell>;
}
