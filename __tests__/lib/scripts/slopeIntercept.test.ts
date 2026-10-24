/**
 * @fileoverview Tests for slope-intercept calculation utility
 */
import type SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import { reinforcedValue } from "@/lib/scripts/slopeIntercept";
import { describe, expect, it } from "vitest";

describe("reinforcedValue", () => {
    describe("basic calculations", () => {
        it("returns intercept at reinforcement level 0", () => {
            const line: SlopeIntercept = { Slope: 5, Intercept: 100 };
            expect(reinforcedValue(line, 0)).toBe(100);
        });

        it("calculates correct value at level 1", () => {
            const line: SlopeIntercept = { Slope: 5, Intercept: 100 };
            expect(reinforcedValue(line, 1)).toBe(105);
        });

        it("handles negative slopes correctly", () => {
            const line: SlopeIntercept = { Slope: -2, Intercept: 50 };
            expect(reinforcedValue(line, 10)).toBe(30);
        });

        it("handles zero slope (constant line)", () => {
            const line: SlopeIntercept = { Slope: 0, Intercept: 75 };
            expect(reinforcedValue(line, 0)).toBe(75);
            expect(reinforcedValue(line, 100)).toBe(75);
        });
    });

    describe("edge cases", () => {
        it("works with fractional slopes", () => {
            const line: SlopeIntercept = { Slope: 2.5, Intercept: 10 };
            expect(reinforcedValue(line, 4)).toBe(20);
        });

        it("works with large numbers", () => {
            const line: SlopeIntercept = { Slope: 100, Intercept: 1000 };
            expect(reinforcedValue(line, 50)).toBe(6000);
        });

        it("handles zero intercept", () => {
            const line: SlopeIntercept = { Slope: 10, Intercept: 0 };
            expect(reinforcedValue(line, 5)).toBe(50);
        });
    });
});
