// import { useSortingConfigDispatch } from "@/lib/reducers/configs/sortingConfig";

// export default function ArmorInventory() {
//     // Context
//     const setSortingConfig = useSortingConfigDispatch();

//     return (
//         <div className="flex flex-col w-full h-full items-center justify-center align-center">
//             <h2 className="text-2xl text-left font-bold">Armor Inventory</h2>
//             <hr />
//             {/* TODO: add armor inventory container */}
//             {/* TODO: add optimal armor calculation */}
//             {/* TODO: add inventory system for armor: */}
//             {/* TODO:     - every character has an armor inventory */}
//             {/* TODO:     - inventory starts empty */}
//             {/* TODO:     - player can add instances of armor to their character's inventory from a filterable list of armor pieces */}
//             {/* TODO:     - player can add the currently displayed starting class's armor with one button */}
//             {/* TODO:     - each armor piece links out to a wiki page for it */}
//             {/* TODO:     - three views in armor inventory: */}
//             {/* TODO:         - top three optimal armor sets from the character's inventory */}
//             {/* TODO:             - can be clicked to auto-equip */}
//             {/* TODO:         - list of armor pieces in character's inventory */}
//             {/* TODO:             - can be interacted with to remove or upgrade armor pieces */}
//             {/* TODO:         - collapsible list of all armor pieces in the game */}
//             {/* TODO:             - starts collapsed */}
//             {/* TODO:             - when opened, will expand into the empty space underneath the main three columns */}
//             {/* TODO:             - can be interacted with to add instances of armor pieces to the character's inventory */}
//             {/* TODO:             - has settings that can be configured for sorting */}
//             {/* TODO:                 - target equip load breakpoint */}
//             {/* TODO:                 - sorting presets */}
//             {/* TODO:                 - how many optimal armor sets to show */}
//             {/* TODO:                 - upgrade level */}
//             {/* TODO:             - shows top X number of optimal armor sets */}
//             {/* TODO:             - instructions/tips for sorting */}

//             <div className="w-full h-full content-end">
//                 <button
//                     className="border rounded-lg p-1 w-full"
//                     onClick={() => setSortingConfig({ value: "armor" })}
//                 >
//                     Sorting configs...
//                 </button>
//             </div>
//         </div>
//     );
// }

import ArmorSet from "@/lib/classes/armorSet";
import EquippedArmor from "@/lib/classes/equippedArmor";
import Inventory from "@/lib/components/common/Inventory";
import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";
import Armor from "@/lib/interfaces/armor";
import { useVirtualAttributes } from "@/lib/reducers/attributes/virtualAttributes";
import { useSortingConfigDispatch } from "@/lib/reducers/configs/sortingConfig";
import {
    useArmorInventory,
    useArmorInventoryDispatch,
} from "@/lib/reducers/equipment/armorInventory";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equipment/equippedWeapons";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import { useMemo } from "react";
import { JSX } from "react/jsx-runtime";

