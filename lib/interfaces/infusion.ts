import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";

interface ScalingFactors {
    PhysicalByStrength: number;
    PhysicalByDexterity: number;
    Magic: number;
    Lightning: number;
    Fire: number;
    Dark: number;
    Poison: number;
    Bleed: number;
    PhysicalByEnchant: number;
}

export interface Scaling {
    Level00: ScalingFactors;
    Level01: ScalingFactors;
    Level02: ScalingFactors;
    Level03: ScalingFactors;
    Level04: ScalingFactors;
    Level05: ScalingFactors;
    Level06: ScalingFactors;
    Level07: ScalingFactors;
    Level08: ScalingFactors;
    Level09: ScalingFactors;
    Level10: ScalingFactors;
}

/**
 * @interface Infusion
 * @description An interface representing the data for a weapon infusion.
 * @member Name - The name of the infusion.
 * @member Damages - The damage upgrade rate for the infusion. {@link AttackPowerTypeMap<SlopeIntercept>}
 * @member Scaling - The stat scaling rate for the infusion. {@link AttributeMap<number[]>}
 */
export interface Infusion {
    Name: string;
    Damages: AttackPowerTypeMap<SlopeIntercept>;
    Scaling: Scaling;
    DamageRates: AttackPowerTypeMap<number>;
    BaseDamageScaling: number;
}

export default Infusion;
