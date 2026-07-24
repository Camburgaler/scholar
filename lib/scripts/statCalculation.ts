import {
    AttributeToStatMap,
    BaseStats,
    StatCalculationDetails,
} from "@/lib/gameData";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { StatMapKey } from "@/lib/types/statMap";

// This defines the way that the attack stat attribute score breakpoints change
const ATTACK_STAT_ATTRIBUTE_SCORE_CURVE: number[] = [
    // Attribute score of 0 is 0
    0,
    // 1-9 increase in a repeating pattern of 8, 4, 4
    8, 12, 16, 24, 28, 32, 40, 44, 48,
    // 10-29 increase by 4
    52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116,
    120, 124, 128,
    // 30 increases by 8
    136,
    // 31-36 increase by 4
    140, 144, 148, 152, 156, 160,
    // 37-43 increase by 8, 4, 4, 4, 8, 8, 4
    168, 172, 176, 180, 188, 196, 200,
    // 44-50 increase in a repeating pattern of 8, 4, 4
    208, 212, 216, 224, 228, 232, 240,
    // 51-58 increase in a repeating pattern of 8, 4, 4, 4
    248, 252, 256, 260, 268, 272, 276, 280,
    // 59-68 increase by 4
    284, 288, 292, 296, 300, 304, 308, 312, 316, 320,
    // 69-75 increase in a repeating pattern of 8, 4, 4
    328, 332, 336, 344, 348, 352, 360,
    // 76 increases by 8
    368,
    // 77-83 increase by 4
    372, 376, 380, 384, 388, 392, 396,
];

// This defines the way that the attack stat value changes at each breakpoint
const ATTACK_STAT_VALUE_CURVE: number[] = [
    // Score of 0 is 0
    0,
    // 1-7 increase by 1
    1, 2, 3, 4, 5, 6, 7,
    // 8-17 alternate between 4 and 5
    11, 16, 20, 25, 29, 34, 38, 43, 47, 52,
    // 18-27 increase by 3
    55, 58, 61, 64, 67, 70, 73, 76, 79, 82,
    // 28-32 increase by 1, 2, 1, 3, 2
    83, 85, 86, 89, 91,
    // 33-37 alternate between 1 and 2
    92, 94, 95, 97, 98,
    // 38-41 increase by 1
    99, 100, 101, 102,
    // 42 increases by 2
    104,
    // 43-59 increase by 1
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121,
    // 60-69 alternate between 2 and 1
    123, 124, 126, 127, 129, 130, 132, 133, 135, 136,
    // 70-83 increase by 1
    137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
];

