export const contractStatus = "NO_ACCEPTED_BACKEND_CONTRACT" as const;
export const backendIntegration = "BLOCKED_UNTIL_EXPLICIT_GAME_BACKEND_CONTRACT_SYNC" as const;

export class BackendContractUnavailableError extends Error {
  constructor(message = "No accepted backend API contract is available for the web repo.") {
    super(message);
    this.name = "BackendContractUnavailableError";
  }
}

export function assertBackendContractAvailable(): never {
  throw new BackendContractUnavailableError();
}
