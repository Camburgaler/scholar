import Equippable from "@/lib/interfaces/equippable";
import WeaponInfusion from "@/lib/interfaces/weaponInfusion";
import AttributeMap from "@/lib/types/attributeMap";
import { CategoryMapKey } from "@/lib/types/categoryMap";
import InfusionMap from "@/lib/types/infusionMap";

/**
 * @interface Weapon
 * @description An interface representing a weapon.
 * @extends {Equippable}
 * @member Requirements - The attributes required to equip the weapon. {@link AttributeMap<number>}
 * @member Category - The category of the weapon.
 * @member Paired - Whether the weapon is paired.
 * @member Infusions - The infusions applied to the weapon. {@link InfusionMap<WeaponInfusion>}
 */
interface Weapon extends Equippable {
    Requirements: AttributeMap<number>;
    Category: CategoryMapKey;
    Paired: boolean;
    Infusions: InfusionMap<WeaponInfusion>;
}

export default Weapon;
