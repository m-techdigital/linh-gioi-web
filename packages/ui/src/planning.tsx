import { ReleaseIcon } from "./release";
import type { ReleaseIconName } from "./release";

export type PlanningGateView = {
  id: string; title: string; icon: ReleaseIconName;
  state: "ready" | "planned" | "blocked"; stateLabel: string;
};
/** Navigation between decision conditions, not a linear completion meter. */
export function PlanningGateMap({ items, headingId, title }: {
  items: readonly PlanningGateView[]; headingId: string; title: string;
}) {
  return <nav className="lgo-planning-map" aria-labelledby={headingId}>
    <span className="lgo-planning-map-overline">LINH GIỚI · ĐIỀU KIỆN TRƯỚC LỜI HỨA</span>
    <h2 id={headingId}>{title}</h2>
    <ol>{items.map((item,index) => <li key={item.id} data-state={item.state}>
      <a href={`#${item.id}`}><span className="lgo-planning-map-marker"><ReleaseIcon name={item.icon}/></span>
        <span><strong>{item.title}</strong><small>{item.stateLabel}</small></span>
        <span className="lgo-planning-map-index" aria-hidden="true">{String(index + 1).padStart(2,"0")}</span>
      </a>
    </li>)}</ol>
    <p>Các điều kiện cần đối chiếu, không phải phần trăm hoàn thành.</p>
  </nav>;
}
