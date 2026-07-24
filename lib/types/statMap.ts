export type WeaponEquipSlots =
    | "LeftHandWeaponPrimary"
    | "LeftHandWeaponSecondary"
    | "LeftHandWeaponTertiary"
    | "RightHandWeaponPrimary"
    | "RightHandWeaponSecondary"
    | "RightHandWeaponTertiary";

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

type StatMap<T> = {
    [key in StatMapKey]: T;
};

export default StatMap;
