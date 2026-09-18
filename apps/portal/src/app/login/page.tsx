import { AccessJourney } from "../../components/AccessJourney";
import {
  BlockedActionButton,
  CheckboxField,
  FormActions,
  FormField,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge,
  TextInput
} from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge="PROVISIONAL_WEB_FIXTURE · NOT_CANONICAL_BACKEND_CONTRACT"
      title="Đăng nhập Linh Giới"
      description="Bản mẫu ưu tiên đúng thứ tự truy cập: thông tin tài khoản trước, ngữ cảnh thế giới sau. Chưa gửi credential hoặc tạo phiên thật."
      boundary="Player Portal vẫn chờ Auth / DB / API canonical contract. Các control dưới đây chỉ chứng minh hierarchy, keyboard flow và state UX."
    >
      <section className="lgo-portal-task-card lgo-portal-auth-task" aria-labelledby="portal-login-task-heading">
        <div className="lgo-portal-task-card-heading">
          <div>
            <p className="lgo-card-kicker">Truy cập tài khoản</p>
            <h2 id="portal-login-task-heading">Đăng nhập sẽ bắt đầu tại đây</h2>
          </div>
          <StatusBadge tone="shadow">Contract-blocked</StatusBadge>
        </div>
        <p className="lgo-portal-task-lead">
          Khi contract được mở, đây là vùng nhận identifier và mật khẩu. Hiện tại control vẫn aria-disabled để không thu dữ liệu thật.
        </p>
        <div className="lgo-portal-auth-fields">
          <FormField id="portal-login-email" label="Email / tài khoản" help="Fixture field — không thu dữ liệu thật.">
            {(controlProps) => <TextInput {...controlProps} type="email" placeholder="player@example.com" disabled />}
          </FormField>
          <FormField id="portal-login-password" label="Mật khẩu" help="Không có production password semantics.">
            {(controlProps) => <TextInput {...controlProps} type="password" value="fixture-only" readOnly disabled />}
          </FormField>
        </div>
        <CheckboxField
          id="portal-login-remember"
          label="Ghi nhớ thiết bị"
          description="Tùy chọn minh họa chờ durable session policy; không lưu thiết bị hay tạo phiên."
          disabled
        />
        <FormActions>
          <BlockedActionButton
            id="portal-login-blocked-action"
            reason="NO_ACCEPTED_BACKEND_CONTRACT — production auth/session chưa được mở."
          >
            Đăng nhập chưa khả dụng
          </BlockedActionButton>
          <LinkButton href="/register" tone="gold">Tạo tài khoản</LinkButton>
          <LinkButton href="/recovery" tone="neutral">Khôi phục truy cập</LinkButton>
        </FormActions>
      </section>

      <section className="lgo-portal-secondary-context" aria-labelledby="portal-login-context-heading">
        <div className="lgo-portal-section-intro">
          <p className="lgo-card-kicker">Ngữ cảnh thế giới</p>
          <h2 id="portal-login-context-heading">Truy cập là cổng vào hành trình, không phải toàn bộ màn hình</h2>
          <p>Game-art và các bước truy cập nằm sau nhiệm vụ chính để giữ cảm giác Linh Giới mà không che form.</p>
        </div>
        <AccessJourney journey="login" />
      </section>
    </ProvisionalFeatureShell>
  );
}
