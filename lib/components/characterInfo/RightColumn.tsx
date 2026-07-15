import StatDisplay from "@/lib/components/characterInfo/StatDisplay";

export default function RightColumn() {
    return (
        <div className="flex flex-col w-4xl h-full justify-baseline items-end align-center">
            {/* Cast Speed */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="SpellCastingSpeed"
                displayValue="45"
                isOddRow
            />

            {/* Agility */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="Agility"
                displayValue="85"
            />

            <hr />

            {/* Attack: Strength */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="PhysicalAttackPowerByStrength"
                displayValue="68"
                isOddRow
            />

            {/* Attack: Dexterity */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="PhysicalAttackPowerByDexterity"
                displayValue="59"
            />

            {/* Magic Bonus */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AttackPowerMagic"
                displayValue="51"
                isOddRow
            />

            {/* Fire Bonus */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AttackPowerFire"
                displayValue="61"
            />

            {/* Lightning Bonus */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AttackPowerLightning"
                displayValue="53"
                isOddRow
            />

            {/* Dark Bonus */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AttackPowerDark"
                displayValue="61"
            />

            {/* Poison Bonus */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AttackPowerPoison"
                displayValue="56"
                isOddRow
            />

            {/* Bleed Bonus */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AttackPowerBleed"
                displayValue="56"
            />

            <hr />

            {/* Physical Defense */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="Defense"
                displayValue="77"
                isOddRow
            />

            <ul className="flex flex-col w-full indent-4">
                <li className="flex">
                    {/* Strike Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <StatDisplay
                        levelUpStatusCalcParamKey="DefenseStrike"
                        displayValue="77"
                    />
                </li>
                <li>
                    {/* Slash Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <StatDisplay
                        levelUpStatusCalcParamKey="DefenseSlash"
                        displayValue="77"
                        isOddRow
                    />
                </li>
                <li>
                    {/* Thrust Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <StatDisplay
                        levelUpStatusCalcParamKey="DefenseThrust"
                        displayValue="77"
                    />
                </li>
            </ul>

            {/* Magic Defense */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionMagic"
                displayValue="30"
                isOddRow
            />

            {/* Fire Defense */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionFire"
                displayValue="68"
            />

            {/* Lightning Defense */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionLightning"
                displayValue="30"
                isOddRow
            />

            {/* Dark Defense */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionDark"
                displayValue="36"
            />

            <hr />

            {/* Bleed Resistance */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionBleed"
                displayValue="30"
                isOddRow
            />

            {/* Poison Resistance */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionPoison"
                displayValue="30"
            />

            {/* Petrify Resistance */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionPetrify"
                displayValue="30"
                isOddRow
            />

            {/* Curse Resistance */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="AbsorptionCurse"
                displayValue="30"
            />

            <hr />

            {/* Active Effects */}
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
    );
}
