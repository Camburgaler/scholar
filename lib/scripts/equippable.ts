import Equippable from "@/lib/interfaces/equippable";
import AttributeMap from "@/lib/types/attributeMap";

/**
 * Returns a StatMap that contains the total stats of all the items in the given array.
 * Items without stats are ignored.
 * If an item has no stat for a particular statId, 0 is assumed for that statId.
 *
 * @param {Equippable[]} items The array of items to calculate the total stats from.
 *
 * @returns {AttributeMap<number>} The total stats of all the items in the given array.
 */
export function getItemAttributeAdditions(
    items: Equippable[],
): AttributeMap<number[]> {
    // TODO: Implement

    // return items.reduce(
    //     (attributes: AttributeMap<number[]>, item: Equippable) =>
    //         (Object.keys(attributes) as AttributeMapKey[]).reduce(
    //             (
    //                 attMap: AttributeMap<number[]>,
    //                 attributeId: AttributeMapKey,
    //             ) => {
    //                 if (item.AdditiveModifiers?.[attributeId] !== undefined) {
    //                     attMap[attributeId]!.push(
    //                         item.AdditiveModifiers[attributeId],
    //                     );
    //                 }
    //                 return attMap;
    //             },
    //             attributes,
    //         ),
    //     {
    //         Vigor: [],
    //         Endurance: [],
    //         Vitality: [],
    //         Adaptability: [],
    //         Strength: [],
    //         Dexterity: [],
    //         Intelligence: [],
    //         Faith: [],
    //         Attunement: [],
    //     },
    // );
    return {
        Vigor: [],
        Endurance: [],
        Vitality: [],
        Adaptability: [],
        Strength: [],
        Dexterity: [],
        Intelligence: [],
        Faith: [],
        Attunement: [],
    };
}
