import LeftColumn from "./LeftColumn";
import MiddleColumn from "./MiddleColumn";

export default function CharacterInfo() {
    return (
        <div className="flex flex-col w-full items-center justify-center align-center">
            {/* Header */}
            <h2 className="text-2xl font-bold">Character</h2>
            <hr />

            {/* Content */}
            <div className="flex w-full h-full items-center justify-center align-center gap-4">
                <LeftColumn />

                <hr className="h-full max-w-px" />

                <MiddleColumn />

                <hr className="h-full max-w-px" />

                {/* Right column */}
                <div className="flex flex-col w-full h-full justify-baseline items-end align-center">
                    {/* Cast Speed */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="cast-speed"
                        >
                            Cast Speed:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="cast-speed"
                            type="number"
                            disabled
                            value="45"
                        />
                    </div>

                    {/* Agility */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="agility"
                        >
                            Agility:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="agility"
                            type="number"
                            disabled
                            value="85"
                        />
                    </div>

                    <hr />

                    {/* Attack: Strength */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="attack-strength"
                        >
                            Attack (Strength):
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="attack-strength"
                            type="number"
                            disabled
                            value="68"
                        />
                    </div>

                    {/* Attack: Dexterity */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="attack-dexterity"
                        >
                            Attack (Dexterity):
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="attack-dexterity"
                            type="number"
                            disabled
                            value="59"
                        />
                    </div>

                    {/* Magic Bonus */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="magic-bonus"
                        >
                            Magic Bonus:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="magic-bonus"
                            type="number"
                            disabled
                            value="51"
                        />
                    </div>

                    {/* Fire Bonus */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="fire-bonus"
                        >
                            Fire Bonus:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="fire-bonus"
                            type="number"
                            disabled
                            value="61"
                        />
                    </div>

                    {/* Lightning Bonus */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="lightning-bonus"
                        >
                            Lightning Bonus:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="lightning-bonus"
                            type="number"
                            disabled
                            value="53"
                        />
                    </div>

                    {/* Dark Bonus */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="dark-bonus"
                        >
                            Dark Bonus:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="dark-bonus"
                            type="number"
                            disabled
                            value="61"
                        />
                    </div>

                    {/* Poison Bonus */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="poison-bonus"
                        >
                            Poison Bonus:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="poison-bonus"
                            type="number"
                            disabled
                            value="56"
                        />
                    </div>

                    {/* Bleed Bonus */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="bleed-bonus"
                        >
                            Bleed Bonus:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="bleed-bonus"
                            type="number"
                            disabled
                            value="56"
                        />
                    </div>

                    <hr />

                    {/* Physical Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="physical-defense"
                        >
                            Physical Defense:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="physical-defense"
                            type="number"
                            disabled
                            value="77"
                        />
                    </div>

                    <ul className="flex flex-col w-full indent-4">
                        <li className="flex">
                            {/* Strike Defense */}
                            {/* TODO: update with calculations based on level/attributes */}
                            <div className="flex gap-1 w-full justify-between">
                                <label
                                    className="flex items-center justify-center h-full"
                                    htmlFor="strike-defense"
                                >
                                    {"VS Strike:"}
                                </label>
                                <input
                                    className="flex text-right h-full max-w-15"
                                    id="strike-defense"
                                    type="number"
                                    disabled
                                    value="77"
                                />
                            </div>
                        </li>
                        <li>
                            {/* Slash Defense */}
                            {/* TODO: update with calculations based on level/attributes */}
                            <div
                                className="flex gap-1 w-full justify-between"
                                style={{
                                    backgroundColor: "var(--primary)",
                                }}
                            >
                                <label
                                    className="flex items-center justify-center h-full"
                                    htmlFor="slash-defense"
                                >
                                    {"VS Slash:"}
                                </label>
                                <input
                                    className="flex text-right h-full max-w-15"
                                    id="slash-defense"
                                    type="number"
                                    disabled
                                    value="77"
                                />
                            </div>
                        </li>
                        <li>
                            {/* Thrust Defense */}
                            {/* TODO: update with calculations based on level/attributes */}
                            <div className="flex gap-1 w-full justify-between">
                                <label
                                    className="flex items-center justify-center h-full"
                                    htmlFor="thrust-defense"
                                >
                                    {"VS Thrust:"}
                                </label>
                                <input
                                    className="flex text-right h-full max-w-15"
                                    id="thrust-defense"
                                    type="number"
                                    disabled
                                    value="77"
                                />
                            </div>
                        </li>
                    </ul>

                    {/* Magic Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="magic-defense"
                        >
                            Magic Defense:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="magic-defense"
                            type="number"
                            disabled
                            value="30"
                        />
                    </div>

                    {/* Fire Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="fire-defense"
                        >
                            Fire Defense:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="fire-defense"
                            type="number"
                            disabled
                            value="68"
                        />
                    </div>

                    {/* Lightning Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div
                        className="flex gap-1 w-full justify-between"
                        style={{
                            backgroundColor: "var(--primary)",
                        }}
                    >
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="lightning-defense"
                        >
                            Lightning Defense:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="lightning-defense"
                            type="number"
                            disabled
                            value="30"
                        />
                    </div>

                    {/* Dark Defense */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="dark-defense"
                        >
                            Dark Defense:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="dark-defense"
                            type="number"
                            disabled
                            value="36"
                        />
                    </div>

                    <hr />

                    {/* Bleed Resistance */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="bleed-resistance"
                        >
                            Bleed Resistance:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="bleed-resistance"
                            type="number"
                            disabled
                            value="30"
                        />
                    </div>

                    {/* Poison Resistance */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="poison-resistance"
                        >
                            Poison Resistance:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="poison-resistance"
                            type="number"
                            disabled
                            value="30"
                        />
                    </div>

                    {/* Petrify Resistance */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="petrify-resistance"
                        >
                            Petrify Resistance:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="petrify-resistance"
                            type="number"
                            disabled
                            value="30"
                        />
                    </div>

                    {/* Curse Resistance */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <div className="flex gap-1 w-full justify-between">
                        <label
                            className="flex items-center justify-center h-full"
                            htmlFor="curse-resistance"
                        >
                            Curse Resistance:
                        </label>
                        <input
                            className="flex text-right h-full max-w-15"
                            id="curse-resistance"
                            type="number"
                            disabled
                            value="30"
                        />
                    </div>

                    <hr />

                    {/* Active Effects */}
                    {/* TODO: update with calculations based on level/attributes */}
                    <label
                        htmlFor="active-effects"
                        className="w-full text-left"
                    >
                        Active Effects:
                    </label>
                    <textarea
                        id="active-effects"
                        className="w-full"
                        rows={4}
                        readOnly
                        value=""
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
