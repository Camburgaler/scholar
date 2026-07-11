export default function MiddleColumn() {
    return (
        <div className="text-xs flex gap-1 flex-col w-full h-full items-left justify-baseline align-center">
            {/* HP */}
            {/* TODO: update with calculations based on level/attributes */}
            <div className="flex gap-1 w-full justify-between">
                <label
                    className="flex items-center justify-center h-full"
                    htmlFor="hp"
                >
                    HP:
                </label>
                <input
                    className="flex text-right h-full max-w-15"
                    id="hp"
                    type="number"
                    disabled
                    value="826"
                />
            </div>

            {/* Stamina */}
            {/* TODO: update with calculations based on level/attributes */}
            <div className="flex gap-1 w-full justify-between">
                <label
                    className="flex items-center justify-center h-full"
                    htmlFor="stamina"
                >
                    Stamina:
                </label>
                <input
                    className="flex text-right h-full max-w-15"
                    id="stamina"
                    type="number"
                    disabled
                    value="92"
                />
            </div>

            {/* Equip load */}
            {/* TODO: update with calculations based on level/attributes */}
            <div className="flex gap-1 w-full justify-between">
                <label
                    className="flex items-center justify-center h-full"
                    htmlFor="equip-load"
                >
                    Equip Load:
                </label>
                <div>
                    <input
                        className="flex text-right max-w-15"
                        id="equip-load"
                        type="text"
                        disabled
                        value="0/47.5"
                    />
                    <p className=" flex items-center justify-center text-right">
                        Using 0%
                    </p>
                </div>
            </div>

            {/* Poise */}
            {/* TODO: update with calculations based on level/attributes */}
            <div className="flex gap-1 w-full justify-between">
                <label
                    className="flex items-center justify-center h-full"
                    htmlFor="poise"
                >
                    Poise:
                </label>
                <input
                    className="flex text-right h-full max-w-15"
                    id="poise"
                    type="number"
                    disabled
                    value="1.5"
                />
            </div>

            {/* Attunement slots */}
            {/* TODO: update with calculations based on level/attributes */}
            <div className="flex gap-1 w-full justify-between">
                <label
                    className="flex items-center justify-center h-full"
                    htmlFor="attunement-slots"
                >
                    Attunement Slots:
                </label>
                <input
                    className="flex text-right h-full max-w-15"
                    id="attunement-slots"
                    type="number"
                    disabled
                    value="0"
                />
            </div>

            <hr />

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
            <div className="flex gap-1 w-full justify-between">
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
            <div className="flex gap-1 w-full justify-between">
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

            <hr />

            <div className="grid grid-cols-2 gap-1 w-full justify-between">
                {/* Left hand */}
                {/* TODO: update with real options */}
                <div className="col-span-1 flex flex-col gap-1 w-full justify-between">
                    <p className="flex text-left w-full">Left Hand</p>
                    <p className="flex text-left w-full">(10/0/0/0)</p>
                    <select
                        className="text-left w-full"
                        id="left-hand"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                    <p className="flex text-left w-full">(10/0/0/0)</p>
                    <select
                        className="text-left w-full"
                        id="left-hand"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                    <p className="flex text-left w-full">(10/0/0/0)</p>
                    <select
                        className="text-left w-full"
                        id="left-hand"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                </div>

                {/* Right hand */}
                {/* TODO: update with real options */}
                <div className="col-span-1 flex items-end flex-col gap-1 w-full">
                    <p className="text-right w-full">Right Hand</p>
                    <p className=" text-right w-full">(10/0/0/0)</p>
                    <select
                        className="text-right w-full"
                        id="left-hand"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                    <p className=" text-right w-full">(10/0/0/0)</p>
                    <select
                        className="text-right w-full"
                        id="left-hand"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
                    <p className=" text-right w-full">(10/0/0/0)</p>
                    <select
                        className="text-right w-full"
                        id="left-hand"
                        defaultValue="0"
                    >
                        <option value="0">None</option>
                    </select>
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
