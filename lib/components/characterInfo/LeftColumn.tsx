import { Classes, PlayerLevelUpSouls, Vows } from "@/lib/gameData";
import {
    FocusedAttributeContext,
    FocusedAttributeDispatchContext,
} from "@/lib/reducers/focusedAttribute";
import {
    VirtualAttributesContext,
    VirtualAttributesDispatchContext,
} from "@/lib/reducers/virtualAttributes";
import { calculateStat } from "@/lib/scripts/statCalculation";
import ArmorSet from "@/lib/types/armorSet";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import Class from "@/lib/types/class";
import Equippable from "@/lib/types/equippable";
import Ring from "@/lib/types/ring";
import { useCallback, useContext, useEffect, useState } from "react";

const MAX_PLAYER_LEVEL_UP_SOULS_ID = 850;
const MAX_PLAYER_LEVEL = 838;

/**
 * Returns a StatMap that contains the total stats of all the items in the given array.
 * Items without stats are ignored.
 * If an item has no stat for a particular statId, 0 is assumed for that statId.
 *
 * @param {Equippable[]} items The array of items to calculate the total stats from.
 *
 * @returns {AttributeMap<number>} The total stats of all the items in the given array.
 */
function getItemAttributeAdditions(
    items: Equippable[],
): AttributeMap<number[]> {
    return items.reduce(
        (attributes: AttributeMap<number[]>, item: Equippable) =>
            (Object.keys(attributes) as AttributeMapKey[]).reduce(
                (
                    attMap: AttributeMap<number[]>,
                    attributeId: AttributeMapKey,
                ) => {
                    if (item.AdditiveModifiers?.[attributeId] !== undefined) {
                        attMap[attributeId].push(
                            item.AdditiveModifiers[attributeId],
                        );
                    }
                    return attMap;
                },
                attributes,
            ),
        {
            Vigor: [],
            Endurance: [],
            Vitality: [],
            Adaptability: [],
            Strength: [],
            Dexterity: [],
            Intelligence: [],
            Faith: [],
            Attunement: [],
        },
    );
}

function sumArray(array: number[]): number {
    return array.reduce((acc: number, num: number) => acc + num, 0);
}

