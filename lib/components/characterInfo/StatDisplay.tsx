import { AttributeToStatMap } from "@/lib/gameData";
import { useEquippedArmor } from "@/lib/reducers/equippedArmor";
import { useFocusedAttribute } from "@/lib/reducers/focusedAttribute";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import { calculateStat } from "@/lib/scripts/statCalculation";
import { StatMapKey, StatMapKeyToStatNameMap } from "@/lib/types/statMap";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

function getEquipLoadPercentFromRatio(ratio: string) {
    const [numerator, denominator] = ratio.split("/").map(Number);
    return (numerator / denominator) * 100;
}

/**
 * StatDisplay is a component that displays a stat and its value.
 *
 * @prop {string} statMapKey - The key of the stat map that contains the stat value.
 * @prop {string} displayValue - The value of the stat.
 * @prop {boolean} isOddRow - Whether the row is odd or not. Optional.
 **/
export default function StatDisplay(props: {
    statMapKey: StatMapKey;
    isOddRow?: boolean;
}): JSX.Element {
    // Props
    const { statMapKey, isOddRow } = props;

    // Context
    const focusedAttribute = useFocusedAttribute();
    const virtualAttributes = useVirtualAttributes();
    const equippedArmor = useEquippedArmor();

    // State
    const [isFocused, setIsFocused] = useState(false);

    // determines if the focused attribute affects this stat
    useEffect(() => {
        setIsFocused(AttributeToStatMap[focusedAttribute!]?.[statMapKey]!);
    }, [focusedAttribute]);

    return (
        <div
            className="flex gap-1 w-full justify-between"
            style={{
                backgroundColor: isOddRow
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: isFocused ? "var(--accent)" : "var(--contrast)",
                fontWeight: isFocused ? "bold" : "normal",
            }}
            id={statMapKey}
        >
            <label
                className="flex items-center justify-center h-full"
                htmlFor={statMapKey}
            >
                {StatMapKeyToStatNameMap.get(statMapKey)}:
            </label>
            {statMapKey == "MaximumEquipLoad" ? (
                <div className="flex flex-col items-end justify-end">
                    <input
                        className="flex text-right max-w-30 h-full"
                        style={{ border: "none" }}
                        id="equip-load"
                        type="text"
                        disabled
                        value={`${equippedArmor.weight.toFixed(2)}/${calculateStat(statMapKey, virtualAttributes).toFixed(2)}`}
                    />
                    <input
                        className="flex text-right max"
                        disabled
                        style={{
                            border: "none",
                            color:
                                getEquipLoadPercentFromRatio(
                                    `${equippedArmor.weight}/${calculateStat(statMapKey, virtualAttributes)}`,
                                ) > 100
                                    ? "red"
                                    : getEquipLoadPercentFromRatio(
                                            `${equippedArmor.weight}/${calculateStat(statMapKey, virtualAttributes)}`,
                                        ) > 70
                                      ? "yellow"
                                      : "var(--contrast)",
                        }}
                        value={`${getEquipLoadPercentFromRatio(
                            `${equippedArmor.weight}/${calculateStat(statMapKey, virtualAttributes)}`,
                        ).toFixed(2)}%`}
                    />
                </div>
            ) : (
                <input
                    className="flex text-right h-full max-w-15"
                    id={statMapKey}
                    type="text"
                    disabled
                    value={calculateStat(statMapKey, virtualAttributes)}
                />
            )}
        </div>
    );
}
