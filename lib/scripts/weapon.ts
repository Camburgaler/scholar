import EquippedWeapon from "@/lib/classes/equippedWeapon";
import { Weapons } from "@/lib/gameData";
import Weapon from "@/lib/interfaces/weapon";
import { UUID } from "crypto";

export function getWeaponByName(name: string): Weapon {
    return Weapons.find((weapon) => weapon.Name === name)!;
}

export function getWeaponById(equippedWeapons: EquippedWeapon[], id: UUID) {
    return equippedWeapons.find((weapon) => weapon.id === id)!;
}
