import SlopeIntercept from "@/lib/interfaces/slopeIntercept";

/**
 * @description Returns the value of a slope-intercept line at a given reinforcement level.
 * @param slopeIntercept The slope-intercept line to evaluate. {@link SlopeIntercept}
 * @param reinforcementLevel The reinforcement level to evaluate.
 * @returns The value of the slope-intercept line at the given reinforcement level.
 */
export function reinforcedValue(
    slopeIntercept: SlopeIntercept,
    reinforcementLevel: number,
): number {
    return slopeIntercept.Slope * reinforcementLevel + slopeIntercept.Intercept;
}
