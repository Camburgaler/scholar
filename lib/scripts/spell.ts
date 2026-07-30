import { Spells } from "@/lib/gameData";
import Spell from "@/lib/interfaces/spell";

export function getSpellByName(name: string): Spell | "none" {
    return Spells.find((spell) => spell.Name === name) || "none";
}
