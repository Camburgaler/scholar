import AbsorptionMap from "@/lib/types/absorptionMap";
import DefenceMap from "@/lib/types/defenceMap";
import Equippable from "@/lib/types/equippable";

type Armor = Equippable & {
    Defenses: DefenceMap<number>;
    Absorptions: AbsorptionMap<number>;
    Poise: number;
    Weight: number;
    Fitness?: number;
};

export default Armor;