export default function LeftColumn(props: {
    equippedRings: Ring[];
    equippedArmor: ArmorSet;
}) {
    // Context
    const focusedAttribute = useContext(FocusedAttributeContext);
    const setFocusedAttribute = useContext(FocusedAttributeDispatchContext);

    // Desired attributes are user input, and represent the "ideal" attributes of a character
    const [desiredAttributes, setDesiredAttributes] = useState<
        AttributeMap<number>
    >({
        Vigor: 0,
        Endurance: 0,
        Vitality: 0,
        Adaptability: 0,
        Strength: 0,
        Dexterity: 0,
        Intelligence: 0,
        Faith: 0,
        Attunement: 0,
    });

    // Item attribute additions are the total attribute additions of the currently selected equipment
    const [itemAttributeAdditions, setItemAttributeAdditions] = useState<
        AttributeMap<number[]>
    >({
        Vigor: [],
        Endurance: [],
        Vitality: [],
        Adaptability: [],
        Strength: [],
        Dexterity: [],
        Intelligence: [],
        Faith: [],
        Attunement: [],
    });

    // Final attributes are the optimal class's attributes after leveling up
    const [finalAttributes, setFinalAttributes] = useState<
        AttributeMap<number>
    >({
        Vigor: 0,
        Endurance: 0,
        Vitality: 0,
        Adaptability: 0,
        Strength: 0,
        Dexterity: 0,
        Intelligence: 0,
        Faith: 0,
        Attunement: 0,
    });

    // Virtual attributes are the final attributes after adding equipment bonuses
    const virtualAttributes = useContext(VirtualAttributesContext);
    const setVirtualAttributes = useContext(VirtualAttributesDispatchContext);

    // Optimal class is the class with the lowest delta
    const [optimalClass, setOptimalClass] = useState<Class>(Classes[0] ?? {});

    // Delta is the difference between the desired stats and the class' stats
    const delta = useCallback(
        (classAttributes: AttributeMap<number>): number => {
            return (Object.keys(classAttributes) as AttributeMapKey[])
                .map((statId: AttributeMapKey) =>
                    classAttributes[statId]! <
                    desiredAttributes[statId]! -
                        sumArray(itemAttributeAdditions[statId]!)
                        ? desiredAttributes[statId]! -
                          classAttributes[statId]! -
                          sumArray(itemAttributeAdditions[statId]!)
                        : 0,
                )
                .reduce((total: number, n: number) => total + n);
        },
        [desiredAttributes, itemAttributeAdditions],
    );

    // Sort classes by ascending delta
    const sortClasses = useCallback((): Class[] => {
        return Classes.map((c: Class) => {
            c.sortingValue = c.Level + delta(c.Attributes);
            return c;
        }).sort((a: Class, b: Class) => a.sortingValue! - b.sortingValue!);
    }, [delta]);

    // Sorted classes are the classes sorted by ascending delta
    const [sorted, setSorted] = useState<Class[]>(sortClasses());

    // Souls to next level
    const [soulsToNextLevel, setSoulsToNextLevel] = useState(0);

    // Total soul cost
    const [totalSoulCost, setTotalSoulCost] = useState(0);

    // Covenant
    const [covenant, setCovenant] = useState("None");

    // STATE UPDATE FUNCTIONS

    /**
     * Updates the desired stats state with the given statId and value.
     *
     * @param {string} statId - The statId to update.
     * @param {number} value - The value to update the statId with.
     */
    function updateDesiredAttributes(statId: string, value: number): void {
        setDesiredAttributes({
            ...desiredAttributes,
            [statId]: Math.min(Math.max(value, 0), 99),
        });
    }

    // EFFECTS

    /**
     * Calculates the optimal class when the sorted classes change.
     */
    useEffect(() => {
        // calculate best class
        setOptimalClass(sorted[0]);
    }, [sorted]);

    /**
     * Sorts the classes by ascending delta when the final stats change.
     */
    useEffect(() => {
        // sort classes
        setSorted(sortClasses());
    }, [finalAttributes, sortClasses]);

    /**
     * Updates the final stats and virtual stats when the desired stats, optimal class, or item stats change.
     */
    useEffect(() => {
        // calculate final stats
        let tempFinal: AttributeMap<number> = {
            Vigor: 0,
            Endurance: 0,
            Vitality: 0,
            Adaptability: 0,
            Strength: 0,
            Dexterity: 0,
            Intelligence: 0,
            Faith: 0,
            Attunement: 0,
        };
        let tempVirtual: AttributeMap<number> = {
            Vigor: 0,
            Endurance: 0,
            Vitality: 0,
            Adaptability: 0,
            Strength: 0,
            Dexterity: 0,
            Intelligence: 0,
            Faith: 0,
            Attunement: 0,
        };
        (Object.keys(desiredAttributes) as AttributeMapKey[]).forEach(
            (attributeId: AttributeMapKey) => {
                {
                    tempFinal[attributeId] = Math.max(
                        desiredAttributes[attributeId]! -
                            sumArray(itemAttributeAdditions[attributeId]!),
                        optimalClass?.Attributes[attributeId]!,
                    );
                    tempVirtual[attributeId] = Math.max(
                        desiredAttributes[attributeId]!,
                        optimalClass.Attributes![attributeId]! +
                            sumArray(itemAttributeAdditions[attributeId]!),
                    );
                }
            },
        );
        setFinalAttributes(tempFinal);
        // setVirtualStats(must be a Map<StatMapKey, number>);
        setVirtualAttributes(
            new Map(Object.entries(tempVirtual) as [AttributeMapKey, number][]),
        );
    }, [desiredAttributes, optimalClass, itemAttributeAdditions]);

    useEffect(() => {
        const currentLevel = Math.min(
            optimalClass.sortingValue!,
            MAX_PLAYER_LEVEL,
            MAX_PLAYER_LEVEL_UP_SOULS_ID,
        );
        const currentPlayerLevelUpSouls = PlayerLevelUpSouls.find(
            (playerLevelUpSouls) => playerLevelUpSouls.Level == currentLevel,
        );

        setSoulsToNextLevel(currentPlayerLevelUpSouls?.NecessarySouls || 0);

        let tempTotalSoulCost = 0;
        for (let i = optimalClass.Level; i < currentLevel; i++) {
            tempTotalSoulCost += PlayerLevelUpSouls[i].NecessarySouls;
        }
        setTotalSoulCost(tempTotalSoulCost);
    }, [finalAttributes]);

    /**
     * Calculates the item stats on render
     */
    useEffect(() => {
        // get added stats from items
        setItemAttributeAdditions(
            getItemAttributeAdditions([
                ...Object.values(props.equippedRings),
                props.equippedArmor.helmet,
                props.equippedArmor.chestpiece,
                props.equippedArmor.gauntlets,
                props.equippedArmor.leggings,
            ]),
        );
    }, []);

    // RENDER
    return (
        <div className="h-full flex flex-col gap-2 w-full items-left justify-baseline align-baseline">
            {/* Starting class */}
            <div className="flex w-full items-left justify-between align-center">
                {/* TODO: set a toggle to switch between finding an optimal starting class and building around a selected starting class */}
                {/* I'm thinking a simple button next to the optimal class <input> that displays an unlocked padlock with a bright background on load, then switches to a locked padlock with a dark background when clicked, and switches back when clicked again */}
                {/* When "unlocked", the <input> will always freely switch between classes, always showing the optimal selection */}
                {/* When the user "locks" the class, the <input> will switch to a <select> with the currently displayed class pre-selected */}
                {/* While the class is "locked", the user can manually switch between starting classes using the <select> dropdown */}
                <label
                    className="flex items-center justify-center"
                    htmlFor="starting-class"
                >
                    Optimal starting class:
                </label>

                <input
                    className="flex max-w-30 text-right h-full"
                    id="starting-class"
                    disabled
                    value={optimalClass.Name}
                />
            </div>

            <hr />

            {/* Stats */}
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left w-full">Stat</th>
                        <th className="text-center">Base</th>
                        <th className="text-right">Desired</th>
                        <th className="text-right">Final</th>
                        <th className="text-right">Virtual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="w-full">
                        <td className="text-left">Soul Level:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value={optimalClass.Level}
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td></td>
                        <td className="text-right">
                            <input
                                type="number"
                                disabled
                                value={optimalClass.sortingValue}
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td></td>
                    </tr>
                    {Object.keys(desiredAttributes).map((statId: string) => (
                        <tr
                            key={statId}
                            onMouseOver={() =>
                                setFocusedAttribute(statId as AttributeMapKey)
                            }
                            onMouseOut={() => setFocusedAttribute(null)}
                            style={{
                                fontWeight:
                                    focusedAttribute == statId
                                        ? "bold"
                                        : "normal",
                            }}
                        >
                            <td className="text-left">{statId}:</td>
                            <td className="text-center">
                                <input
                                    type="number"
                                    disabled
                                    value={
                                        optimalClass.Attributes[
                                            statId as AttributeMapKey
                                        ]!
                                    }
                                    className="text-right h-full max-w-15"
                                />
                            </td>
                            <td className="text-right">
                                <input
                                    type="number"
                                    min="0"
                                    max="99"
                                    value={
                                        desiredAttributes[
                                            statId as AttributeMapKey
                                        ]!
                                    }
                                    className="text-right h-full max-w-15"
                                    onChange={(e) =>
                                        updateDesiredAttributes(
                                            statId as AttributeMapKey,
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                            </td>
                            <td className="text-right">
                                <input
                                    type="number"
                                    disabled
                                    value={
                                        finalAttributes[
                                            statId as AttributeMapKey
                                        ]!
                                    }
                                    className="text-right h-full max-w-15"
                                />
                            </td>
                            <td className="text-right">
                                <input
                                    type="number"
                                    disabled
                                    value={
                                        virtualAttributes[
                                            statId as AttributeMapKey
                                        ]!
                                    }
                                    className="text-right h-full max-w-15"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />

            {/* Souls */}
            <div className="flex w-full gap-1">
                {/* Souls to next level */}
                <div className="w-full flex flex-col justify-between">
                    <label
                        htmlFor="soulsToNextLevel"
                        className="w-full text-center"
                    >
                        Souls to Next Level
                    </label>
                    <input
                        id="soulsToNextLevel"
                        disabled
                        type="number"
                        value={soulsToNextLevel}
                        className="w-full text-left"
                    />
                </div>
                {/* Total soul cost */}
                <div className="w-full flex flex-col justify-between">
                    <label
                        htmlFor="totalSoulCost"
                        className="w-full text-center"
                    >
                        Total Soul Cost
                    </label>
                    <input
                        id="totalSoulCost"
                        className="w-full text-right"
                        type="number"
                        disabled
                        value={totalSoulCost}
                    />
                </div>
            </div>
            <hr />

            {/* Covenant */}
            <div className="grid grid-cols-3 gap-1">
                <label
                    htmlFor="covenant"
                    className="flex col-span-1 w-full h-full text-center items-center justify-center"
                >
                    Covenant:
                </label>
                <select
                    id="covenant"
                    className="col-span-2 w-full text-center"
                    value={covenant}
                    onChange={(e) => setCovenant(e.target.value)}
                >
                    {Vows.map((vow) => (
                        <option key={vow.Name}>{vow.Name}</option>
                    ))}
                </select>
            </div>
            <hr />

            {/* Spells */}
            <div className="flex flex-col min-h-20 text-center">
                <p
                    style={{
                        fontWeight:
                            focusedAttribute == "Attunement"
                                ? "bold"
                                : "normal",
                    }}
                >
                    Spells, Miracles, and Pyromancies
                </p>
                <div className="grid grid-cols-2 gap-1">
                    {/* TODO: add spells */}
                    {/* TODO: pull this out into its own component */}
                    {Array.from({
                        length: calculateStat(
                            "SpellSlotCount",
                            virtualAttributes,
                        ),
                    }).map((_, index) => (
                        <select
                            className="flex h-full col-span-1"
                            key={`${index}`}
                            defaultValue="0"
                        >
                            <option value="0">None</option>
                        </select>
                    ))}
                </div>
            </div>
        </div>
    );
}
