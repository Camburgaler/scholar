import WeaponDisplay from "@/lib/components/characterInfo/middleColumn/WeaponDisplay";
import StatDisplay from "@/lib/components/characterInfo/StatDisplay";

export default function MiddleColumn() {
    return (
        <div className="flex flex-col w-full h-full items-left justify-baseline align-center">
            {/* HP */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="MaximumHP"
                displayValue="826"
                isOddRow
            />

            {/* Stamina */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="MaximumStamina"
                displayValue="92"
            />

            {/* Equip load */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="MaximumEquipLoad"
                displayValue="0/47.5"
                isOddRow
            />

            {/* Poise */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay levelUpStatusCalcParamKey="Poise" displayValue="1.5" />

            {/* Attunement slots */}
            {/* TODO: update with calculations based on level/attributes */}
            <StatDisplay
                levelUpStatusCalcParamKey="SpellSlotCount"
                displayValue="0"
                isOddRow
            />

            <hr />

            {/* Armor */}
            <div className="flex flex-col w-full items-left justify-baseline align-center gap-1">
                {/* Helmet */}
                {/* TODO: update with real options */}
                <div className="flex gap-1 w-full justify-between">
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor="helmet"
                    >
                        Helmet:
                    </label>
                    <select
                        className="flex text-right h-full max-w-15"
                        id="helmet"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                </div>

                {/* Chestpiece */}
                {/* TODO: update with real options */}
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
                        className="flex text-right h-full max-w-15"
                        id="chestpiece"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                </div>

                {/* Gauntlets */}
                {/* TODO: update with real options */}
                <div className="flex gap-1 w-full justify-between">
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor="gauntlets"
                    >
                        Gauntlets:
                    </label>
                    <select
                        className="flex text-right h-full max-w-15"
                        id="gauntlets"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                </div>

                {/* Leggings */}
                {/* TODO: update with real options */}
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
                        className="flex text-right h-full max-w-15"
                        id="leggings"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
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
