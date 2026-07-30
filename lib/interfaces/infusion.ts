import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";

interface SlopeIntercept {
    slope: number;
    intercept: number;
}

export interface InfusionData {
    name: string;
    damageUpgradeRate: AttackPowerTypeMap<SlopeIntercept>;
    statScalingRate: AttributeMap<number[]>;
}

interface Infusion {
    [key: string]: InfusionData;
}

export default Infusion;
