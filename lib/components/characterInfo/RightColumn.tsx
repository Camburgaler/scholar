import StatDisplay from "@/lib/components/characterInfo/StatDisplay";

export default function RightColumn() {
    return (
        <div className="flex flex-col w-4xl h-full justify-baseline items-end align-center">
            {/* Casting Speed / Agility */}
            <div className="flex flex-col w-full">
                {/* Cast Speed */}
                <StatDisplay statMapKey="SpellCastingSpeed" isOddRow />

                {/* Agility */}
                <StatDisplay statMapKey="Agility" />
            </div>

            <hr />

            {/* Attack */}
            <div className="flex flex-col w-full">
                {/* Attack: Strength */}
                <StatDisplay
                    statMapKey="PhysicalAttackPowerByStrength"
                    isOddRow
                />

                {/* Attack: Dexterity */}
                <StatDisplay statMapKey="PhysicalAttackPowerByDexterity" />

                {/* Magic Bonus */}
                <StatDisplay statMapKey="AttackPowerMagic" isOddRow />

                {/* Fire Bonus */}
                <StatDisplay statMapKey="AttackPowerFire" />
                {/* Lightning Bonus */}
                <StatDisplay statMapKey="AttackPowerLightning" isOddRow />

                {/* Dark Bonus */}
                <StatDisplay statMapKey="AttackPowerDark" />

                {/* Poison Bonus */}
                <StatDisplay statMapKey="AttackPowerPoison" isOddRow />

                {/* Bleed Bonus */}
                <StatDisplay statMapKey="AttackPowerBleed" />
            </div>

            <hr />

            {/* Defense */}
            <div className="flex flex-col w-full">
                {/* Physical Defense */}
                <StatDisplay statMapKey="Defense" isOddRow />

                {/* Magic Defense */}
                <StatDisplay statMapKey="AbsorptionMagic" />

                {/* Fire Defense */}
                <StatDisplay statMapKey="AbsorptionFire" isOddRow />

                {/* Lightning Defense */}
                <StatDisplay statMapKey="AbsorptionLightning" />

                {/* Dark Defense */}
                <StatDisplay statMapKey="AbsorptionDark" isOddRow />
            </div>

            <hr />

            {/* Resistances */}
            <div className="flex flex-col w-full">
                {/* Bleed Resistance */}
                <StatDisplay statMapKey="ResistanceBleed" />

                {/* Poison Resistance */}
                <StatDisplay statMapKey="ResistancePoison" isOddRow />

                {/* Petrify Resistance */}
                <StatDisplay statMapKey="ResistancePetrify" />

                {/* Curse Resistance */}
                <StatDisplay statMapKey="ResistanceCurse" isOddRow />
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
