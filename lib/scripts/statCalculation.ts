import {
    AttributeToStatMap,
    BaseStats,
    StatCalculationDetails,
} from "@/lib/gameData";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { StatMapKey } from "@/lib/types/statMap";

// calculatePoise will calculate the Poise stat
//
// @param {number} adaptability - The Adaptability attribute value
//
// @param {number} endurance - The Endurance attribute value
//
// @return {number} The amount to add to the base value for Poise
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

// calculateCastingSpeed will calculate the Spell Casting Speed stat
//
// @param {number} attunement - The Attunement attribute value
//
// @param {number} faith - The Faith attribute value
//
// @param {number} intelligence - The Intelligence attribute value
//
// @return {number} The amount to add to the base value for Spell Casting Speed
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

// calculateAgility will calculate the Agility stat
//
// @param {number} adaptability - The Adaptability attribute value
//
// @param {number} attunement - The Attunement attribute value
//
// @return {number} The amount to add to the base value for Agility
function calculateAgility(adaptability: number, attunement: number): number {
    // Agility is hard capped at 120

    // Agility is calculated as follows:
    // When Attunement plus 3 * Adaptability is less than or equal to 120, Agility is equal to 80 + ((Attunement + (3 * Adaptability)) / 4)
    // When Attunement plus 3 * Adaptability is greater than 120, Agility is equal to 110 + ((Attunement + (3 * Adaptability) - 120) / 28)

    // Final Agility values are rounded down
    // If Agility is calculated to be less than 85, it is set to a value of 85 regardless
    // If Attunement and Adaptability are both at 99, Agility is set to a value of 120

    if (attunement === 99 && adaptability === 99) {
        return 120 - BaseStats.Agility;
    }

    const baseValue = BaseStats.Agility;
    let agility = 0;

    if (attunement + 3 * adaptability <= 120) {
        agility = 80 + Math.floor((attunement + 3 * adaptability) / 4);
    } else {
        agility = 110 + Math.floor((attunement + 3 * adaptability - 120) / 28);
    }

    return Math.max(0, agility - baseValue);
}

// calculateFireAttackPower will calculate the Fire Attack Power stat
//
// @param {number} intelligence - The Intelligence attribute value
//
// @param {number} faith - The Faith attribute value
//
// @return {number} The amount to add to the base value for Fire Attack Power
function calculateFireAttackPower(intelligence: number, faith: number): number {
    // Increases once (according to the stat curve below) with any 2 points in Intelligence and Faith

    const statCurve: number[] = [
        // Score of 0 is 0
        0,
        // 1 increases by 0
        0,
        // 2 increases by 4
        4,
        // 3 increases by 2
        6,
        // 4 increases by 3
        9,
        // 5-7 increase by 2
        11, 13, 15,
        // 8 increases by 3
        18,
        // 9-10 increase by 2
        20, 22,
        // 11-20 alternate between between 4 and 5
        26, 31, 35, 40, 44, 49, 53, 58, 62, 67,
        // 21-30 increase by 3
        70, 73, 76, 79, 82, 85, 88, 91, 94, 97,
        // 31-40 increase in a repeating pattern of 0, 1, 1, 1, 1
        97, 98, 99, 100, 101, 101, 102, 103, 104, 105,
        // 41-50 increase in a repeating pattern of 0, 1, 1, 1
        105, 106, 107, 108, 108, 109, 110, 111, 111, 112,
        // 51-60 increase in a repeating pattern of 0, 1, 1, 1, 1
        112, 113, 114, 115, 116, 116, 117, 118, 119, 120,
        // 61-70 increase in a repeating pattern of 0, 1, 1, 1
        120, 121, 122, 123, 123, 124, 125, 126, 126, 127,
        // 71-80 increase in a repeating pattern of 0, 1, 1, 1, 1
        127, 128, 129, 130, 131, 131, 132, 133, 134, 135,
        // 81-90 increase in a repeating pattern of 0, 1, 1, 1
        135, 136, 137, 138, 138, 139, 140, 141, 141, 142,
        // 91 increases by 0
        142,
        // 92-99 increase by 1
        143, 144, 145, 146, 147, 148, 149, 150,
    ];
    const attributeScore = Math.floor((intelligence + faith) / 2);

    return statCurve[attributeScore];
}

// TODO: calculate dark attack power

// TODO: calculate poison attack power

// TODO: calculate bleed attack power

// TODO: calculate physical defense

// TODO: calculate strike defense

// TODO: calculate slash defense

// TODO: calculate thrust defense

// TODO: calculate fire absorption

// TODO: calculate dark absorption

// TODO: calculate bleed absorption

// TODO: calculate poison absorption

// TODO: calculate petrify absorption

// TODO: calculate curse absorption

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
        case "Agility":
            return (
                statValue +
                calculateAgility(attributes.Adaptability, attributes.Attunement)
            );
        case "AttackPowerFire":
            return (
                statValue +
                calculateFireAttackPower(
                    attributes.Intelligence,
                    attributes.Faith,
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
