// This type is used to represent a map of attack power types to values.

type RequiredAttackPowerTypes =
    | "Physical"
    | "Magic"
    | "Lightning"
    | "Fire"
    | "Dark";
type OptionalAttackPowerTypes = "Poison" | "Bleed" | "Petrify" | "Curse";
export type AttackPowerTypeMapKey =
    | RequiredAttackPowerTypes
    | OptionalAttackPowerTypes;

type AttackPowerTypeMap<T> = {
    [RK in RequiredAttackPowerTypes]: T;
} & {
    [OK in OptionalAttackPowerTypes]?: T;
};

export default AttackPowerTypeMap;
