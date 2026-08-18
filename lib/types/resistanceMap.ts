/**
 * @type ResistanceMapKey
 * @description The key type for the {@link ResistanceMap}.
 */
export type ResistanceMapKey = "Poison" | "Bleed" | "Petrify" | "Curse";

// The keys of the ResistanceMap
export const ResistanceMapKeys: ResistanceMapKey[] = [
    "Poison",
    "Bleed",
    "Petrify",
    "Curse",
];

/**
 * @type ResistanceMap
 * @description A map from a {@link ResistanceMapKey} to a value of type T.
 */
type ResistanceMap<T> = {
    [K in ResistanceMapKey]: T;
};

export default ResistanceMap;
