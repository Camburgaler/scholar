import { ArmorDisplay } from "@/lib/components/characterInfo/middleColumn/ArmorDisplay";
import RingDisplay from "@/lib/components/characterInfo/middleColumn/RingDisplay";
import WeaponDisplay from "@/lib/components/characterInfo/middleColumn/WeaponDisplay";
import StatDisplay from "@/lib/components/characterInfo/StatDisplay";
import { AttributeToStatMap } from "@/lib/gameData";
import { useFocusedAttribute } from "@/lib/reducers/attributes/focusedAttribute";
import {
    useTwoHanding,
    useTwoHandingDispatch,
} from "@/lib/reducers/attributes/twoHanding";
import { useVirtualAttributes } from "@/lib/reducers/attributes/virtualAttributes";
import { useEquippedArmorSet } from "@/lib/reducers/equipment/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equipment/equippedWeapons";
import { ringsWeight } from "@/lib/scripts/equippedRings";
import { reinforcedValue } from "@/lib/scripts/slopeIntercept";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import { StatMapKeyToStatNameMap } from "@/lib/types/statMap";
import { useMemo } from "react";

// function calculateStaminaRegen(equipLoadPercent: number): number {
//     const lowEquipLoadSlopeIntercept = { Slope: -0.13, Intercept: 51.9 }; // From 0% to 30%
//     const midEquipLoadSlopeIntercept = { Slope: -0.3575, Intercept: 58.725 }; // From 30% to 70%
//     const highEquipLoadSlopeIntercept = { Slope: -0.258, Intercept: 51.76 }; // From 70% to 120%

//     // Stamina regen decreases (mostly) linearly with equip load percentage.
//     // At 0% equip load, the regen is at its maximum (baseRegen).
//     // Regen decreases linearly from 51.9 at 0% to 48.0 at 30%
//     // Regen decreases linearly from 48.0 at 30% to 33.7 at 70%
//     // Regen decreases linearly from 33.7 at 70% to 20.8 at 120%
//     if (equipLoadPercent <= 30) {
//         return reinforcedValue(lowEquipLoadSlopeIntercept, equipLoadPercent);
//     } else if (equipLoadPercent <= 70) {
//         return reinforcedValue(midEquipLoadSlopeIntercept, equipLoadPercent);
//     } else if (equipLoadPercent <= 120) {
//         return reinforcedValue(highEquipLoadSlopeIntercept, equipLoadPercent);
//     } else {
//         return 20.8;
//     }
// }

/**
 * @description The middle column of the character info page. Displays certain stats and the character's equipment.
 */
