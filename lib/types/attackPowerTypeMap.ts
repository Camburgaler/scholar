/**
 * @type RequiredAttackPowerTypes
 * @description The types of attack powers that are required. A subset of {@link AttackPowerTypeMapKey}.
 */
type RequiredAttackPowerTypes =
    | "Physical"
    | "Magic"
    | "Lightning"
    | "Fire"
    | "Dark";

/**
 * @type OptionalAttackPowerTypes
 * @description The types of attack powers that are optional. A subset of {@link AttackPowerTypeMapKey}.
 */
type OptionalAttackPowerTypes = "Poison" | "Bleed" | "Petrify" | "Curse";

/**
 * @type AttackPowerTypeMapKey
 * @description The key type for the {@link AttackPowerTypeMap}.
 */
export type AttackPowerTypeMapKey =
    | RequiredAttackPowerTypes
    | OptionalAttackPowerTypes;

/**
 * @type AttackPowerTypeMap
 * @description A map of attack power types to values.
 * @keys {@link AttackPowerTypeMapKey}
 */
type AttackPowerTypeMap<T> = {
    [RK in RequiredAttackPowerTypes]: T;
} & {
    [OK in OptionalAttackPowerTypes]?: T;
};

export default AttackPowerTypeMap;
