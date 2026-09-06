import { GameCard, Stack, StatusBadge } from "@lgo-web/ui";

export default function Page() {
  return (
    <main className="lgo-ops-shell">
      <Stack>
        <GameCard>
          <StatusBadge tone="shadow">PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION</StatusBadge>
          <h1>Support</h1>
          <p>Visual-only ops/admin shell. NOT_CANONICAL_BACKEND_CONTRACT. No real mutation endpoints, no database mutation, no real permission model.</p>
          <p>Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed.</p>
        </GameCard>
      </Stack>
    </main>
  );
}
