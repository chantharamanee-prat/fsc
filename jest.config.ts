// jest.config.ts
import type { Config } from "@jest/types";
import { defaults } from "jest-config";
// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ["js", "ts"],
    testPathIgnorePatterns: [
      ...defaults.testPathIgnorePatterns,
      "/dist/",
    ],
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },
    },
    "rootDir": "./",
    "modulePaths": [
      "<rootDir>",
    ],
    transform: {
      "^.+\\.(t|j)s?$": "@swc/jest",
    },
  };
};
