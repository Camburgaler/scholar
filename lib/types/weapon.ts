import AttributeMap from "@/lib/types/attributeMap";
import { CategoryMapKey } from "@/lib/types/categoryMap";
import Equippable from "@/lib/types/equippable";
import InfusionMap from "@/lib/types/infusionMap";
import WeaponInfusion from "@/lib/types/weaponInfusion";

type Weapon = Equippable & {
    Requirements: AttributeMap<number>;
    Category: CategoryMapKey;
    Paired: boolean;
    Infusions: InfusionMap<WeaponInfusion>;
};

export default Weapon;
