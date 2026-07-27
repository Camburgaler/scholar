import ResistanceMap from "@/lib/types/absorptionMap";
import DefenseMap from "@/lib/types/defenseMap";
import Equippable from "@/lib/types/equippable";
import AttributeMap from "./attributeMap";

type Armor = Equippable & {
    Defenses: DefenseMap<number>;
    Resistances: ResistanceMap<number>;
    Poise: number;
    Requirements: AttributeMap<number>;

    fitness?: number;
};

export default Armor;
