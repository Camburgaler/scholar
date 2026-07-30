import attributeToStatMap from "@/lib/data/AttributeToStatMap.json";
import baseStats from "@/lib/data/BaseStats.json";
import chestpieces from "@/lib/data/Chestpieces.json";
import classes from "@/lib/data/Classes.json";
import covenants from "@/lib/data/Covenants.json";
import gauntlets from "@/lib/data/Gauntlets.json";
import helmets from "@/lib/data/Helmets.json";
import leggings from "@/lib/data/Leggings.json";
import levels from "@/lib/data/Levels.json";
import rings from "@/lib/data/Rings.json";
import spells from "@/lib/data/Spells.json";
import statCalculation from "@/lib/data/StatCalculation.json";
import weapons from "@/lib/data/Weapons.json";
import Armor from "@/lib/interfaces/armor";
import Class from "@/lib/interfaces/class";
import Ring from "@/lib/interfaces/ring";
import Spell from "@/lib/interfaces/spell";
import Weapon from "@/lib/interfaces/weapon";
import AttributeMap from "@/lib/types/attributeMap";
import StatMap from "@/lib/types/statMap";

// AttributeToStatMap is a map of attributes to a map of stats to whether or not the attribute affects the stat
export const AttributeToStatMap: AttributeMap<StatMap<boolean>> =
    attributeToStatMap;

// Chestpieces is a list of chestpiece armor
export const Chestpieces: Armor[] = chestpieces.sort((a, b) =>
    // Sort by name
    // "No Armor" is always first
    a.Name === "No Armor"
        ? -1
        : b.Name === "No Armor"
          ? 1
          : a.Name.localeCompare(b.Name),
);

// Classes is a list of starting character classes
export const Classes: Class[] = classes;

// Gauntlets is a list of gauntlet armor
export const Gauntlets: Armor[] = gauntlets.sort((a, b) =>
    // Sort by name
    // "No Armor" is always first
    a.Name === "No Armor"
        ? -1
        : b.Name === "No Armor"
          ? 1
          : a.Name.localeCompare(b.Name),
);

// Helmets is a list of helmet armor
export const Helmets: Armor[] = helmets.sort((a, b) =>
    // Sort by name
    // "No Armor" is always first
    a.Name === "No Armor"
        ? -1
        : b.Name === "No Armor"
          ? 1
          : a.Name.localeCompare(b.Name),
);

// Leggings is a list of leggings armor
export const Leggings: Armor[] = leggings.sort((a, b) =>
    // Sort by name
    // "No Armor" is always first
    a.Name === "No Armor"
        ? -1
        : b.Name === "No Armor"
          ? 1
          : a.Name.localeCompare(b.Name),
);

// PlayerLevelUpSouls is a list of the souls required to level up at each level
export const PlayerLevelUpSouls: number[] = levels;

// Rings is a list of rings
export const Rings: Ring[] = rings;

// Covenants is a list of covenant names
export const Covenants: string[] = covenants;

// Spells is a list of spells
export const Spells: Spell[] = spells.sort((a, b) =>
    a.Name.localeCompare(b.Name),
);

// Weapons is a list of weapons
export const Weapons: Weapon[] = weapons;

// BaseStats is a map of stats to their respective values before scaling
export const BaseStats: StatMap<number> = baseStats;

// StatCalculationDetails is a map of attributes to a map of stats to a cumulative sequence of stat values
export const StatCalculationDetails: AttributeMap<StatMap<number[] | null>> =
    statCalculation;
