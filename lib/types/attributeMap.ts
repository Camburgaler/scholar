/**
 * @type ScalingAttributeKey
 * @description A portion of {@link AttributeMapKey}.
 */
type ScalingAttributeKey = "Strength" | "Dexterity" | "Intelligence" | "Faith";

/**
 * @type OptionalAttributeKey
 * @description A portion of {@link AttributeMapKey}.
 */
type OptionalAttributeKey =
    | "Vigor"
    | "Endurance"
    | "Vitality"
    | "Adaptability"
    | "Attunement";

/**
 * @type AttributeMapKey
 * @description The key type for the {@link AttributeMap}.
 */
export type AttributeMapKey = ScalingAttributeKey | OptionalAttributeKey;

/**
 * @type AttributeMap
 * @description A map of attributes to values.
 */
type AttributeMap<T> = {
    [RK in ScalingAttributeKey]: T;
} & {
    [OK in OptionalAttributeKey]?: T;
};

export default AttributeMap;
