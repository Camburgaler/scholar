import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type WeaponSorting = {
    reinforcementLevel: number;
};

export type WeaponSortingAction = {
    key: string;
    value: number;
};

const WeaponSortingContext = createContext<WeaponSorting>({
    reinforcementLevel: 0,
});

export function useWeaponSorting() {
    return useContext(WeaponSortingContext);
}

const WeaponSortingDispatchContext = createContext<
    ActionDispatch<[action: WeaponSortingAction]>
>(() => {});

export function useWeaponSortingDispatch() {
    return useContext(WeaponSortingDispatchContext);
}

function weaponSortingReducer(
    initialConfig: WeaponSorting,
    newConfig: WeaponSortingAction,
): WeaponSorting {
    return {
        ...initialConfig,
        [newConfig.key]: newConfig.value,
    };
}

export function WeaponSortingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [weaponSorting, weaponSortingDispatch] = useReducer(
        weaponSortingReducer,
        {
            reinforcementLevel: 0,
        },
    );

    return (
        <WeaponSortingContext.Provider value={weaponSorting}>
            <WeaponSortingDispatchContext.Provider
                value={weaponSortingDispatch}
            >
                {children}
            </WeaponSortingDispatchContext.Provider>
        </WeaponSortingContext.Provider>
    );
}
