import EquippedWeapon from "@/lib/classes/equippedWeapon";
import WeaponTooltip from "@/lib/components/WeaponTooltip";
import { Weapons } from "@/lib/gameData";
import { InfusionMapKey } from "@/lib/types/infusionMap";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function WeaponInventory(): JSX.Element {
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
    const [weaponInventory, setWeaponInventory] = useState([
        Weapons.find((weapon) => weapon.Name === "Fists")!,
    ]);
    const [weaponSearch, setWeaponSearch] = useState("");

    // Memos
    const filteredWeapons = useMemo(() => {
        const search = weaponSearch.trim().toLowerCase();

        if (!search) {
            return allWeapons;
        }

        return allWeapons.filter((weapon) => {
            const name =
                weapon.infusionKey !== "Physical"
                    ? `${weapon.infusionKey} ${weapon.name}`
                    : weapon.name;

            return name.toLowerCase().includes(search);
        });
    }, [weaponSearch]);

    // The scrollable element for your list
    const parentRef = useRef<HTMLDivElement>(null);

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count: filteredWeapons.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 32,
        overscan: 5,
    });

    // Effects
    // TODO: Vanquisher's Seal

    return (
        <div className="flex flex-col w-full h-full items-center justify-center align-center">
            <h2 className="text-2xl text-right font-bold">Weapon Inventory</h2>
            <hr />

            {/* TODO: add weapon inventory container */}
            {/* TODO: add weapon sorting algorithm */}
            {/* TODO: add inventory system for weapons: */}
            {/* TODO:     - every character has a weapon inventory */}
            {/* TODO:     - inventory starts empty */}
            {/* TODO:     - player can add instances of weapons to their character's inventory from a sortable list */}
            {/* TODO:     - player can add the currently displayed starting class's weapons to their inventory with one button */}
            {/* TODO:     - each weapon links out to a wiki page for it */}
            {/* TODO:     - three views in weapon inventory: */}
            {/* TODO:         - sorted weapons from within their inventory */}
            {/* TODO:             - each weapon is "generic", meaning that it can have its infusion changed as necessary */}
            {/* TODO:             - each weapon can be click-dragged onto a weapon slot to equip it */}
            {/* TODO:             - each weapon can be interacted with to remove from inventory, infuse, or upgrade */}
            {/* TODO:             - each weapon will show an icon next to it if it can be optimized via infusion */}
            {/* TODO:                 - the icon will be that of the optimal infusion */}
            {/* TODO:                 - to differentiate from the info that just shows what infusion the weapon currently has, there will be an exclamation point on the icon */}
            {/* TODO:         - sorted list of all weapons */}
            {/* TODO:             - each weapon is "specific", meaning that each weapon's infusion is listed as a separate weapon (see https://eldenring.tclark.io/) */}
            {/* TODO:             - each weapon can be interacted with to add to inventory */}
            {/* TODO:         - collapsible configs for sorting */}
            {/* TODO:             - starts collapsed */}
            {/* TODO:             - when opened, will expand into the empty space underneath the main three columns */}
            {/* TODO:             - configure upgrade level (will only affect specific weapons) */}
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
                <div className="border rounded-lg p-1 w-full min-h-30 flex flex-col overflow-auto">
                    {weaponInventory.map((weapon, i) => {
                        return (
                            <p
                                key={i}
                                style={{
                                    backgroundColor:
                                        i % 2 === 0
                                            ? "var(--primary)"
                                            : "var(--secondary)",
                                }}
                                className="p-1"
                            >
                                {weapon.Name}
                            </p>
                        );
                    })}
                </div>

                {/* All weapons */}
                <div className="relative border rounded-lg w-full h-100 flex flex-col">
                    {/* Searchbox */}
                    <div className="p-1 shrink-0">
                        <input
                            className="border rounded-lg p-1 w-full"
                            type="text"
                            placeholder="Search all weapons..."
                            value={weaponSearch}
                            onChange={(e) => setWeaponSearch(e.target.value)}
                        />
                    </div>

                    {/* Weapon list */}
                    <div className="overflow-auto" ref={parentRef}>
                        <div
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                width: "100%",
                                position: "relative",
                            }}
                        >
                            {rowVirtualizer
                                .getVirtualItems()
                                .map((virtualItem) => {
                                    const weapon =
                                        filteredWeapons[virtualItem.index];

                                    return (
                                        <div
                                            key={virtualItem.index}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: `${virtualItem.size}px`,
                                                transform: `translateY(${virtualItem.start}px)`,
                                            }}
                                        >
                                            <WeaponTooltip
                                                equippedWeapon={weapon}
                                                side="left"
                                            >
                                                {/* TODO: add button here for moving the weapon into the character's inventory */}
                                                <p
                                                    style={{
                                                        backgroundColor:
                                                            virtualItem.index %
                                                                2 ===
                                                            0
                                                                ? "var(--primary)"
                                                                : "var(--secondary)",
                                                    }}
                                                    className="p-1"
                                                >
                                                    {weapon.infusionKey !=
                                                    "Physical"
                                                        ? `${weapon.infusionKey} `
                                                        : ""}
                                                    {weapon.name}
                                                </p>
                                            </WeaponTooltip>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="w-full h-full content-end">
                    {/* TODO: Make this toggle visibiltiy for another section for customizing the sorting of the weapons in the weapon inventory */}
                    <button className="border rounded-lg p-1 w-full">
                        Sorting configs...
                    </button>
                </div>
            </div>
        </div>
    );
}
