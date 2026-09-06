import { GameCard, Stack, StatusBadge } from "@lgo-web/ui";

export default function Page() {
  return (
    <main className="lgo-portal-shell">
      <Stack>
        <GameCard>
          <StatusBadge tone="shadow">PROVISIONAL_WEB_FIXTURE</StatusBadge>
          <h1>Portal support shell</h1>
          <p>No support ticket backend. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT.</p>
          <p>Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed.</p>
        </GameCard>
      </Stack>
    </main>
  );
}
