import StatDisplay from "@/lib/components/characterInfo/StatDisplay";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equippedWeapons";
import { ringsModifierDisplays } from "@/lib/scripts/equippedRings";
import { JSX } from "react/jsx-runtime";

/**
 * @description RightColumn is a component that displays the right column of the character info page. It displays certain stats and the character's active effects.
 */
export default function RightColumn(): JSX.Element {
    // Context
    const equippedArmor = useEquippedArmorSet();
    const equippedRings = useEquippedRings();
    const equippedWeapons = useEquippedWeapons();

    return (
        <div className="flex flex-col w-4xl h-full justify-baseline items-end align-center">
            {/* Casting Speed / Agility */}
            <div className="flex flex-col w-full">
                {/* Cast Speed */}
                <StatDisplay statDisplayKey="SpellCastingSpeed" isOddRow />

                {/* Agility */}
                <StatDisplay statDisplayKey="Agility" />
            </div>

            <hr />

            {/* Attack */}
            <div className="flex flex-col w-full">
                {/* Attack: Strength */}
                <StatDisplay
                    statDisplayKey="PhysicalAttackPowerByStrength"
                    isOddRow
                />

                {/* Attack: Dexterity */}
                <StatDisplay statDisplayKey="PhysicalAttackPowerByDexterity" />

                {/* Magic Bonus */}
                <StatDisplay statDisplayKey="AttackPowerMagic" isOddRow />

                {/* Fire Bonus */}
                <StatDisplay statDisplayKey="AttackPowerFire" />
                {/* Lightning Bonus */}
                <StatDisplay statDisplayKey="AttackPowerLightning" isOddRow />

                {/* Dark Bonus */}
                <StatDisplay statDisplayKey="AttackPowerDark" />

                {/* Poison Bonus */}
                <StatDisplay statDisplayKey="AttackPowerPoison" isOddRow />

                {/* Bleed Bonus */}
                <StatDisplay statDisplayKey="AttackPowerBleed" />
            </div>

            <hr />

            {/* Defense */}
            <div className="flex flex-col w-full">
                {/* Physical Defense */}
                <StatDisplay statDisplayKey="Defense" isOddRow />

                <ul className="flex flex-col w-full indent-4">
                    <li className="flex">
                        {/* Strike Defense */}
                        <StatDisplay statDisplayKey="DefenseStrike" />
                    </li>
                    <li>
                        {/* Slash Defense */}
                        <StatDisplay statDisplayKey="DefenseSlash" isOddRow />
                    </li>
                    <li>
                        {/* Thrust Defense */}
                        <StatDisplay statDisplayKey="DefenseThrust" />
                    </li>
                </ul>

                {/* Magic Defense */}
                <StatDisplay statDisplayKey="AbsorptionMagic" isOddRow />

                {/* Fire Defense */}
                <StatDisplay statDisplayKey="AbsorptionFire" />

                {/* Lightning Defense */}
                <StatDisplay statDisplayKey="AbsorptionLightning" isOddRow />

                {/* Dark Defense */}
                <StatDisplay statDisplayKey="AbsorptionDark" />
            </div>

            <hr />

            {/* Resistances */}
            <div className="flex flex-col w-full">
                {/* Poison Resistance */}
                <StatDisplay statDisplayKey="ResistancePoison" isOddRow />

                {/* Bleed Resistance */}
                <StatDisplay statDisplayKey="ResistanceBleed" />

                {/* Petrify Resistance */}
                <StatDisplay statDisplayKey="ResistancePetrify" isOddRow />

                {/* Curse Resistance */}
                <StatDisplay statDisplayKey="ResistanceCurse" />
            </div>

            <hr />

            {/* Active Effects */}
            <div className="flex flex-col w-full">
                <label htmlFor="active-effects" className="w-full text-left">
                    Active Effects:
                </label>
                <div className="flex flex-col w-full border rounded-2xl p-2 gap-1 min-h-30 max-h-65 overflow-y-auto">
                    {...equippedArmor.getModifierDisplays()}
                    {...ringsModifierDisplays(equippedRings)}
                    {...equippedWeapons.getModifierDisplays()}
                </div>
            </div>
        </div>
    );
}
