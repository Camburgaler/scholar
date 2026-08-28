import { Classes, Covenants, PlayerLevelUpSouls, Spells } from "@/lib/gameData";
import Class from "@/lib/interfaces/class";
import Spell from "@/lib/interfaces/spell";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equippedWeapons";
import {
    useFocusedAttribute,
    useFocusedAttributeDispatch,
} from "@/lib/reducers/focusedAttribute";
import {
    useVirtualAttributes,
    useVirtualAttributesDispatch,
} from "@/lib/reducers/virtualAttributes";
import { getClassByName } from "@/lib/scripts/class";
import { ringsAttributeModifiers } from "@/lib/scripts/equippedRings";
import { getSpellByName } from "@/lib/scripts/spell";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { useCallback, useEffect, useState } from "react";
import { Lock, Trash, Unlock } from "react-bootstrap-icons";
import { JSX } from "react/jsx-runtime";

// CONSTANTS

// This is the highest level for which the PlayerLevelUpSouls data is available
const MAX_PLAYER_LEVEL_UP_SOULS_ID = 850;
// This is the highest level that the character can reach
const MAX_PLAYER_LEVEL = 838;

/**
 * LeftColumn
 * @description The left column of the character info page. Displays the character's attributes, class, souls, and spell list.
 */
export default function LeftColumn(): JSX.Element {
    // CONTEXT
    const focusedAttribute = useFocusedAttribute();
    const setFocusedAttribute = useFocusedAttributeDispatch();
    const virtualAttributes = useVirtualAttributes();
    const setVirtualAttributes = useVirtualAttributesDispatch();
    const equippedArmorSet = useEquippedArmorSet();
    const equippedRings = useEquippedRings();
    const equippedWeapons = useEquippedWeapons();

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
                .map((attributeId: AttributeMapKey) =>
                    classAttributes[attributeId]! <
                    desiredAttributes[attributeId]! -
                        equippedArmorSet.attributeModifier(attributeId) -
                        ringsAttributeModifiers(equippedRings, attributeId)
                        ? desiredAttributes[attributeId]! -
                          classAttributes[attributeId]! -
                          equippedArmorSet.attributeModifier(attributeId) -
                          ringsAttributeModifiers(equippedRings, attributeId)
                        : 0,
                )
                .reduce((total: number, n: number) => total + n);
        },
        [desiredAttributes, equippedArmorSet, equippedRings],
    );

    // Calculate final level based on delta
    const calculateFinalLevel = useCallback(
        (startingClass: Class): number => {
            return startingClass.Level + delta(startingClass.Attributes);
        },
        [delta],
    );

    // Calculate souls to next level
    const calculateSoulsToNextLevel = useCallback(
        (startingClass: Class): number => {
            const currentLevel = Math.min(
                calculateFinalLevel(startingClass),
                MAX_PLAYER_LEVEL,
                MAX_PLAYER_LEVEL_UP_SOULS_ID,
            );
            return PlayerLevelUpSouls[currentLevel];
        },
        [calculateFinalLevel],
    );

    // Calculate total soul cost
    const calculateTotalSoulCost = useCallback(
        (startingClass: Class): number => {
            const currentLevel = Math.min(
                calculateFinalLevel(startingClass),
                MAX_PLAYER_LEVEL,
                MAX_PLAYER_LEVEL_UP_SOULS_ID,
            );
            let tempTotalSoulCost = 0;

            for (let i = startingClass.Level; i < currentLevel; i++) {
                tempTotalSoulCost += PlayerLevelUpSouls[i];
            }

            return tempTotalSoulCost;
        },
        [calculateFinalLevel],
    );

    // Sort classes by ascending delta
    const sortClasses = useCallback((): Class[] => {
        return Classes.map((c: Class) => {
            c.sortingValue = calculateTotalSoulCost(c);
            return c;
        }).sort((a: Class, b: Class) => a.sortingValue! - b.sortingValue!);
    }, [delta, calculateTotalSoulCost]);

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

    /**
     * Returns the number of spell usages for the given spell.
     * @param spell The {@link Spell} to get the number of spell usages for.
     * @return {number} The number of spell usages for the given {@link Spell}.
     */
    function getSpellUsages(spell: Spell): number {
        const attunementBreakpoints: number[] = [
            0, 15, 26, 32, 38, 43, 49, 58, 79, 94,
        ];
        const index: number = attunementBreakpoints.findLastIndex(
            (breakpoint) => breakpoint <= virtualAttributes.Attunement!,
        );

        return spell.UsageCountCurve[index];
    }

    /**
     * Returns the display name for the given spell.
     * @param spell The {@link Spell} to get the display name for.
     * @return The display name for the given {@link Spell}.
     */
    function getSpellDisplayName(spell: Spell): string {
        return `${spell.Name} x ${getSpellUsages(spell)}
                                ${
                                    spell.SpellSlotCost > 1
                                        ? ` (${spell.SpellSlotCost} slots)`
                                        : ""
                                }`;
    }

    // Get effective class based on class lock
    const effectiveClass = useCallback((): Class => {
        return classLocked ? getClassByName(selectedClass)! : optimalClass;
    }, [classLocked, selectedClass, optimalClass]);

    // EFFECTS

    // Calculates the optimal class when the sorted classes change.
    useEffect(() => {
        // calculate best class
        setOptimalClass(sorted[0]);
    }, [sorted]);

    // Sorts the classes when the final stats change.
    useEffect(() => {
        setSorted(sortClasses());
    }, [finalAttributes, sortClasses]);

    // Updates the final stats and virtual stats when the desired stats, effective class, or equipped armor set change.
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
                            equippedArmorSet.attributeModifier(attributeId) -
                            ringsAttributeModifiers(equippedRings, attributeId),
                        effectiveClass().Attributes[attributeId]!,
                    );
                    tempVirtual[attributeId] = Math.max(
                        desiredAttributes[attributeId]!,
                        effectiveClass().Attributes[attributeId]!,
                    );
                }
            },
        );
        setFinalAttributes(tempFinal);
        setVirtualAttributes(
            new Map(Object.entries(tempVirtual) as [AttributeMapKey, number][]),
        );
    }, [desiredAttributes, equippedArmorSet, effectiveClass, equippedRings]);

    // Updates the souls to next level and total soul cost when the final attributes change.
    useEffect(() => {
        setSoulsToNextLevel(calculateSoulsToNextLevel(effectiveClass()));
        setTotalSoulCost(calculateTotalSoulCost(effectiveClass()));
    }, [
        effectiveClass,
        calculateSoulsToNextLevel,
        calculateTotalSoulCost,
        finalAttributes,
    ]);

    // Sets selected class if classLocked is false
    useEffect(() => {
        if (!classLocked) {
            setSelectedClass(optimalClass.Name);
        }
    }, [optimalClass, classLocked]);

    // Updates the spell slots when the virtual attributes change.
    useEffect(() => {
        setSpellSlots(
            calculateStatDisplayValue(
                "SpellSlotCount",
                virtualAttributes,
                equippedArmorSet,
                equippedRings,
                equippedWeapons,
            ),
        );
    }, [virtualAttributes, equippedArmorSet, equippedRings]);

    // Updates the consumed spell slots when the spell slots change.
    useEffect(() => {
        if (consumedSpellSlots > spellSlots) {
            setEquippedSpells(
                equippedSpells.slice(0, equippedSpells.length - 1),
            );
        }
    }, [spellSlots]);

    // Updates the consumed spell slots when the equipped spells change.
    useEffect(() => {
        let consumedSpellSlots = 0;

        for (const spell of equippedSpells) {
            consumedSpellSlots += spell.SpellSlotCost;
        }

        setConsumedSpellSlots(consumedSpellSlots);
    }, [equippedSpells]);

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
                            className="flex min-w-30 text-right h-full"
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
                            className="flex w-30 text-right h-full"
                            id="starting-class"
                            disabled
                            value={optimalClass.Name}
                        />
                    )}
                </div>
            </div>

            <hr />

            {/* Attributes */}
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left w-full">Attribute</th>
                        <th className="text-center">Base</th>
                        <th className="text-right">Desired</th>
                        <th className="text-right">Final</th>
                        <th className="text-right">Virtual</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(desiredAttributes).map(
                        (attributeId: string) => (
                            <tr
                                key={attributeId}
                                onMouseOver={() =>
                                    setFocusedAttribute(
                                        attributeId as AttributeMapKey,
                                    )
                                }
                                onMouseOut={() => setFocusedAttribute(null)}
                                style={{
                                    fontWeight:
                                        focusedAttribute == attributeId
                                            ? "bold"
                                            : "normal",
                                }}
                            >
                                {/* Attribute name */}
                                <td className="text-left">{attributeId}:</td>
                                {/* Starting class base attribute value */}
                                <td className="text-center">
                                    <input
                                        type="number"
                                        disabled
                                        value={
                                            effectiveClass().Attributes[
                                                attributeId as AttributeMapKey
                                            ]!
                                        }
                                        className="text-right h-full max-w-15"
                                    />
                                </td>
                                {/* Desired attribute value */}
                                <td className="text-right">
                                    <input
                                        type="number"
                                        min="0"
                                        max="99"
                                        value={
                                            desiredAttributes[
                                                attributeId as AttributeMapKey
                                            ]!
                                        }
                                        className="text-right h-full max-w-15"
                                        onChange={(e) =>
                                            updateDesiredAttributes(
                                                attributeId as AttributeMapKey,
                                                parseInt(e.target.value),
                                            )
                                        }
                                    />
                                </td>
                                {/* Final attribute value */}
                                <td className="text-right">
                                    <input
                                        type="number"
                                        disabled
                                        value={
                                            finalAttributes[
                                                attributeId as AttributeMapKey
                                            ]!
                                        }
                                        className="text-right h-full max-w-15"
                                    />
                                </td>
                                {/* Virtual attribute value */}
                                <td className="text-right">
                                    <input
                                        type="number"
                                        disabled
                                        value={
                                            virtualAttributes[
                                                attributeId as AttributeMapKey
                                            ]!
                                        }
                                        className="text-right h-full max-w-15"
                                    />
                                </td>
                            </tr>
                        ),
                    )}
                    <tr className="w-full border-t">
                        <td className="text-left">Soul Level:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value={effectiveClass().Level}
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td></td>
                        <td className="text-right">
                            <input
                                type="number"
                                disabled
                                value={calculateFinalLevel(effectiveClass())}
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td></td>
                    </tr>
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
