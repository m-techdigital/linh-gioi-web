import { FormActions, FormField, InlineFeedback, ProvisionalFeatureShell, SpiritButton, TextInput } from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge="PROVISIONAL_WEB_FIXTURE"
      title="Login shell"
      description="No real password validation semantics. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <InlineFeedback tone="warning" title="Fixture only — đăng nhập thật chưa được mở">
        Các control bên dưới bị khóa để mô tả UX shape; không gửi credential và không gọi backend.
      </InlineFeedback>
      <FormField id="portal-login-email" label="Email / tài khoản" help="Fixture field — không thu dữ liệu thật.">
        {(controlProps) => <TextInput {...controlProps} type="email" placeholder="player@example.com" disabled />}
      </FormField>
      <FormField id="portal-login-password" label="Mật khẩu" help="Không có production password semantics.">
        {(controlProps) => <TextInput {...controlProps} type="password" value="fixture-only" readOnly disabled />}
      </FormField>
      <FormActions>
        <SpiritButton type="button" disabled>Đăng nhập chưa khả dụng</SpiritButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
