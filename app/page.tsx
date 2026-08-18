"use client";

import CharacterInfo from "@/lib/components/CharacterInfo";
import { EquippedArmorSetProvider } from "@/lib/reducers/equippedArmorSet";
import { EquippedRingsProvider } from "@/lib/reducers/equippedRings";
import { EquippedWeaponsProvider } from "@/lib/reducers/equippedWeapons";
import { VirtualAttributesProvider } from "@/lib/reducers/virtualAttributes";
import { JSX } from "react/jsx-runtime";

/**
 * Home
 * @description This is the top-level component of the app.
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
    return (
        // page container
        <div className="flex flex-col flex-1 items-center justify-center font-sans">
            {/* Reducers */}
            <EquippedWeaponsProvider>
                <EquippedArmorSetProvider>
                    <EquippedRingsProvider>
                        <VirtualAttributesProvider>
                            {/* content container */}
                            <main className="flex flex-1 w-full h-full flex-col items-center justify-baseline p-4 sm:items-start">
                                {/* Header */}
                                <div className="flex flex-col w-full items-center justify-center align-center">
                                    <h1 className="text-3xl font-bold align-center">
                                        SCHOLAR
                                    </h1>
                                    <p>
                                        A build optimizer for Dark Souls II:
                                        Scholar of the First Sin
                                    </p>
                                </div>
                                <hr />

                                <div className="app">
                                    {/* left column with armor info */}
                                    <article className="flex col-span-2 border rounded p-1 h-full">
                                        <h2 className="text-2xl text-left font-bold">
                                            Armor Inventory
                                        </h2>
                                        {/* TODO: add armor inventory container */}
                                        {/* TODO: add optimal armor calculation */}
                                        {/* TODO: add inventory system for armor: */}
                                        {/* TODO:     - every character has an armor inventory */}
                                        {/* TODO:     - inventory starts empty */}
                                        {/* TODO:     - player can add instances of armor to their character's inventory from a filterable list of armor pieces */}
                                        {/* TODO:     - player can add the currently displayed starting class's armor with one button */}
                                        {/* TODO:     - each armor piece links out to a wiki page for it */}
                                        {/* TODO:     - three views in armor inventory: */}
                                        {/* TODO:         - top three optimal armor sets from the character's inventory */}
                                        {/* TODO:             - can be clicked to auto-equip */}
                                        {/* TODO:         - list of armor pieces in character's inventory */}
                                        {/* TODO:             - can be interacted with to remove or upgrade armor pieces */}
                                        {/* TODO:         - collapsible list of all armor pieces in the game */}
                                        {/* TODO:             - starts collapsed */}
                                        {/* TODO:             - when opened, will expand into the empty space underneath the main three columns */}
                                        {/* TODO:             - can be interacted with to add instances of armor pieces to the character's inventory */}
                                        {/* TODO:             - has settings that can be configured for sorting */}
                                        {/* TODO:                 - target equip load breakpoint */}
                                        {/* TODO:                 - sorting presets */}
                                        {/* TODO:                 - how many optimal armor sets to show */}
                                        {/* TODO:                 - upgrade level */}
                                        {/* TODO:             - shows top X number of optimal armor sets */}
                                        {/* TODO:             - instructions/tips for sorting */}
                                        <hr />
                                    </article>
                                    {/* main column with build info */}
                                    <article className="flex col-span-3 border rounded p-1 h-full">
                                        <CharacterInfo />
                                    </article>
                                    {/* right column with weapon info */}
                                    <article className="flex col-span-1 border rounded p-1 h-full">
                                        <h2 className="text-2xl text-right font-bold">
                                            Weapon Inventory
                                        </h2>
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
                                        <hr />
                                    </article>
                                </div>
                            </main>
                        </VirtualAttributesProvider>
                    </EquippedRingsProvider>
                </EquippedArmorSetProvider>
            </EquippedWeaponsProvider>
        </div>
    );
}
