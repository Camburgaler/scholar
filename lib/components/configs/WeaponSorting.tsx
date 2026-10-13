import EquippedWeapon from "@/lib/classes/equippedWeapon";
import WeaponAttackTable, {
    WeaponAttackRow,
} from "@/lib/components/configs/weaponSorting/WeaponAttackTable";
import { Weapons } from "@/lib/gameData";
import { useVirtualAttributes } from "@/lib/reducers/attributes/virtualAttributes";
import { useEquippedArmorSet } from "@/lib/reducers/equipment/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equipment/equippedWeapons";
import { AttackPowerTypes } from "@/lib/types/attackPowerTypeMap";
import {
    BowCategories,
    CatalystCategories,
    ShieldCategories,
    WeaponCategories,
} from "@/lib/types/categoryMap";
import { InfusionMapKey, InfusionMapKeys } from "@/lib/types/infusionMap";
import { useMemo } from "react";

export default function WeaponSorting() {
    // Context
    const equippedWeapons = useEquippedWeapons();
    const virtualAttributes = useVirtualAttributes();
    const equippedRings = useEquippedRings();
    const equippedArmorSet = useEquippedArmorSet();

    // State
    const weaponData = useMemo(() => {
        let rows: WeaponAttackRow[] = [];

        for (const weapon of Weapons) {
            let row: WeaponAttackRow = {
                weapon: weapon,
            } as WeaponAttackRow;
            let max = 0;

            for (const infusion of weapon.Infusions) {
                const infusedWeapon = EquippedWeapon.fromWeapon(weapon);
                infusedWeapon.infusionKey = infusion.Name as InfusionMapKey;
                // TODO: include weapon reinforcement level
                // infusedWeapon.reinforcementLevel = 0;

                const totalDamage = infusedWeapon.totalDamage(
                    equippedWeapons,
                    virtualAttributes,
                    equippedArmorSet,
                    equippedRings,
                );

                const attackRating = Math.floor(
                    Object.values(totalDamage).reduce((a, b) => a + b, 0),
                );

                row[infusion.Name as InfusionMapKey] = attackRating;

                if (max === 0 || attackRating > max) {
                    max = attackRating;
                }

                row.max = max;
            }

            rows.push(row);
        }

        return rows;
    }, [equippedWeapons, virtualAttributes, equippedRings, equippedArmorSet]);

    return (
        <div className="flex flex-col w-full items-center">
            <h3 className="text-lg font-bold">Weapon Sorting</h3>

            <div className="grid grid-cols-3 gap-5 w-full">
                {/* TODO: Configs */}
                <div className="grid grid-cols-2 gap-1 w-full items-start">
                    {/* TODO: Miscellanous configs */}
                    {/* TODO: Create reducer */}
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
                                {/* TODO: Force weapon results to have this reinforcement level */}
                                <select defaultValue="0" className="flex">
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

                            {/* TODO: Filter out weapons with unmet attribute requirements */}
                            <div className="item flex w-full items-center justify-between p-2">
                                <label>
                                    Ignore Weapons With Unmet Requirements
                                </label>
                                <input type="checkbox" />
                            </div>

                            {/* TODO: Filter out unbuffable weapons */}
                            <div className="item flex w-full items-center justify-between p-2">
                                <label>Ignore Unbuffable Weapons</label>
                                <input type="checkbox" />
                            </div>

                            {/* TODO: Filter out weapons with more than one damage type */}
                            <div className="item flex w-full items-center justify-between p-2">
                                <label>Ignore Weapons With Split Damage</label>
                                <input type="checkbox" />
                            </div>

                            {/* TODO: Ignore status effect (i.e. poison, bleed, petrify, curse) values for the sake of sorting */}
                            <div className="item flex w-full items-center justify-between p-2">
                                <label>Ignore Status Effects</label>
                                <input type="checkbox" />
                            </div>
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
