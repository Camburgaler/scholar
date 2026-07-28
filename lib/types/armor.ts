import DefenseMap from "@/lib/types/defenseMap";
import Equippable from "@/lib/types/equippable";
import ResistanceMap from "@/lib/types/resistanceMap";
import AttributeMap from "./attributeMap";

type Armor = Equippable & {
    Defenses: DefenseMap<number>;
    Resistances: ResistanceMap<number>;
    Poise: number;
    Requirements: AttributeMap<number>;
    ItemDiscovery: number;

    fitness?: number;
};

export default Armor;
