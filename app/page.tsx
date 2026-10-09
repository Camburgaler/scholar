"use client";

import ArmorInventory from "@/lib/components/ArmorInventory";
import CharacterInfo from "@/lib/components/CharacterInfo";
import Configs from "@/lib/components/Configs";
import WeaponInventory from "@/lib/components/WeaponInventory";
import { TwoHandingProvider } from "@/lib/reducers/attributes/twoHanding";
import { VirtualAttributesProvider } from "@/lib/reducers/attributes/virtualAttributes";
import { SortingConfigProvider } from "@/lib/reducers/configs/sortingConfig";
import { WikiTargetProvider } from "@/lib/reducers/configs/wikiTarget";
import { EquippedArmorSetProvider } from "@/lib/reducers/equipment/equippedArmorSet";
import { EquippedRingsProvider } from "@/lib/reducers/equipment/equippedRings";
import { EquippedWeaponsProvider } from "@/lib/reducers/equipment/equippedWeapons";
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
            <WikiTargetProvider>
                <SortingConfigProvider>
                    <TwoHandingProvider>
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
                                                    A build optimizer for Dark
                                                    Souls II: Scholar of the
                                                    First Sin
                                                </p>
                                            </div>
                                            <hr />

                                            <div className="app">
                                                {/* left column with armor info */}
                                                <article className="flex col-span-2 border rounded p-1 h-full">
                                                    <ArmorInventory />
                                                </article>
                                                {/* main column with build info */}
                                                <article className="flex col-span-3 border rounded p-1 h-full">
                                                    <CharacterInfo />
                                                </article>
                                                {/* right column with weapon info */}
                                                <article className="flex col-span-1 border rounded p-1 h-full">
                                                    <WeaponInventory />
                                                </article>
                                                {/* bottom section with configs */}
                                                <article className="flex col-span-6 border rounded p-1 h-full">
                                                    <Configs />
                                                </article>
                                            </div>
                                        </main>
                                    </VirtualAttributesProvider>
                                </EquippedRingsProvider>
                            </EquippedArmorSetProvider>
                        </EquippedWeaponsProvider>
                    </TwoHandingProvider>
                </SortingConfigProvider>
            </WikiTargetProvider>
        </div>
    );
}
