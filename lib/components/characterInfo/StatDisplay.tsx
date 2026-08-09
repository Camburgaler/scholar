import { AttributeToStatMap } from "@/lib/gameData";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmor";
import { useFocusedAttribute } from "@/lib/reducers/focusedAttribute";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import { calculateStatDisplayValue } from "@/lib/scripts/statCalculation";
import { DefenseMapKey } from "@/lib/types/defenseMap";
import { ResistanceMapKey } from "@/lib/types/resistanceMap";
import {
    StatMapKey,
    StatMapKeys,
    StatMapKeyToStatNameMap,
} from "@/lib/types/statMap";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

export type StatDisplayKey =
    | StatMapKey
    | "DefenseStrike"
    | "DefenseSlash"
    | "DefenseThrust";

export function mapDisplayKeyToStatMapKey(
    displayKey: StatDisplayKey,
): StatMapKey {
    if (displayKey.includes("Defense")) {
        return "Defense";
    }
    return displayKey as StatMapKey;
}

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

export function mapDisplayKeyToArmorResistanceField(
    displayKey: StatDisplayKey,
): ResistanceMapKey {
    switch (displayKey) {
        case "ResistancePoison":
            return "Poison";
        case "ResistanceBleed":
            return "Bleed";
        case "ResistancePetrify":
            return "Petrify";
        case "ResistanceCurse":
            return "Curse";
        default:
            throw new Error(
                `StatDisplayKey ${displayKey} does not have a corresponding armor resistance field.`,
            );
    }
}

function statDisplayKeyIsStatMapKey(statDisplayKey: StatDisplayKey): boolean {
    return StatMapKeys.includes(statDisplayKey as StatMapKey);
}

function mapStatDisplayKeyToLabel(statDisplayKey: StatDisplayKey): string {
    if (statDisplayKeyIsStatMapKey(statDisplayKey)) {
        return StatMapKeyToStatNameMap.get(statDisplayKey as StatMapKey)!;
    }

    switch (statDisplayKey) {
        case "DefenseStrike":
            return "Defense (Strike)";
        case "DefenseSlash":
            return "Defense (Slash)";
        case "DefenseThrust":
            return "Defense (Thrust)";
    }

    return statDisplayKey;
}

/**
 * StatDisplay is a component that displays a stat and its value.
 *
 * @prop {string} statMapKey - The key of the stat map that contains the stat value.
 * @prop {string} displayValue - The value of the stat.
 * @prop {boolean} isOddRow - Whether the row is odd or not. Optional.
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
        setDisplayValue(
            calculateStatDisplayValue(
                statDisplayKey,
                virtualAttributes,
                equippedArmorSet,
            ),
        );
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
