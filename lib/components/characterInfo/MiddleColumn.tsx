import WeaponDisplay from "@/lib/components/characterInfo/middleColumn/WeaponDisplay";
import StatDisplay from "@/lib/components/characterInfo/StatDisplay";
import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";

export default function MiddleColumn() {
    return (
        <div className="flex flex-col w-full h-full items-left justify-baseline align-center">
            {/* Stats */}
            <div className="flex flex-col w-full items-left justify-baseline align-center">
                {/* HP */}
                <StatDisplay
                    statMapKey="MaximumHP"
                    displayValue="826"
                    isOddRow
                />

                {/* Stamina */}
                <StatDisplay statMapKey="MaximumStamina" displayValue="92" />

                {/* Equip load */}
                <StatDisplay
                    statMapKey="MaximumEquipLoad"
                    displayValue="0/47.5"
                    isOddRow
                />

                {/* Poise */}
                <StatDisplay statMapKey="Poise" displayValue="1.5" />

                {/* Attunement slots */}
                <StatDisplay
                    statMapKey="SpellSlotCount"
                    displayValue="0"
                    isOddRow
                />
            </div>

            <hr />

            {/* Armor */}
            {/* TODO: make these affect attributes/stats */}
            <div className="flex flex-col w-full items-left justify-baseline align-center gap-1">
                {/* Helmets */}
                <div className="flex gap-1 w-full justify-between">
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor="helmet"
                    >
                        Helmet:
                    </label>
                    <select
                        className="flex text-right h-full"
                        id="helmet"
                        defaultValue="0"
                    >
                        {Helmets.map((helmet) => (
                            <option key={helmet.Name} value={helmet.Name}>
                                {helmet.Name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Chestpieces */}
                <div
                    className="flex gap-1 w-full justify-between"
                    style={{
                        backgroundColor: "var(--primary)",
                    }}
                >
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor="chestpiece"
                    >
                        Chestpiece:
                    </label>
                    <select
                        className="flex text-right h-full"
                        id="chestpiece"
                        defaultValue="0"
                    >
                        {Chestpieces.map((chestpiece) => (
                            <option
                                key={chestpiece.Name}
                                value={chestpiece.Name}
                            >
                                {chestpiece.Name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Gauntlets */}
                <div className="flex gap-1 w-full justify-between">
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor="gauntlets"
                    >
                        Gauntlets:
                    </label>
                    <select
                        className="flex text-right h-full"
                        id="gauntlets"
                        defaultValue="0"
                    >
                        {Gauntlets.map((gauntlet) => (
                            <option key={gauntlet.Name} value={gauntlet.Name}>
                                {gauntlet.Name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Leggings */}
                <div
                    className="flex gap-1 w-full justify-between"
                    style={{
                        backgroundColor: "var(--primary)",
                    }}
                >
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor="leggings"
                    >
                        Leggings:
                    </label>
                    <select
                        className="flex text-right h-full"
                        id="leggings"
                        defaultValue="0"
                    >
                        {Leggings.map((legging) => (
                            <option key={legging.Name} value={legging.Name}>
                                {legging.Name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <hr />

            {/* Weapons */}
            <div className="grid grid-cols-2 gap-1 w-full justify-between">
                {/* Left hand */}
                <div className="text-left col-span-1 flex flex-col w-full justify-between">
                    <p className="flex w-full">Left Hand</p>
                    <WeaponDisplay slot="LeftHandWeaponPrimary" />
                    <WeaponDisplay slot="LeftHandWeaponSecondary" />
                    <WeaponDisplay slot="LeftHandWeaponTertiary" />
                </div>

                {/* Right hand */}
                <div className="text-right col-span-1 flex items-end flex-col w-full">
                    <p className="w-full">Right Hand</p>
                    <WeaponDisplay slot="RightHandWeaponPrimary" />
                    <WeaponDisplay slot="RightHandWeaponSecondary" />
                    <WeaponDisplay slot="RightHandWeaponTertiary" />
                </div>

                {/* TODO: make this affect stat calculation */}
                <input id="two-handing" type="checkbox" />
                <label htmlFor="two-handing">Two-Handed</label>
            </div>

            <hr />

            {/* Rings */}
            {/* TODO: update with real options */}
            <div className="grid grid-cols-2 gap-1 w-full">
                <p className="col-span-2 flex items-center justify-center h-full">
                    Rings
                </p>
                <select
                    className="col-span-1 flex text-left h-full w-full"
                    defaultValue="0"
                >
                    <option value="0">None</option>
                </select>
                <select
                    className="col-span-1 flex text-right h-full w-full"
                    defaultValue="0"
                >
                    <option value="0">None</option>
                </select>
                <select
                    className="col-span-1 flex text-left h-full w-full"
                    defaultValue="0"
                >
                    <option value="0">None</option>
                </select>
                <select
                    className="col-span-1 flex text-right h-full w-full"
                    defaultValue="0"
                >
                    <option value="0">None</option>
                </select>
            </div>
        </div>
    );
}
