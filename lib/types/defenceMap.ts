// This type is used to represent a map of armor defenses to values.

export type DefenceMapKey = "Slash" | "Thrust" | "Strike" | "Standard";

type DefenceMap<T> = {
    [K in DefenceMapKey]: T;
};

export default DefenceMap;
