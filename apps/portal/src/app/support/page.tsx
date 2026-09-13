import {
  ActivityTimeline,
  ActivityTimelineItem,
  CaseSummary,
  CaseSummaryItem,
  DataList,
  DataListItem,
  FormActions,
  InlineFeedback,
  ProvisionalFeatureShell,
  SpiritButton,
  StatusBadge
} from "@lgo-web/ui";
import {
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalSupportCaseFixtures,
  portalSupportTopics
} from "../../lib/portal-fixtures";

export default function Page() {
  const supportCase = portalSupportCaseFixtures[0];
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Hỗ trợ người chơi"
      description="Support journey fixture: chọn chủ đề → xem case state → hiểu bước tiếp theo, không tạo ticket backend thật."
      boundary="No support-ticket backend, account lookup or moderation mutation is available until accepted Support/Auth/API contracts exist."
    >
      <InlineFeedback tone="warning" title="Support fixture only">
        Không gửi ticket, upload log hay tra cứu account thật. Các control/action hiện tại chỉ mô tả journey dự kiến.
      </InlineFeedback>

      <DataList aria-label="Support topics">
        {portalSupportTopics.map((topic) => (
          <DataListItem
            key={topic.id}
            title={topic.title}
            description={topic.description}
            trailing={<StatusBadge tone="neutral">fixture</StatusBadge>}
          />
        ))}
      </DataList>

      <CaseSummary
        title={supportCase.title}
        state={supportCase.state}
        tone="gold"
        summary="Một case mẫu để kiểm tra cách người chơi đọc trạng thái, category và next step trước khi support contract được mở."
        actions={(
          <FormActions>
            <SpiritButton type="button" disabled>Mở case mới chưa khả dụng</SpiritButton>
          </FormActions>
        )}
      >
        <CaseSummaryItem label="Mã case" value={supportCase.id} />
        <CaseSummaryItem label="Chủ đề" value={supportCase.category} />
        <CaseSummaryItem label="Cập nhật" value={supportCase.updatedAt} />
        <CaseSummaryItem label="Bước tiếp" value={supportCase.nextStep} />
      </CaseSummary>

      <ActivityTimeline aria-label="Support case activity">
        {supportCase.timeline.map((event) => (
          <ActivityTimelineItem
            key={`${supportCase.id}:${event.timestamp}`}
            title={event.title}
            timestamp={event.timestamp}
            description={event.description}
            tone="neutral"
          />
        ))}
      </ActivityTimeline>
    </ProvisionalFeatureShell>
  );
}
