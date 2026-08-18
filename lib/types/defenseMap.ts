/**
 * @type DefenseMapKey
 * @description The key type for the {@link DefenseMap}.
 */
export type DefenseMapKey =
    | "Slash"
    | "Thrust"
    | "Strike"
    | "Standard"
    | "Magic"
    | "Lightning"
    | "Fire"
    | "Dark";

// The keys of the DefenseMap
export const DefenseMapKeys: DefenseMapKey[] = [
    "Slash",
    "Thrust",
    "Strike",
    "Standard",
    "Magic",
    "Lightning",
    "Fire",
    "Dark",
];

/**
 * @type DefenseMap
 * @description A map from a {@link DefenseMapKey} to a value of type T.
 */
type DefenseMap<T> = {
    [K in DefenseMapKey]: T;
};

export default DefenseMap;
