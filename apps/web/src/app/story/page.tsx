import "@lgo-web/ui/story-landing-layout.css";
import { PublicStoryLanding } from "../../components/PublicStoryLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Cốt truyện" };

export default function StoryPage() {
  return <WebAppShell variant="immersive"><PublicStoryLanding/></WebAppShell>;
}
