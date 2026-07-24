import StatDisplay from "@/lib/components/characterInfo/StatDisplay";

export default function RightColumn() {
    return (
        <div className="flex flex-col w-4xl h-full justify-baseline items-end align-center">
            {/* Casting Speed / Agility */}
            <div className="flex flex-col w-full">
                {/* Cast Speed */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="SpellCastingSpeed"
                    displayValue="45"
                    isOddRow
                />

                {/* Agility */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="Agility" displayValue="85" />
            </div>

            <hr />

            {/* Attack */}
            <div className="flex flex-col w-full">
                {/* Attack: Strength */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="PhysicalAttackPowerByStrength"
                    displayValue="68"
                    isOddRow
                />

                {/* Attack: Dexterity */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="PhysicalAttackPowerByDexterity"
                    displayValue="59"
                />

                {/* Magic Bonus */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="AttackPowerMagic"
                    displayValue="51"
                    isOddRow
                />

                {/* Fire Bonus */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="AttackPowerFire" displayValue="61" />

                {/* Lightning Bonus */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="AttackPowerLightning"
                    displayValue="53"
                    isOddRow
                />

                {/* Dark Bonus */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="AttackPowerDark" displayValue="61" />

                {/* Poison Bonus */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="AttackPowerPoison"
                    displayValue="56"
                    isOddRow
                />

                {/* Bleed Bonus */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="AttackPowerBleed" displayValue="56" />
            </div>

            <hr />

            {/* Defense */}
            <div className="flex flex-col w-full">
                {/* Physical Defense */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="Defense" displayValue="77" isOddRow />

                {/* Magic Defense */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="AbsorptionMagic" displayValue="30" />

                {/* Fire Defense */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="AbsorptionFire"
                    displayValue="68"
                    isOddRow
                />

                {/* Lightning Defense */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="AbsorptionLightning"
                    displayValue="30"
                />

                {/* Dark Defense */}
                {/* TODO: update with calculations based on level/attributes */}
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
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="ResistanceBleed" displayValue="30" />

                {/* Poison Resistance */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="ResistancePoison"
                    displayValue="30"
                    isOddRow
                />

                {/* Petrify Resistance */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay statMapKey="ResistancePetrify" displayValue="30" />

                {/* Curse Resistance */}
                {/* TODO: update with calculations based on level/attributes */}
                <StatDisplay
                    statMapKey="ResistanceCurse"
                    displayValue="30"
                    isOddRow
                />
            </div>

            <hr />

            {/* Active Effects */}
            <div className="flex flex-col w-full">
                {/* TODO: update with calculations based on level/attributes */}
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
