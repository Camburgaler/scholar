/**
 * @interface Spell
 * @description An interface representing a spell.
 * @member Name - The name of the spell.
 * @member RequiredIntelligence - The required intelligence to cast the spell.
 * @member RequiredFaith - The required faith to cast the spell.
 * @member SpellSlotCost - The spell slot cost of the spell.
 * @member UsageCountCurve - The usage count curve of the spell.
 */
interface Spell {
    Name: string;
    RequiredIntelligence: number;
    RequiredFaith: number;
    SpellSlotCost: number;
    UsageCountCurve: number[];
}

export default Spell;
