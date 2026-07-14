import ClassContext from "@/lib/context/classes";
import Class from "@/lib/interfaces/class";
import {
    VirtualStatsContext,
    VirtualStatsDispatchContext,
} from "@/lib/reducers/virtualStats";
import ArmorSet from "@/lib/types/armorSet";
import Equippable from "@/lib/types/equippable";
import Ring from "@/lib/types/ring";
import StatMap, { StatMapKey } from "@/lib/types/statMap";
import { useCallback, useContext, useEffect, useState } from "react";

/**
 * Returns a StatMap that contains the total stats of all the items in the given array.
 * Items without stats are ignored.
 * If an item has no stat for a particular statId, 0 is assumed for that statId.
 *
 * @param {Equippable[]} items The array of items to calculate the total stats from.
 *
 * @returns {StatMap<number>} The total stats of all the items in the given array.
 */
function getItemStats(items: Equippable[]): StatMap<number> {
    return items.reduce(
        (totalStats: StatMap<number>, item: Equippable) =>
            (Object.keys(totalStats) as StatMapKey[]).reduce(
                (acc: StatMap<number>, statId: StatMapKey) => {
                    acc[statId]! += item.AdditiveModifiers?.[statId]! ?? 0;
                    return acc;
                },
                totalStats,
            ),
        {
            Vigor: 0,
            Endurance: 0,
            Vitality: 0,
            Adaptability: 0,
            Strength: 0,
            Dexterity: 0,
            Intelligence: 0,
            Faith: 0,
            Attunement: 0,
        },
    );
}

