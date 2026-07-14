import StatMap, { StatMapKey } from "@/lib/types/statMap";
import { ActionDispatch, createContext } from "react";

export interface VirtualStatsAction {
    key: string;
    value: number;
}

export const VirtualStatsContext = createContext<StatMap<number>>({
    Vigor: 0,
    Endurance: 0,
    Vitality: 0,
    Adaptability: 0,
    Strength: 0,
    Dexterity: 0,
    Intelligence: 0,
    Faith: 0,
    Attunement: 0,
});
export const VirtualStatsDispatchContext = createContext<
    ActionDispatch<[newStats: Map<StatMapKey, number>]>
>(() => {});
