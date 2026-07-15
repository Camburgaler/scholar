export type WeaponEquipSlots =
    | "LeftHandWeaponPrimary"
    | "LeftHandWeaponSecondary"
    | "LeftHandWeaponTertiary"
    | "RightHandWeaponPrimary"
    | "RightHandWeaponSecondary"
    | "RightHandWeaponTertiary";

export type LevelUpStatusCalcParamKey =
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

export const LevelUpStatusCalcParamMap: Map<LevelUpStatusCalcParamKey, string> =
    new Map<LevelUpStatusCalcParamKey, string>([
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

type LevelUpStatusCalcParamCore = {
    [key in LevelUpStatusCalcParamKey]: boolean;
};

export type LevelUpStatusCalcParam = LevelUpStatusCalcParamCore & {
    ID: number;
    Name: string;
};

export default LevelUpStatusCalcParam;
