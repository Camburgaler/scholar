// This type is used to represent a map of armor resistances to values.

export type AbsorptionsMapKey =
    | "Magic"
    | "Lightning"
    | "Fire"
    | "Dark"
    | "Poison"
    | "Bleed"
    | "Petrify"
    | "Curse";

type AbsorptionsMap<T> = {
    [K in AbsorptionsMapKey]: T;
};

export default AbsorptionsMap;
