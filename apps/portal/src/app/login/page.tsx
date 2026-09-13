import { AccessJourney } from "../../components/AccessJourney";
import { BlockedActionButton, CheckboxField, FormActions, FormField, InlineFeedback, ProvisionalFeatureShell, TextInput } from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge="PROVISIONAL_WEB_FIXTURE"
      title="Đăng nhập Linh Giới"
      description="No real password validation semantics. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <AccessJourney journey="login" />
      <InlineFeedback tone="warning" title="Fixture only — đăng nhập thật chưa được mở">
        Các control bên dưới bị khóa để mô tả UX shape; không gửi credential và không gọi backend.
      </InlineFeedback>
      <FormField id="portal-login-email" label="Email / tài khoản" help="Fixture field — không thu dữ liệu thật.">
        {(controlProps) => <TextInput {...controlProps} type="email" placeholder="player@example.com" disabled />}
      </FormField>
      <FormField id="portal-login-password" label="Mật khẩu" help="Không có production password semantics.">
        {(controlProps) => <TextInput {...controlProps} type="password" value="fixture-only" readOnly disabled />}
      </FormField>
      <CheckboxField id="portal-login-remember" label="Ghi nhớ thiết bị" description="Tùy chọn minh họa đang khóa; không lưu thiết bị hay tạo phiên." disabled />
      <FormActions>
        <BlockedActionButton id="portal-login-blocked-action" reason="NO_ACCEPTED_BACKEND_CONTRACT — No production auth, session or credential validation exists yet.">Đăng nhập chưa khả dụng</BlockedActionButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
