import EquippedWeapon from "@/lib/classes/equippedWeapon";
import WeaponAttackTable, {
    WeaponAttackRow,
} from "@/lib/components/configs/weaponSorting/WeaponAttackTable";
import { Weapons } from "@/lib/gameData";
import Weapon from "@/lib/interfaces/weapon";
import { useTwoHanding } from "@/lib/reducers/attributes/twoHanding";
import { useVirtualAttributes } from "@/lib/reducers/attributes/virtualAttributes";
import {
    useWeaponSorting,
    useWeaponSortingDispatch,
} from "@/lib/reducers/configs/weaponSorting";
import { useEquippedArmorSet } from "@/lib/reducers/equipment/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equipment/equippedWeapons";
import { useWeaponInventory } from "@/lib/reducers/equipment/weaponInventory";
import AttackPowerTypeMap, {
    AttackPowerTypes,
} from "@/lib/types/attackPowerTypeMap";
import AttributeMap, {
    AttributeMapKey,
    ScalingAttributes,
} from "@/lib/types/attributeMap";
import {
    BowCategories,
    CatalystCategories,
    ShieldCategories,
    WeaponCategories,
} from "@/lib/types/categoryMap";
import { InfusionMapKey, InfusionMapKeys } from "@/lib/types/infusionMap";
import { useMemo } from "react";

function meetsRequirements(
    weapon: Weapon,
    attributes: AttributeMap<number>,
): boolean {
    for (const key of ScalingAttributes) {
        if (
            weapon.Requirements[key as AttributeMapKey]! >
            attributes[key as AttributeMapKey]!
        ) {
            return false;
        }
    }

    return true;
}

function isEmptyRow(row: WeaponAttackRow) {
    return row.max === 0;
}

function getTotalOfDamages(
    totalDamage: AttackPowerTypeMap<number>,
    includeStatusEffects: boolean,
) {
    if (!includeStatusEffects) {
        totalDamage.Bleed = 0;
        totalDamage.Curse = 0;
        totalDamage.Poison = 0;
        totalDamage.Petrify = 0;
    }

    return Math.floor(
        Object.entries(totalDamage).reduce((a, [_, b]) => a + b, 0),
    );
}

function getGreatestDamage(
    totalDamage: AttackPowerTypeMap<number>,
    includeStatusEffects: boolean,
) {
    if (!includeStatusEffects) {
        totalDamage.Bleed = 0;
        totalDamage.Curse = 0;
        totalDamage.Poison = 0;
        totalDamage.Petrify = 0;
    }

    let highestDamage = 0;
    for (const value of Object.values(totalDamage)) {
        if (value > highestDamage) {
            highestDamage = value;
        }
    }
    return Math.floor(highestDamage);
}

