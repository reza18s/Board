import nextJest from "next/jest.js";
import type { Config } from "jest";
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
