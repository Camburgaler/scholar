import EquippedArmor from "@/lib/classes/equippedArmor";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type ArmorInventoryAction = {
    action: "add" | "remove";
    data: EquippedArmor;
};

const ArmorInventoryContext = createContext<EquippedArmor[]>([]);

export function useArmorInventory() {
    return useContext(ArmorInventoryContext);
}

const ArmorInventoryDispatchContext = createContext<
    ActionDispatch<[action: ArmorInventoryAction]>
>(() => {});

export function useArmorInventoryDispatch() {
    return useContext(ArmorInventoryDispatchContext);
}

function ArmorInventoryReducer(
    initialArmor: EquippedArmor[],
    action: ArmorInventoryAction,
): EquippedArmor[] {
    const result = [...initialArmor];
    if (action.action === "add") {
        const updateIndex = result.findIndex(
            (armor) => armor.id === action.data.id,
        );
        if (updateIndex !== -1) {
            result[updateIndex] = action.data;
            return result;
        }

        result.push(action.data);
    } else if (action.action === "remove") {
        result.splice(result.indexOf(action.data), 1);
    }

    return result;
}

export function ArmorInventoryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [ArmorInventory, ArmorInventoryDispatch] = useReducer(
        ArmorInventoryReducer,
        [],
    );

    return (
        <ArmorInventoryContext value={ArmorInventory}>
            <ArmorInventoryDispatchContext value={ArmorInventoryDispatch}>
                {children}
            </ArmorInventoryDispatchContext>
        </ArmorInventoryContext>
    );
}
