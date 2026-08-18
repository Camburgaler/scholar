import WeaponSlots, { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import EquippedWeapon from "@/lib/interfaces/equippedWeapon";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

/**
 * @type EquippedWeaponsAction
 * @description The action type for the equipped armor set reducer.
 * @member slot The field of the armor set to set. Key of {@link ArmorSet}.
 * @member equippedArmor The {@link EquippedArmor} to set the field to.
 */
export type EquippedWeaponsAction = {
    slot: WeaponEquipSlot;
    equippedWeapon: EquippedWeapon;
};

const EquippedWeaponsContext = createContext<WeaponSlots>(new WeaponSlots());

export function useEquippedWeapons() {
    return useContext(EquippedWeaponsContext);
}

const EquippedWeaponsDispatchContext = createContext<
    ActionDispatch<[action: EquippedWeaponsAction]>
>(() => {});

export function useEquippedWeaponsDispatch() {
    return useContext(EquippedWeaponsDispatchContext);
}

function equippedWeaponsReducer(
    initialWeapons: WeaponSlots,
    action: EquippedWeaponsAction,
): WeaponSlots {
    const result = WeaponSlots.fromWeaponSlots(initialWeapons);
    result.setWeapon(action.slot, action.equippedWeapon);
    return result;
}

export function EquippedWeaponsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [equippedWeapons, equippedWeaponsDispatch] = useReducer(
        equippedWeaponsReducer,
        new WeaponSlots(),
    );

    return (
        <EquippedWeaponsContext value={equippedWeapons}>
            <EquippedWeaponsDispatchContext value={equippedWeaponsDispatch}>
                {children}
            </EquippedWeaponsDispatchContext>
        </EquippedWeaponsContext>
    );
}
