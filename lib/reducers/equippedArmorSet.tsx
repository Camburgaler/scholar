import ArmorSet from "@/lib/classes/armorSet";
import EquippedArmor from "@/lib/interfaces/equippedArmor";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

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
    initialArmorSet: ArmorSet,
    action: EquippedArmorSetAction,
): ArmorSet {
    const result = ArmorSet.fromArmorSet(initialArmorSet);
    result.setField(action.slot, action.equippedArmor);
    return result;
}

export function EquippedArmorSetProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [equippedArmorSet, equippedArmorSetDispatch] = useReducer(
        equippedArmorSetReducer,
        new ArmorSet(),
    );

    return (
        <EquippedArmorSetContext value={equippedArmorSet}>
            <EquippedArmorSetDispatchContext value={equippedArmorSetDispatch}>
                {children}
            </EquippedArmorSetDispatchContext>
        </EquippedArmorSetContext>
    );
}
