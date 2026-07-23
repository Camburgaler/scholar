import { AttributeToStatMap } from "@/lib/gameData";
import { FocusedAttributeContext } from "@/lib/reducers/focusedAttribute";
import { StatMapKey, StatMapKeyToStatNameMap } from "@/lib/types/statMap";
import { useContext, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

function getEquipLoadPercentFromRatio(ratio: string) {
    const [numerator, denominator] = ratio.split("/").map(Number);
    return (numerator / denominator) * 100;
}

// StatDisplay is a component that displays a stat and its value.
//
// @prop {string} statMapKey - The key of the stat map that contains the stat value.
//
// @prop {string} displayValue - The value of the stat.
//
// @prop {boolean} isOddRow - Whether the row is odd or not. Optional.
export default function StatDisplay(props: {
    statMapKey: StatMapKey;
    displayValue: string;
    isOddRow?: boolean;
}): JSX.Element {
    // Props
    const { statMapKey, displayValue, isOddRow } = props;

    // Context
    const focusedAttribute = useContext(FocusedAttributeContext);
    const [isFocused, setIsFocused] = useState(false);

    // determines if the focused attribute affects this stat
    useEffect(() => {
        setIsFocused(AttributeToStatMap[focusedAttribute!]?.[statMapKey]);
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
                        className="flex text-right max-w-15"
                        id="equip-load"
                        type="text"
                        disabled
                        value={displayValue}
                    />
                    <p className=" flex items-center justify-center text-right">
                        Using {getEquipLoadPercentFromRatio(displayValue)}%
                    </p>
                </div>
            ) : (
                <input
                    className="flex text-right h-full max-w-15"
                    id={statMapKey}
                    type="text"
                    disabled
                    value={displayValue}
                />
            )}
        </div>
    );
}