export default function LeftColumn(props: {
    equippedRings: Ring[];
    equippedArmor: ArmorSet;
}) {
    const classes: Class[] = useContext(ClassContext);

    // Desired states are user input, and represent the "ideal" stats of a character
    const [desiredStats, setDesiredStats] = useState<StatMap<number>>({
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

    // Item stats are the stats of the currently selected equipment
    const [itemStats, setItemStats] = useState<StatMap<number>>({
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

    // Final stats are the optimal class's stats after leveling up
    const [finalStats, setFinalStats] = useState<StatMap<number>>({
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

    // Virtual stats are the final stats after adding equipment bonuses
    const virtualStats = useContext(VirtualStatsContext);
    const setVirtualStats = useContext(VirtualStatsDispatchContext);

    // Optimal class is the class with the lowest delta
    const [optimalClass, setOptimalClass] = useState<Class>(classes[0] ?? {});

    // Delta is the difference between the desired stats and the class' stats
    const delta = useCallback(
        (classStats: StatMap<number>): number => {
            return (Object.keys(classStats) as StatMapKey[])
                .map((statId: StatMapKey) =>
                    classStats[statId]! <
                    desiredStats[statId]! - itemStats[statId]!
                        ? desiredStats[statId]! -
                          classStats[statId]! -
                          itemStats[statId]!
                        : 0,
                )
                .reduce((total: number, n: number) => total + n);
        },
        [desiredStats, itemStats],
    );

    // Sort classes by ascending delta
    const sortClasses = useCallback((): Class[] => {
        return classes
            .map((c: Class) => {
                c.sortingValue = c.Level + delta(c.Stats);
                return c;
            })
            .sort((a: Class, b: Class) => a.sortingValue! - b.sortingValue!);
    }, [delta]);

    // Sorted classes are the classes sorted by ascending delta
    const [sorted, setSorted] = useState<Class[]>(sortClasses());

    // STATE UPDATE FUNCTIONS

    /**
     * Updates the desired stats state with the given statId and value.
     *
     * @param {string} statId - The statId to update.
     * @param {number} value - The value to update the statId with.
     */
    function updateDesiredStats(statId: string, value: number): void {
        setDesiredStats({
            ...desiredStats,
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
    }, [finalStats, sortClasses]);

    /**
     * Updates the final stats and virtual stats when the desired stats, optimal class, or item stats change.
     */
    useEffect(() => {
        // calculate final stats
        let tempFinal: StatMap<number> = {
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
        let tempVirtual: StatMap<number> = {
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
        (Object.keys(desiredStats) as StatMapKey[]).forEach(
            (statId: StatMapKey) => {
                {
                    tempFinal[statId] = Math.max(
                        desiredStats[statId]! - itemStats[statId]!,
                        optimalClass?.Stats[statId]!,
                    );
                    tempVirtual[statId] = Math.max(
                        desiredStats[statId]!,
                        optimalClass.Stats![statId]! + itemStats[statId]!,
                    );
                }
            },
        );
        setFinalStats(tempFinal);
        // setVirtualStats(must be a Map<StatMapKey, number>);
        setVirtualStats(
            new Map(Object.entries(tempVirtual) as [StatMapKey, number][]),
        );
    }, [desiredStats, optimalClass, itemStats]);

    /**
     * Updates the item stats when the helmet, chestpiece, or equipped talismans change.
     */
    useEffect(() => {
        // get added stats from items
        setItemStats(
            getItemStats([
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
        <div className="h-full flex flex-col w-full items-left justify-baseline align-baseline">
            {/* Starting class */}
            <div className="flex w-full items-left justify-between align-center">
                {/* TODO: set a toggle to switch between finding an optimal starting class and building around a selected starting class */}
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
                        <th className="text-left">Stat</th>
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
                    {Object.keys(desiredStats).map((statId: string) => (
                        <tr key={statId}>
                            <td className="text-left">{statId}:</td>
                            <td className="text-center">
                                <input
                                    type="number"
                                    disabled
                                    value={
                                        optimalClass.Stats[
                                            statId as StatMapKey
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
                                    value={desiredStats[statId as StatMapKey]!}
                                    className="text-right h-full max-w-15"
                                    onChange={(e) =>
                                        updateDesiredStats(
                                            statId as StatMapKey,
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                            </td>
                            <td className="text-right">
                                <input
                                    type="number"
                                    disabled
                                    value={finalStats[statId as StatMapKey]!}
                                    className="text-right h-full max-w-15"
                                />
                            </td>
                            <td className="text-right">
                                <input
                                    type="number"
                                    disabled
                                    value={virtualStats[statId as StatMapKey]!}
                                    className="text-right h-full max-w-15"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />

            {/* Souls */}
            <div className="grid grid-cols-2 w-full gap-1">
                {/* Souls to next level */}
                {/* TODO: add calculations to accurately display this data */}
                <div className="col-span-1 w-full flex flex-col justify-between">
                    <label
                        htmlFor="soulsToNextLevel"
                        className="w-full text-center"
                    >
                        Souls to next Level
                    </label>
                    <input
                        id="soulsToNextLevel"
                        disabled
                        type="number"
                        value="500"
                        className="w-full text-left"
                    />
                </div>
                {/* Total soul cost */}
                {/* TODO: add calculations to accurately display this data */}
                <div className="col-span-1 w-full flex flex-col justify-between">
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
                        value="0"
                    />
                </div>
                {/* Soul memory */}
                {/* TODO: add calculations to accurately display this data */}
                <div className="col-span-2 w-full flex flex-col justify-between">
                    <label htmlFor="soulMemory" className="w-full text-center">
                        Soul Memory
                    </label>
                    <input
                        id="soulMemory"
                        className="w-full text-center"
                        type="number"
                        disabled
                        value="0"
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
                <select id="covenant" className="col-span-2 w-full text-center">
                    {/* TODO: add options */}
                    <option value="0">None</option>
                    <option value="1">One</option>
                </select>
            </div>
            <hr />

            {/* Spells */}
            <div className="flex flex-col min-h-20">
                <p>Spells, Miracles, and Pyromancies</p>
                <div className="grid grid-cols-2 gap-1">
                    {/* TODO: for each X points in ATT, add another <select> */}
                    {/* each <select> should take 1 column of the grid */}
                </div>
            </div>
        </div>
    );
}
