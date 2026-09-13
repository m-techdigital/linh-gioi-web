import { FormActions, LinkButton, ProgressStep, ProgressSteps } from "@lgo-web/ui";
import { portalAccessJourneys } from "../lib/portal-fixtures";

/** Portal route composition; shared UI owns all progress presentation. */
export function AccessJourney({ journey }: { journey: keyof typeof portalAccessJourneys }) {
  return (
    <section aria-label="Hành trình truy cập">
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
