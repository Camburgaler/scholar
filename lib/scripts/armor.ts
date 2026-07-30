import Armor from "@/lib/interfaces/armor";
import AttributeMap from "@/lib/types/attributeMap";

export function getArmorByName(armorList: Armor[], name: string): Armor {
    return armorList.find((armor) => armor.Name === name) || armorList[0];
}

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
