import Equippable from "@/lib/interfaces/equippable";
import Infusion from "@/lib/interfaces/infusion";
import AttributeMap from "@/lib/types/attributeMap";
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
    Category: string;
    Paired: boolean;
    Infusions: Infusion[];
    MaxReinforcementLevel: number;
}

export default Weapon;
