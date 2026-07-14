import { CategoryMapKey } from "@/lib/types/categoryMap";
import Equippable from "@/lib/types/equippable";
import InfusionMap from "@/lib/types/infusionMap";
import StatMap from "@/lib/types/statMap";
import WeaponInfusion from "@/lib/types/weaponInfusion";

type Weapon = Equippable & {
    Requirements: StatMap<number>;
    Category: CategoryMapKey;
    Paired: boolean;
    Infusions: InfusionMap<WeaponInfusion>;
};

export default Weapon;
