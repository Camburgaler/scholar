import AbsorptionMap from "@/lib/types/absorptionMap";
import DefenseMap from "@/lib/types/defenseMap";
import Equippable from "@/lib/types/equippable";

type Armor = Equippable & {
    Defenses: DefenseMap<number>;
    Absorptions: AbsorptionMap<number>;
    Poise: number;
    Weight: number;
    Fitness?: number;
};

export default Armor;
