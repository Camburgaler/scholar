import EquippedWeapon from "@/lib/classes/equippedWeapon";
import { Weapons } from "@/lib/gameData";
import Weapon from "@/lib/interfaces/weapon";
import { UUID } from "crypto";

export function getWeaponByName(name: string): Weapon {
    return Weapons.find((weapon) => weapon.Name === name)!;
}

// Returns the first equipped weapon with the given id, and undefined if not found
export function getWeaponById(equippedWeapons: EquippedWeapon[], id: UUID) {
    return equippedWeapons.find((weapon) => weapon.id === id)!;
}
