import DefenseMap from "@/lib/types/defenseMap";
import Equippable from "@/lib/types/equippable";
import ResistanceMap from "@/lib/types/resistanceMap";
import AttributeMap from "./attributeMap";

type Armor = Equippable & {
    Defenses: DefenseMap<number>;
    Resistances: ResistanceMap<number>;
    Poise: number;
    Requirements: AttributeMap<number>;
    ItemDiscovery: number;
    MaxReinforcementLevel: number;

    fitness?: number;
};

export default Armor;

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
