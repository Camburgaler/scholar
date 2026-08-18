import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";

/**
 * @interface InfusionData
 * @description An interface representing the data for a weapon infusion.
 * @member name - The name of the infusion.
 * @member damageUpgradeRate - The damage upgrade rate for the infusion. {@link AttackPowerTypeMap<SlopeIntercept>}
 * @member statScalingRate - The stat scaling rate for the infusion. {@link AttributeMap<number[]>}
 */
export interface InfusionData {
    name: string;
    damageUpgradeRate: AttackPowerTypeMap<SlopeIntercept>;
    statScalingRate: AttributeMap<number[]>;
}

/**
 * @interface Infusion
 * @description An interface representing the infusions of a weapon.
 * @accessor [key: string] The name of the infusion. {@link InfusionData}
 */
interface Infusion {
    [key: string]: InfusionData;
}

export default Infusion;
