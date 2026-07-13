export default function LeftColumn() {
    return (
        <div className="h-full flex flex-col w-full items-left justify-baseline align-baseline">
            {/* Starting class */}
            <div className="flex w-full items-left justify-between align-center">
                <label
                    className="flex items-center justify-center"
                    htmlFor="starting-class"
                >
                    Starting class:
                </label>

                {/* TODO: convert to <select> */}
                <select id="starting-class" defaultValue="warrior">
                    <option value="warrior">Warrior</option>
                </select>
            </div>
            <hr />

            {/* Stats */}
            {/* TODO: convert stat displays to <input> */}
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">STAT</th>
                        <th className="text-center">INITIAL</th>
                        <th className="text-right">DESIRED</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-left">Soul Level:</td>
                        <td className="text-center">12</td>
                        <td className="text-right">12</td>
                    </tr>
                    <tr>
                        <td className="text-left">Vigor:</td>
                        <td className="text-center">7</td>
                        <td className="text-right">7</td>
                    </tr>
                    <tr>
                        <td className="text-left">Endurance:</td>
                        <td className="text-center">6</td>
                        <td className="text-right">6</td>
                    </tr>
                    <tr>
                        <td className="text-left">Vitality:</td>
                        <td className="text-center">6</td>
                        <td className="text-right">6</td>
                    </tr>
                    <tr>
                        <td className="text-left">Attunement:</td>
                        <td className="text-center">5</td>
                        <td className="text-right">5</td>
                    </tr>
                    <tr>
                        <td className="text-left">Strength:</td>
                        <td className="text-center">15</td>
                        <td className="text-right">15</td>
                    </tr>
                    <tr>
                        <td className="text-left">Dexterity:</td>
                        <td className="text-center">11</td>
                        <td className="text-right">11</td>
                    </tr>
                    <tr>
                        <td className="text-left">Adaptability:</td>
                        <td className="text-center">5</td>
                        <td className="text-right">5</td>
                    </tr>
                    <tr>
                        <td className="text-left">Intelligence:</td>
                        <td className="text-center">5</td>
                        <td className="text-right">5</td>
                    </tr>
                    <tr>
                        <td className="text-left">Faith:</td>
                        <td className="text-center">5</td>
                        <td className="text-right">5</td>
                    </tr>
                </tbody>
            </table>
            <hr />

            {/* Souls */}
            <div className="grid grid-cols-2 w-full gap-1">
                {/* Souls to next level */}
                {/* TODO: add calculations to accurately display this data */}
                <div className="col-span-1 w-full flex flex-col justify-between">
                    <label
                        htmlFor="soulsToNextLevel"
                        className="w-full text-center"
                    >
                        Souls to next Level
                    </label>
                    <input
                        id="soulsToNextLevel"
                        disabled
                        type="number"
                        value="500"
                        className="w-full text-left"
                    />
                </div>
                {/* Total soul cost */}
                {/* TODO: add calculations to accurately display this data */}
                <div className="col-span-1 w-full flex flex-col justify-between">
                    <label
                        htmlFor="totalSoulCost"
                        className="w-full text-center"
                    >
                        Total Soul Cost
                    </label>
                    <input
                        id="totalSoulCost"
                        className="w-full text-right"
                        type="number"
                        disabled
                        value="0"
                    />
                </div>
                {/* Soul memory */}
                {/* TODO: add calculations to accurately display this data */}
                <div className="col-span-2 w-full flex flex-col justify-between">
                    <label htmlFor="soulMemory" className="w-full text-center">
                        Soul Memory
                    </label>
                    <input
                        id="soulMemory"
                        className="w-full text-center"
                        type="number"
                        disabled
                        value="0"
                    />
                </div>
            </div>
            <hr />

            {/* Covenant */}
            <div className="grid grid-cols-3 gap-1">
                <label
                    htmlFor="covenant"
                    className="flex col-span-1 w-full h-full text-center items-center justify-center"
                >
                    Covenant:
                </label>
                <select id="covenant" className="col-span-2 w-full text-center">
                    {/* TODO: add options */}
                    <option value="0">None</option>
                    <option value="1">One</option>
                </select>
            </div>
            <hr />

            {/* Spells */}
            <div className="flex flex-col min-h-20">
                <p>Spells, Miracles, and Pyromancies</p>
                <div className="grid grid-cols-2 gap-1">
                    {/* TODO: for each X points in ATT, add another <select> */}
                    {/* each <select> should take 1 column of the grid */}
                </div>
            </div>
        </div>
    );
}
