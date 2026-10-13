export type WeaponCategory =
    | "Axe"
    | "Claw"
    | "Curved Greatsword"
    | "Curved Sword"
    | "Dagger"
    | "Fist"
    | "Greataxe"
    | "Great Hammer"
    | "Greatsword"
    | "Halberd"
    | "Hammer"
    | "Katana"
    | "Lance"
    | "Scythe"
    | "Spear"
    | "Straight Sword"
    | "Thrusting Sword"
    | "Twinblade"
    | "Ultra Greatsword"
    | "Whip";
export const WeaponCategories: WeaponCategory[] = [
    "Axe",
    "Claw",
    "Curved Greatsword",
    "Curved Sword",
    "Dagger",
    "Fist",
    "Greataxe",
    "Great Hammer",
    "Greatsword",
    "Halberd",
    "Hammer",
    "Katana",
    "Lance",
    "Scythe",
    "Spear",
    "Straight Sword",
    "Thrusting Sword",
    "Twinblade",
    "Ultra Greatsword",
    "Whip",
];

export type BowCategory = "Bow" | "Crossbow" | "Greatbow";
export const BowCategories: BowCategory[] = ["Bow", "Crossbow", "Greatbow"];

export type CatalystCategory = "Staff" | "Chime" | "Hands";
export const CatalystCategories: CatalystCategory[] = [
    "Staff",
    "Chime",
    "Hands",
];

export type ShieldCategory = "Small Shield" | "Standard Shield" | "Greatshield";
export const ShieldCategories: ShieldCategory[] = [
    "Small Shield",
    "Standard Shield",
    "Greatshield",
];

export type Category =
    | WeaponCategory
    | BowCategory
    | CatalystCategory
    | ShieldCategory;
export const Categories: Category[] = [
    ...WeaponCategories,
    ...BowCategories,
    ...CatalystCategories,
    ...ShieldCategories,
];

/**
 * @type CategoryMap
 * @description A map of weapon categories to values.
 * @keys {@link CategoryMapKey}
 */
type CategoryMap<T> = {
    [K in Category]: T;
};

export default CategoryMap;
