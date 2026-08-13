import SlopeIntercept from "@/lib/interfaces/slopeIntercept";

export function reinforcedValue(
    slopeIntercept: SlopeIntercept,
    reinforcementLevel: number,
): number {
    return slopeIntercept.Slope * reinforcementLevel + slopeIntercept.Intercept;
}
