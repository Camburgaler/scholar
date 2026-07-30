import Equippable from "@/lib/interfaces/equippable";
import WeaponInfusion from "@/lib/interfaces/weaponInfusion";
import AttributeMap from "@/lib/types/attributeMap";
import { CategoryMapKey } from "@/lib/types/categoryMap";
import InfusionMap from "@/lib/types/infusionMap";

interface Weapon extends Equippable {
    Requirements: AttributeMap<number>;
    Category: CategoryMapKey;
    Paired: boolean;
    Infusions: InfusionMap<WeaponInfusion>;
}

export default Weapon;
