import { AttributeToStatMap } from "@/lib/gameData";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useFocusedAttribute } from "@/lib/reducers/focusedAttribute";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import { DefenseMapKey } from "@/lib/types/defenseMap";
import {
    StatMapKey,
    StatMapKeys,
    StatMapKeyToStatNameMap,
} from "@/lib/types/statMap";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

// StatDisplayKey is a type that represents a key for a stat display.
export type StatDisplayKey =
    | StatMapKey
    | "DefenseStrike"
    | "DefenseSlash"
    | "DefenseThrust";

/**
 * Maps a display key to a stat map key.
 * @param displayKey {@link StatDisplayKey}
 */
export function mapDisplayKeyToStatMapKey(
    displayKey: StatDisplayKey,
): StatMapKey {
    if (displayKey.includes("Defense")) {
        return "Defense";
    }
    return displayKey as StatMapKey;
}

/**
 * Maps a display key to an armor defense field.
 * @param displayKey {@link StatDisplayKey}
 */
export function mapDisplayKeyToArmorDefenseField(
    displayKey: StatDisplayKey,
): DefenseMapKey {
    switch (displayKey) {
        case "DefenseStrike":
            return "Strike";
        case "DefenseSlash":
            return "Slash";
        case "DefenseThrust":
            return "Thrust";
        case "Defense":
            return "Standard";
        case "AbsorptionMagic":
            return "Magic";
        case "AbsorptionFire":
            return "Fire";
        case "AbsorptionLightning":
            return "Lightning";
        case "AbsorptionDark":
            return "Dark";
        default:
            throw new Error(
                `StatDisplayKey ${displayKey} does not have a corresponding armor defense field.`,
            );
    }
}

/**
 * Checks if a display key is a stat map key.
 * @param statDisplayKey {@link StatDisplayKey}
 */
function statDisplayKeyIsStatMapKey(statDisplayKey: StatDisplayKey): boolean {
    return StatMapKeys.includes(statDisplayKey as StatMapKey);
}

/**
 * Maps a display key to a label.
 * @param statDisplayKey {@link StatDisplayKey}
 */
function mapStatDisplayKeyToLabel(statDisplayKey: StatDisplayKey): string {
    if (statDisplayKeyIsStatMapKey(statDisplayKey)) {
        return StatMapKeyToStatNameMap.get(statDisplayKey as StatMapKey)!;
    }

    switch (statDisplayKey) {
        case "DefenseStrike":
            return "VS Strike";
        case "DefenseSlash":
            return "VS Slash";
        case "DefenseThrust":
            return "VS Thrust";
    }

    return statDisplayKey;
}

/**
 * StatDisplay is a component that displays a stat and its value.
 *
 * @prop statDisplayKey: The key of the stat to display. {@link StatDisplayKey}
 * @prop isOddRow: Whether the row is odd or not. Optional.
 **/
export default function StatDisplay(props: {
    statDisplayKey: StatDisplayKey;
    isOddRow?: boolean;
}): JSX.Element {
    // Props
    const { statDisplayKey, isOddRow } = props;

    // Context
    const focusedAttribute = useFocusedAttribute();
    const virtualAttributes = useVirtualAttributes();
    const equippedArmorSet = useEquippedArmorSet();
    const equippedRings = useEquippedRings();

    // State
    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState(0);

    // Constants
    const statMapKey = mapDisplayKeyToStatMapKey(statDisplayKey);
    const label = mapStatDisplayKeyToLabel(statDisplayKey);

    // determines if the focused attribute affects this stat
    useEffect(() => {
        setIsFocused(AttributeToStatMap[focusedAttribute!]?.[statMapKey]!);
    }, [focusedAttribute]);

    // updates the display value
    useEffect(() => {
        let displayValue = calculateStatDisplayValue(
            statDisplayKey,
            virtualAttributes,
            equippedArmorSet,
            equippedRings,
        );

        if (statDisplayKey !== "Poise") {
            displayValue = Math.floor(displayValue);
        }

        // TODO: Research whether stats can be negative. If so, which ones? How?
        setDisplayValue(displayValue);
    }, [virtualAttributes, equippedArmorSet]);

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
            id={statDisplayKey}
        >
            <label
                className="flex items-center justify-center h-full"
                htmlFor={statDisplayKey}
            >
                {label}:
            </label>
            <input
                className="flex text-right h-full max-w-15"
                id={statDisplayKey}
                type="text"
                disabled
                value={displayValue}
            />
        </div>
    );
}
