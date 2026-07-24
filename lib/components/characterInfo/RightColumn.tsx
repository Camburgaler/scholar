import StatDisplay from "@/lib/components/characterInfo/StatDisplay";

export default function RightColumn() {
    return (
        <div className="flex flex-col w-4xl h-full justify-baseline items-end align-center">
            {/* Casting Speed / Agility */}
            <div className="flex flex-col w-full">
                {/* Cast Speed */}
                <StatDisplay
                    statMapKey="SpellCastingSpeed"
                    displayValue="45"
                    isOddRow
                />

                {/* Agility */}
                <StatDisplay statMapKey="Agility" displayValue="85" />
            </div>

            <hr />

            {/* Attack */}
            <div className="flex flex-col w-full">
                {/* Attack: Strength */}
                <StatDisplay
                    statMapKey="PhysicalAttackPowerByStrength"
                    displayValue="68"
                    isOddRow
                />

                {/* Attack: Dexterity */}
                <StatDisplay
                    statMapKey="PhysicalAttackPowerByDexterity"
                    displayValue="59"
                />

                {/* Magic Bonus */}
                <StatDisplay
                    statMapKey="AttackPowerMagic"
                    displayValue="51"
                    isOddRow
                />

                {/* Fire Bonus */}
                <StatDisplay statMapKey="AttackPowerFire" displayValue="61" />

                {/* Lightning Bonus */}
                <StatDisplay
                    statMapKey="AttackPowerLightning"
                    displayValue="53"
                    isOddRow
                />

                {/* Dark Bonus */}
                <StatDisplay statMapKey="AttackPowerDark" displayValue="61" />

                {/* Poison Bonus */}
                <StatDisplay
                    statMapKey="AttackPowerPoison"
                    displayValue="56"
                    isOddRow
                />

                {/* Bleed Bonus */}
                <StatDisplay statMapKey="AttackPowerBleed" displayValue="56" />
            </div>

            <hr />

            {/* Defense */}
            <div className="flex flex-col w-full">
                {/* Physical Defense */}
                <StatDisplay statMapKey="Defense" displayValue="77" isOddRow />

                {/* Magic Defense */}
                <StatDisplay statMapKey="AbsorptionMagic" displayValue="30" />

                {/* Fire Defense */}
                <StatDisplay
                    statMapKey="AbsorptionFire"
                    displayValue="68"
                    isOddRow
                />

                {/* Lightning Defense */}
                <StatDisplay
                    statMapKey="AbsorptionLightning"
                    displayValue="30"
                />

                {/* Dark Defense */}
                <StatDisplay
                    statMapKey="AbsorptionDark"
                    displayValue="36"
                    isOddRow
                />
            </div>

            <hr />

            {/* Resistances */}
            <div className="flex flex-col w-full">
                {/* Bleed Resistance */}
                <StatDisplay statMapKey="ResistanceBleed" displayValue="30" />

                {/* Poison Resistance */}
                <StatDisplay
                    statMapKey="ResistancePoison"
                    displayValue="30"
                    isOddRow
                />

                {/* Petrify Resistance */}
                <StatDisplay statMapKey="ResistancePetrify" displayValue="30" />

                {/* Curse Resistance */}
                <StatDisplay
                    statMapKey="ResistanceCurse"
                    displayValue="30"
                    isOddRow
                />
            </div>

            <hr />

            {/* Active Effects */}
            <div className="flex flex-col w-full">
                {/* TODO: update with status effects based on equipment */}
                <label htmlFor="active-effects" className="w-full text-left">
                    Active Effects:
                </label>
                <textarea
                    id="active-effects"
                    className="w-full"
                    rows={4}
                    readOnly
                    value=""
                ></textarea>
            </div>
        </div>
    );
}
