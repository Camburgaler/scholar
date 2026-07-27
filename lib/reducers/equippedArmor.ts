import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";
import ArmorSet from "@/lib/types/armorSet";
import { ActionDispatch, createContext } from "react";

export const EquippedArmorContext = createContext<ArmorSet>({
    helmet: Helmets[0],
    chestpiece: Chestpieces[0],
    gauntlets: Gauntlets[0],
    leggings: Leggings[0],
    weight: 0,
});
export const EquippedArmorDispatchContext = createContext<
    ActionDispatch<[newValue: ArmorSet]>
>(() => {});
