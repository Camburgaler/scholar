type ScalingAttributeKey = "Strength" | "Dexterity" | "Intelligence" | "Faith";

type OptionalAttributeKey =
    | "Vigor"
    | "Endurance"
    | "Vitality"
    | "Adaptability"
    | "Attunement";

export type AttributeMapKey = ScalingAttributeKey | OptionalAttributeKey;

type AttributeMap<T> = {
    [RK in ScalingAttributeKey]: T;
} & {
    [OK in OptionalAttributeKey]?: T;
};

export default AttributeMap;
