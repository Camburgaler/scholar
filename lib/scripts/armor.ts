import Armor from "@/lib/interfaces/armor";
import AttributeMap from "@/lib/types/attributeMap";

/**
 * @description Get an armor piece by name
 * @param armorList The list of armor pieces to search. {@link Armor[]}
 * @param name The name of the armor piece to get.
 * @returns The armor piece with the given name. {@link Armor}
 */
export function getArmorByName(armorList: Armor[], name: string): Armor {
    return armorList.find((armor) => armor.Name === name) || armorList[0];
}

/**
 * @description Filter armor by required attributes
 * @param armorList The list of armor pieces to filter. {@link Armor[]}
 * @param attributes The attributes to filter by. {@link AttributeMap<number>}
 * @returns The filtered list of armor pieces. {@link Armor[]}
 */
export function filterArmor(
    armorList: Armor[],
    attributes: AttributeMap<number>,
) {
    return armorList.filter(
        (armor) =>
            armor.Requirements.Strength <= attributes.Strength &&
            armor.Requirements.Dexterity <= attributes.Dexterity &&
            armor.Requirements.Intelligence <= attributes.Intelligence &&
            armor.Requirements.Faith <= attributes.Faith,
    );
}
