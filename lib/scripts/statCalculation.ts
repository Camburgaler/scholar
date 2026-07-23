import {
    AttributeToStatMap,
    BaseStats,
    StatCalculationDetails,
} from "@/lib/gameData";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { StatMapKey } from "@/lib/types/statMap";

export function calculateStat(
    statId: StatMapKey,
    attributes: AttributeMap<number>,
): number {
    let statValue = BaseStats[statId];

    for (const [key, value] of Object.entries(AttributeToStatMap)) {
        const isEffective = value[statId];

        if (!isEffective) {
            continue;
        }

        const attributeId = key as AttributeMapKey;
        const attributeDetails = StatCalculationDetails[attributeId];
        const statCurve = attributeDetails[statId];

        if (!statCurve) {
            console.error(
                `Stat ${statId} does not have a calculation curve for attribute ${attributeId}`,
            );
            continue;
        }

        const scalingValue = statCurve[attributes[attributeId]];

        statValue += scalingValue;
    }

    return statValue;
}
