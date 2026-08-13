import Equippable from "@/lib/interfaces/equippable";
import Modifier from "@/lib/interfaces/modifier";
import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import AttributeMap from "@/lib/types/attributeMap";
import DefenseMap from "@/lib/types/defenseMap";
import ResistanceMap from "@/lib/types/resistanceMap";

interface Armor extends Equippable {
    Defenses: DefenseMap<SlopeIntercept>;
    DefenseScalingPhysical: number;
    DefenseScalingSlash: number;
    DefenseScalingThrust: number;
    DefenseScalingStrike: number;
    Resistances: ResistanceMap<SlopeIntercept>;
    Poise: number;
    Requirements: AttributeMap<number>;
    ItemDiscovery: number;
    MaxReinforcementLevel: number;
    Modifiers: Modifier[];

    fitness?: number;
}

export default Armor;
