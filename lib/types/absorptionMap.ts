// This type is used to represent a map of armor resistances to values.

export type ResistanceMapKey = "Poison" | "Bleed" | "Petrify" | "Curse";

type ResistanceMap<T> = {
    [K in ResistanceMapKey]: T;
};

export default ResistanceMap;
