import WeaponTooltip from "@/lib/components/WeaponTooltip";
import { Weapons } from "@/lib/gameData";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function WeaponInventory(): JSX.Element {
    // State
    const [weaponInventory, setWeaponInventory] = useState([
        Weapons.find((weapon) => weapon.Name === "Fists")!,
    ]);

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
                <div className="border rounded-lg p-1 w-full min-h-30 max-h-100 overflow-auto flex flex-col">
                    {Weapons.map((weapon, i) => {
                        return (
                            <WeaponTooltip
                                key={i}
                                equippedWeapon={{
                                    data: weapon,
                                    infusion: "Basic",
                                    reinforcementLevel: 0,
                                }}
                            >
                                <p
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
                            </WeaponTooltip>
                        );
                    })}
                </div>
                <div className="w-full h-full content-end">
                    <button className="border rounded-lg p-1 w-full">
                        Sorting configs...
                    </button>
                </div>
            </div>
        </div>
    );
}
