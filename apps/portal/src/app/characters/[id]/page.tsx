import { KeyValueGrid, KeyValueItem, LinkButton, ProvisionalFeatureShell, StatusBadge } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, portalCharacterFixtures } from "../../../lib/portal-fixtures";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = portalCharacterFixtures.find((item) => item.id === id) ?? portalCharacterFixtures[0];

  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title={`Nhân vật · ${character.name}`}
      description="Character detail fixture only. No canonical character model. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <KeyValueGrid aria-label="Character fixture details">
        <KeyValueItem label="Lộ" value={character.path} detail="Presentation identity only" tone="spirit" />
        <KeyValueItem label="Tiến trình" value={character.level} detail="Illustrative level; no progression persistence" tone="gold" />
        <KeyValueItem label="Khu vực" value={character.zone} detail="No authoritative world-session state" tone="jade" />
        <KeyValueItem label="Trạng thái" value={<StatusBadge tone="neutral">{character.state}</StatusBadge>} detail={character.lastPlayed} />
      </KeyValueGrid>
      <div className="lgo-hero-actions">
        <LinkButton href="/characters">Về danh sách</LinkButton>
        <LinkButton href="/account" tone="gold">Tài khoản</LinkButton>
      </div>
    </ProvisionalFeatureShell>
  );
}
