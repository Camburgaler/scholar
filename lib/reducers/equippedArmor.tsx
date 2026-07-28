import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";
import Armor from "@/lib/types/armor";
import ArmorSet from "@/lib/types/armorSet";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type EquippedArmorAction = {
    slot: keyof ArmorSet;
    armor: Armor;
};

const EquippedArmorContext = createContext<ArmorSet>({
    helmet: Helmets[0],
    chestpiece: Chestpieces[0],
    gauntlets: Gauntlets[0],
    leggings: Leggings[0],
    weight: 0,
});

export function useEquippedArmor() {
    return useContext(EquippedArmorContext);
}

const EquippedArmorDispatchContext = createContext<
    ActionDispatch<[action: EquippedArmorAction]>
>(() => {});

export function useEquippedArmorDispatch() {
    return useContext(EquippedArmorDispatchContext);
}

function equippedArmorReducer(
    initialArmor: ArmorSet,
    action: EquippedArmorAction,
): ArmorSet {
    const weight =
        initialArmor.weight -
        (initialArmor[action.slot]! as Armor).Weight +
        action.armor.Weight;

    return {
        ...initialArmor,
        [action.slot]: action.armor,
        fitness: 0, // TODO: Calculate fitness
        weight: weight,
    };
}

export function EquippedArmorProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [equippedArmor, equippedArmorDispatch] = useReducer(
        equippedArmorReducer,
        {
            helmet: Helmets[0],
            chestpiece: Chestpieces[0],
            gauntlets: Gauntlets[0],
            leggings: Leggings[0],
            weight: 0,
        },
    );

    return (
        <EquippedArmorContext value={equippedArmor}>
            <EquippedArmorDispatchContext value={equippedArmorDispatch}>
                {children}
            </EquippedArmorDispatchContext>
        </EquippedArmorContext>
    );
}
