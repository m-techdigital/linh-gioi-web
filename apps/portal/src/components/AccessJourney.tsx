import { FormActions, LinkButton, ProgressStep, ProgressSteps } from "@lgo-web/ui";
import { portalAccessJourneys } from "../lib/portal-fixtures";

/** Portal route composition; shared UI owns all progress presentation. */
export function AccessJourney({ journey }: { journey: keyof typeof portalAccessJourneys }) {
  return (
    <section className="lgo-access-journey" aria-label="Hành trình truy cập">
      <figure className="lgo-access-journey-visual" aria-label="Portal access gate art panel">
        <img
          src="/game-art/world/dong-mon-skyline.webp"
          alt="Portal access gate art"
          loading="eager"
          decoding="async"
        />
        <figcaption>
          <strong>Đông Môn access gate</strong>
          <span>Ảnh game-art thật dùng để mô tả entry flow; đăng nhập vẫn bị khóa đến khi Auth/DB/API contract được chấp nhận.</span>
        </figcaption>
      </figure>
      <ProgressSteps label="Các bước truy cập dự kiến">
        {portalAccessJourneys[journey].map((step) => <ProgressStep key={step.title} {...step} />)}
      </ProgressSteps>
      <FormActions>
        {journey !== "login" && <LinkButton href="/login">Đã có tài khoản</LinkButton>}
        {journey !== "register" && <LinkButton href="/register">Chưa có tài khoản</LinkButton>}
        {journey !== "recovery" && <LinkButton href="/recovery">Cần khôi phục truy cập</LinkButton>}
        <LinkButton href="/access" tone="gold">Trạng thái truy cập</LinkButton>
      </FormActions>
    </section>
  );
}
