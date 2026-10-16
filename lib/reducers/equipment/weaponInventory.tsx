import EquippedWeapon from "@/lib/classes/equippedWeapon";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type WeaponInventoryAction = {
    action: "add" | "remove";
    data: EquippedWeapon;
};

const WeaponInventoryContext = createContext<EquippedWeapon[]>([]);

export function useWeaponInventory() {
    return useContext(WeaponInventoryContext);
}

const WeaponInventoryDispatchContext = createContext<
    ActionDispatch<[action: WeaponInventoryAction]>
>(() => {});

export function useWeaponInventoryDispatch() {
    return useContext(WeaponInventoryDispatchContext);
}

function WeaponInventoryReducer(
    initialWeapons: EquippedWeapon[],
    action: WeaponInventoryAction,
): EquippedWeapon[] {
    const result = [...initialWeapons];
    if (action.action === "add") {
        if (
            action.data.name === "Fists" ||
            action.data.name === "Fist (Vanquisher's Seal)"
        ) {
            // Find index of fists and remove it if it exists
            const fistsIndex = result.findIndex(
                (weapon) =>
                    weapon.name === "Fists" ||
                    weapon.name === "Fist (Vanquisher's Seal)",
            );
            if (fistsIndex !== -1) {
                result.splice(fistsIndex, 1);
            }
        }

        result.push(action.data);
    } else if (action.action === "remove") {
        result.splice(result.indexOf(action.data), 1);
    }

    return result;
}

export function WeaponInventoryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [WeaponInventory, WeaponInventoryDispatch] = useReducer(
        WeaponInventoryReducer,
        [],
    );

    return (
        <WeaponInventoryContext value={WeaponInventory}>
            <WeaponInventoryDispatchContext value={WeaponInventoryDispatch}>
                {children}
            </WeaponInventoryDispatchContext>
        </WeaponInventoryContext>
    );
}
