import {
    AttributeToStatMap,
    BaseStats,
    StatCalculationDetails,
} from "@/lib/gameData";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { StatMapKey } from "@/lib/types/statMap";

function calculatePoise(adaptability: number, endurance: number): number {
    let effectiveAttributeValue = adaptability;
    let poise = 0;

    // The effective attribute for poise is the lesser between adaptability and endurance
    if (endurance < adaptability) {
        effectiveAttributeValue = endurance;
    }

    //  Poise is increased by 0.3 per level until level 30, then 0.2 until level 50 and 0.1 per level thereafter
    if (effectiveAttributeValue >= 0) {
        poise += Math.min(30, effectiveAttributeValue) * 0.3;
    }
    if (effectiveAttributeValue > 30) {
        poise += Math.min(20, effectiveAttributeValue - 30) * 0.2;
    }
    if (effectiveAttributeValue > 50) {
        poise += (effectiveAttributeValue - 50) * 0.1;
    }

    // Round to two decimal places
    poise = Math.round(poise * 100) / 100;
    return poise;
}

function calculateCastingSpeed(
    attunement: number,
    faith: number,
    intelligence: number,
): number {
    // Casting Speed increases by 2 until it is 115.
    // Casting speed will increase for every 2 points in Attunement, or 4 points in Faith or Intelligence.
    // Between 115 and 126 Casting Speed rises by 1 for same amount as above.
    // From 126 it needs two times more than above to rise by 1.

    let castingSpeed = 0;
    const attributeContribution = attunement / 2 + faith / 4 + intelligence / 4;

    for (let i = 0; i < attributeContribution; i++) {
        if (castingSpeed < 115) {
            castingSpeed += 2;
        } else if (castingSpeed < 126) {
            castingSpeed += 1;
        } else {
            castingSpeed += 0.5;
        }
    }

    // Remove decimal
    castingSpeed = Math.floor(castingSpeed);
    return castingSpeed;
}

export function calculateStat(
    statId: StatMapKey,
    attributes: AttributeMap<number>,
): number {
    let statValue = BaseStats[statId];

    switch (statId) {
        case "Poise":
            return (
                statValue +
                calculatePoise(attributes.Adaptability, attributes.Endurance)
            );
        case "SpellCastingSpeed":
            return (
                statValue +
                calculateCastingSpeed(
                    attributes.Attunement,
                    attributes.Faith,
                    attributes.Intelligence,
                )
            );
    }

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
