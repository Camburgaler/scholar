import WeaponDisplay from "@/lib/components/characterInfo/middleColumn/WeaponDisplay";
import StatDisplay from "@/lib/components/characterInfo/StatDisplay";
import {
    AttributeToStatMap,
    Chestpieces,
    Gauntlets,
    Helmets,
    Leggings,
} from "@/lib/gameData";
import {
    useEquippedArmor,
    useEquippedArmorDispatch,
} from "@/lib/reducers/equippedArmor";
import { useFocusedAttribute } from "@/lib/reducers/focusedAttribute";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import { calculateStatFromAttributes } from "@/lib/scripts/statCalculation";
import Armor from "@/lib/types/armor";
import { StatMapKeyToStatNameMap } from "@/lib/types/statMap";

function getEquipLoadPercentFromRatio(ratio: string) {
    const [numerator, denominator] = ratio.split("/").map(Number);
    return (numerator / denominator) * 100;
}

function getArmorByName(armorList: Armor[], name: string): Armor {
    return armorList.find((armor) => armor.Name === name) || armorList[0];
}

export default function MiddleColumn() {
    // Context
    const virtualAttributes = useVirtualAttributes();
    const equippedArmor = useEquippedArmor();
    const setEquippedArmor = useEquippedArmorDispatch();
    const focusedAttribute = useFocusedAttribute();

    // Helper Functions
    function filterArmor(armor: Armor[]) {
        return armor.filter(
            (armor) =>
                armor.Requirements.Strength <= virtualAttributes.Strength &&
                armor.Requirements.Dexterity <= virtualAttributes.Dexterity &&
                armor.Requirements.Intelligence <=
                    virtualAttributes.Intelligence &&
                armor.Requirements.Faith <= virtualAttributes.Faith,
        );
    }

    return (
        <div className="flex flex-col w-full h-full items-left justify-baseline align-center">
            {/* Stats */}
            <div className="flex flex-col w-full items-left justify-baseline align-center">
                {/* HP */}
                <StatDisplay statDisplayKey="MaximumHP" isOddRow />

                {/* Stamina */}
                <StatDisplay statDisplayKey="MaximumStamina" />

                {/* Equip load */}
                {/* <StatDisplay statMapKey="MaximumEquipLoad" isOddRow /> */}
                <div
                    className="flex gap-1 w-full justify-between"
                    style={{
                        backgroundColor: "var(--primary)",
                        fontWeight: AttributeToStatMap[focusedAttribute!]?.[
                            "MaximumEquipLoad"
                        ]!
                            ? "bold"
                            : "normal",
                    }}
                    id={"MaximumEquipLoad"}
                >
                    <label
                        className="flex items-center justify-center h-full"
                        htmlFor={"MaximumEquipLoad"}
                    >
                        {StatMapKeyToStatNameMap.get("MaximumEquipLoad")}:
                    </label>
                    <div className="flex flex-col items-end justify-end">
                        <input
                            className="flex text-right max-w-30 h-full"
                            style={{ border: "none" }}
                            id="equip-load"
                            type="text"
                            disabled
                            value={`${equippedArmor.weight.toFixed(1)}/${calculateStatFromAttributes("MaximumEquipLoad", virtualAttributes).toFixed(1)}`}
                        />
                        <input
                            className="flex text-right max"
                            disabled
                            style={{
                                border: "none",
                                color:
                                    getEquipLoadPercentFromRatio(
                                        `${equippedArmor.weight}/${calculateStatFromAttributes("MaximumEquipLoad", virtualAttributes)}`,
                                    ) > 100
                                        ? "red"
                                        : getEquipLoadPercentFromRatio(
                                                `${equippedArmor.weight}/${calculateStatFromAttributes("MaximumEquipLoad", virtualAttributes)}`,
                                            ) > 70
                                          ? "yellow"
                                          : "var(--contrast)",
                            }}
                            value={`${getEquipLoadPercentFromRatio(
                                `${equippedArmor.weight}/${calculateStatFromAttributes("MaximumEquipLoad", virtualAttributes)}`,
                            ).toFixed(2)}%`}
                        />
                    </div>
                </div>

                {/* Poise */}
                <StatDisplay statDisplayKey="Poise" />

                {/* Attunement slots */}
                <StatDisplay statDisplayKey="SpellSlotCount" isOddRow />
            </div>

            <hr />

            {/* Armor */}
            {/* TODO: make these affect attributes/stats */}
            {/* TODO: add lock toggles to these similar to the one for the starting class */}
            {/*     the lock would control how the armor optimization behaves */}
            {/*     (e.g. if the armor is locked, the optimization should not change it) */}
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
                        onChange={(e) =>
                            setEquippedArmor({
                                slot: "helmet",
                                armor: getArmorByName(Helmets, e.target.value),
                            })
                        }
                    >
                        {filterArmor(Helmets).map((helmet) => (
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
                        onChange={(e) =>
                            setEquippedArmor({
                                slot: "chestpiece",
                                armor: getArmorByName(
                                    Chestpieces,
                                    e.target.value,
                                ),
                            })
                        }
                    >
                        {filterArmor(Chestpieces).map((chestpiece) => (
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
                        onChange={(e) =>
                            setEquippedArmor({
                                slot: "gauntlets",
                                armor: getArmorByName(
                                    Gauntlets,
                                    e.target.value,
                                ),
                            })
                        }
                    >
                        {filterArmor(Gauntlets).map((gauntlet) => (
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
                        onChange={(e) =>
                            setEquippedArmor({
                                slot: "leggings",
                                armor: getArmorByName(Leggings, e.target.value),
                            })
                        }
                    >
                        {filterArmor(Leggings).map((legging) => (
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
