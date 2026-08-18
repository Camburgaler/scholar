import Equippable from "@/lib/interfaces/equippable";
import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import AttributeMap from "@/lib/types/attributeMap";
import DefenseMap from "@/lib/types/defenseMap";
import ResistanceMap from "@/lib/types/resistanceMap";

/**
 * @interface Armor
 * @description An interface representing an armor piece. Extends the {@link Equippable} interface.
 * @extends {Equippable}
 * @member Defenses - The defenses provided by the armor piece at various reinforcement levels. {@link DefenseMap<SlopeIntercept>}
 * @member DefenseScalingPhysical - The scaling factor for physical attacks.
 * @member DefenseScalingSlash - The scaling factor for slash attacks.
 * @member DefenseScalingThrust - The scaling factor for thrust attacks.
 * @member DefenseScalingStrike - The scaling factor for strike attacks.
 * @member Resistances - The resistances provided by the armor piece at various reinforcement levels. {@link ResistanceMap<SlopeIntercept>}
 * @member Poise - The poise provided by the armor piece.
 * @member Requirements - The attributes required to equip the armor piece. {@link AttributeMap<number>}
 * @member ItemDiscovery - The amount of item discovery provided by the armor piece.
 * @member MaxReinforcementLevel - The maximum reinforcement level of the armor piece.
 * @member fitness - The fitness of the armor piece. Optional.
 */
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

    fitness?: number;
}

export default Armor;
