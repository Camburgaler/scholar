import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { ActionDispatch, createContext } from "react";

export interface VirtualStatsAction {
    key: string;
    value: number;
}

export const VirtualStatsContext = createContext<AttributeMap<number>>({
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
    ActionDispatch<[newStats: Map<AttributeMapKey, number>]>
>(() => {});
