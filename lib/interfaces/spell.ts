interface Spell {
    Name: string;
    RequiredIntelligence: number;
    RequiredFaith: number;
    SpellSlotCost: number;
    UsageCountCurve: number[];
}

export default Spell;
