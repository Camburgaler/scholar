import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import StatMap from "@/lib/types/statMap";

type WeaponInfusion = {
    ID: string;
    damage: AttackPowerTypeMap<number>;
    scaling: StatMap<number>;
    aux: { [key: string]: [number, number] };
    masks: AttackPowerTypeMap<StatMap<boolean>>;
    corrections: AttackPowerTypeMap<string>;
    buffable: boolean;
};

export default WeaponInfusion;
