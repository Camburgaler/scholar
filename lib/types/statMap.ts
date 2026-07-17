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
    | "AbsorptionPoison"
    | "AbsorptionBleed"
    | "AbsorptionPetrify"
    | "AbsorptionCurse"
    | "Agility"
    | "Poise"
    | WeaponEquipSlots
    | "DefenseStrike"
    | "DefenseSlash"
    | "DefenseThrust"
    | "DefensePoise";

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
    // <hr />
    ["LeftHandWeaponPrimary", "Left Hand Weapon (Primary)"],
    ["LeftHandWeaponSecondary", "Left Hand Weapon (Secondary)"],
    ["LeftHandWeaponTertiary", "Left Hand Weapon (Tertiary)"],
    ["RightHandWeaponPrimary", "Right Hand Weapon (Primary)"],
    ["RightHandWeaponSecondary", "Right Hand Weapon (Secondary)"],
    ["RightHandWeaponTertiary", "Right Hand Weapon (Tertiary)"],

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
    ["DefenseStrike", "VS Strike"],
    ["DefenseSlash", "VS Slash"],
    ["DefenseThrust", "VS Thrust"],
    ["DefensePoise", "Defense (Poise)"],
    ["AbsorptionMagic", "Absorption (Magic)"],
    ["AbsorptionFire", "Absorption (Fire)"],
    ["AbsorptionLightning", "Absorption (Lightning)"],
    ["AbsorptionDark", "Absorption (Dark)"],
    // <hr />
    ["AbsorptionPoison", "Absorption (Poison)"],
    ["AbsorptionBleed", "Absorption (Bleed)"],
    ["AbsorptionPetrify", "Absorption (Petrify)"],
    ["AbsorptionCurse", "Absorption (Curse)"],
]);

type StatMap<T> = {
    [key in StatMapKey]: T;
};

export default StatMap;
