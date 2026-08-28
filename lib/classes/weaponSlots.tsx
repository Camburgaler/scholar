import EquippedWeapon from "@/lib/classes/equippedWeapon";
import ModifierDisplay from "@/lib/components/characterInfo/rightColumn/modifierDisplay";
import Modifier from "@/lib/interfaces/modifier";
import Weapon from "@/lib/interfaces/weapon";
import { JSX } from "react/jsx-runtime";

/**
 * @type WeaponEquipSlot
 * @description The equip slot of a weapon.
 */
export type WeaponEquipSlot =
    | "leftPrimary"
    | "leftSecondary"
    | "leftTertiary"
    | "rightPrimary"
    | "rightSecondary"
    | "rightTertiary";

/**
 * @class WeaponSlots
 * @description A collection of equipped weapons.
 * @member LeftHandWeaponPrimary: The left hand primary weapon. {@link EquippedWeapon}
 * @member LeftHandWeaponSecondary: The left hand secondary weapon. {@link EquippedWeapon}
 * @member LeftHandWeaponTertiary: The left hand tertiary weapon. {@link EquippedWeapon}
 * @member RightHandWeaponPrimary: The right hand primary weapon. {@link EquippedWeapon}
 * @member RightHandWeaponSecondary: The right hand secondary weapon. {@link EquippedWeapon}
 * @member RightHandWeaponTertiary: The right hand tertiary weapon. {@link EquippedWeapon}
 */
export default class WeaponSlots {
    // MEMBERS

    /**
     * @member LeftHandWeaponPrimary: The left hand primary weapon. {@link EquippedWeapon}
     */
    public leftPrimary: EquippedWeapon = new EquippedWeapon();

    /**
     * @member LeftHandWeaponSecondary: The left hand secondary weapon. {@link EquippedWeapon}
     */
    public leftSecondary: EquippedWeapon = new EquippedWeapon();

    /**
     * @member LeftHandWeaponTertiary: The left hand tertiary weapon. {@link EquippedWeapon}
     */
    public leftTertiary: EquippedWeapon = new EquippedWeapon();

    /**
     * @member RightHandWeaponPrimary: The right hand primary weapon. {@link EquippedWeapon}
     */
    public rightPrimary: EquippedWeapon = new EquippedWeapon();

    /**
     * @member RightHandWeaponSecondary: The right hand secondary weapon. {@link EquippedWeapon}
     */
    public rightSecondary: EquippedWeapon = new EquippedWeapon();

    /**
     * @member RightHandWeaponTertiary: The right hand tertiary weapon. {@link EquippedWeapon}
     */
    public rightTertiary: EquippedWeapon = new EquippedWeapon();

    // STATIC METHODS

    /**
     * @description Creates a new {@link WeaponSlots} from an existing {@link WeaponSlots}.
     * @param slots The {@link WeaponSlots} to copy.
     * @returns The new {@link WeaponSlots}.
     */
    public static fromWeaponSlots(slots: WeaponSlots): WeaponSlots {
        let weaponSlots = new WeaponSlots();
        weaponSlots.copyFrom(slots);
        return weaponSlots;
    }

    /**
     * @description Creates a new {@link WeaponSlots} from {@link EquippedWeapon}s.
     * @param lp The left hand primary weapon. {@link EquippedWeapon}
     * @param ls The left hand secondary weapon. {@link EquippedWeapon}
     * @param lt The left hand tertiary weapon. {@link EquippedWeapon}
     * @param rp The right hand primary weapon. {@link EquippedWeapon}
     * @param rs The right hand secondary weapon. {@link EquippedWeapon}
     * @param rt The right hand tertiary weapon. {@link EquippedWeapon}
     * @returns The new {@link WeaponSlots}.
     */
    public static fromEquippedWeapons(
        lp: EquippedWeapon,
        ls: EquippedWeapon,
        lt: EquippedWeapon,
        rp: EquippedWeapon,
        rs: EquippedWeapon,
        rt: EquippedWeapon,
    ): WeaponSlots {
        let weaponSlots = new WeaponSlots();
        weaponSlots.leftPrimary = lp;
        weaponSlots.leftSecondary = ls;
        weaponSlots.leftTertiary = lt;
        weaponSlots.rightPrimary = rp;
        weaponSlots.rightSecondary = rs;
        weaponSlots.rightTertiary = rt;
        return weaponSlots;
    }

