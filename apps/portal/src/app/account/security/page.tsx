import { CheckboxField, FormActions, FormField, InlineFeedback, ProvisionalFeatureShell, SpiritButton, TextInput } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE } from "../../../lib/portal-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Bảo mật tài khoản"
      description="Security posture fixture. No real session/token/security mutation. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <InlineFeedback tone="warning" title="Chưa có canonical auth contract">
        Các control dưới đây chỉ kiểm tra hierarchy, accessibility và disabled state; không thu thập credential và không gọi backend.
      </InlineFeedback>
      <FormField id="fixture-email" label="Email bảo mật" help="Illustrative value only">
        {(controlProps) => <TextInput {...controlProps} defaultValue="fixture@example.invalid" disabled />}
      </FormField>
      <FormField id="fixture-password" label="Mật khẩu" help="Disabled fixture; no credential mutation">
        {(controlProps) => <TextInput {...controlProps} type="password" defaultValue="not-a-real-secret" disabled />}
      </FormField>
      <CheckboxField id="fixture-mfa" label="Xác thực tăng cường" description="UI preview only; no MFA contract exists." checked readOnly disabled />
      <FormActions>
        <SpiritButton type="button" disabled>Save security settings</SpiritButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
