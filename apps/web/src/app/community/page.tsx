import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/community-layout.css";
import { Stack } from "@lgo-web/ui";
import { PublicCommunityConduct, PublicCommunityGallery, PublicCommunityHero, PublicCommunityPanels, PublicCommunityScopeNotes } from "../../components/PublicCommunityExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/community");

export default function CommunityPage() {
  return <WebAppShell><Stack className="lgo-release-layout lgo-guidance-layout lgo-community-experience">
    <PublicCommunityHero/>
    <PublicCommunityPanels/>
    <PublicCommunityGallery/>
    <PublicCommunityConduct/>
    <PublicCommunityScopeNotes/>
  </Stack></WebAppShell>;
}
