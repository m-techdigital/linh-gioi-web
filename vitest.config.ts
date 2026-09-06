import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: false,
    passWithNoTests: true,
    environment: "node",
    include: ["**/*.test.ts", "**/*.test.tsx"]
  }
});
