import attributeToStatMap from "@/lib/data/AttributeToStatMap.json";
import baseStats from "@/lib/data/BaseStats.json";
import chestpieces from "@/lib/data/Chestpieces.json";
import classes from "@/lib/data/Classes.json";
import gauntlets from "@/lib/data/Gauntlets.json";
import helmets from "@/lib/data/Helmets.json";
import leggings from "@/lib/data/Leggings.json";
import playerLevelUpSoulsParams from "@/lib/data/PlayerLevelUpSoulsParam.json";
import rings from "@/lib/data/Rings.json";
import statCalculation from "@/lib/data/StatCalculation.json";
import vowParams from "@/lib/data/VowParam.json";
import weapons from "@/lib/data/Weapons.json";
import Armor from "@/lib/types/armor";
import AttributeMap from "@/lib/types/attributeMap";
import Class from "@/lib/types/class";
import PlayerLevelUpSoulsParam from "@/lib/types/playerLevelUpSoulsParam";
import Ring from "@/lib/types/ring";
import StatMap from "@/lib/types/statMap";
import VowParam from "@/lib/types/vowParam";
import Weapon from "@/lib/types/weapon";

// AttributeToStatMap is a map of attributes to a map of stats to whether or not the attribute affects the stat
export const AttributeToStatMap: AttributeMap<StatMap<boolean>> =
    attributeToStatMap;

// Chestpieces is a list of chestpiece armor
export const Chestpieces: Armor[] = chestpieces;

// Classes is a list of starting character classes
export const Classes: Class[] = classes;

// Gauntlets is a list of gauntlet armor
export const Gauntlets: Armor[] = gauntlets;

// Helmets is a list of helmet armor
export const Helmets: Armor[] = helmets;

// Leggings is a list of leggings armor
export const Leggings: Armor[] = leggings;

// PlayerLevelUpSouls is a list of the souls required to level up at each level
export const PlayerLevelUpSouls: PlayerLevelUpSoulsParam[] =
    playerLevelUpSoulsParams;

// Rings is a list of rings
export const Rings: Ring[] = rings;

// Vows is a list of VowParams
//
// TODO: replace with a list of covenants when available
export const Vows: VowParam[] = vowParams;

// Weapons is a list of weapons
export const Weapons: Weapon[] = weapons;

// BaseStats is a map of stats to their respective values before scaling
export const BaseStats: StatMap<number> = baseStats;

// StatCalculationDetails is a map of attributes to a map of stats to a cumulative sequence of stat values
export const StatCalculationDetails: AttributeMap<StatMap<number[] | null>> =
    statCalculation;
