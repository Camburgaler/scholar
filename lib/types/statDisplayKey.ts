import { DefenseMapKey } from "@/lib/types/defenseMap";
import { StatMapKey } from "@/lib/types/statMap";

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
