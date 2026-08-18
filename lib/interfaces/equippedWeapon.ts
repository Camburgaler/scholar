import Weapon from "@/lib/interfaces/weapon";
import { InfusionMapKey } from "@/lib/types/infusionMap";

/**
 * @interface EquippedWeapon
 * @description An interface representing an equipped weapon.
 * @member data - The weapon being equipped. {@link Weapon}
 * @member reinforcementLevel - The reinforcement level of the weapon.
 * @member infusion - The infusion applied to the weapon. {@link InfusionMapKey}
 */
interface EquippedWeapon {
    data: Weapon;
    reinforcementLevel: number;
    infusion: InfusionMapKey;
}

export default EquippedWeapon;
