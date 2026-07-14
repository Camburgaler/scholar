// This type is used to represent a map of weapon infusions to values.

export type InfusionMapKey =
    | "Basic"
    | "Magic"
    | "Fire"
    | "Lightning"
    | "Dark"
    | "Poison"
    | "Bleed"
    | "Raw"
    | "Enchanted"
    | "Mundane";

type InfusionMap<T> = {
    [K in InfusionMapKey]?: T;
};

export default InfusionMap;
