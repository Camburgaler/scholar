/**
 * Test fixtures for consistent test data
 */
import type Armor from "@/lib/interfaces/armor";
import Infusion from "@/lib/interfaces/infusion";
import type Weapon from "@/lib/interfaces/weapon";
import type AttributeMap from "@/lib/types/attributeMap";
import type StatMap from "@/lib/types/statMap";

// Minimal weapon fixture
export function createMockWeapon(overrides?: Partial<Weapon>): Weapon {
    return {
        Name: "Mock Weapon",
        Category: "Straight Sword",
        Requirements: {} as AttributeMap<number>,
        Weight: 1.0,
        Paired: false,
        MaxReinforcementLevel: 10,
        Modifiers: [],
        Durability: 100,
        RepairCost: 100,
        Infusions: [
            {
                Name: "Standard",
                Damages: {
                    Physical: {
                        Intercept: 100,
                        Slope: 0,
                    },
                },
                Scaling: {
                    Level00: {
                        PhysicalByStrength: 0.5,
                        PhysicalByDexterity: 0.5,
                    },
                    Level01: {
                        PhysicalByStrength: 0.55,
                        PhysicalByDexterity: 0.55,
                    },
                    Level02: {
                        PhysicalByStrength: 0.6,
                        PhysicalByDexterity: 0.6,
                    },
                    Level03: {
                        PhysicalByStrength: 0.65,
                        PhysicalByDexterity: 0.65,
                    },
                    Level04: {
                        PhysicalByStrength: 0.7,
                        PhysicalByDexterity: 0.7,
                    },
                    Level05: {
                        PhysicalByStrength: 0.75,
                        PhysicalByDexterity: 0.75,
                    },
                    Level06: {
                        PhysicalByStrength: 0.8,
                        PhysicalByDexterity: 0.8,
                    },
                    Level07: {
                        PhysicalByStrength: 0.85,
                        PhysicalByDexterity: 0.85,
                    },
                    Level08: {
                        PhysicalByStrength: 0.9,
                        PhysicalByDexterity: 0.9,
                    },
                    Level09: {
                        PhysicalByStrength: 0.95,
                        PhysicalByDexterity: 0.95,
                    },
                    Level10: {
                        PhysicalByStrength: 1,
                        PhysicalByDexterity: 1,
                    },
                },
            } as Infusion,
        ],
        ...overrides,
    };
}

// Minimal armor fixture
export function createMockArmor(overrides?: Partial<Armor>): Armor {
    return {
        Name: "Mock Armor",
        Defenses: {
            Standard: {
                Intercept: 100,
                Slope: 0,
            },
            Slash: {
                Intercept: 100,
                Slope: 0,
            },
            Thrust: {
                Intercept: 100,
                Slope: 0,
            },
            Strike: {
                Intercept: 100,
                Slope: 0,
            },
            Magic: {
                Intercept: 50,
                Slope: 0,
            },
            Fire: {
                Intercept: 50,
                Slope: 0,
            },
            Lightning: {
                Intercept: 50,
                Slope: 0,
            },
            Dark: {
                Intercept: 50,
                Slope: 0,
            },
        },
        Weight: 5.0,
        DefenseScalingPhysical: 1.0,
        DefenseScalingSlash: 1.0,
        DefenseScalingThrust: 1.0,
        DefenseScalingStrike: 1.0,
        Resistances: {
            Poison: {
                Intercept: 0,
                Slope: 0,
            },
            Bleed: {
                Intercept: 0,
                Slope: 0,
            },
            Petrify: {
                Intercept: 0,
                Slope: 0,
            },
            Curse: {
                Intercept: 0,
                Slope: 0,
            },
        },
        Poise: 10,
        Requirements: {} as AttributeMap<number>,
        ItemDiscovery: 0,
        MaxReinforcementLevel: 5,
        Modifiers: [],
        Durability: 100,
        RepairCost: 100,
        ...overrides,
    };
}

// Attribute score mapping fixture
export function createMockAttributeMap<
    T extends number | null | undefined,
>(): AttributeMap<StatMap<T>> {
    return {} as AttributeMap<StatMap<T>>;
}

// Stat value mapping fixture
export function createMockStatMap<T>(): StatMap<T> {
    return {} as StatMap<T>;
}

// Valid reinforcement level range for DS2 (typically +0 to +5, sometimes higher)
export const REINFORCEMENT_LEVELS = [0, 1, 2, 3, 4, 5] as const;

// Typical attribute ranges in DS2
export const ATTRIBUTE_RANGES = {
    min: 1,
    softCap: 40,
    hardCap: 99,
} as const;
