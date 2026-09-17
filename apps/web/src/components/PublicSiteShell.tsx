import { Container, LgoThemeProvider, MarketingFooter } from "@lgo-web/ui";
import type { ReactNode } from "react";
import { PublicNavigation } from "./PublicNavigation";

export function PublicSiteShell({ children, variant }: { children: ReactNode; variant?: "immersive" | undefined }) {
  return (
    <LgoThemeProvider>
      <div className={`lgo-public-shell${variant === "immersive" ? " lgo-public-shell-immersive" : ""}`}>
        <a className="lgo-skip-link" href="#main-content">Bỏ qua menu tới nội dung chính</a>
        <header className="lgo-site-header">
          <Container><PublicNavigation/></Container>
        </header>
        <main id="main-content" className="lgo-main" tabIndex={-1}>
          <Container>{children}</Container>
        </main>
        <MarketingFooter brandSrc="/game-art/marketing/wordmark-brush.png" brandWidth={422} brandHeight={169}
          brandLabel="Linh Giới Online" tagline="Sống một đời khác trong Linh Giới" status="Bản công khai chưa mở" statusHref="/download"
          links={[{href:"/status",label:"Trạng thái"},{href:"/roadmap",label:"Lộ trình"},{href:"/support",label:"Hỗ trợ"}]}/>
      </div>
    </LgoThemeProvider>
  );
}
