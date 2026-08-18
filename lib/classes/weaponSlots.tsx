import { Weapons } from "@/lib/gameData";
import EquippedWeapon from "@/lib/interfaces/equippedWeapon";
import Weapon from "@/lib/interfaces/weapon";

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

export default class WeaponSlots {
    // MEMBERS
    private LeftHandWeaponPrimary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };
    private LeftHandWeaponSecondary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };
    private LeftHandWeaponTertiary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };
    private RightHandWeaponPrimary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };
    private RightHandWeaponSecondary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };
    private RightHandWeaponTertiary: EquippedWeapon = {
        data: Weapons[0],
        reinforcementLevel: 0,
        infusion: "Basic",
    };

    // STATIC METHODS

    public static fromWeaponSlots(slots: WeaponSlots): WeaponSlots {
        let weaponSlots = new WeaponSlots();
        weaponSlots.copyFrom(slots);
        return weaponSlots;
    }

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

    public copyFrom(weaponSlots: WeaponSlots) {
        this.setLHP(weaponSlots.getLHP());
        this.setLHS(weaponSlots.getLHS());
        this.setLHT(weaponSlots.getLHT());
        this.setRHP(weaponSlots.getRHP());
        this.setRHS(weaponSlots.getRHS());
        this.setRHT(weaponSlots.getRHT());
    }

    public getWeapon(slot: WeaponEquipSlot): EquippedWeapon {
        return this[slot];
    }

    public setWeapon(slot: WeaponEquipSlot, equippedWeapon: EquippedWeapon) {
        if (typeof this[slot] !== "object") {
            // panic out
            throw new Error(`ArmorSet field ${slot} is not a member`);
        }

        this[slot] = equippedWeapon;
    }

    public getLHP(): EquippedWeapon {
        return this.LeftHandWeaponPrimary;
    }

    public getLHPWeapon(): Weapon {
        return this.LeftHandWeaponPrimary.data;
    }

    public setLHP(weapon: EquippedWeapon): void {
        this.LeftHandWeaponPrimary = weapon;
    }

    public getLHS(): EquippedWeapon {
        return this.LeftHandWeaponSecondary;
    }

    public getLHSWeapon(): Weapon {
        return this.LeftHandWeaponSecondary.data;
    }

    public setLHS(weapon: EquippedWeapon): void {
        this.LeftHandWeaponSecondary = weapon;
    }

    public getLHT(): EquippedWeapon {
        return this.LeftHandWeaponTertiary;
    }

    public getLHTWeapon(): Weapon {
        return this.LeftHandWeaponTertiary.data;
    }

    public setLHT(weapon: EquippedWeapon): void {
        this.LeftHandWeaponTertiary = weapon;
    }

    public getRHP(): EquippedWeapon {
        return this.RightHandWeaponPrimary;
    }

    public getRHPWeapon(): Weapon {
        return this.RightHandWeaponPrimary.data;
    }

    public setRHP(weapon: EquippedWeapon): void {
        this.RightHandWeaponPrimary = weapon;
    }

    public getRHS(): EquippedWeapon {
        return this.RightHandWeaponSecondary;
    }

    public getRHSWeapon(): Weapon {
        return this.RightHandWeaponSecondary.data;
    }

    public setRHS(weapon: EquippedWeapon): void {
        this.RightHandWeaponSecondary = weapon;
    }

    public getRHT(): EquippedWeapon {
        return this.RightHandWeaponTertiary;
    }

    public getRHTWeapon(): Weapon {
        return this.RightHandWeaponTertiary.data;
    }

    public setRHT(weapon: EquippedWeapon): void {
        this.RightHandWeaponTertiary = weapon;
    }
}
