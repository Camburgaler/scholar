export type AttributeMapKey =
    | "Vigor"
    | "Endurance"
    | "Vitality"
    | "Adaptability"
    | "Strength"
    | "Dexterity"
    | "Intelligence"
    | "Faith"
    | "Attunement";

type AttributeMap<T> = {
    [key in AttributeMapKey]: T;
};

export default AttributeMap;
