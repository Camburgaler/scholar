import { Weapons } from "@/lib/gameData";
import Weapon from "@/lib/interfaces/weapon";

export function getWeaponByName(name: string): Weapon {
    return Weapons.find((weapon) => weapon.Name === name)!;
}
