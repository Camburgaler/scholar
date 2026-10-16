import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type WeaponSorting = {
    reinforcementLevel: number;
    mustMeetRequirements: boolean;
    compareTotalDamage: boolean;
    includeStatusEffects: boolean;
    mustBeInInventory: boolean;
};

export type WeaponSortingAction = {
    key: keyof WeaponSorting;
    value: any;
};

const WeaponSortingContext = createContext<WeaponSorting>({
    reinforcementLevel: 0,
    mustMeetRequirements: false,
    compareTotalDamage: false,
    includeStatusEffects: true,
    mustBeInInventory: false,
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
            mustMeetRequirements: false,
            compareTotalDamage: false,
            includeStatusEffects: true,
            mustBeInInventory: false,
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
