import { StatMapKey } from "@/lib/types/statMap";

type ModifierKey =
    | StatMapKey
    | "AllPhysical"
    | "AntiStabilityModifier"
    | "ArmorDegradationRate"
    | "AttackPoiseDamage"
    | "AttunementSlots"
    | "Bleed"
    | "CurrentHPRatio"
    | "CurrentHPRatio2"
    | "Curse"
    | "Dark"
    | "EquipLoad"
    | "FallDamageProtectionModifier"
    | "Fire"
    | "HexPowerChime"
    | "HexPowerStaff"
    | "HPOnKill"
    | "IncomingDamageRate"
    | "IncomingPhysicalDamageRate"
    | "Lightning"
    | "Magic"
    | "MaxHP"
    | "MaxSpellUsages"
    | "MaxStamina"
    | "MiraclePower"
    | "OutgoingPhysicalDamageRate"
    | "Petrify"
    | "Poise"
    | "Poison"
    | "PvEDamageReduction"
    | "PyromancyPower"
    | "RingDegradationRate"
    | "ShieldStability"
    | "SorceryPower"
    | "SoulGainRate"
    | "SpellCastTime"
    | "ThrustCounterattackDamageRate"
    | "WeaponDegredationRate"
    | "Weight";

type ModifierMap = {
    [key in ModifierKey]?: number;
};

export default ModifierMap;
