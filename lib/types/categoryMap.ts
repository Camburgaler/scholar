/**
 * @type CategoryMapKey
 * @description The key type for the {@link AttributeMapKey}.
 */
export type CategoryMapKey =
    | "Fists"
    | "Hands"
    | "Claw"
    | "Dagger"
    | "Whip"
    | "Thrusting Sword"
    | "Twinblade"
    | "Spear"
    | "Lance"
    | "Curved Sword"
    | "Katana"
    | "Straight Sword"
    | "Scythe"
    | "Greatsword"
    | "Ultra Greatsword"
    | "Curved Greatsword"
    | "Hammer"
    | "Great Hammer"
    | "Axe"
    | "Greataxe"
    | "Halberd"
    | "Staff"
    | "Chime"
    | "Bow"
    | "Greatbow"
    | "Crossbow"
    | "Small Shield"
    | "Medium Shield"
    | "Greatshield"
    | "Torch";

/**
 * @type CategoryMap
 * @description A map of weapon categories to values.
 * @keys {@link CategoryMapKey}
 */
type CategoryMap<T> = {
    [K in CategoryMapKey]: T;
};

export default CategoryMap;
