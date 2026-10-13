import EquippedWeapon from "@/lib/classes/equippedWeapon";
import VirtualizedList from "@/lib/components/common/VirtualizedList";
import WeaponTooltip from "@/lib/components/common/WeaponTooltip";
import { Weapons } from "@/lib/gameData";
import { useSortingConfigDispatch } from "@/lib/reducers/configs/sortingConfig";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { InfusionMapKey } from "@/lib/types/infusionMap";
import { useEffect, useState } from "react";
import { ArrowUp, XLg } from "react-bootstrap-icons";
import { JSX } from "react/jsx-runtime";

export default function WeaponInventory(): JSX.Element {
    // Context
    const equippedRings = useEquippedRings();
    const setSortingConfig = useSortingConfigDispatch();

    // Constants
    const allWeapons: EquippedWeapon[] = Weapons.flatMap((weapon) => {
        let infusedWeapons: EquippedWeapon[] = [];

        weapon.Infusions.forEach((infusion) => {
            let infusedWeapon = EquippedWeapon.fromWeapon(weapon);
            infusedWeapon.infusionKey = infusion.Name as InfusionMapKey;
            infusedWeapons.push(infusedWeapon);
        });

        return infusedWeapons;
    });

    // State
    const [defaultWeapon, setDefaultWeapon] = useState<EquippedWeapon>(
        EquippedWeapon.fromWeapon(
            Weapons.find((weapon) => weapon.Name === "Fists")!,
        ),
    );
    const [weaponInventory, setWeaponInventory] = useState<EquippedWeapon[]>([
        EquippedWeapon.fromWeapon(
            Weapons.find((weapon) => weapon.Name === defaultWeapon.name)!,
        ),
    ]);

    // Effects
    useEffect(() => {
        // If the "Vanquisher's Seal" ring is equipped, set the default weapon to "Fist (Vanquisher's Seal)"
        let isVanquishersSealEquipped = false;
        Object.entries(equippedRings).forEach(([_, ring]) => {
            if (ring.Name === "Vanquisher's Seal") {
                isVanquishersSealEquipped = true;
            }
        });

        if (isVanquishersSealEquipped) {
            setDefaultWeapon(
                EquippedWeapon.fromWeapon(
                    Weapons.find(
                        (weapon) => weapon.Name === "Fist (Vanquisher's Seal)",
                    )!,
                ),
            );
        } else {
            setDefaultWeapon(
                EquippedWeapon.fromWeapon(
                    Weapons.find((weapon) => weapon.Name === "Fists")!,
                ),
            );
        }
    }, [equippedRings]);

    useEffect(() => {
        // When the default weapon changes, update the weapon inventory
        const tempInventory = weaponInventory.filter(
            (weapon) =>
                weapon.name !== "Fists" &&
                weapon.name !== "Fist (Vanquisher's Seal)",
        );
        setWeaponInventory([defaultWeapon, ...tempInventory]);
    }, [defaultWeapon]);

    return (
        <div className="flex flex-col w-full h-full items-center justify-center align-center">
            <h2 className="text-2xl text-right font-bold">Weapon Inventory</h2>
            <hr />

            {/* TODO: add weapon sorting algorithm */}
            {/* TODO: add inventory system for weapons: */}
            {/* TODO:     - player can add the currently displayed starting class's weapons to their inventory with one button */}
            {/* TODO:     - three views in weapon inventory: */}
            {/* TODO:         - sorted weapons from within their inventory */}
            {/* TODO:             - each weapon is "generic", meaning that it can have its infusion changed as necessary */}
            {/* TODO:             - each weapon can be interacted with to remove from inventory, infuse, or upgrade */}
            {/* TODO:             - each weapon will show an icon next to it if it can be optimized via infusion */}
            {/* TODO:                 - the icon will be that of the optimal infusion */}
            {/* TODO:                 - to differentiate from the info that just shows what infusion the weapon currently has, there will be an exclamation point on the icon */}
            {/* TODO:         - collapsible configs for sorting */}
            {/* TODO:             - toggle for only showing weapons for which the character meets the requirements */}
            {/* TODO:             - toggle for only showing buffable weapons */}
            {/* TODO:             - toggle for showing weapons that use split damage */}
            {/* TODO:             - toggle for considering status effects in sorting calculations */}
            {/* TODO:             - filters based on infusion */}
            {/* TODO:             - filters based on attack power types */}
            {/* TODO:             - filters based on weapon category */}
            {/* TODO:             - instructions/tips for sorting */}

            <div className="flex flex-col gap-1 w-full h-full items-center align-center">
                {/* Character inventory */}
                {/* TODO: Sort using WeaponSorting */}
                <VirtualizedList
                    list={weaponInventory}
                    searchboxPlaceholder="Search inventory..."
                    renderFunc={(item: EquippedWeapon) => (
                        <WeaponTooltip equippedWeapon={item} side="left">
                            <div className="w-full flex items-center justify-between align-center">
                                <p className="p-1">{item.name}</p>
                                {item.name != "Fists" &&
                                item.name != "Fist (Vanquisher's Seal)" ? (
                                    <button
                                        className="p-1"
                                        onClick={() => {
                                            const index =
                                                weaponInventory.findIndex(
                                                    (weapon) => weapon === item,
                                                );
                                            let newWeaponInventory = [];
                                            for (
                                                let i = 0;
                                                i < weaponInventory.length;
                                                i++
                                            ) {
                                                if (i === index) {
                                                    continue;
                                                }

                                                newWeaponInventory.push(
                                                    weaponInventory[i],
                                                );
                                            }

                                            setWeaponInventory(
                                                newWeaponInventory,
                                            );
                                        }}
                                    >
                                        <XLg />
                                    </button>
                                ) : null}
                                {/* TODO: Add symbol and logic for "there is a more optimal infusion for this weapon" */}
                                {/* TODO: Add symbol and logic for "this weapon at max reinforcement is more optimal than one of your current weapons at max reinforcement" */}
                            </div>
                        </WeaponTooltip>
                    )}
                    filterFunc={(item: EquippedWeapon, searchStr: string) => {
                        const name =
                            item.infusionKey !== "Physical"
                                ? `${item.infusionKey} ${item.name}`
                                : item.name;

                        return name.toLowerCase().includes(searchStr);
                    }}
                />

                {/* All weapons */}
                <VirtualizedList
                    list={allWeapons}
                    searchboxPlaceholder="Search all weapons..."
                    renderFunc={(item: EquippedWeapon) => (
                        <WeaponTooltip equippedWeapon={item} side="left">
                            <div className="flex items-center">
                                {item.name != "Fists" &&
                                item.name != "Fist (Vanquisher's Seal)" ? (
                                    <button
                                        className="p-1"
                                        onClick={() => {
                                            setWeaponInventory([
                                                ...weaponInventory,
                                                item,
                                            ]);
                                        }}
                                    >
                                        <ArrowUp />
                                    </button>
                                ) : null}
                                <p className="p-1">
                                    {item.infusionKey != "Physical"
                                        ? `${item.infusionKey} `
                                        : ""}
                                    {item.name}
                                </p>
                            </div>
                        </WeaponTooltip>
                    )}
                    filterFunc={(item: EquippedWeapon, searchStr: string) => {
                        const name =
                            item.infusionKey !== "Physical"
                                ? `${item.infusionKey} ${item.name}`
                                : item.name;

                        return name.toLowerCase().includes(searchStr);
                    }}
                />

                <div className="w-full h-full content-end">
                    <button
                        className="border rounded-lg p-1 w-full"
                        onClick={() => setSortingConfig({ value: "weapon" })}
                    >
                        Sorting configs...
                    </button>
                </div>
            </div>
        </div>
    );
}
