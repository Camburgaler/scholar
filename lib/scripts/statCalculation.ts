import {
    AttributeToStatMap,
    BaseStats,
    StatCalculationDetails,
} from "@/lib/gameData";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { StatMapKey } from "@/lib/types/statMap";

type CurveMap = { breakpoint: number; value: number };

const ATTACK_STAT_CURVE: CurveMap[] = [
    // 0	50
    { breakpoint: 0, value: 0 },
    // 8	51
    { breakpoint: 8, value: 1 },
    // 12	52
    { breakpoint: 12, value: 2 },
    // 16	53
    { breakpoint: 16, value: 3 },
    // 24	54
    { breakpoint: 24, value: 4 },
    // 28	55
    { breakpoint: 28, value: 5 },
    // 32	56
    { breakpoint: 32, value: 6 },
    // 40	57
    { breakpoint: 40, value: 7 },
    // 44	61
    { breakpoint: 44, value: 11 },
    // 48	66
    { breakpoint: 48, value: 16 },
    // 52	70
    { breakpoint: 52, value: 20 },
    // 56	75
    { breakpoint: 56, value: 25 },
    // 60	79
    { breakpoint: 60, value: 29 },
    // 64	84
    { breakpoint: 64, value: 34 },
    // 68	88
    { breakpoint: 68, value: 38 },
    // 72	93
    { breakpoint: 72, value: 43 },
    // 76	97
    { breakpoint: 76, value: 47 },
    // 80	102
    { breakpoint: 80, value: 52 },
    // 84	105
    { breakpoint: 84, value: 55 },
    // 88	108
    { breakpoint: 88, value: 58 },
    // 92	111
    { breakpoint: 92, value: 61 },
    // 96	114
    { breakpoint: 96, value: 64 },
    // 100	117
    { breakpoint: 100, value: 67 },
    // 104	120
    { breakpoint: 104, value: 70 },
    // 108	123
    { breakpoint: 108, value: 73 },
    // 112	126
    { breakpoint: 112, value: 76 },
    // 116	129
    { breakpoint: 116, value: 79 },
    // 120	132
    { breakpoint: 120, value: 82 },
    // 124	133
    { breakpoint: 124, value: 83 },
    // 128	135
    { breakpoint: 128, value: 85 },
    // 136	136
    { breakpoint: 136, value: 86 },
    // 140	139
    { breakpoint: 140, value: 89 },
    // 144	141
    { breakpoint: 144, value: 91 },
    // 148	142
    { breakpoint: 148, value: 92 },
    // 152	144
    { breakpoint: 152, value: 94 },
    // 156	145
    { breakpoint: 156, value: 95 },
    // 160	147
    { breakpoint: 160, value: 97 },
    // 168	148
    { breakpoint: 168, value: 98 },
    // 172	149
    { breakpoint: 172, value: 99 },
    // 176	150
    { breakpoint: 176, value: 100 },
    // 180	151
    { breakpoint: 180, value: 101 },
    // 188	152
    { breakpoint: 188, value: 102 },
    // 196	154
    { breakpoint: 196, value: 104 },
    // 200	155
    { breakpoint: 200, value: 105 },
    // 208	156
    { breakpoint: 208, value: 106 },
    // 212	157
    { breakpoint: 212, value: 107 },
    // 216	158
    { breakpoint: 216, value: 108 },
    // 224	159
    { breakpoint: 224, value: 109 },
    // 228	160
    { breakpoint: 228, value: 110 },
    // 232	161
    { breakpoint: 232, value: 111 },
    // 240	162
    { breakpoint: 240, value: 112 },
    // 248	163
    { breakpoint: 248, value: 113 },
    // 252	164
    { breakpoint: 252, value: 114 },
    // 256	165
    { breakpoint: 256, value: 115 },
    // 260	166
    { breakpoint: 260, value: 116 },
    // 268	167
    { breakpoint: 268, value: 117 },
    // 272	168
    { breakpoint: 272, value: 118 },
    // 276	169
    { breakpoint: 276, value: 119 },
    // 280	170
    { breakpoint: 280, value: 120 },
    // 284	171
    { breakpoint: 284, value: 121 },
    // 288	173
    { breakpoint: 288, value: 123 },
    // 292	174
    { breakpoint: 292, value: 124 },
    // 296	176
    { breakpoint: 296, value: 126 },
    // 300	177
    { breakpoint: 300, value: 127 },
    // 304	179
    { breakpoint: 304, value: 129 },
    // 308	180
    { breakpoint: 308, value: 130 },
    // 312	182
    { breakpoint: 312, value: 132 },
    // 316	183
    { breakpoint: 316, value: 133 },
    // 320	185
    { breakpoint: 320, value: 135 },
    // 328	186
    { breakpoint: 328, value: 136 },
    // 332	187
    { breakpoint: 332, value: 137 },
    // 336	188
    { breakpoint: 336, value: 138 },
    // 344	189
    { breakpoint: 344, value: 139 },
    // 348	190
    { breakpoint: 348, value: 140 },
    // 352	191
    { breakpoint: 352, value: 141 },
    // 360	192
    { breakpoint: 360, value: 142 },
    // 368	193
    { breakpoint: 368, value: 143 },
    // 372	194
    { breakpoint: 372, value: 144 },
    // 376	195
    { breakpoint: 376, value: 145 },
    // 380	196
    { breakpoint: 380, value: 146 },
    // 384	197
    { breakpoint: 384, value: 147 },
    // 388	198
    { breakpoint: 388, value: 148 },
    // 392	199
    { breakpoint: 392, value: 149 },
    // 396	200
    { breakpoint: 396, value: 150 },
];

