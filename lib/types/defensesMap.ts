// This type is used to represent a map of armor defenses to values.

export type DefensesMapKey = "Slash" | "Thrust" | "Strike" | "Standard";

type DefensesMap<T> = {
    [K in DefensesMapKey]: T;
};

export default DefensesMap;
