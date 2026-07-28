// This type is used to represent a map of armor defenses to values.

export type DefenseMapKey =
    | "Slash"
    | "Thrust"
    | "Strike"
    | "Standard"
    | "Magic"
    | "Lightning"
    | "Fire"
    | "Dark";

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

type DefenseMap<T> = {
    [K in DefenseMapKey]: T;
};

export default DefenseMap;
