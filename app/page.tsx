"use client";

import CharacterInfo from "@/lib/components/CharacterInfo";
import {
    VirtualAttributesContext,
    VirtualAttributesDispatchContext,
} from "@/lib/reducers/virtualAttributes";
import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { useReducer } from "react";

function virtualStatsReducer(
    initialStats: AttributeMap<number>,
    newStats: Map<AttributeMapKey, number>,
): AttributeMap<number> {
    return {
        ...initialStats,
        ...Object.fromEntries(newStats),
    };
}

export default function Home() {
    const [virtualStats, virtualStatsDispatch] = useReducer(
        virtualStatsReducer,
        {
            Vigor: 0,
            Endurance: 0,
            Vitality: 0,
            Adaptability: 0,
            Strength: 0,
            Dexterity: 0,
            Intelligence: 0,
            Faith: 0,
            Attunement: 0,
        },
    );

    return (
        // page container
        <div className="flex flex-col flex-1 items-center justify-center font-sans">
            {/* Reducers */}
            <VirtualAttributesContext value={virtualStats}>
                <VirtualAttributesDispatchContext value={virtualStatsDispatch}>
                    {/* content container */}
                    <main className="flex flex-1 w-full h-full flex-col items-center justify-baseline p-4 sm:items-start">
                        {/* Header */}
                        <div className="flex flex-col w-full items-center justify-center align-center">
                            <h1 className="text-3xl font-bold align-center">
                                SCHOLAR
                            </h1>
                            <p>
                                A build optimizer for Dark Souls II: Scholar of
                                the First Sin
                            </p>
                        </div>
                        <hr />

                        {/* Three columns, each about 30% of the page's width */}
                        <div className="app">
                            {/* left column with armor info */}
                            <article className="flex col-span-2 border rounded p-1 h-full">
                                <h2 className="text-2xl text-left font-bold">
                                    Armor Inventory
                                </h2>
                                {/* TODO: add armor inventory container */}
                                {/* TODO: add optimal armor calculation */}
                                {/* TODO: add inventory system for armor: */}
                                {/*     - every character has an armor inventory */}
                                {/*     - inventory starts empty */}
                                {/*     - player can add instances of armor to their character's inventory from a filterable list of armor pieces */}
                                {/*     - player can add the currently displayed starting class's armor with one button */}
                                {/*     - each armor piece links out to a wiki page for it */}
                                {/*     - three views in armor inventory: */}
                                {/*         - top three optimal armor sets from the character's inventory */}
                                {/*             - can be clicked to auto-equip */}
                                {/*         - list of armor pieces in character's inventory */}
                                {/*             - can be interacted with to remove or upgrade armor pieces */}
                                {/*         - collapsible list of all armor pieces in the game */}
                                {/*             - starts collapsed */}
                                {/*             - when opened, will expand into the empty space underneath the main three columns */}
                                {/*             - can be interacted with to add instances of armor pieces to the character's inventory */}
                                {/*             - has settings that can be configured for sorting */}
                                {/*                 - target equip load breakpoint */}
                                {/*                 - sorting presets */}
                                {/*                 - how many optimal armor sets to show */}
                                {/*                 - upgrade level */}
                                {/*             - shows top X number of optimal armor sets */}
                                {/*             - instructions/tips for sorting */}
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
                                {/*     - every character has a weapon inventory */}
                                {/*     - inventory starts empty */}
                                {/*     - player can add instances of weapons to their character's inventory from a sortable list */}
                                {/*     - player can add the currently displayed starting class's weapons to their inventory with one button */}
                                {/*     - each weapon links out to a wiki page for it */}
                                {/*     - three views in weapon inventory: */}
                                {/*         - sorted weapons from within their inventory */}
                                {/*             - each weapon is "generic", meaning that it can have its infusion changed as necessary */}
                                {/*             - each weapon can be click-dragged onto a weapon slot to equip it */}
                                {/*             - each weapon can be interacted with to remove from inventory, infuse, or upgrade */}
                                {/*             - each weapon will show an icon next to it if it can be optimized via infusion */}
                                {/*                 - the icon will be that of the optimal infusion */}
                                {/*                 - to differentiate from the info that just shows what infusion the weapon currently has, there will be an exclamation point on the icon */}
                                {/*         - sorted list of all weapons */}
                                {/*             - each weapon is "specific", meaning that each weapon's infusion is listed as a separate weapon (see https://eldenring.tclark.io/) */}
                                {/*             - each weapon can be interacted with to add to inventory */}
                                {/*         - collapsible configs for sorting */}
                                {/*             - starts collapsed */}
                                {/*             - when opened, will expand into the empty space underneath the main three columns */}
                                {/*             - configure upgrade level (will only affect specific weapons) */}
                                {/*             - toggle for only showing weapons for which the character meets the requirements */}
                                {/*             - toggle for only showing buffable weapons */}
                                {/*             - toggle for showing weapons that use split damage */}
                                {/*             - toggle for considering status effects in sorting calculations */}
                                {/*             - filters based on infusion */}
                                {/*             - filters based on attack power types */}
                                {/*             - filters based on weapon category */}
                                {/*             - instructions/tips for sorting */}
                                <hr />
                            </article>
                        </div>
                    </main>
                </VirtualAttributesDispatchContext>
            </VirtualAttributesContext>
        </div>
    );
}
