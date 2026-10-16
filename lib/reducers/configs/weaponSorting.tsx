import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import CategoryMap from "@/lib/types/categoryMap";
import InfusionMap from "@/lib/types/infusionMap";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type WeaponSorting = {
    reinforcementLevel: number;
    mustMeetRequirements: boolean;
    compareTotalDamage: boolean;
    includeStatusEffects: boolean;
    mustBeInInventory: boolean;
    enabledInfusions: InfusionMap<boolean>;
    enabledDamageTypes: AttackPowerTypeMap<boolean>;
    invertDamageTypeFilter: boolean;
    requireAllEnabledDamageTypes: boolean;
    enabledCategories: CategoryMap<boolean>;
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
    enabledInfusions: {
        Standard: true,
        Magic: true,
        Fire: true,
        Lightning: true,
        Dark: true,
        Poison: true,
        Bleed: true,
        Raw: true,
        Enchanted: true,
        Mundane: true,
    },
    enabledDamageTypes: {
        Physical: true,
        Magic: true,
        Fire: true,
        Lightning: true,
        Dark: true,
        Poison: true,
        Bleed: true,
        Petrify: true,
        Curse: true,
    },
    invertDamageTypeFilter: false,
    requireAllEnabledDamageTypes: false,
    enabledCategories: {
        Axe: true,
        Claw: true,
        "Curved Greatsword": true,
        "Curved Sword": true,
        Dagger: true,
        Fist: true,
        Greataxe: true,
        "Great Hammer": true,
        Greatsword: true,
        Halberd: true,
        Hammer: true,
        Katana: true,
        Lance: true,
        Scythe: true,
        Spear: true,
        "Straight Sword": true,
        "Thrusting Sword": true,
        Twinblade: true,
        "Ultra Greatsword": true,
        Whip: true,
        Bow: false,
        Crossbow: false,
        Greatbow: false,
        "Small Shield": false,
        "Standard Shield": false,
        Greatshield: false,
        Staff: false,
        Chime: false,
        Hands: false,
    },
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
            enabledInfusions: {
                Standard: true,
                Magic: true,
                Fire: true,
                Lightning: true,
                Dark: true,
                Poison: true,
                Bleed: true,
                Raw: true,
                Enchanted: true,
                Mundane: true,
            },
            enabledDamageTypes: {
                Physical: true,
                Magic: true,
                Fire: true,
                Lightning: true,
                Dark: true,
                Poison: true,
                Bleed: true,
                Petrify: true,
                Curse: true,
            },
            invertDamageTypeFilter: false,
            requireAllEnabledDamageTypes: false,
            enabledCategories: {
                Axe: true,
                Claw: true,
                "Curved Greatsword": true,
                "Curved Sword": true,
                Dagger: true,
                Fist: true,
                Greataxe: true,
                "Great Hammer": true,
                Greatsword: true,
                Halberd: true,
                Hammer: true,
                Katana: true,
                Lance: true,
                Scythe: true,
                Spear: true,
                "Straight Sword": true,
                "Thrusting Sword": true,
                Twinblade: true,
                "Ultra Greatsword": true,
                Whip: true,
                Bow: false,
                Crossbow: false,
                Greatbow: false,
                "Small Shield": false,
                "Standard Shield": false,
                Greatshield: false,
                Staff: false,
                Chime: false,
                Hands: false,
            },
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
