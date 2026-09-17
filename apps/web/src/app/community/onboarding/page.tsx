import { metadataForRoute } from "../../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/progress.css";
import "@lgo-web/ui/reading-journey.css";
import { Stack } from "@lgo-web/ui";
import { PublicOnboardingAudiences, PublicOnboardingHero, PublicOnboardingReading, PublicOnboardingScopeNotes } from "../../../components/PublicCommunityOnboardingExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = metadataForRoute("/community/onboarding");

export default function CommunityOnboardingPage() {
  return <WebAppShell><Stack className="lgo-release-layout lgo-guidance-layout lgo-onboarding-experience">
    <PublicOnboardingHero/>
    <PublicOnboardingReading/>
    <PublicOnboardingAudiences/>
    <PublicOnboardingScopeNotes/>
  </Stack></WebAppShell>;
}
