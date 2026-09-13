import { AccessJourney } from "../../components/AccessJourney";
import { CheckboxField, FormActions, FormField, InlineFeedback, ProvisionalFeatureShell, SpiritButton, TextInput } from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge="PROVISIONAL_WEB_FIXTURE"
      title="Tạo tài khoản Linh Giới"
      description="No production account creation. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <AccessJourney journey="register" />
      <InlineFeedback tone="warning" title="Registration fixture only">
        Không tạo tài khoản, không lưu email và không có DB persistence.
      </InlineFeedback>
      <FormField id="portal-register-email" label="Email" help="Disabled fixture field.">
        {(controlProps) => <TextInput {...controlProps} type="email" placeholder="player@example.com" disabled />}
      </FormField>
      <FormField id="portal-register-name" label="Tên hiển thị" help="Chưa có canonical account/profile contract.">
        {(controlProps) => <TextInput {...controlProps} placeholder="LinhKhach" disabled />}
      </FormField>
      <CheckboxField id="portal-register-consent" label="Đồng ý điều khoản khi đăng ký mở" description="Chưa tiếp nhận sự đồng ý. Điều khoản chính thức sẽ được cung cấp trước khi tạo tài khoản." disabled />
      <FormActions>
        <SpiritButton type="button" disabled>Đăng ký chưa khả dụng</SpiritButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