const PHYSICAL_DEFENSE_CURVE: { breakpoint: number; value: number }[] = [
    { breakpoint: 0, value: 0 },
    // 20	67
    { breakpoint: 20, value: 17 },
    // 24	70
    { breakpoint: 24, value: 20 },
    // 28	72
    { breakpoint: 28, value: 22 },
    // 32	75
    { breakpoint: 32, value: 25 },
    // 36	77
    { breakpoint: 36, value: 27 },
    // 40	80
    { breakpoint: 40, value: 30 },
    // 44	81
    { breakpoint: 44, value: 31 },
    // 48	82
    { breakpoint: 48, value: 32 },
    // 52	83
    { breakpoint: 52, value: 33 },
    // 56	84
    { breakpoint: 56, value: 34 },
    // 60	85
    { breakpoint: 60, value: 35 },
    // 64	86
    { breakpoint: 64, value: 36 },
    // 68	87
    { breakpoint: 68, value: 37 },
    // 72	89
    { breakpoint: 72, value: 39 },
    // 76	90
    { breakpoint: 76, value: 40 },
    // 80	91
    { breakpoint: 80, value: 41 },
    // 84	93
    { breakpoint: 84, value: 43 },
    // 88	95
    { breakpoint: 88, value: 45 },
    // 92	97
    { breakpoint: 92, value: 47 },
    // 96	99
    { breakpoint: 96, value: 49 },
    // 100	102
    { breakpoint: 100, value: 52 },
    // 104	104
    { breakpoint: 104, value: 54 },
    // 108	106
    { breakpoint: 108, value: 56 },
    // 112	108
    { breakpoint: 112, value: 58 },
    // 116	110
    { breakpoint: 116, value: 60 },
    // 120	113
    { breakpoint: 120, value: 63 },
    // 124	115
    { breakpoint: 124, value: 65 },
    // 128	118
    { breakpoint: 128, value: 68 },
    // 132	121
    { breakpoint: 132, value: 71 },
    // 136	124
    { breakpoint: 136, value: 74 },
    // 140	127
    { breakpoint: 140, value: 77 },
    // 144	130
    { breakpoint: 144, value: 80 },
    // 148	133
    { breakpoint: 148, value: 83 },
    // 152	136
    { breakpoint: 152, value: 86 },
    // 156	139
    { breakpoint: 156, value: 89 },
    // 160	142
    { breakpoint: 160, value: 92 },
    // 164	143
    { breakpoint: 164, value: 93 },
    // 168	145
    { breakpoint: 168, value: 95 },
    // 172	147
    { breakpoint: 172, value: 97 },
    // 176	149
    { breakpoint: 176, value: 99 },
    // 180	151
    { breakpoint: 180, value: 101 },
    // 184	152
    { breakpoint: 184, value: 102 },
    // 188	154
    { breakpoint: 188, value: 104 },
    // 192	156
    { breakpoint: 192, value: 106 },
    // 196	158
    { breakpoint: 196, value: 108 },
    // 200	160
    { breakpoint: 200, value: 110 },
    // 212	161
    { breakpoint: 212, value: 111 },
    // 224	162
    { breakpoint: 224, value: 112 },
    // 232	163
    { breakpoint: 232, value: 113 },
    // 244	164
    { breakpoint: 244, value: 114 },
    // 248	165
    { breakpoint: 248, value: 115 },
    // 256	166
    { breakpoint: 256, value: 116 },
    // 260	167
    { breakpoint: 260, value: 117 },
    // 264	168
    { breakpoint: 264, value: 118 },
    // 268	169
    { breakpoint: 268, value: 119 },
    // 272	170
    { breakpoint: 272, value: 120 },
    // 276	171
    { breakpoint: 276, value: 121 },
    // 280	172
    { breakpoint: 280, value: 122 },
    // 284	173
    { breakpoint: 284, value: 123 },
    // 292	175
    { breakpoint: 292, value: 125 },
    // 296	176
    { breakpoint: 296, value: 126 },
    // 300	178
    { breakpoint: 300, value: 128 },
    // 304	179
    { breakpoint: 304, value: 129 },
    // 308	181
    { breakpoint: 308, value: 131 },
    // 312	182
    { breakpoint: 312, value: 132 },
    // 316	184
    { breakpoint: 316, value: 134 },
];

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

