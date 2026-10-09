import { useSortingConfigDispatch } from "@/lib/reducers/configs/sortingConfig";

export default function ArmorInventory() {
    // Context
    const setSortingConfig = useSortingConfigDispatch();

    return (
        <div className="flex flex-col w-full h-full items-center justify-center align-center">
            <h2 className="text-2xl text-left font-bold">Armor Inventory</h2>
            <hr />
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

            <div className="w-full h-full content-end">
                <button
                    className="border rounded-lg p-1 w-full"
                    onClick={() => setSortingConfig({ value: "armor" })}
                >
                    Sorting configs...
                </button>
            </div>
        </div>
    );
}
