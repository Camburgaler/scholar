import { Scaling } from "@/lib/interfaces/scaling";
import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";

/**
 * @interface Infusion
 * @description An interface representing the data for a weapon infusion.
 * @member Name - The name of the infusion.
 * @member Damages - The damage upgrade rate for the infusion. {@link AttackPowerTypeMap<SlopeIntercept>}
 * @member Scaling - The stat scaling rate for the infusion. {@link Scaling}
 */
export interface Infusion {
    Name: string;
    Damages: AttackPowerTypeMap<SlopeIntercept>;
    Scaling: Scaling;
    DamageRates: AttackPowerTypeMap<number>;
    BaseDamageScaling: number;
}

export default Infusion;
