import { Rings } from "@/lib/gameData";
import EquippedRings from "@/lib/interfaces/equippedRings";
import Ring from "@/lib/interfaces/ring";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type EquippedRingsAction = {
    slot: keyof EquippedRings;
    ring: Ring;
};

const EquippedRingsContext = createContext<EquippedRings>({
    0: Rings[0],
    1: Rings[0],
    2: Rings[0],
    3: Rings[0],
});

export function useEquippedRings() {
    return useContext(EquippedRingsContext);
}

const EquippedRingsDispatchContext = createContext<
    ActionDispatch<[action: EquippedRingsAction]>
>(() => {});

export function useEquippedRingsDispatch() {
    return useContext(EquippedRingsDispatchContext);
}

function equippedRingsReducer(
    initialRings: EquippedRings,
    action: EquippedRingsAction,
): EquippedRings {
    return { ...initialRings, [action.slot]: action.ring };
}

export function EquippedRingsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [equippedRings, equippedRingsDispatch] = useReducer(
        equippedRingsReducer,
        {
            0: Rings[0],
            1: Rings[0],
            2: Rings[0],
            3: Rings[0],
        },
    );

    return (
        <EquippedRingsContext value={equippedRings}>
            <EquippedRingsDispatchContext value={equippedRingsDispatch}>
                {children}
            </EquippedRingsDispatchContext>
        </EquippedRingsContext>
    );
}