    /**
     * @description Creates a new {@link WeaponSlots} from {@link Weapon}s.
     * @param lp The left hand primary weapon. {@link Weapon}
     * @param ls The left hand secondary weapon. {@link Weapon}
     * @param lt The left hand tertiary weapon. {@link Weapon}
     * @param rp The right hand primary weapon. {@link Weapon}
     * @param rs The right hand secondary weapon. {@link Weapon}
     * @param rt The right hand tertiary weapon. {@link Weapon}
     * @returns The new {@link WeaponSlots}.
     */
    public static fromWeapons(
        lp: Weapon,
        ls: Weapon,
        lt: Weapon,
        rp: Weapon,
        rs: Weapon,
        rt: Weapon,
    ): WeaponSlots {
        let weaponSlots = new WeaponSlots();
        weaponSlots.leftPrimary = EquippedWeapon.fromWeapon(lp);
        weaponSlots.leftSecondary = EquippedWeapon.fromWeapon(ls);
        weaponSlots.leftTertiary = EquippedWeapon.fromWeapon(lt);
        weaponSlots.rightPrimary = EquippedWeapon.fromWeapon(rp);
        weaponSlots.rightSecondary = EquippedWeapon.fromWeapon(rs);
        weaponSlots.rightTertiary = EquippedWeapon.fromWeapon(rt);
        return weaponSlots;
    }

    // GETTERS & SETTERS

    /**
     * @description Copies the {@link WeaponSlots} from another {@link WeaponSlots}.
     * @param weaponSlots The {@link WeaponSlots} to copy.
     */
    public copyFrom(weaponSlots: WeaponSlots): void {
        this.leftPrimary = weaponSlots.leftPrimary;
        this.leftSecondary = weaponSlots.leftSecondary;
        this.leftTertiary = weaponSlots.leftTertiary;
        this.rightPrimary = weaponSlots.rightPrimary;
        this.rightSecondary = weaponSlots.rightSecondary;
        this.rightTertiary = weaponSlots.rightTertiary;
    }

    /**
     * @description Gets the {@link EquippedWeapon} for a {@link WeaponEquipSlot} of the {@link WeaponSlots}.
     * @param slot The {@link WeaponEquipSlot} to get.
     * @returns The {@link EquippedWeapon} for the given {@link WeaponEquipSlot}.
     */
    public getWeapon(slot: WeaponEquipSlot): EquippedWeapon {
        return this[slot];
    }

    /**
     * @description Sets the {@link EquippedWeapon} for a {@link WeaponEquipSlot} of the {@link WeaponSlots}.
     * @param slot The {@link WeaponEquipSlot} to set.
     * @param equippedWeapon The {@link EquippedWeapon} to set.
     */
    public setWeapon(
        slot: WeaponEquipSlot,
        equippedWeapon: EquippedWeapon,
    ): void {
        if (typeof this[slot] !== "object") {
            // panic out
            throw new Error(`ArmorSet field ${slot} is not a member`);
        }

        this[slot] = equippedWeapon;
    }

    // PUBLIC METHODS

    /**
     * @method getModifierDisplays
     * @description Gets the ModifierDisplay components for the weapon slots.
     * @returns The {@link ModifierDisplay}s for the weapon slots.
     */
    public getModifierDisplays(): JSX.Element[] {
        let activeEffects: JSX.Element[] = [];
        let isOddRow = true;

        this.leftPrimary.modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.leftPrimary.name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.leftSecondary.modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.leftSecondary.name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.leftTertiary.modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.leftTertiary.name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.rightPrimary.modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.rightPrimary.name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.rightSecondary.modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.rightSecondary.name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.rightTertiary.modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.rightTertiary.name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        return activeEffects;
    }

    /**
     * @method activeEffects
     * @description Gets the active effects of the weapon slots.
     * @returns The active effects of the weapon slots. Array of {@link Modifier}s.
     */
    public activeEffects(): Modifier[] {
        let activeEffects: Modifier[] = [];

        this.leftPrimary.modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.leftSecondary.modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.leftTertiary.modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.rightPrimary.modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.rightSecondary.modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.rightTertiary.modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        return activeEffects;
    }
}
