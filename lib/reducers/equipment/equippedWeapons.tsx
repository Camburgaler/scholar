import EquippedWeapon from "@/lib/classes/equippedWeapon";
import WeaponSlots, {
    WeaponEquipSlot,
    WeaponEquipSlots,
} from "@/lib/classes/weaponSlots";
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

    // If the new weapon matches an already equipped weapon, remove the old one
    WeaponEquipSlots.forEach((slot) => {
        if (
            slot !== action.slot &&
            initialWeapons[slot].name !== "Fists" &&
            initialWeapons[slot].name !== "Fist (Vanquisher's Seal)" &&
            action.equippedWeapon.id === result[slot].id
        ) {
            result.setWeapon(slot, new EquippedWeapon());
        }
    });
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
