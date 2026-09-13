import { opsApprovalSteps } from "../../lib/ops-fixtures";
import { ProgressSteps, ProgressStep, CheckboxField, FormActions, FormField, InlineFeedback, ProvisionalFeatureShell, SelectInput, SpiritButton } from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge="PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION"
      title="Security & Governance"
      description="Visual-only ops/admin shell. NOT_CANONICAL_BACKEND_CONTRACT. No real mutation endpoints, no database mutation, no real permission model."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <InlineFeedback tone="warning" title="Governance controls are disabled fixtures">
        Không có canonical role, permission mutation hoặc approval backend.
      </InlineFeedback>
      <ProgressSteps label="Điều kiện phê duyệt dự kiến">
        {opsApprovalSteps.map((step) => <ProgressStep key={step.title} {...step} />)}
      </ProgressSteps>
      <FormField id="ops-role-preview" label="Role preview" help="NOT_CANONICAL_BACKEND_CONTRACT — chỉ minh họa control shape.">
        {(controlProps) => (
          <SelectInput {...controlProps} disabled defaultValue="viewer">
            <option value="viewer">Viewer fixture</option>
            <option value="operator">Operator fixture</option>
          </SelectInput>
        )}
      </FormField>
      <CheckboxField
        id="ops-dual-approval-preview"
        label="Require dual approval"
        description="Visual fixture only — không bật policy thật."
        disabled
      />
      <FormActions>
        <SpiritButton type="button" disabled>Apply policy — blocked</SpiritButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
