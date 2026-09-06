export const testingStatus = {
  sourceValidators: "PYTHON_VALIDATORS_REQUIRED",
  runtime: "NODE24_PNPM_BROWSER_PRESEED_REQUIRED_FOR_SANDBOX_RUNTIME",
  e2e: "PLAYWRIGHT_BROWSER_RUNTIME_REQUIRED"
} as const;

export function expectProvisionalFixtureMarker(text: string) {
  return text.includes("PROVISIONAL_WEB_FIXTURE") && text.includes("NOT_CANONICAL_BACKEND_CONTRACT");
}
