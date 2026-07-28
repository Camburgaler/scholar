import Armor from "@/lib/types/armor";
import { DefenseMapKey } from "./defenseMap";
import { ResistanceMapKey } from "./resistanceMap";

type ArmorSet = {
    helmet: Armor;
    chestpiece: Armor;
    gauntlets: Armor;
    leggings: Armor;
    fitness?: number;
    weight: number;
};

export default ArmorSet;

/**
 * Sums the defense values of an armor set for a given defense field.
 * @param armorSet The armor set to sum the defense values for.
 * @param defenseField The defense field to sum the values for.
 * @returns The sum of the defense values for the given field.
 */
export function sumArmorSetDefense(
    armorSet: ArmorSet,
    defenseField: DefenseMapKey,
): number {
    return (
        armorSet.helmet.Defenses[defenseField] +
        armorSet.chestpiece.Defenses[defenseField] +
        armorSet.gauntlets.Defenses[defenseField] +
        armorSet.leggings.Defenses[defenseField]
    );
}

/**
 * Sums the resistance values of an armor set for a given resistance field.
 * @param armorSet The armor set to sum the resistance values for.
 * @param resistanceField The resistance field to sum the values for.
 * @returns The sum of the resistance values for the given field.
 */
export function sumArmorSetResistance(
    armorSet: ArmorSet,
    resistanceField: ResistanceMapKey,
): number {
    return (
        armorSet.helmet.Resistances[resistanceField] +
        armorSet.chestpiece.Resistances[resistanceField] +
        armorSet.gauntlets.Resistances[resistanceField] +
        armorSet.leggings.Resistances[resistanceField]
    );
}
