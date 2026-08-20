import ModifierDisplay from "@/lib/components/characterInfo/rightColumn/modifierDisplay";
import { Weapons } from "@/lib/gameData";
import EquippedWeapon from "@/lib/interfaces/equippedWeapon";
import Modifier from "@/lib/interfaces/modifier";
import Weapon from "@/lib/interfaces/weapon";
import { JSX } from "react/jsx-runtime";

/**
 * @type WeaponEquipSlot
 * @description The equip slot of a weapon.
 */
export type WeaponEquipSlot =
    | "LeftHandWeaponPrimary"
    | "LeftHandWeaponSecondary"
    | "LeftHandWeaponTertiary"
    | "RightHandWeaponPrimary"
    | "RightHandWeaponSecondary"
    | "RightHandWeaponTertiary";

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
    private LeftHandWeaponPrimary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

    /**
     * @member LeftHandWeaponSecondary: The left hand secondary weapon. {@link EquippedWeapon}
     */
    private LeftHandWeaponSecondary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

    /**
     * @member LeftHandWeaponTertiary: The left hand tertiary weapon. {@link EquippedWeapon}
     */
    private LeftHandWeaponTertiary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

    /**
     * @member RightHandWeaponPrimary: The right hand primary weapon. {@link EquippedWeapon}
     */
    private RightHandWeaponPrimary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

    /**
     * @member RightHandWeaponSecondary: The right hand secondary weapon. {@link EquippedWeapon}
     */
    private RightHandWeaponSecondary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

    /**
     * @member RightHandWeaponTertiary: The right hand tertiary weapon. {@link EquippedWeapon}
     */
    private RightHandWeaponTertiary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

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
     * @param lhp The left hand primary weapon. {@link EquippedWeapon}
     * @param lhs The left hand secondary weapon. {@link EquippedWeapon}
     * @param lht The left hand tertiary weapon. {@link EquippedWeapon}
     * @param rhp The right hand primary weapon. {@link EquippedWeapon}
     * @param rhs The right hand secondary weapon. {@link EquippedWeapon}
     * @param rht The right hand tertiary weapon. {@link EquippedWeapon}
     * @returns The new {@link WeaponSlots}.
     */
    public static fromEquippedWeapons(
        lhp: EquippedWeapon,
        lhs: EquippedWeapon,
        lht: EquippedWeapon,
        rhp: EquippedWeapon,
        rhs: EquippedWeapon,
        rht: EquippedWeapon,
    ) {
        return {
            LeftHandWeaponPrimary: lhp,
            LeftHandWeaponSecondary: lhs,
            LeftHandWeaponTertiary: lht,
            RightHandWeaponPrimary: rhp,
            RightHandWeaponSecondary: rhs,
            RightHandWeaponTertiary: rht,
        };
    }

    /**
     * @description Creates a new {@link WeaponSlots} from {@link Weapon}s.
     * @param lhp The left hand primary weapon. {@link Weapon}
     * @param lhs The left hand secondary weapon. {@link Weapon}
     * @param lht The left hand tertiary weapon. {@link Weapon}
     * @param rhp The right hand primary weapon. {@link Weapon}
     * @param rhs The right hand secondary weapon. {@link Weapon}
     * @param rht The right hand tertiary weapon. {@link Weapon}
     * @returns The new {@link WeaponSlots}.
     */
    public static fromWeapons(
        lhp: Weapon,
        lhs: Weapon,
        lht: Weapon,
        rhp: Weapon,
        rhs: Weapon,
        rht: Weapon,
    ) {
        return {
            LeftHandWeaponPrimary: {
                data: lhp,
                reinforcementLevel: 0,
                infusion: "Basic",
            },
            LeftHandWeaponSecondary: {
                data: lhs,
                reinforcementLevel: 0,
                infusion: "Basic",
            },
            LeftHandWeaponTertiary: {
                data: lht,
                reinforcementLevel: 0,
                infusion: "Basic",
            },
            RightHandWeaponPrimary: {
                data: rhp,
                reinforcementLevel: 0,
                infusion: "Basic",
            },
            RightHandWeaponSecondary: {
                data: rhs,
                reinforcementLevel: 0,
                infusion: "Basic",
            },
            RightHandWeaponTertiary: {
                data: rht,
                reinforcementLevel: 0,
                infusion: "Basic",
            },
        };
    }

    // GETTERS & SETTERS

    /**
     * @description Copies the {@link WeaponSlots} from another {@link WeaponSlots}.
     * @param weaponSlots The {@link WeaponSlots} to copy.
     */
    public copyFrom(weaponSlots: WeaponSlots) {
        this.setLHP(weaponSlots.getLHP());
        this.setLHS(weaponSlots.getLHS());
        this.setLHT(weaponSlots.getLHT());
        this.setRHP(weaponSlots.getRHP());
        this.setRHS(weaponSlots.getRHS());
        this.setRHT(weaponSlots.getRHT());
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
    public setWeapon(slot: WeaponEquipSlot, equippedWeapon: EquippedWeapon) {
        if (typeof this[slot] !== "object") {
            // panic out
            throw new Error(`ArmorSet field ${slot} is not a member`);
        }

        this[slot] = equippedWeapon;
    }

    /**
     * @description Gets the left hand primary {@link EquippedWeapon}.
     * @returns The left hand primary {@link EquippedWeapon}.
     */
    public getLHP(): EquippedWeapon {
        return this.LeftHandWeaponPrimary;
    }

    /**
     * @description Gets the left hand primary {@link Weapon}.
     * @returns The left hand primary {@link Weapon}.
     */
    public getLHPWeapon(): Weapon {
        return this.LeftHandWeaponPrimary.data;
    }

    /**
     * @description Sets the left hand primary {@link EquippedWeapon}.
     * @param weapon The {@link EquippedWeapon} to set.
     */
    public setLHP(weapon: EquippedWeapon): void {
        this.LeftHandWeaponPrimary = weapon;
    }

    /**
     * @description Gets the left hand secondary {@link EquippedWeapon}.
     * @returns The left hand secondary {@link EquippedWeapon}.
     */
    public getLHS(): EquippedWeapon {
        return this.LeftHandWeaponSecondary;
    }

    /**
     * @description Gets the left hand secondary {@link Weapon}.
     * @returns The left hand secondary {@link Weapon}.
     */
    public getLHSWeapon(): Weapon {
        return this.LeftHandWeaponSecondary.data;
    }

    /**
     * @description Sets the left hand secondary {@link EquippedWeapon}.
     * @param weapon The {@link EquippedWeapon} to set.
     */
    public setLHS(weapon: EquippedWeapon): void {
        this.LeftHandWeaponSecondary = weapon;
    }

    /**
     * @description Gets the left hand tertiary {@link EquippedWeapon}.
     * @returns The left hand tertiary {@link EquippedWeapon}.
     */
    public getLHT(): EquippedWeapon {
        return this.LeftHandWeaponTertiary;
    }

    /**
     * @description Gets the left hand tertiary {@link Weapon}.
     * @returns The left hand tertiary {@link Weapon}.
     */
    public getLHTWeapon(): Weapon {
        return this.LeftHandWeaponTertiary.data;
    }

    /**
     * @description Sets the left hand tertiary {@link EquippedWeapon}.
     * @param weapon The {@link EquippedWeapon} to set.
     */
    public setLHT(weapon: EquippedWeapon): void {
        this.LeftHandWeaponTertiary = weapon;
    }

    /**
     * @description Gets the right hand primary {@link EquippedWeapon}.
     * @returns The right hand primary {@link EquippedWeapon}.
     */
    public getRHP(): EquippedWeapon {
        return this.RightHandWeaponPrimary;
    }

    /**
     * @description Gets the right hand primary {@link Weapon}.
     * @returns The right hand primary {@link Weapon}.
     */
    public getRHPWeapon(): Weapon {
        return this.RightHandWeaponPrimary.data;
    }

    /**
     * @description Sets the right hand primary {@link EquippedWeapon}.
     * @param weapon The {@link EquippedWeapon} to set.
     */
    public setRHP(weapon: EquippedWeapon): void {
        this.RightHandWeaponPrimary = weapon;
    }

    /**
     * @description Gets the right hand secondary {@link EquippedWeapon}.
     * @returns The right hand secondary {@link EquippedWeapon}.
     */
    public getRHS(): EquippedWeapon {
        return this.RightHandWeaponSecondary;
    }

    /**
     * @description Gets the right hand secondary {@link Weapon}.
     * @returns The right hand secondary {@link Weapon}.
     */
    public getRHSWeapon(): Weapon {
        return this.RightHandWeaponSecondary.data;
    }

    /**
     * @description Sets the right hand secondary {@link EquippedWeapon}.
     * @param weapon The {@link EquippedWeapon} to set.
     */
    public setRHS(weapon: EquippedWeapon): void {
        this.RightHandWeaponSecondary = weapon;
    }

    /**
     * @description Gets the right hand tertiary {@link EquippedWeapon}.
     * @returns The right hand tertiary {@link EquippedWeapon}.
     */
    public getRHT(): EquippedWeapon {
        return this.RightHandWeaponTertiary;
    }

    /**
     * @description Gets the right hand tertiary {@link Weapon}.
     * @returns The right hand tertiary {@link Weapon}.
     */
    public getRHTWeapon(): Weapon {
        return this.RightHandWeaponTertiary.data;
    }

    /**
     * @description Sets the right hand tertiary {@link EquippedWeapon}.
     * @param weapon The {@link EquippedWeapon} to set.
     */
    public setRHT(weapon: EquippedWeapon): void {
        this.RightHandWeaponTertiary = weapon;
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

        this.getLHP().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.getLHP().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getLHS().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.getLHS().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getLHT().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.getLHT().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getRHP().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.getRHP().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getRHS().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.getRHS().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getRHT().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.getRHT().data.Name}
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

        this.getLHP().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getLHS().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getLHT().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getRHP().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getRHS().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getRHT().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        return activeEffects;
    }
}
