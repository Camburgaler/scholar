import { Classes, Covenants, PlayerLevelUpSouls, Spells } from "@/lib/gameData";
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
import Spell from "@/lib/types/spell";
import { useCallback, useContext, useEffect, useState } from "react";
import { Lock, Trash, Unlock } from "react-bootstrap-icons";

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

function sumArray(array: number[]): number {
    return array.reduce((acc: number, num: number) => acc + num, 0);
}

function getClassByName(name: string): Class | undefined {
    return Classes.find((c) => c.Name === name);
}

function getSpellByName(name: string): Spell | "none" {
    return Spells.find((spell) => spell.Name === name) || "none";
}

export default function LeftColumn(props: {
    equippedRings: Ring[];
    equippedArmor: ArmorSet;
}) {
    // CONTEXT

    const focusedAttribute = useContext(FocusedAttributeContext);
    const setFocusedAttribute = useContext(FocusedAttributeDispatchContext);
    const virtualAttributes = useContext(VirtualAttributesContext);
    const setVirtualAttributes = useContext(VirtualAttributesDispatchContext);

    // STATE

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

    // Class lock
    // This determines if the class will be automatically optimized or manually selected
    const [classLocked, setClassLocked] = useState(false);

    // Selected class
    // This is the class selected by the user if classLocked is false
    const [selectedClass, setSelectedClass] = useState(Classes[0].Name);

    // Spell Slots
    // This is the number of spell slots granted by the virtual attributes
    const [spellSlots, setSpellSlots] = useState(0);

    // Equipped Spells
    // This is a list of spells that are currently equipped
    const [equippedSpells, setEquippedSpells] = useState<Spell[]>([]);

    // Consumed Spell Slots
    // This is the number of spell slots that have been consumed by the equipped spells
    const [consumedSpellSlots, setConsumedSpellSlots] = useState(0);

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

    // HELPER FUNCTIONS

    function getSpellUsages(spell: Spell): number {
        const attunementBreakpoints: number[] = [
            0, 15, 26, 32, 38, 43, 49, 58, 79, 94,
        ];
        const index: number = attunementBreakpoints.findLastIndex(
            (breakpoint) => breakpoint <= virtualAttributes.Attunement!,
        );

        return spell.UsageCountCurve[index];
    }

    function getSpellDisplayName(spell: Spell): string {
        return `${spell.Name} x ${getSpellUsages(spell)}
                                ${
                                    spell.SpellSlotCost > 1
                                        ? ` (${spell.SpellSlotCost} slots)`
                                        : ""
                                }`;
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
     * Updates the final stats and virtual stats when the desired stats, selected class, or item stats change.
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
                        getClassByName(selectedClass)?.Attributes[attributeId]!,
                    );
                    tempVirtual[attributeId] = Math.max(
                        desiredAttributes[attributeId]!,
                        getClassByName(selectedClass)?.Attributes![
                            attributeId
                        ]! + sumArray(itemAttributeAdditions[attributeId]!),
                    );
                }
            },
        );
        setFinalAttributes(tempFinal);
        setVirtualAttributes(
            new Map(Object.entries(tempVirtual) as [AttributeMapKey, number][]),
        );
    }, [desiredAttributes, selectedClass, itemAttributeAdditions]);

    /**
     * Updates the souls to next level and total soul cost when the final stats change.
     */
    useEffect(() => {
        const currentLevel = Math.min(
            optimalClass.sortingValue!,
            MAX_PLAYER_LEVEL,
            MAX_PLAYER_LEVEL_UP_SOULS_ID,
        );
        const currentPlayerLevelUpSouls = PlayerLevelUpSouls[currentLevel];

        setSoulsToNextLevel(currentPlayerLevelUpSouls || 0);

        let tempTotalSoulCost = 0;
        for (let i = optimalClass.Level; i < currentLevel; i++) {
            tempTotalSoulCost += PlayerLevelUpSouls[i];
        }
        setTotalSoulCost(tempTotalSoulCost);
    }, [finalAttributes]);

    /**
     * Sets selected class if classLocked is false
     */
    useEffect(() => {
        if (!classLocked) {
            setSelectedClass(optimalClass.Name);
        }
    }, [optimalClass, classLocked]);

    /**
     * Updates the spell slots when the virtual attributes change.
     */
    useEffect(() => {
        setSpellSlots(calculateStat("SpellSlotCount", virtualAttributes));
    }, [virtualAttributes]);

    /**
     * Updates the consumed spell slots when the spell slots change.
     */
    useEffect(() => {
        if (consumedSpellSlots > spellSlots) {
            setEquippedSpells(
                equippedSpells.slice(0, equippedSpells.length - 1),
            );
        }
    }, [spellSlots]);

    /**
     * Updates the consumed spell slots when the equipped spells change.
     */
    useEffect(() => {
        let consumedSpellSlots = 0;

        for (const spell of equippedSpells) {
            consumedSpellSlots += spell.SpellSlotCost;
        }

        setConsumedSpellSlots(consumedSpellSlots);
    }, [equippedSpells]);

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
                <label
                    className="flex items-center justify-center"
                    htmlFor="starting-class"
                >
                    {classLocked
                        ? "Selected starting class:"
                        : "Optimal starting class:"}
                </label>

                <div className="flex gap-2 items-center">
                    <button
                        className="h-full w-full p-1"
                        onClick={() => setClassLocked(!classLocked)}
                    >
                        {classLocked ? (
                            <Lock className="h-full w-full" />
                        ) : (
                            <Unlock className="h-full w-full" />
                        )}
                    </button>
                    {classLocked ? (
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            {sorted.map((c) => (
                                <option key={c.Name} value={c.Name}>
                                    {c.Name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            className="flex max-w-30 text-right h-full"
                            id="starting-class"
                            disabled
                            value={optimalClass.Name}
                        />
                    )}
                </div>
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
                    className="col-span-2 w-full text-left"
                    value={covenant}
                    onChange={(e) => setCovenant(e.target.value)}
                >
                    {Covenants.map((vow) => (
                        <option key={vow}>{vow}</option>
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
                    Spells, Miracles, and Pyromancies ({consumedSpellSlots}/
                    {spellSlots})
                </p>
                <div className="grid grid-cols-2 gap-1">
                    {Array.from({
                        length: equippedSpells.length,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-full w-full col-span-1"
                        >
                            {index % 2 === 0 ? (
                                <button
                                    onClick={() =>
                                        setEquippedSpells(
                                            equippedSpells.filter(
                                                (_, i) => i !== index,
                                            ),
                                        )
                                    }
                                >
                                    <Trash />
                                </button>
                            ) : null}
                            <input
                                type="text"
                                disabled
                                value={getSpellDisplayName(
                                    equippedSpells[index],
                                )}
                                className="text-left h-full w-full"
                            />
                            {index % 2 === 1 ? (
                                <button
                                    onClick={() =>
                                        setEquippedSpells(
                                            equippedSpells.filter(
                                                (_, i) => i !== index,
                                            ),
                                        )
                                    }
                                >
                                    <Trash />
                                </button>
                            ) : null}
                        </div>
                    ))}

                    <select
                        className="flex h-full w-full col-span-1"
                        onChange={(e) => {
                            setEquippedSpells(
                                equippedSpells.concat(
                                    getSpellByName(e.target.value) as Spell,
                                ),
                            );
                            e.target.value = "none";
                        }}
                    >
                        <option value="none">None</option>
                        {Spells.filter(
                            (spell) =>
                                // Check if spell meets attribute requirements
                                spell.RequiredFaith <=
                                    virtualAttributes.Faith &&
                                spell.RequiredIntelligence <=
                                    virtualAttributes.Intelligence &&
                                spell.SpellSlotCost <=
                                    spellSlots - consumedSpellSlots,
                        ).map((spell) => (
                            <option key={spell.Name} value={spell.Name}>
                                {getSpellDisplayName(spell)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
