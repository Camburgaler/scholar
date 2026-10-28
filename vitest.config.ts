import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // Use jsdom for React component testing
        environment: "jsdom",

        // Enable globals (describe, it, expect)
        globals: true,

        // Point to where tests live
        include: ["__tests__/**/*.{test,spec}.{ts,tsx}"],

        // Setup file runs before each test file
        setupFiles: ["./test/setup.ts"],

        // Coverage configuration
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html", "lcov"],

            // Directories to exclude from coverage reports
            exclude: [
                "**/node_modules/**",
                "**/*.d.ts",
                // "**/data/**/*.json",
                // "lib/interfaces/**",
                // "lib/types/**",
                "test/**",
            ],

            // Report directories
            reportsDirectory: "./reports/vitest",

            // Thresholds for CI (will fail if not met)
            thresholds: {
                global: {
                    branches: 0, // Start permissive, tighten over time
                    functions: 0,
                    lines: 0,
                    statements: 0,
                },

                // Per-file thresholds (enforce on critical files)
                "lib/scripts/statCalculation.ts": {
                    lines: 0,
                    statements: 0,
                },
            },

            // Watermarks for colored output in reports
            watermarks: {
                branches: [50, 90],
                functions: [50, 90],
                lines: [50, 90],
                statements: [50, 90],
            },
        },
    },

    // Path aliases matching your tsconfig.json
    resolve: {
        tsconfigPaths: true,
    },
});
