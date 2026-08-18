import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";

/**
 * @interface WeaponInfusion
 * @description An interface representing a weapon infusion.
 * @member ID - The ID of the infusion.
 * @member damage - The damage upgrade rate for the infusion. {@link AttackPowerTypeMap<number>}
 * @member scaling - The stat scaling rate for the infusion. {@link AttributeMap<number>}
 * @member aux - The auxiliary stat scaling rate for the infusion. {@link AttributeMap<number>}
 * @member masks - The masks for the infusion. {@link AttackPowerTypeMap<AttributeMap<boolean>>}
 * @member corrections - The corrections for the infusion. {@link AttackPowerTypeMap<string>}
 * @member buffable - Whether the infusion is buffable.
 */
interface WeaponInfusion {
    ID: string;
    damage: AttackPowerTypeMap<number>;
    scaling: AttributeMap<number>;
    aux: { [key: string]: [number, number] };
    masks: AttackPowerTypeMap<AttributeMap<boolean>>;
    corrections: AttackPowerTypeMap<string>;
    buffable: boolean;
}

export default WeaponInfusion;
