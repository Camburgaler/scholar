// This type is used to represent a map of armor defenses to values.

export type DefenseMapKey = "Slash" | "Thrust" | "Strike" | "Standard";

type DefenseMap<T> = {
    [K in DefenseMapKey]: T;
};

export default DefenseMap;
