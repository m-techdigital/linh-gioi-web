import { portalShellStates } from "@lgo-web/auth";
import { GameCard, Grid, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";

export default function PortalHomePage() {
  return (
    <main className="lgo-portal-shell">
      <Stack>
        <SpiritPanel>
          <StatusBadge tone="shadow">PROVISIONAL_WEB_FIXTURE · NOT_CANONICAL_BACKEND_CONTRACT</StatusBadge>
          <h1>Player Portal Shell</h1>
          <p>Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed.</p>
        </SpiritPanel>
        <SectionHeading title="Portal states" />
        <Grid>{portalShellStates.map((state) => <GameCard key={state}><h3>{state}</h3><p>Fixture-only UX state.</p></GameCard>)}</Grid>
      </Stack>
    </main>
  );
}
