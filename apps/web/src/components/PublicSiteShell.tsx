import { Container, LgoThemeProvider } from "@lgo-web/ui";
import type { ReactNode } from "react";
import { PublicNavigation } from "./PublicNavigation";
import { PublicDesignTargetReference } from "./PublicDesignTargetReference";

export function PublicSiteShell({ children, variant }: { children: ReactNode; variant?: "immersive" | undefined }) {
  return (
    <LgoThemeProvider>
      <div className={`lgo-public-shell${variant === "immersive" ? " lgo-public-shell-immersive" : ""}`}>
        <a className="lgo-skip-link" href="#main-content">Bỏ qua menu tới nội dung chính</a>
        <header className="lgo-site-header">
          <Container><PublicNavigation /></Container>
        </header>
        <main id="main-content" className="lgo-main" tabIndex={-1}>
          <Container>{children}</Container>
        </main>
        {variant !== "immersive" ? <aside className="lgo-design-target-band">
          <Container><PublicDesignTargetReference /></Container>
        </aside> : null}
        <footer className="lgo-brand-footer">
          <Container className="lgo-brand-footer-inner">
            <div>
              <strong>Linh Giới Online</strong>
              <p>MMORPG hành động cộng đồng 2D · Một thế giới để chiến đấu, trưởng thành và thuộc về.</p>
            </div>
            <div className="lgo-footer-links">
              <a href="/download">Trạng thái chơi</a><a href="/status">Trạng thái</a><a href="/roadmap">Roadmap</a><a href="/support">Hỗ trợ</a>
            </div>
            <small>Bản public chưa được mở. Các trang Download/Status là nguồn kiểm tra availability hiện tại.</small>
          </Container>
        </footer>
      </div>
    </LgoThemeProvider>
  );
}
