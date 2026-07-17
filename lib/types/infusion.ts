import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";

type SlopeIntercept = {
    slope: number;
    intercept: number;
};

export type InfusionData = {
    name: string;
    damageUpgradeRate: AttackPowerTypeMap<SlopeIntercept>;
    statScalingRate: AttributeMap<number[]>;
};

type Infusion = {
    [key: string]: InfusionData;
};

export default Infusion;
