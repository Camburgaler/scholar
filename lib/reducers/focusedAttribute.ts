import { StatMapKey } from "@/lib/types/statMap";
import { ActionDispatch, createContext } from "react";

export const FocusedAttributeContext = createContext<StatMapKey | null>(null);
export const FocusedAttributeDispatchContext = createContext<
    ActionDispatch<[newValue: StatMapKey | null]>
>(() => {});
