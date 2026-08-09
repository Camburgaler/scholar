import Equippable from "@/lib/interfaces/equippable";
import Modifier from "@/lib/interfaces/modifier";
import AttributeMap from "@/lib/types/attributeMap";
import DefenseMap from "@/lib/types/defenseMap";
import ResistanceMap from "@/lib/types/resistanceMap";

interface Armor extends Equippable {
    Defenses: DefenseMap<number>;
    Resistances: ResistanceMap<number>;
    Poise: number;
    Requirements: AttributeMap<number>;
    ItemDiscovery: number;
    MaxReinforcementLevel: number;
    Modifiers: Modifier[];

    fitness?: number;
}

export default Armor;
