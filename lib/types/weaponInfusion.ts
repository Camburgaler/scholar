import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";

type WeaponInfusion = {
    ID: string;
    damage: AttackPowerTypeMap<number>;
    scaling: AttributeMap<number>;
    aux: { [key: string]: [number, number] };
    masks: AttackPowerTypeMap<AttributeMap<boolean>>;
    corrections: AttackPowerTypeMap<string>;
    buffable: boolean;
};

export default WeaponInfusion;
