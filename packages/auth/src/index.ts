export const authStatus = "NO_PRODUCTION_AUTH" as const;
export const backendContractStatus = "NO_ACCEPTED_BACKEND_CONTRACT" as const;
export const authBoundary = "Auth helpers blocked until backend contract" as const;

export type PortalShellState =
  | "loading"
  | "empty"
  | "error"
  | "unauthorized"
  | "forbidden"
  | "session-expired"
  | "offline"
  | "success-demo";

export const portalShellStates: PortalShellState[] = [
  "loading",
  "empty",
  "error",
  "unauthorized",
  "forbidden",
  "session-expired",
  "offline",
  "success-demo"
];
