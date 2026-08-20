import { ArmorDisplay } from "@/lib/components/characterInfo/middleColumn/ArmorDisplay";
import RingDisplay from "@/lib/components/characterInfo/middleColumn/RingDisplay";
import WeaponDisplay from "@/lib/components/characterInfo/middleColumn/WeaponDisplay";
import StatDisplay from "@/lib/components/characterInfo/StatDisplay";
import { AttributeToStatMap } from "@/lib/gameData";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equippedWeapons";
import { useFocusedAttribute } from "@/lib/reducers/focusedAttribute";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import { ringsWeight } from "@/lib/scripts/equippedRings";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import { StatMapKeyToStatNameMap } from "@/lib/types/statMap";
import { JSX } from "react/jsx-runtime";

/**
 * Converts a ratio to a percentage
 * @param ratio The ratio to convert
 * @returns The percentage
 */
function getEquipLoadPercentFromRatio(ratio: string): number {
    const [numerator, denominator] = ratio.split("/").map(Number);
    return (numerator / denominator) * 100;
}

/**
 * @description The middle column of the character info page. Displays certain stats and the character's equipment.
 */
export default function MiddleColumn(): JSX.Element {
    // Context
    const virtualAttributes = useVirtualAttributes();
    const equippedArmor = useEquippedArmorSet();
    const focusedAttribute = useFocusedAttribute();
    const equippedRings = useEquippedRings();
    const equippedWeapons = useEquippedWeapons();

    return (
        <div className="flex flex-col w-full h-full items-left justify-baseline align-center">
            {/* Stats */}
            <div className="flex flex-col w-full items-left justify-baseline align-center">
                {/* HP */}
                <StatDisplay statDisplayKey="MaximumHP" isOddRow />

                {/* Stamina */}
                <StatDisplay statDisplayKey="MaximumStamina" />

                {/* Equip load */}
                <div
                    className="flex gap-1 w-full justify-between"
                    style={{
                        backgroundColor: "var(--primary)",
                        fontWeight: AttributeToStatMap[focusedAttribute!]?.[
                            "MaximumEquipLoad"
                        ]!
                            ? "bold"
                            : "normal",
                    }}
                    id={"MaximumEquipLoad"}
                >
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor={"MaximumEquipLoad"}
                    >
                        {StatMapKeyToStatNameMap.get("MaximumEquipLoad")}:
                    </label>
                    <div className="flex flex-col items-end justify-end">
                        <input
                            className="flex text-right max-w-30 h-full"
                            style={{ border: "none" }}
                            id="equip-load"
                            type="text"
                            disabled
                            value={`${(equippedArmor.weight() + ringsWeight(equippedRings)).toFixed(1)}/${calculateStatDisplayValue("MaximumEquipLoad", virtualAttributes, equippedArmor, equippedRings, equippedWeapons).toFixed(1)}`}
                        />
                        <input
                            className="flex text-right max"
                            disabled
                            style={{
                                border: "none",
                                color:
                                    getEquipLoadPercentFromRatio(
                                        `${equippedArmor.weight() + ringsWeight(equippedRings)}/${calculateStatDisplayValue("MaximumEquipLoad", virtualAttributes, equippedArmor, equippedRings, equippedWeapons)}`,
                                    ) > 100
                                        ? "red"
                                        : getEquipLoadPercentFromRatio(
                                                `${equippedArmor.weight() + ringsWeight(equippedRings)}/${calculateStatDisplayValue("MaximumEquipLoad", virtualAttributes, equippedArmor, equippedRings, equippedWeapons)}`,
                                            ) > 70
                                          ? "yellow"
                                          : "var(--contrast)",
                            }}
                            value={`${getEquipLoadPercentFromRatio(
                                `${equippedArmor.weight() + ringsWeight(equippedRings)}/${calculateStatDisplayValue("MaximumEquipLoad", virtualAttributes, equippedArmor, equippedRings, equippedWeapons)}`,
                            ).toFixed(1)}%`}
                        />
                    </div>
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
            {/* TODO: update with real options */}
            <div className="grid grid-cols-2 gap-1 w-full justify-between">
                {/* Left hand */}
                <div className="text-left col-span-1 flex flex-col w-full justify-between gap-1">
                    <p className="flex w-full">Left Hand</p>
                    <WeaponDisplay slot="LeftHandWeaponPrimary" />
                    <WeaponDisplay slot="LeftHandWeaponSecondary" />
                    <WeaponDisplay slot="LeftHandWeaponTertiary" />
                </div>

                {/* Right hand */}
                <div className="text-right col-span-1 flex items-end flex-col w-full gap-1">
                    <p className="w-full">Right Hand</p>
                    <WeaponDisplay slot="RightHandWeaponPrimary" />
                    <WeaponDisplay slot="RightHandWeaponSecondary" />
                    <WeaponDisplay slot="RightHandWeaponTertiary" />
                </div>

                {/* TODO: make this affect stat calculation */}
                <input id="two-handing" type="checkbox" />
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
