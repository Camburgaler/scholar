import { Spells } from "@/lib/gameData";
import Spell from "@/lib/interfaces/spell";

/**
 * @description Get a spell by name
 * @param name The name of the spell to get
 * @returns The {@link Spell} with the given name or "none".
 */
export function getSpellByName(name: string): Spell | "none" {
    return Spells.find((spell) => spell.Name === name) || "none";
}
