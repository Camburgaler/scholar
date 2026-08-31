import ArmorSet from "@/lib/classes/armorSet";
import WeaponSlots from "@/lib/classes/weaponSlots";
import { Weapons } from "@/lib/gameData";
import EquippedRings from "@/lib/interfaces/equippedRings";
import Infusion, { Scaling } from "@/lib/interfaces/infusion";
import Modifier from "@/lib/interfaces/modifier";
import Weapon from "@/lib/interfaces/weapon";
import { reinforcedValue } from "@/lib/scripts/slopeIntercept";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import AttackPowerTypeMap, {
    AttackPowerTypeMapKey,
} from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";
import { InfusionMapKey } from "@/lib/types/infusionMap";

/**
 * @type EquippedWeapon
 * @description An interface representing an equipped weapon.
 * @member data - The weapon being equipped. {@link Weapon}
 * @member reinforcementLevel - The reinforcement level of the weapon.
 * @member infusion - The infusion applied to the weapon. {@link InfusionMapKey}
 */
class EquippedWeapon {
    private _data: Weapon = Weapons[0];

    public reinforcementLevel: number = 0;
    public infusionKey: InfusionMapKey = "Physical";

    // STATIC METHODS

    public static fromEquippedWeapon(
        equippedWeapon: EquippedWeapon,
    ): EquippedWeapon {
        let equippedWeaponCopy = new EquippedWeapon();
        equippedWeaponCopy.copyFrom(equippedWeapon);

        return equippedWeaponCopy;
    }

    public static fromWeapon(weapon: Weapon): EquippedWeapon {
        let equippedWeapon = new EquippedWeapon();
        equippedWeapon._data = weapon;
        return equippedWeapon;
    }

    // GETTERS & SETTERS

    public get modifiers(): Modifier[] {
        return this._data.Modifiers;
    }

    public get name(): string {
        return this._data.Name;
    }

    public get infusions(): Infusion[] {
        return this._data.Infusions;
    }

    public get maxReinforcementLevel(): number {
        return this._data.MaxReinforcementLevel;
    }

    public get infusion(): Infusion {
        return this.infusions.find(
            (infusion) => infusion.Name === this.infusionKey,
        )!;
    }

    public copyFrom(equippedWeapon: EquippedWeapon) {
        this._data = equippedWeapon._data;
        this.reinforcementLevel = equippedWeapon.reinforcementLevel;
        this.infusionKey = equippedWeapon.infusionKey;
    }

    // PUBLIC METHODS

    public baseDamage(): AttackPowerTypeMap<number> {
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

        for (const [attackPowerType, formula] of Object.entries(
            this.infusion.Damages,
        )) {
            damages[attackPowerType as AttackPowerTypeMapKey] +=
                reinforcedValue(formula, this.reinforcementLevel) *
                this.infusion.BaseDamageScaling *
                this.infusion.DamageRates[
                    attackPowerType as AttackPowerTypeMapKey
                ]!;

            if (
                attackPowerType == "Physical" &&
                this.infusionKey != "Physical" &&
                this.infusionKey != "Raw"
            ) {
                damages[attackPowerType as AttackPowerTypeMapKey] /= 2;
            }
        }

        return damages;
    }

    public scalingDamage(
        virtualAttributes: AttributeMap<number>,
        equippedArmor: ArmorSet,
        equippedRings: EquippedRings,
        equippedWeapons: WeaponSlots,
    ): AttackPowerTypeMap<number> {
        const baseDamage = this.baseDamage();
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

        const scalingIndex = ("Level" +
            this.reinforcementLevel
                .toString()
                .padStart(2, "0")) as keyof Scaling;
        const scales = this.infusion.Scaling[scalingIndex];

        if (this.infusionKey === "Enchanted") {
            // TODO: Scale physical damage by Intelligence
        } else {
            if (baseDamage.Physical) {
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

        if (baseDamage.Magic) {
            damages.Magic +=
                calculateStatDisplayValue(
                    "AttackPowerMagic",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.Magic;
        }

        if (baseDamage.Lightning) {
            damages.Lightning +=
                calculateStatDisplayValue(
                    "AttackPowerLightning",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.Lightning;
        }

        if (baseDamage.Fire) {
            damages.Fire +=
                calculateStatDisplayValue(
                    "AttackPowerFire",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.Fire;
        }

        if (baseDamage.Dark) {
            damages.Dark +=
                calculateStatDisplayValue(
                    "AttackPowerDark",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.Dark;
        }

        if (baseDamage.Poison) {
            damages.Poison! +=
                calculateStatDisplayValue(
                    "AttackPowerPoison",
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                    equippedWeapons,
                ) * scales.Poison!;
        }

        if (baseDamage.Bleed) {
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

    public totalDamage(
        equippedWeapons: WeaponSlots,
        virtualAttributes: AttributeMap<number>,
        equippedArmor: ArmorSet,
        equippedRings: EquippedRings,
    ): AttackPowerTypeMap<number> {
        let damages: AttackPowerTypeMap<number> = this.baseDamage();
        let scaling: AttackPowerTypeMap<number> = this.scalingDamage(
            virtualAttributes,
            equippedArmor,
            equippedRings,
            equippedWeapons,
        );

        for (const damageType in damages) {
            damages[damageType as AttackPowerTypeMapKey] +=
                scaling[damageType as AttackPowerTypeMapKey]!;
        }

        return damages;
    }
}

export default EquippedWeapon;
