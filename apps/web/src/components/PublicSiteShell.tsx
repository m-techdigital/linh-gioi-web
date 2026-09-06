import { Container, LgoThemeProvider, SiteFooter } from "@lgo-web/ui";
import type { ReactNode } from "react";
import { PublicNavigation } from "./PublicNavigation";

export function PublicSiteShell({ children }: { children: ReactNode }) {
  return (
    <LgoThemeProvider>
      <div className="lgo-public-shell">
        <a className="lgo-skip-link" href="#main-content">Bỏ qua menu tới nội dung chính</a>
        <header>
          <Container>
            <PublicNavigation />
          </Container>
        </header>
        <main id="main-content" className="lgo-main" tabIndex={-1}>
          <Container>{children}</Container>
        </main>
        <SiteFooter>
          <p>No production auth, DB persistence, CMS, deployment, or backend integration is claimed.</p>
        </SiteFooter>
      </div>
    </LgoThemeProvider>
  );
}
