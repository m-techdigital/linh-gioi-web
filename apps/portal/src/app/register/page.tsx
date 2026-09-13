import { FormActions, FormField, InlineFeedback, ProvisionalFeatureShell, SpiritButton, TextInput } from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge="PROVISIONAL_WEB_FIXTURE"
      title="Register shell"
      description="No production account creation. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <InlineFeedback tone="warning" title="Registration fixture only">
        Không tạo tài khoản, không lưu email và không có DB persistence.
      </InlineFeedback>
      <FormField id="portal-register-email" label="Email" help="Disabled fixture field.">
        {(controlProps) => <TextInput {...controlProps} type="email" placeholder="player@example.com" disabled />}
      </FormField>
      <FormField id="portal-register-name" label="Tên hiển thị" help="Chưa có canonical account/profile contract.">
        {(controlProps) => <TextInput {...controlProps} placeholder="LinhKhach" disabled />}
      </FormField>
      <FormActions>
        <SpiritButton type="button" disabled>Đăng ký chưa khả dụng</SpiritButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
