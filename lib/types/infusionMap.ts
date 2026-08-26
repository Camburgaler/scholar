/**
 * @type InfusionMapKey
 * @description The key type for the {@link InfusionMap}.
 */
export type InfusionMapKey =
    | "Physical"
    | "Magic"
    | "Fire"
    | "Lightning"
    | "Dark"
    | "Poison"
    | "Bleed"
    | "Raw"
    | "Enchanted"
    | "Mundane";

/**
 * @type InfusionMap
 * @description A map from a {@link InfusionMapKey} to a value of type T.
 */
type InfusionMap<T> = {
    [K in InfusionMapKey]?: T;
};

export default InfusionMap;
