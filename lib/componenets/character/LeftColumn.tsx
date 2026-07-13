import Class from "@/lib/interfaces/class";
import { useState } from "react";

export default function LeftColumn(params: { classes: Class[] }) {
    const [selectedClass, setSelectedClass] = useState<string>("Warrior");

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

                <select
                    id="starting-class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    {params.classes.map((c) => (
                        <option key={c.Name} value={c.Name}>
                            {c.Name}
                        </option>
                    ))}
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
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="12"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                disabled
                                value="12"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Vigor:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="7"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="7"
                                max="99"
                                defaultValue="7"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Endurance:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="6"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="6"
                                max="99"
                                defaultValue="6"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Vitality:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="6"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="6"
                                max="99"
                                defaultValue="6"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Attunement:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="5"
                                max="99"
                                defaultValue="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Strength:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="15"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="15"
                                max="99"
                                defaultValue="15"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Dexterity:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="11"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="11"
                                max="99"
                                defaultValue="11"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Adaptability:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="5"
                                max="99"
                                defaultValue="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Intelligence:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="5"
                                max="99"
                                defaultValue="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left">Faith:</td>
                        <td className="text-center">
                            <input
                                type="number"
                                disabled
                                value="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
                        <td className="text-right">
                            <input
                                type="number"
                                min="5"
                                max="99"
                                defaultValue="5"
                                className="text-right h-full max-w-15"
                            />
                        </td>
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
