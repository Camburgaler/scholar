import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import StatMap from "@/lib/types/statMap";

type SlopeIntercept = {
    slope: number;
    intercept: number;
};

export type InfusionData = {
    name: string;
    damageUpgradeRate: AttackPowerTypeMap<SlopeIntercept>;
    statScalingRate: StatMap<number[]>;
};

type Infusion = {
    [key: string]: InfusionData;
};

export default Infusion;