export default function WeaponSorting() {
    // Context
    const equippedWeapons = useEquippedWeapons();
    const virtualAttributes = useVirtualAttributes();
    const equippedRings = useEquippedRings();
    const equippedArmorSet = useEquippedArmorSet();
    const {
        reinforcementLevel,
        mustMeetRequirements,
        compareTotalDamage,
        includeStatusEffects,
        mustBeInInventory,
    } = useWeaponSorting();
    const setWeaponSorting = useWeaponSortingDispatch();
    const twoHanding = useTwoHanding();
    const weaponInventory = useWeaponInventory();

    // State
    const weaponData = useMemo(() => {
        let rows: WeaponAttackRow[] = [];
        const effectiveAttributes: AttributeMap<number> = {
            ...virtualAttributes,
            Strength: Math.floor(
                twoHanding
                    ? virtualAttributes.Strength * 1.5
                    : virtualAttributes.Strength,
            ),
        };
        const filteredWeapons = Weapons.filter((weapon) => {
            let inInventory = true;
            let requirementsMet = true;

            if (mustBeInInventory) {
                // Filter out weapons that are not in the inventory
                inInventory = weaponInventory.some(
                    (invWeapon) => invWeapon.name === weapon.Name,
                );
            }

            if (mustMeetRequirements) {
                // Filter out weapons that don't meet the requirements
                requirementsMet = meetsRequirements(
                    weapon,
                    effectiveAttributes,
                );
            }

            return inInventory && requirementsMet;
        });

        for (const weapon of filteredWeapons) {
            let row: WeaponAttackRow = {
                weapon: weapon,
            } as WeaponAttackRow;
            let max = 0;
            row.max = max;

            for (const infusion of weapon.Infusions) {
                const infusedWeapon = EquippedWeapon.fromWeapon(weapon);
                infusedWeapon.infusionKey = infusion.Name as InfusionMapKey;

                // Set the reinforcement level from the config
                const maxReinforcementLevel = weapon.MaxReinforcementLevel;
                if (
                    weapon.Name === "Fists" ||
                    weapon.Name === "Fist (Vanquisher's Seal)"
                ) {
                    infusedWeapon.reinforcementLevel = 0;
                }
                switch (maxReinforcementLevel) {
                    case 0:
                        infusedWeapon.reinforcementLevel = 0;
                        break;
                    case 5:
                        infusedWeapon.reinforcementLevel = Math.floor(
                            reinforcementLevel / 2,
                        );
                        break;
                    default:
                        infusedWeapon.reinforcementLevel = reinforcementLevel;
                        break;
                }

                // Calculate the total damage
                const totalDamage = infusedWeapon.totalDamage(
                    equippedWeapons,
                    effectiveAttributes,
                    equippedArmorSet,
                    equippedRings,
                );

                let attackRating = 0;
                if (compareTotalDamage) {
                    // Calculate the attack rating by summing all the damages
                    attackRating = getTotalOfDamages(
                        totalDamage,
                        includeStatusEffects,
                    );
                } else {
                    // Calculate the attack rating by finding the highest damage
                    attackRating = getGreatestDamage(
                        totalDamage,
                        includeStatusEffects,
                    );
                }

                row[infusion.Name as InfusionMapKey] = attackRating;

                if (max === 0 || attackRating > max) {
                    max = attackRating;
                }

                row.max = max;
            }

            // Filter out weapons that don't have any infusion
            if (isEmptyRow(row)) {
                continue;
            }

            rows.push(row);
        }

        return rows;
    }, [
        equippedWeapons,
        virtualAttributes,
        equippedRings,
        equippedArmorSet,
        reinforcementLevel,
        mustMeetRequirements,
        compareTotalDamage,
        twoHanding,
        includeStatusEffects,
        mustBeInInventory,
        weaponInventory,
    ]);

    return (
        <div className="flex flex-col w-full items-center">
            <h3 className="text-lg font-bold">Weapon Sorting</h3>

            <div className="grid grid-cols-3 gap-5 w-full">
                {/* TODO: Configs */}
                <div className="grid grid-cols-2 gap-1 w-full items-start">
                    {/* TODO: Miscellanous configs */}
                    <div className="flex flex-col w-full items-center justify-center align-center">
                        <div className="w-full items-center justify-center align-center">
                            <h4 className="text-md font-bold text-center">
                                Parameters
                            </h4>
                            <hr />
                        </div>

                        <div className="list flex flex-col w-full items-center justify-center align-center">
                            <div className="item flex w-full items-center justify-between p-2">
                                <label>Reinforcement Level</label>
                                {/* Force weapon results to have this reinforcement level */}
                                <select
                                    value={reinforcementLevel}
                                    className="flex"
                                    onChange={(e) =>
                                        setWeaponSorting({
                                            key: "reinforcementLevel",
                                            value: parseInt(e.target.value),
                                        })
                                    }
                                >
                                    <option value="0">+0/+0</option>
                                    <option value="1">+1/+0</option>
                                    <option value="2">+2/+1</option>
                                    <option value="3">+3/+1</option>
                                    <option value="4">+4/+2</option>
                                    <option value="5">+5/+2</option>
                                    <option value="6">+6/+3</option>
                                    <option value="7">+7/+3</option>
                                    <option value="8">+8/+4</option>
                                    <option value="9">+9/+4</option>
                                    <option value="10">+10/+5</option>
                                </select>
                            </div>

                            {/* Filter out weapons with unmet attribute requirements */}
                            <button
                                className="item flex w-full items-center justify-between hover:bg-accent"
                                onClick={() =>
                                    setWeaponSorting({
                                        key: "mustMeetRequirements",
                                        value: !mustMeetRequirements,
                                    })
                                }
                            >
                                {mustMeetRequirements ? "FILTER" : "ALLOW"}{" "}
                                weapons with unmet requirements
                            </button>

                            {/* Compare the total damage of the weapon or the greatest damage type */}
                            <button
                                className="item flex w-full items-center justify-between hover:bg-accent"
                                onClick={() =>
                                    setWeaponSorting({
                                        key: "compareTotalDamage",
                                        value: !compareTotalDamage,
                                    })
                                }
                            >
                                Compare{" "}
                                {compareTotalDamage
                                    ? "TOTAL OF DAMAGE TYPES"
                                    : "GREATEST DAMAGE TYPE"}{" "}
                                for sorting
                            </button>

                            {/* Ignore status effect (i.e. poison, bleed, petrify, curse) values for the sake of sorting */}
                            <button
                                className="item flex w-full items-center justify-between hover:bg-accent"
                                onClick={() =>
                                    setWeaponSorting({
                                        key: "includeStatusEffects",
                                        value: !includeStatusEffects,
                                    })
                                }
                            >
                                {includeStatusEffects ? "INCLUDE" : "IGNORE"}{" "}
                                status effects for sorting
                            </button>

                            {/* Ignore weapons not in the character's inventory */}
                            <button
                                className="item flex w-full items-center justify-between hover:bg-accent"
                                onClick={() =>
                                    setWeaponSorting({
                                        key: "mustBeInInventory",
                                        value: !mustBeInInventory,
                                    })
                                }
                            >
                                {mustBeInInventory ? "FILTER" : "ALLOW"} weapons
                                not in inventory
                            </button>
                        </div>
                        <hr />

                        {/* Allowed infusions */}
                        <h4 className="text-md font-bold text-center">
                            Infusions
                        </h4>
                        <div className="flex flex-col w-full items-center justify-center align-center">
                            {/* TODO: Buttons to enable/disable all infusions */}
                            <div className="flex gap-4 w-full items-center justify-between align-center">
                                <button className="w-full">ALL</button>
                                <button className="w-full">NONE</button>
                            </div>

                            {/* TODO: Checkbox list of infusions */}
                            <div className="list flex flex-col w-full items-center justify-center align-center">
                                {InfusionMapKeys.map((infusion) => (
                                    <div
                                        key={infusion}
                                        className="item flex w-full items-center justify-between"
                                    >
                                        <label>{infusion}</label>
                                        <input type="checkbox" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />

                        {/* TODO: Damage type filters */}
                        <div className="flex flex-col w-full items-center justify-center align-center">
                            <h4 className="text-md font-bold text-center">
                                Damage Types
                            </h4>

                            {/* TODO: Buttons that will enable/disable all damage types */}
                            <div className="flex gap-4 w-full items-center justify-between align-center">
                                <button className="w-full">ALL</button>
                                <button className="w-full">NONE</button>
                            </div>

                            {/* TODO: Toggle for negation of the filter */}
                            <button className="w-full">
                                ONLY INCLUDE results that contain...
                            </button>

                            {/* TODO: Radio list for filter logic */}
                            <div className="flex flex-col w-full items-center justify-center align-center">
                                {/* TODO: Only include results that contain any (i.e. at least one) of the selected damage types */}
                                <div className="item flex w-full items-center justify-between p-2">
                                    <label>ANY of the following</label>
                                    <input
                                        type="radio"
                                        id="ANY"
                                        name="filterLogic"
                                        value="ANY"
                                    />
                                </div>

                                {/* TODO: Only include results that contain all of the selected damage types */}
                                <div className="item flex w-full items-center justify-between p-2">
                                    <label>ALL of the following</label>
                                    <input
                                        type="radio"
                                        id="ALL"
                                        name="filterLogic"
                                        value="ALL"
                                    />
                                </div>

                                {/* TODO: Only include results that contain exactly the selected damage types */}
                                <div className="item flex w-full items-center justify-between p-2">
                                    <label>EXACTLY the following</label>
                                    <input
                                        type="radio"
                                        id="EXACTLY"
                                        name="filterLogic"
                                        value="EXACTLY"
                                    />
                                </div>

                                {/* Checkbox list for damage types */}
                                <div className="list flex flex-col w-full items-center justify-center align-center">
                                    {AttackPowerTypes.map((type) => (
                                        <div
                                            key={type}
                                            className="item flex w-full items-center justify-between"
                                        >
                                            <label>{type}</label>
                                            <input type="checkbox" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weapon categories */}
                    <div className="flex flex-col w-full items-center justify-center align-center">
                        <h4 className="text-md font-bold">Categories</h4>
                        <div className="flex gap-4 w-full items-center justify-between align-center">
                            <button className="w-full">ALL</button>
                            <button className="w-full">NONE</button>
                        </div>
                        <hr />

                        <h4 className="text-md font-bold">Weapons</h4>
                        <div className="flex gap-4 w-full items-center justify-between align-center">
                            <button className="w-full">ALL</button>
                            <button className="w-full">NONE</button>
                        </div>

                        <div className="list flex flex-col w-full items-center justify-center align-center">
                            {WeaponCategories.map((category) => (
                                <div
                                    key={category}
                                    className="item flex w-full items-center justify-between"
                                >
                                    <label>{category}</label>
                                    <input type="checkbox" />
                                </div>
                            ))}
                        </div>
                        <hr />

                        {/* Bow categories */}
                        <div className="flex flex-col w-full items-center justify-center align-center">
                            <h4 className="text-md font-bold">Bows</h4>

                            <div className="list flex flex-col w-full items-center justify-center align-center">
                                {BowCategories.map((bow) => (
                                    <div
                                        key={bow}
                                        className="item flex w-full items-center justify-between"
                                    >
                                        <label>{bow}</label>
                                        <input type="checkbox" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />

                        {/* Shield categories */}
                        <div className="flex flex-col w-full items-center justify-center align-center">
                            <h4 className="text-md font-bold">Shields</h4>

                            <div className="list flex flex-col w-full items-center justify-center align-center">
                                {ShieldCategories.map((shield) => (
                                    <div
                                        key={shield}
                                        className="item flex w-full items-center justify-between"
                                    >
                                        <label>{shield}</label>
                                        <input type="checkbox" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />

                        {/* Catalyst categories */}
                        <div className="flex flex-col w-full items-center justify-center align-center">
                            <h4 className="text-md font-bold">Catalysts</h4>

                            <div className="list flex flex-col w-full items-center justify-center align-center">
                                {CatalystCategories.map((catalyst) => (
                                    <div
                                        key={catalyst}
                                        className="item flex w-full items-center justify-between"
                                    >
                                        <label>
                                            {catalyst === "Hands"
                                                ? "Pyromancy Flame"
                                                : catalyst}
                                        </label>
                                        <input type="checkbox" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="flex flex-col col-span-2 w-full h-full items-center justify-start align-center">
                    <h4 className="text-md font-bold">
                        Attack Rating per Infusion
                    </h4>
                    <hr />

                    <WeaponAttackTable rows={weaponData} />
                </div>
            </div>
        </div>
    );
}
