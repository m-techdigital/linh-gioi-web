import {
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge
} from "@lgo-web/ui";
import {
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalCharacterFixtures
} from "../../lib/portal-fixtures";

const slotCount = 3;

export default function Page() {
  const slots = Array.from({ length: slotCount }, (_, index) => ({
    slot: index + 1,
    character: portalCharacterFixtures[index] ?? null
  }));

  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Nhân vật"
      description="Roster ba slot ưu tiên identity thật có thể nối backend: tên, Lộ và slot. Level/state/lastPlayed không còn là trục chính vì chưa có canonical authority."
      boundary="Player Portal vẫn chờ accepted Auth / DB / API contract. Không có character mutation hoặc create-character Web flow trong task này."
    >
      <section className="lgo-portal-character-roster" aria-labelledby="portal-character-roster-heading">
        <div className="lgo-portal-roster-heading">
          <div>
            <p className="lgo-card-kicker">Ba slot nhân vật</p>
            <h2 id="portal-character-roster-heading">Chọn context nhân vật</h2>
            <p>Hai slot minh họa dữ liệu roster; slot trống chỉ chứng minh empty state, không mở tạo nhân vật.</p>
          </div>
          <StatusBadge tone="spirit">{portalCharacterFixtures.length}/{slotCount} fixture slot</StatusBadge>
        </div>

        <div className="lgo-portal-character-grid" role="list" aria-label="Character slot roster">
          {slots.map(({ slot, character }) => character ? (
            <article className="lgo-portal-character-card" role="listitem" key={character.id}>
              <div className="lgo-portal-character-slot-label">
                <span>Slot {slot}</span>
                <StatusBadge tone={character.path === "Võ" ? "gold" : "spirit"}>{character.path}</StatusBadge>
              </div>
              <div className="lgo-portal-character-sigil" aria-hidden="true">{character.path}</div>
              <div className="lgo-portal-character-copy">
                <h3>{character.name}</h3>
                <p>Khu vực minh họa: {character.zone}</p>
                <small>Level/state/lastPlayed được cố ý ẩn khỏi hierarchy cho tới khi owning domain tồn tại.</small>
              </div>
              <LinkButton href={`/characters/${character.id}`} tone="gold">Mở hồ sơ</LinkButton>
            </article>
          ) : (
            <article className="lgo-portal-character-card lgo-portal-character-card-empty" role="listitem" key={`empty-${slot}`}>
              <div className="lgo-portal-character-slot-label"><span>Slot {slot}</span><StatusBadge tone="neutral">Trống</StatusBadge></div>
              <div className="lgo-portal-character-sigil" aria-hidden="true">+</div>
              <div className="lgo-portal-character-copy">
                <h3>Chưa có nhân vật</h3>
                <p>Empty state của roster thật trong tương lai.</p>
                <small>Không có create-character CTA vì production Portal contract chưa mở chức năng này.</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="lgo-portal-capability-note" aria-label="Character data boundary">
        <StatusBadge tone="shadow">NOT_CANONICAL_BACKEND_CONTRACT</StatusBadge>
        <div>
          <strong>Chưa đưa progression vào roster</strong>
          <p>Level, equipment, power/state và last-played chỉ xuất hiện khi backend domain tương ứng có authority thật.</p>
        </div>
      </aside>
    </ProvisionalFeatureShell>
  );
}