export default function MiddleColumn() {
    // Context
    const virtualAttributes = useVirtualAttributes();
    const equippedArmor = useEquippedArmorSet();
    const focusedAttribute = useFocusedAttribute();
    const equippedRings = useEquippedRings();
    const equippedWeapons = useEquippedWeapons();
    const twoHanding = useTwoHanding();
    const twoHandingDispatch = useTwoHandingDispatch();

    // Effects
    const equipLoad = useMemo(() => {
        return (
            equippedArmor.weight +
            ringsWeight(equippedRings) +
            equippedWeapons.weight
        );
    }, [equippedArmor, equippedRings, equippedWeapons]);

    const maximumEquipLoad = useMemo(() => {
        return calculateStatDisplayValue(
            "MaximumEquipLoad",
            virtualAttributes,
            equippedArmor,
            equippedRings,
            equippedWeapons,
        );
    }, [virtualAttributes, equippedArmor, equippedRings, equippedWeapons]);

    const equipLoadPercent = useMemo(() => {
        return (equipLoad / maximumEquipLoad) * 100;
    }, [equipLoad, maximumEquipLoad]);

    const staminaRegen = useMemo(() => {
        const lowEquipLoadSlopeIntercept = { Slope: -0.13, Intercept: 51.9 }; // From 0% to 30%
        const midEquipLoadSlopeIntercept = {
            Slope: -0.3575,
            Intercept: 58.725,
        }; // From 30% to 70%
        const highEquipLoadSlopeIntercept = { Slope: -0.258, Intercept: 51.76 }; // From 70% to 120%
        let regen = 20.8;

        // Stamina regen decreases (mostly) linearly with equip load percentage.
        // At 0% equip load, the regen is at its maximum.
        // Regen decreases linearly from 51.9 at 0% to 48.0 at 30%
        // Regen decreases linearly from 48.0 at 30% to 33.7 at 70%
        // Regen decreases linearly from 33.7 at 70% to 20.8 at 120%
        if (equipLoadPercent <= 30) {
            regen = reinforcedValue(
                lowEquipLoadSlopeIntercept,
                equipLoadPercent,
            );
        } else if (equipLoadPercent <= 70) {
            regen = reinforcedValue(
                midEquipLoadSlopeIntercept,
                equipLoadPercent,
            );
        } else if (equipLoadPercent <= 120) {
            regen = reinforcedValue(
                highEquipLoadSlopeIntercept,
                equipLoadPercent,
            );
        }

        return regen;
    }, [equipLoadPercent]);

    return (
        <div className="flex flex-col w-full h-full items-left justify-baseline align-center">
            {/* Stats */}
            <div className="list flex flex-col w-full items-left justify-baseline align-center">
                {/* HP */}
                <StatDisplay statDisplayKey="MaximumHP" isOddRow />

                {/* Stamina */}
                {/* <StatDisplay statDisplayKey="MaximumStamina" /> */}
                <div
                    className="flex gap-1 w-full justify-between"
                    style={{
                        backgroundColor: "var(--secondary)",
                        fontWeight: AttributeToStatMap[focusedAttribute!]?.[
                            "MaximumStamina"
                        ]
                            ? "bold"
                            : "normal",
                    }}
                    id={"MaximumStamina"}
                >
                    <label
                        className="flex items-center justify-start h-full min-w-40"
                        htmlFor={"MaximumStamina"}
                    >
                        {StatMapKeyToStatNameMap.get("MaximumStamina")}:
                    </label>
                    <p
                        className="flex items-center justify-end w-full h-full"
                        style={{
                            border: "none",
                            color:
                                equipLoadPercent > 70
                                    ? "red"
                                    : equipLoadPercent > 30
                                      ? "yellow"
                                      : "var(--contrast)",
                        }}
                    >
                        Regen: {staminaRegen.toFixed(1)}/s
                    </p>
                    <input
                        className="flex text-right h-full max-w-15"
                        id={"MaximumStamina"}
                        type="text"
                        disabled
                        value={calculateStatDisplayValue(
                            "MaximumStamina",
                            virtualAttributes,
                            equippedArmor,
                            equippedRings,
                            equippedWeapons,
                        )}
                    />
                </div>

                {/* Equip load */}
                <div
                    className="item flex gap-1 w-full justify-between"
                    style={{
                        fontWeight: AttributeToStatMap[focusedAttribute!]?.[
                            "MaximumEquipLoad"
                        ]
                            ? "bold"
                            : "normal",
                    }}
                    id={"MaximumEquipLoad"}
                >
                    <label
                        className="flex items-center justify-start h-full min-w-40"
                        htmlFor={"MaximumEquipLoad"}
                    >
                        {StatMapKeyToStatNameMap.get("MaximumEquipLoad")}:
                    </label>
                    <p
                        className="flex text-right justify-end items-center w-full h-full"
                        style={{
                            border: "none",
                            color:
                                equipLoadPercent > 100
                                    ? "red"
                                    : equipLoadPercent > 70
                                      ? "yellow"
                                      : "var(--contrast)",
                        }}
                    >
                        Current: {equipLoad.toFixed(1)} (
                        {equipLoadPercent.toFixed(1)}%)
                    </p>
                    <input
                        className="flex text-right h-full max-w-15"
                        id="equip-load"
                        type="text"
                        disabled
                        value={maximumEquipLoad.toFixed(1)}
                    />
                </div>

                {/* Poise */}
                <StatDisplay statDisplayKey="Poise" />

                {/* Attunement slots */}
                <StatDisplay statDisplayKey="SpellSlotCount" isOddRow />
            </div>

            <hr />

            {/* Armor */}
            <div className="flex flex-col w-full items-left justify-baseline align-center gap-1">
                {/* Helmets */}
                <ArmorDisplay label="Helmet" />

                {/* Chestpieces */}
                <ArmorDisplay label="Chestpiece" isOddRow />

                {/* Gauntlets */}
                <ArmorDisplay label="Gauntlets" />

                {/* Leggings */}
                <ArmorDisplay label="Leggings" isOddRow />
            </div>

            <hr />

            {/* Weapons */}
            <div className="grid grid-cols-2 gap-1 w-full justify-between">
                {/* Left hand */}
                <div className="text-left col-span-1 flex flex-col w-full justify-between gap-1">
                    <p className="flex w-full">Left Hand</p>
                    <WeaponDisplay slot="leftPrimary" />
                    <WeaponDisplay slot="leftSecondary" />
                    <WeaponDisplay slot="leftTertiary" />
                </div>

                {/* Right hand */}
                <div className="text-right col-span-1 flex items-end flex-col w-full gap-1">
                    <p className="w-full">Right Hand</p>
                    <WeaponDisplay slot="rightPrimary" />
                    <WeaponDisplay slot="rightSecondary" />
                    <WeaponDisplay slot="rightTertiary" />
                </div>

                {/* TODO: make this affect stat calculation */}
                <input
                    id="two-handing"
                    type="checkbox"
                    checked={twoHanding}
                    onChange={() => twoHandingDispatch({ value: !twoHanding })}
                />
                <label htmlFor="two-handing">Two-Handed</label>
            </div>

            <hr />

            {/* Rings */}
            {/* TODO: prevent incompatible rings from being equipped at the same time */}
            <div className="grid grid-cols-2 gap-1 w-full">
                <p className="col-span-2 flex items-center justify-center h-full">
                    Rings
                </p>
                <RingDisplay slot={0} />
                <RingDisplay slot={1} isRightDisplay />
                <RingDisplay slot={2} />
                <RingDisplay slot={3} isRightDisplay />
            </div>
        </div>
    );
}
