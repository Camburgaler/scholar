export type StatMapKey =
    | "Vigor"
    | "Endurance"
    | "Vitality"
    | "Adaptability"
    | "Strength"
    | "Dexterity"
    | "Intelligence"
    | "Faith"
    | "Attunement";

type StatMap<T> = {
    [key in StatMapKey]: T;
};

export default StatMap;
