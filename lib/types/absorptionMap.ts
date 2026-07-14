// This type is used to represent a map of armor resistances to values.

export type AbsorptionMapKey =
    | "Magic"
    | "Lightning"
    | "Fire"
    | "Dark"
    | "Poison"
    | "Bleed"
    | "Petrify"
    | "Curse";

type AbsorptionMap<T> = {
    [K in AbsorptionMapKey]: T;
};

export default AbsorptionMap;
