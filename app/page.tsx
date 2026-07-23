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
                                <hr />
                            </article>
                        </div>
                    </main>
                </VirtualAttributesDispatchContext>
            </VirtualAttributesContext>
        </div>
    );
}