export default function ArmorInventory(): JSX.Element {
    // Context
    const equippedRings = useEquippedRings();
    const setSortingConfig = useSortingConfigDispatch();
    const armorInventory = useArmorInventory();
    const setArmorInventory = useArmorInventoryDispatch();
    const virtualAttributes = useVirtualAttributes();
    const equippedWeapons = useEquippedWeapons();

    // State

    /**
     * Solves the 0/1 Knapsack problem for a given set of armor
     * @param {number} equipLoadBudget - the maximum equip load
     * @param {Armor[]} helmets - array of helmet armor
     * @param {Armor[]} chestpieces - array of chestpiece armor
     * @param {Armor[]} gauntlets - array of gauntlets armor
     * @param {Armor[]} leggings - array of leggings armor
     * @param {SortByArmor} sortBy - the sorting criteria for the armor
     * @returns {ArmorSet[]} - an array of up to 3 optimal sets of armor
     */
    const armorSets = useMemo(() => {
        const equipLoadBudget = calculateStatDisplayValue(
            "MaximumEquipLoad",
            virtualAttributes,
            new ArmorSet(),
            equippedRings,
            equippedWeapons,
        );

        // Convert max equip load to integer by multiplying by 10
        const equipLoadBudgetInt: number = Math.floor(equipLoadBudget * 10);

        // Initialize Dynamic Programming table
        // Initial state is empty in each cell
        const dp: ArmorSet[][] = Array(5)
            .fill(0)
            .map(() =>
                Array(equipLoadBudgetInt + 1)
                    .fill(null)
                    .map(() => new ArmorSet()),
            );

        const equipment: Armor[][] = [
            Helmets,
            Chestpieces,
            Gauntlets,
            Leggings,
        ];
        // Fill dynamic programming table
        for (let i = 0; i < 4; i++) {
            const armorArr: Armor[] = equipment[i];

            for (const rawArmor of armorArr) {
                const armor = new EquippedArmor(rawArmor);

                // Convert piece weight to integer
                const armorWeight: number = armor.weight;
                const armorWeightInt: number = Math.round(armorWeight * 10);

                // TODO: Generate score for sorting
                const armorStat: number = 1 / armor.weight;

                for (
                    let wInt = equipLoadBudgetInt;
                    wInt >= armorWeightInt;
                    wInt--
                ) {
                    if (
                        dp[i][wInt - armorWeightInt].weight! + armorWeight <=
                        equipLoadBudgetInt
                    ) {
                        const newFitness: number =
                            dp[i][wInt - armorWeightInt].fitness! + armorStat;
                        if (newFitness > dp[i + 1][wInt].fitness!) {
                            // helmet
                            dp[i + 1][wInt].helmet =
                                i === 0
                                    ? armor
                                    : (dp[i][wInt - armorWeightInt].helmet ??
                                      Helmets[0]);
                            // chestpiece
                            dp[i + 1][wInt].chestpiece =
                                i === 1
                                    ? armor
                                    : (dp[i][wInt - armorWeightInt]
                                          .chestpiece ?? Chestpieces[0]);
                            // gauntlets
                            dp[i + 1][wInt].gauntlets =
                                i === 2
                                    ? armor
                                    : (dp[i][wInt - armorWeightInt].gauntlets ??
                                      Gauntlets[0]);
                            // leggings
                            dp[i + 1][wInt].leggings =
                                i === 3
                                    ? armor
                                    : (dp[i][wInt - armorWeightInt].leggings ??
                                      Leggings[0]);
                            // fitness
                            dp[i + 1][wInt].fitness = newFitness;
                            // weight
                            // dp[i + 1][wInt].weight =
                            //     dp[i][wInt - armorWeightInt].weight! +
                            //     armorWeight;
                        }
                    }
                }
            }

            // Carry forward the best set from the previous category without adding a new piece
            for (let w = 0; w <= equipLoadBudgetInt; w++) {
                if (dp[i + 1][w].fitness! < dp[i][w].fitness!) {
                    dp[i + 1][w] = dp[i][w];
                }
            }
        }

        // Extract top 3 sets
        const topSets: ArmorSet[] = [];
        for (let wInt = equipLoadBudgetInt; wInt >= 0; wInt--) {
            if (dp[4][wInt].fitness! > 0) {
                let duplicate = false;
                for (const set of topSets) {
                    if (
                        dp[4][wInt].helmet === set.helmet &&
                        dp[4][wInt].chestpiece === set.chestpiece &&
                        dp[4][wInt].gauntlets === set.gauntlets &&
                        dp[4][wInt].leggings === set.leggings
                    ) {
                        duplicate = true;
                        break;
                    }
                }
                if (duplicate) continue;
                topSets.push(dp[4][wInt]);
                if (topSets.length === 3) break;
            }
        }

        return topSets;
    }, [armorInventory, virtualAttributes, equippedRings, equippedWeapons]);

    const allArmor = [
        ...Helmets,
        ...Chestpieces,
        ...Gauntlets,
        ...Leggings,
    ].map((armor) => new EquippedArmor(armor));

    // return (
    //     <div className="flex flex-col w-full h-full items-center justify-center align-center">
    //         <h2 className="text-2xl text-right font-bold">Armor Inventory</h2>
    //         <hr />

    //         <div className="flex flex-col gap-1 w-full h-full items-center align-center">
    //             {/* Character inventory */}
    //             <VirtualizedList
    //                 list={armorInventory}
    //                 height={75}
    //                 searchboxPlaceholder="Search inventory..."
    //                 renderFunc={(item: EquippedArmor) => (
    //                     // <WeaponTooltip equippedWeapon={item} side="left">
    //                     <div className="w-full flex flex-col items-center">
    //                         <div className="w-full flex items-center justify-between align-center">
    //                             <p className="p-1">{item.name}</p>
    //                             {item.name != "No Armor" ? (
    //                                 <button
    //                                     className="p-1"
    //                                     onClick={() => {
    //                                         setArmorInventory({
    //                                             action: "remove",
    //                                             data: item,
    //                                         });
    //                                     }}
    //                                 >
    //                                     <XLg />
    //                                 </button>
    //                             ) : null}
    //                         </div>
    //                         {/* <div className="w-full flex items-center justify-baseline align-center">
    //                                 <InfusionDisplay
    //                                     weapon={item}
    //                                     updateFunc={(weapon: EquippedWeapon) =>
    //                                         setWeaponInventory({
    //                                             action: "add",
    //                                             data: weapon,
    //                                         })
    //                                     }
    //                                 />
    //                                 <ReinforcementDisplay
    //                                     weapon={item}
    //                                     updateFunc={(weapon: EquippedWeapon) =>
    //                                         setWeaponInventory({
    //                                             action: "add",
    //                                             data: weapon,
    //                                         })
    //                                     }
    //                                 />
    //                             </div> */}
    //                     </div>
    //                     // </WeaponTooltip>
    //                 )}
    //                 filterFunc={(item: EquippedArmor, searchStr: string) =>
    //                     item.name.toLowerCase().includes(searchStr)
    //                 }
    //             />

    //             {/* All armor */}
    //             <VirtualizedList
    //                 list={[
    //                     ...Helmets,
    //                     ...Chestpieces,
    //                     ...Gauntlets,
    //                     ...Leggings,
    //                 ]}
    //                 searchboxPlaceholder="Search all armor..."
    //                 renderFunc={(item: EquippedArmor) => (
    //                     // <WeaponTooltip equippedWeapon={item} side="left">
    //                     <div className="flex items-center">
    //                         {item.name != "No Armor" ? (
    //                             <button
    //                                 className="p-1"
    //                                 onClick={() => {
    //                                     setArmorInventory({
    //                                         action: "add",
    //                                         data: item,
    //                                     });
    //                                 }}
    //                             >
    //                                 <ArrowUp />
    //                             </button>
    //                         ) : null}
    //                         <p className="p-1">{item.name}</p>
    //                     </div>
    //                     // </WeaponTooltip>
    //                 )}
    //                 filterFunc={(item: EquippedArmor, searchStr: string) =>
    //                     item.name.toLowerCase().includes(searchStr)
    //                 }
    //             />

    //             <div className="w-full h-full content-end">
    //                 <button
    //                     className="border rounded-lg p-1 w-full"
    //                     onClick={() => setSortingConfig({ value: "armor" })}
    //                 >
    //                     Sorting configs...
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <Inventory<EquippedArmor>
            title="Armor Inventory"
            allItems={allArmor}
            inventory={armorInventory}
            setInventory={setArmorInventory}
            // defaultItem={defaultArmor}
            // isDefaultItem={(item) => item.name === "None"}
            sortingConfigValue="armor"
            // renderTooltip={(item, children) => (
            //     <ArmorTooltip equippedArmor={item} side="left">
            //         {children}
            //     </ArmorTooltip>
            // )}
            renderItemName={(item) => item.name}
            filterFunc={(item, searchStr) =>
                item.name.toLowerCase().includes(searchStr)
            }
        />
    );
}
