import Modifier from "@/lib/interfaces/modifier";

/**
 * @type StatMapKey
 * @description The key type for the {@link StatMap}.
 */
export type StatMapKey =
    | "MaximumHP"
    | "MaximumStamina"
    | "MaximumEquipLoad"
    | "SpellSlotCount"
    | "SpellCastingSpeed"
    | "PhysicalAttackPowerByStrength"
    | "PhysicalAttackPowerByDexterity"
    | "AttackPowerMagic"
    | "AttackPowerFire"
    | "AttackPowerLightning"
    | "AttackPowerDark"
    | "AttackPowerPoison"
    | "AttackPowerBleed"
    | "Defense"
    | "AbsorptionMagic"
    | "AbsorptionFire"
    | "AbsorptionLightning"
    | "AbsorptionDark"
    | "ResistancePoison"
    | "ResistanceBleed"
    | "ResistancePetrify"
    | "ResistanceCurse"
    | "Agility"
    | "Poise";

// An array of all stat map keys
export const StatMapKeys: StatMapKey[] = [
    "MaximumHP",
    "MaximumStamina",
    "MaximumEquipLoad",
    "SpellSlotCount",
    "SpellCastingSpeed",
    "PhysicalAttackPowerByStrength",
    "PhysicalAttackPowerByDexterity",
    "AttackPowerMagic",
    "AttackPowerFire",
    "AttackPowerLightning",
    "AttackPowerDark",
    "AttackPowerPoison",
    "AttackPowerBleed",
    "Defense",
    "AbsorptionMagic",
    "AbsorptionFire",
    "AbsorptionLightning",
    "AbsorptionDark",
    "ResistancePoison",
    "ResistanceBleed",
    "ResistancePetrify",
    "ResistanceCurse",
    "Agility",
    "Poise",
];

// A map of the stat map keys to a boolean value that indicates whether the stat is a defense stat or not
export const StatIsDefenseOrResistance: Map<StatMapKey, boolean> = new Map<
    StatMapKey,
    boolean
>([
    ["Defense", true],
    ["AbsorptionMagic", true],
    ["AbsorptionFire", true],
    ["AbsorptionLightning", true],
    ["AbsorptionDark", true],
    ["ResistancePoison", true],
    ["ResistanceBleed", true],
    ["ResistancePetrify", true],
    ["ResistanceCurse", true],
]);

// A map of the stat map keys to the name of the stat
export const StatMapKeyToStatNameMap: Map<StatMapKey, string> = new Map<
    StatMapKey,
    string
>([
    // Middle Column
    ["MaximumHP", "Maximum HP"],
    ["MaximumStamina", "Maximum Stamina"],
    ["MaximumEquipLoad", "Equip Load"],
    ["Poise", "Poise"],
    ["SpellSlotCount", "Attunement Slots"],

    // Right Column
    ["SpellCastingSpeed", "Cast Speed"],
    ["Agility", "Agility"],
    // <hr />
    ["PhysicalAttackPowerByStrength", "Attack (Strength)"],
    ["PhysicalAttackPowerByDexterity", "Attack (Dexterity)"],
    ["AttackPowerMagic", "Magic Bonus"],
    ["AttackPowerFire", "Fire Bonus"],
    ["AttackPowerLightning", "Lightning Bonus"],
    ["AttackPowerDark", "Dark Bonus"],
    ["AttackPowerPoison", "Poison Bonus"],
    ["AttackPowerBleed", "Bleed Bonus"],
    // <hr />
    ["Defense", "Defense (Physical)"],
    ["AbsorptionMagic", "Absorption (Magic)"],
    ["AbsorptionFire", "Absorption (Fire)"],
    ["AbsorptionLightning", "Absorption (Lightning)"],
    ["AbsorptionDark", "Absorption (Dark)"],
    // <hr />
    ["ResistancePoison", "Resistance (Poison)"],
    ["ResistanceBleed", "Resistance (Bleed)"],
    ["ResistancePetrify", "Resistance (Petrify)"],
    ["ResistanceCurse", "Resistance (Curse)"],
]);

/**
 * A map of {@link Modifier} targets to their corresponding {@link StatMapKey}.
 */
export const ModifierTargetToStatMapKey: Map<string, StatMapKey> = new Map<
    string,
    StatMapKey
>([
    ["Max Equip Load", "MaximumEquipLoad"],
    ["Attunement Slots", "SpellSlotCount"],
    ["Max HP", "MaximumHP"],
    ["Spell Cast Time", "SpellCastingSpeed"],
    ["Bleed Damage", "AttackPowerBleed"],
    ["Poison Damage", "AttackPowerPoison"],
    ["Magic Defense", "AbsorptionMagic"],
    ["Fire Defense", "AbsorptionFire"],
    ["Lightning Defense", "AbsorptionLightning"],
    ["Dark Defense", "AbsorptionDark"],
    ["Bleed Defense", "ResistanceBleed"],
    ["Poison Defense", "ResistancePoison"],
    ["Petrify Defense", "ResistancePetrify"],
    ["Curse Defense", "ResistanceCurse"],
]);

/**
 * @type StatMap
 * @description A map from a {@link StatMapKey} to a value of type T.
 */
type StatMap<T> = {
    [key in StatMapKey]: T;
};

export default StatMap;