const ABSORPTION_STAT_CURVE: CurveMap[] = [
    { breakpoint: 0, value: 0 },
    // 2	6
    { breakpoint: 1, value: 6 },
    // 4	12
    { breakpoint: 2, value: 12 },
    // 6	18
    { breakpoint: 3, value: 18 },
    // 8	24
    { breakpoint: 4, value: 24 },
    // 10	30
    { breakpoint: 5, value: 30 },
    // 12	36
    { breakpoint: 6, value: 36 },
    // 14	42
    { breakpoint: 7, value: 42 },
    // 16	48
    { breakpoint: 8, value: 48 },
    // 18	54
    { breakpoint: 9, value: 54 },
    // 20	60
    { breakpoint: 10, value: 60 },
    // 22	68
    { breakpoint: 11, value: 68 },
    // 24	76
    { breakpoint: 12, value: 76 },
    // 26	84
    { breakpoint: 13, value: 84 },
    // 28	92
    { breakpoint: 14, value: 92 },
    // 30	100
    { breakpoint: 15, value: 100 },
    // 32	108
    { breakpoint: 16, value: 108 },
    // 34	116
    { breakpoint: 17, value: 116 },
    // 36	124
    { breakpoint: 18, value: 124 },
    // 38	132
    { breakpoint: 19, value: 132 },
    // 40	140
    { breakpoint: 20, value: 140 },
    // 42	141
    { breakpoint: 21, value: 141 },
    // 44	142
    { breakpoint: 22, value: 142 },
    // 46	143
    { breakpoint: 23, value: 143 },
    // 48	144
    { breakpoint: 24, value: 144 },
    // 50	145
    { breakpoint: 25, value: 145 },
    // 52	146
    { breakpoint: 26, value: 146 },
    // 54	147
    { breakpoint: 27, value: 147 },
    // 56	148
    { breakpoint: 28, value: 148 },
    // 58	149
    { breakpoint: 29, value: 149 },
    // 60	150
    { breakpoint: 30, value: 150 },
    // 62	151
    { breakpoint: 31, value: 151 },
    // 64	152
    { breakpoint: 32, value: 152 },
    // 66	153
    { breakpoint: 33, value: 153 },
    // 68	154
    { breakpoint: 34, value: 154 },
    // 70	155
    { breakpoint: 35, value: 155 },
    // 72	156
    { breakpoint: 36, value: 156 },
    // 74	157
    { breakpoint: 37, value: 157 },
    // 76	158
    { breakpoint: 38, value: 158 },
    // 78	159
    { breakpoint: 39, value: 159 },
    // 80	160
    { breakpoint: 40, value: 160 },
    // 82	161
    { breakpoint: 41, value: 161 },
    // 84	162
    { breakpoint: 42, value: 162 },
    // 86	163
    { breakpoint: 43, value: 163 },
    // 88	164
    { breakpoint: 44, value: 164 },
    // 90	165
    { breakpoint: 45, value: 165 },
    // 92	166
    { breakpoint: 46, value: 166 },
    // 94	167
    { breakpoint: 47, value: 167 },
    // 96	168
    { breakpoint: 48, value: 168 },
    // 98	169
    { breakpoint: 49, value: 169 },
    // 100	170
    { breakpoint: 50, value: 170 },
    // 102	171
    { breakpoint: 51, value: 171 },
    // 104	172
    { breakpoint: 52, value: 172 },
    // 106	173
    { breakpoint: 53, value: 173 },
    // 108	174
    { breakpoint: 54, value: 174 },
    // 110	175
    { breakpoint: 55, value: 175 },
    // 112	176
    { breakpoint: 56, value: 176 },
    // 114	177
    { breakpoint: 57, value: 177 },
    // 116	178
    { breakpoint: 58, value: 178 },
    // 118	179
    { breakpoint: 59, value: 179 },
    // 120	180
    { breakpoint: 60, value: 180 },
    // 124	181
    { breakpoint: 62, value: 181 },
    // 128	182
    { breakpoint: 64, value: 182 },
    // 132	183
    { breakpoint: 66, value: 183 },
    // 136	184
    { breakpoint: 68, value: 184 },
    // 140	185
    { breakpoint: 70, value: 185 },
    // 144	186
    { breakpoint: 72, value: 186 },
    // 148	187
    { breakpoint: 74, value: 187 },
    // 152	188
    { breakpoint: 76, value: 188 },
    // 156	189
    { breakpoint: 78, value: 189 },
    // 160	190
    { breakpoint: 80, value: 190 },
    // 164	191
    { breakpoint: 82, value: 191 },
    // 168	192
    { breakpoint: 84, value: 192 },
    // 172	193
    { breakpoint: 86, value: 193 },
    // 176	194
    { breakpoint: 88, value: 194 },
    // 180	195
    { breakpoint: 90, value: 195 },
    // 184	196
    { breakpoint: 92, value: 196 },
    // 188	197
    { breakpoint: 94, value: 197 },
    // 192	198
    { breakpoint: 96, value: 198 },
    // 196	199
    { breakpoint: 98, value: 199 },
    // 198	200
    { breakpoint: 99, value: 200 },
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

// calculateCommonAttackPower will calculate certain Attack Power stats
//
// @param {number} primary - The primary scaling attribute's value
//
// @param {number} secondary - The secondary scaling attribute's value
//
// @return {number} The amount to add to the base value for Attack Power
function calculateCommonAttackPower(
    primary: number,
    secondary: number,
): number {
    // For Poison, every point of Dexterity gives 3 points, every point of Adaptability gives 1 point
    // For Bleed, every point of Dexterity gives 3 points, every point of Faith gives 1 point
    // The points are summed and checked against the common stat curve

    const attributeScore = primary * 3 + secondary;

    return (
        ATTACK_STAT_CURVE.findLast(
            (mapping) => mapping.breakpoint <= attributeScore,
        )?.value ?? 0
    );
}

// calculatePhysicalDefense will calculate the Physical Defense stat
//
// @param {number} endurance - The Endurance attribute value
//
// @param {number} vitality - The Vitality attribute value
//
// @param {number} strength - The Strength attribute value
//
// @param {number} dexterity - The Dexterity attribute value
//
// @return {number} The amount to add to the base value for Physical Defense
function calculatePhysicalDefense(
    endurance: number,
    vitality: number,
    strength: number,
    dexterity: number,
): number {
    // Endurance, Vitality, Strength and Dexterity equally influence Physical DEF

    const PHYSICAL_DEFENSE_CURVE: CurveMap[] = [
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

    const attributeScore: number = endurance + vitality + strength + dexterity;

    return (
        PHYSICAL_DEFENSE_CURVE.findLast(
            (mapping) => mapping.breakpoint <= attributeScore,
        )?.value ?? 0
    );
}

// calculateCommonAbsorption will calculate certain Absorption stats
//
// @param {number} ...attributes - The attribute values
//
// @return {number} The amount to add to the base value for Absorption
function calculateCommonAbsorption(...attributes: number[]): number {
    // The points are summed and checked against the common stat curve
    // The breakpoints are scaled by the number of attributes

    const breakpointScale: number = attributes.length;
    const attributeScore: number = attributes.reduce(
        (acc, cur) => acc + cur,
        0,
    );

    return (
        ABSORPTION_STAT_CURVE.findLast(
            (mapping) => mapping.breakpoint * breakpointScale <= attributeScore,
        )?.value ?? 0
    );
}

// calculateCommonResistance will calculate the Resistance stats
//
// @param {number} primary - The primary scaling attribute's value
//
// @param {number} secondary - The secondary scaling attribute's value
//
// @return {number} The amount to add to the base value for Resistance
function calculateCommonResistance(primary: number, secondary: number): number {
    // Scales with two attributes
    // Every fourth secondary attribute value will increase Reistance one tick, three out of four primary attribute values will increase Resistance one tick
    // Start with 0 Resistance and gain 6 Resistance per tick between 1 and 10 ticks, total 60 Resistance at 10 tricks
    // Between 11 and 20 ticks you gain 8 Resistance per tick, total 140 Resistance at 20 ticks
    // Between 21 and 60 ticks you gain one Resistance per tick, total 180 Resistance at 60 ticks
    // Between 61 and 99 ticks you gain one Resistance every other tick for a total of of 200 Resistance at 99 primary and 99 secondary

    const ticks = Math.floor(secondary / 4) + Math.ceil(primary - primary / 4);
    let resistance = 0;

    if (ticks >= 0) {
        resistance += Math.min(ticks, 10) * 6;
    }
    if (ticks > 10) {
        resistance += (Math.min(ticks, 20) - 10) * 8;
    }
    if (ticks > 20) {
        resistance += Math.min(ticks, 60) - 20;
    }
    if (ticks > 60) {
        resistance += (ticks - 60) / 2;
    }

    return resistance;
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
                calculateCommonAttackPower(
                    attributes.Dexterity,
                    attributes.Adaptability,
                )
            );
        case "AttackPowerBleed":
            return (
                statValue +
                calculateCommonAttackPower(
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
        case "AbsorptionFire":
            return (
                statValue +
                calculateCommonAbsorption(
                    attributes.Intelligence,
                    attributes.Faith,
                )
            );
        case "AbsorptionDark":
            return (
                statValue +
                calculateCommonAbsorption(
                    Math.min(attributes.Intelligence, attributes.Faith),
                )
            );
        case "ResistanceBleed":
            return (
                statValue +
                calculateCommonResistance(
                    attributes.Adaptability,
                    attributes.Faith,
                )
            );
        case "ResistancePoison":
            return (
                statValue +
                calculateCommonResistance(
                    attributes.Adaptability,
                    attributes.Vitality,
                )
            );
        case "ResistancePetrify":
            return (
                statValue +
                calculateCommonResistance(
                    attributes.Adaptability,
                    attributes.Vigor,
                )
            );
        case "ResistanceCurse":
            return (
                statValue +
                calculateCommonResistance(
                    attributes.Adaptability,
                    attributes.Attunement,
                )
            );
        default:
            break;
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
