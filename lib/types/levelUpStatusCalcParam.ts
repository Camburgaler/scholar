export type LevelUpStatusCalcParamKey =
    | "ID"
    | "Name"
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
    | "Defence"
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
    | "LeftHandWeaponPrimary"
    | "LeftHandWeaponSecondary"
    | "LeftHandWeaponTertiary"
    | "RightHandWeaponPrimary"
    | "RightHandWeaponSecondary"
    | "RightHandWeaponTertiary"
    | "DefenceStrike"
    | "DefenceSlash"
    | "DefenceThrust"
    | "DefencePoise";

type LevelUpStatusCalcParam = {
    [key in LevelUpStatusCalcParamKey]: boolean;
};

export default LevelUpStatusCalcParam;
