import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/keyboard-practice.css";
import {Stack} from "@lgo-web/ui";
import {PublicAccessibilityHero, PublicAccessibilityNotes, PublicAccessibilityPractice, PublicAccessibilityPrinciples, PublicAccessibilityRoutes} from "../../components/PublicAccessibilityExperience";
import {WebAppShell} from "../../components/WebAppShell";

export const metadata={title:"Dễ đọc và dễ thao tác"};

export default function AccessibilityReadabilityPage() {
 return <WebAppShell><Stack className="lgo-release-layout lgo-guidance-layout lgo-accessibility-experience">
  <PublicAccessibilityHero/>
  <PublicAccessibilityPractice/>
  <PublicAccessibilityRoutes/>
  <PublicAccessibilityPrinciples/>
  <PublicAccessibilityNotes/>
 </Stack></WebAppShell>;
}
