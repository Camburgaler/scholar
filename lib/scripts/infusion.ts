import ArmorSet from "@/lib/classes/armorSet";
import WeaponSlots, { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import EquippedRings from "@/lib/interfaces/equippedRings";
import Infusion, { Scaling } from "@/lib/interfaces/infusion";
import { reinforcedValue } from "@/lib/scripts/slopeIntercept";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import AttackPowerTypeMap, {
    AttackPowerTypeMapKey,
} from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";
import { InfusionMapKey } from "@/lib/types/infusionMap";

export function getTotalDamage(
    equippedWeapons: WeaponSlots,
    weaponSlot: WeaponEquipSlot,
    virtualAttributes: AttributeMap<number>,
    equippedArmor: ArmorSet,
    equippedRings: EquippedRings,
): AttackPowerTypeMap<number> {
    const infusionKey: InfusionMapKey =
        equippedWeapons.getWeapon(weaponSlot).infusion;
    const infusion: Infusion = equippedWeapons
        .getWeapon(weaponSlot)
        .data.Infusions.find((infusion) => infusion.Name === infusionKey)!;
    const reinforcementLevel =
        equippedWeapons.getWeapon(weaponSlot).reinforcementLevel;
    let damages: AttackPowerTypeMap<number> = {
        Physical: 0,
        Magic: 0,
        Lightning: 0,
        Fire: 0,
        Dark: 0,
        Poison: 0,
        Bleed: 0,
        Petrify: 0,
        Curse: 0,
    };

    // Calculate base damage
    for (const [attackPowerType, formula] of Object.entries(infusion.Damages)) {
        damages[attackPowerType as AttackPowerTypeMapKey] +=
            reinforcedValue(formula, reinforcementLevel) *
            infusion.BaseDamageScaling;
    }

    // Calculate scaling damage
    const scalingIndex = ("Level" +
        reinforcementLevel.toString().padStart(2, "0")) as keyof Scaling;
    const scales = infusion.Scaling[scalingIndex];

    if (infusionKey === "Enchanted") {
        // TODO: Scale physical damage by Intelligence
    } else {
        damages.Physical *= infusion.DamageRates.Physical;
        if (damages.Physical) {
            damages.Physical +=
                calculateStatDisplayValue(
                    "PhysicalAttackPowerByStrength",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.PhysicalByStrength;
            damages.Physical +=
                calculateStatDisplayValue(
                    "PhysicalAttackPowerByDexterity",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.PhysicalByDexterity;
        }
    }

    damages.Magic *= infusion.DamageRates.Magic;
    if (damages.Magic) {
        damages.Magic +=
            calculateStatDisplayValue(
                "AttackPowerMagic",
                virtualAttributes,
                equippedArmor,
                equippedRings,
                equippedWeapons,
            ) * scales.Magic;
    }

    damages.Lightning *= infusion.DamageRates.Lightning;
    if (damages.Lightning) {
        damages.Lightning +=
            calculateStatDisplayValue(
                "AttackPowerLightning",
                virtualAttributes,
                equippedArmor,
                equippedRings,
                equippedWeapons,
            ) * scales.Lightning;
    }

    damages.Fire *= infusion.DamageRates.Fire;
    if (damages.Fire) {
        damages.Fire +=
            calculateStatDisplayValue(
                "AttackPowerFire",
                virtualAttributes,
                equippedArmor,
                equippedRings,
                equippedWeapons,
            ) * scales.Fire;
    }

    damages.Dark *= infusion.DamageRates.Dark;
    if (damages.Dark) {
        damages.Dark +=
            calculateStatDisplayValue(
                "AttackPowerDark",
                virtualAttributes,
                equippedArmor,
                equippedRings,
                equippedWeapons,
            ) * scales.Dark;
    }

    damages.Poison! *= infusion.DamageRates.Poison!;
    if (damages.Poison) {
        damages.Poison! +=
            calculateStatDisplayValue(
                "AttackPowerPoison",
                virtualAttributes,
                equippedArmor,
                equippedRings,
                equippedWeapons,
            ) * scales.Poison!;
    }

    damages.Bleed! *= infusion.DamageRates.Bleed!;
    if (damages.Bleed) {
        damages.Bleed! +=
            calculateStatDisplayValue(
                "AttackPowerBleed",
                virtualAttributes,
                equippedArmor,
                equippedRings,
                equippedWeapons,
            ) * scales.Bleed!;
    }

    return damages;
}
