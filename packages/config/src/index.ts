export const lgoEnvironments = ["local", "dev", "staging", "production"] as const;
export type LgoEnvironment = (typeof lgoEnvironments)[number];

export const nonSecretConfigPolicy = {
  secrets: "NO_SECRETS_IN_REPO",
  backend: "Java/Spring Boot game backend remains canonical",
  deployment: "NO_PRODUCTION_DEPLOYMENT_CLAIM"
} as const;