// calculateDarkAttackPower will calculate the Dark Attack Power stat
//
// @param {number} intelligence - The Intelligence attribute value
//
// @param {number} faith - The Faith attribute value
//
// @return {number} The amount to add to the base value for Dark Attack Power
function calculateDarkAttackPower(intelligence: number, faith: number): number {
    // Scales with the lowest of Intelligence and Faith according to the stat curve below

    const statCurve: number[] = [
        // Attribute score of 0 is 0
        0,
        // 1-2 increase by 4
        4, 8,
        // 3 increases by 2
        10,
        // 4 increases by 3
        13,
        // 5-7 increase by 2
        15, 17, 19,
        // 8 increases by 3
        22,
        // 9-10 increase by 2
        24, 26,
        // 11-30 alternate between between 4 and 5
        30, 35, 39, 44, 48, 53, 57, 62, 66, 71, 75, 80, 84, 89, 93, 98, 102,
        107, 111, 116,
        // 31-40 increase in a repeating pattern of 0, 1, 1, 1, 1
        116, 117, 118, 119, 120, 120, 121, 122, 123, 124,
        // 41-50 increase in a repeating pattern of 0, 1, 1, 1
        124, 125, 126, 127, 127, 128, 129, 130, 130, 131,
        // 51-60 increase in a repeating pattern of 0, 1, 1, 1, 1
        131, 132, 133, 134, 135, 135, 136, 137, 138, 139,
        // 61-70 increase in a pattern of 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
        139, 139, 140, 140, 140, 141, 141, 142, 142, 142,
        // 71-80 increase in a pattern of 0, 0, 1, 0, 1, 0, 1, 0, 1, 0
        142, 142, 143, 143, 144, 144, 144, 145, 145, 146,
        // 81-90 increase in a repeating pattern of 0, 0, 1, 0, 1
        146, 146, 147, 147, 148, 148, 148, 149, 149, 150,
        // 91-99 increase by a pattern of 0, 0, 1, 0, 1, 0, 1, 0, 1
        150, 150, 151, 151, 152, 152, 153, 153, 154,
    ];

    const attributeScore = Math.min(intelligence, faith);

    return statCurve[attributeScore];
}

// calculatePoisonAttackPower will calculate the Poison Attack Power stat
//
// @param {number} dexterity - The Dexterity attribute value
//
// @param {number} adaptability - The Adaptability attribute value
//
// @return {number} The amount to add to the base value for Poison Attack Power
function calculatePoisonAttackPower(
    dexterity: number,
    adaptability: number,
): number {
    // Every point of Dexterity gives 3 points, every point of Adaptability gives 1 point, the points are summed and checked against the common stat curve

    const attributeScore = dexterity * 3 + adaptability;
    const curveIndex =
        ATTACK_STAT_ATTRIBUTE_SCORE_CURVE.findLastIndex(
            (index) => index <= attributeScore,
        ) ?? 0;

    return ATTACK_STAT_VALUE_CURVE[curveIndex];
}

// calculateBleedAttackPower will calculate the Bleed Attack Power stat
//
// @param {number} dexterity - The Dexterity attribute value
//
// @param {number} faith - The Faith attribute value
//
// @return {number} The amount to add to the base value for Bleed Attack Power
function calculateBleedAttackPower(dexterity: number, faith: number): number {
    // Every point of Dexterity gives 3 points, every point of Faith gives 1 point, the points are summed and checked against the common stat curve

    const attributeScore = dexterity * 3 + faith;
    const curveIndex =
        ATTACK_STAT_ATTRIBUTE_SCORE_CURVE.findLastIndex(
            (index) => index <= attributeScore,
        ) ?? 0;

    return ATTACK_STAT_VALUE_CURVE[curveIndex];
}

// TODO: calculate physical defense
function calculatePhysicalDefense(
    endurance: number,
    vitality: number,
    strength: number,
    dexterity: number,
): number {
    // Endurance, Vitality, Strength and Dexterity equally influence Physical DEF.

    const attributeScore: number = endurance + vitality + strength + dexterity;

    console.log(`attributeScore: ${attributeScore}`);

    return (
        PHYSICAL_DEFENSE_CURVE.findLast(
            (mapping) => mapping.breakpoint <= attributeScore,
        )?.value ?? 0
    );
}

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
        case "AttackPowerDark":
            return (
                statValue +
                calculateDarkAttackPower(
                    attributes.Intelligence,
                    attributes.Faith,
                )
            );
        case "AttackPowerPoison":
            return (
                statValue +
                calculatePoisonAttackPower(
                    attributes.Dexterity,
                    attributes.Adaptability,
                )
            );
        case "AttackPowerBleed":
            return (
                statValue +
                calculateBleedAttackPower(
                    attributes.Dexterity,
                    attributes.Faith,
                )
            );
        case "Defense":
            return (
                statValue +
                calculatePhysicalDefense(
                    attributes.Endurance,
                    attributes.Vitality,
                    attributes.Strength,
                    attributes.Dexterity,
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
