import ArmorSet from "@/lib/classes/armorSet";
import { ActionDispatch, createContext, useContext, useReducer } from "react";
import EquippedArmor from "../interfaces/equippedArmor";

export type EquippedArmorSetAction = {
    slot: keyof ArmorSet;
    equippedArmor: EquippedArmor;
};

const EquippedArmorSetContext = createContext<ArmorSet>(new ArmorSet());

export function useEquippedArmorSet() {
    return useContext(EquippedArmorSetContext);
}

const EquippedArmorSetDispatchContext = createContext<
    ActionDispatch<[action: EquippedArmorSetAction]>
>(() => {});

export function useEquippedArmorSetDispatch() {
    return useContext(EquippedArmorSetDispatchContext);
}

function equippedArmorSetReducer(
    initialArmor: ArmorSet,
    action: EquippedArmorSetAction,
): ArmorSet {
    const result = ArmorSet.fromArmorSet(initialArmor);
    result.setField(action.slot, action.equippedArmor);
    return result;
}

export function EquippedArmorSetProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [equippedArmor, equippedArmorDispatch] = useReducer(
        equippedArmorSetReducer,
        new ArmorSet(),
    );

    return (
        <EquippedArmorSetContext value={equippedArmor}>
            <EquippedArmorSetDispatchContext value={equippedArmorDispatch}>
                {children}
            </EquippedArmorSetDispatchContext>
        </EquippedArmorSetContext>
    );
}
