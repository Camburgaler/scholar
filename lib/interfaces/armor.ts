import Equippable from "@/lib/interfaces/equippable";
import DefenseMap from "@/lib/types/defenseMap";
import ResistanceMap from "@/lib/types/resistanceMap";
import AttributeMap from "../types/attributeMap";
import Modifier from "./modifier";

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
