export interface ScalingFactors {
    PhysicalByStrength: number;
    PhysicalByDexterity: number;
    Magic: number;
    Lightning: number;
    Fire: number;
    Dark: number;
    Poison: number;
    Bleed: number;
    PhysicalByEnchant: number;
}

export interface Scaling {
    Level00: ScalingFactors;
    Level01: ScalingFactors;
    Level02: ScalingFactors;
    Level03: ScalingFactors;
    Level04: ScalingFactors;
    Level05: ScalingFactors;
    Level06: ScalingFactors;
    Level07: ScalingFactors;
    Level08: ScalingFactors;
    Level09: ScalingFactors;
    Level10: ScalingFactors;
}
