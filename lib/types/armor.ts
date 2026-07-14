import AbsorptionsMap from "@/lib/types/absorptionsMap";
import DefensesMap from "@/lib/types/defensesMap";
import Equippable from "@/lib/types/equippable";

type Armor = Equippable & {
    Defenses: DefensesMap<number>;
    Absorptions: AbsorptionsMap<number>;
    Poise: number;
    Weight: number;
    Fitness?: number;
};

export default Armor;
