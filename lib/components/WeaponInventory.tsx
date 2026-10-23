import EquippedWeapon from "@/lib/classes/equippedWeapon";
import InfusionDisplay from "@/lib/components/common/InfusionDisplay";
import ReinforcementDisplay from "@/lib/components/common/ReinforcementDisplay";
import VirtualizedList from "@/lib/components/common/VirtualizedList";
import WeaponTooltip from "@/lib/components/common/WeaponTooltip";
import { Weapons } from "@/lib/gameData";
import { useSortingConfigDispatch } from "@/lib/reducers/configs/sortingConfig";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import {
    useWeaponInventory,
    useWeaponInventoryDispatch,
} from "@/lib/reducers/equipment/weaponInventory";
import { InfusionMapKey } from "@/lib/types/infusionMap";
import { useEffect, useState } from "react";
import { ArrowUp, XLg } from "react-bootstrap-icons";
import { JSX } from "react/jsx-runtime";

export default function WeaponInventory(): JSX.Element {
    // Context
    const equippedRings = useEquippedRings();
    const setSortingConfig = useSortingConfigDispatch();
    const weaponInventory = useWeaponInventory();
    const setWeaponInventory = useWeaponInventoryDispatch();

    // Constants
    const allWeapons: EquippedWeapon[] = Weapons.flatMap((weapon) => {
        const infusedWeapons: EquippedWeapon[] = [];

        weapon.Infusions.forEach((infusion) => {
            const infusedWeapon = EquippedWeapon.fromWeapon(weapon);
            infusedWeapon.infusionKey = infusion.Name as InfusionMapKey;
            infusedWeapons.push(infusedWeapon);
        });

        return infusedWeapons;
    });

    // State
    const [defaultWeapon, setDefaultWeapon] = useState<EquippedWeapon>(
        EquippedWeapon.fromWeapon(
            Weapons.find((weapon) => weapon.Name === "Fists")!,
        ),
    );

    useEffect(() => {
        // If the "Vanquisher's Seal" ring is equipped, set the default weapon to "Fist (Vanquisher's Seal)"
        let isVanquishersSealEquipped = false;
        Object.entries(equippedRings).forEach(([_, ring]) => {
            if (ring.Name === "Vanquisher's Seal") {
                isVanquishersSealEquipped = true;
            }
        });

        if (isVanquishersSealEquipped) {
            setDefaultWeapon(
                EquippedWeapon.fromWeapon(
                    Weapons.find(
                        (weapon) => weapon.Name === "Fist (Vanquisher's Seal)",
                    )!,
                ),
            );
        } else {
            setDefaultWeapon(
                EquippedWeapon.fromWeapon(
                    Weapons.find((weapon) => weapon.Name === "Fists")!,
                ),
            );
        }
    }, [equippedRings]);

    useEffect(() => {
        setWeaponInventory({
            action: "add",
            data: defaultWeapon,
        });
    }, [defaultWeapon]);

    return (
        <div className="flex flex-col w-full h-full items-center justify-center align-center">
            <h2 className="text-2xl text-right font-bold">Weapon Inventory</h2>
            <hr />

            <div className="flex flex-col gap-1 w-full h-full items-center align-center">
                {/* Character inventory */}
                <VirtualizedList
                    list={weaponInventory}
                    height={75}
                    searchboxPlaceholder="Search inventory..."
                    renderFunc={(item: EquippedWeapon) => (
                        <WeaponTooltip equippedWeapon={item} side="left">
                            <div className="w-full flex flex-col items-center">
                                <div className="w-full flex items-center justify-between align-center">
                                    <p className="p-1">{item.name}</p>
                                    {item.name != "Fists" &&
                                    item.name != "Fist (Vanquisher's Seal)" ? (
                                        <button
                                            className="p-1"
                                            onClick={() => {
                                                setWeaponInventory({
                                                    action: "remove",
                                                    data: item,
                                                });
                                            }}
                                        >
                                            <XLg />
                                        </button>
                                    ) : null}
                                    {/* TODO: Add symbol and logic for "there is a more optimal infusion for this weapon" */}
                                    {/* TODO: Add symbol and logic for "this weapon at max reinforcement is more optimal than one of your current weapons at max reinforcement" */}
                                </div>
                                <div className="w-full flex items-center justify-baseline align-center">
                                    <InfusionDisplay
                                        weapon={item}
                                        updateFunc={(weapon: EquippedWeapon) =>
                                            setWeaponInventory({
                                                action: "add",
                                                data: weapon,
                                            })
                                        }
                                    />
                                    <ReinforcementDisplay
                                        weapon={item}
                                        updateFunc={(weapon: EquippedWeapon) =>
                                            setWeaponInventory({
                                                action: "add",
                                                data: weapon,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </WeaponTooltip>
                    )}
                    filterFunc={(item: EquippedWeapon, searchStr: string) => {
                        const name =
                            item.infusionKey !== "Standard"
                                ? `${item.infusionKey} ${item.name}`
                                : item.name;

                        return name.toLowerCase().includes(searchStr);
                    }}
                />

                {/* All weapons */}
                <VirtualizedList<EquippedWeapon>
                    list={allWeapons}
                    searchboxPlaceholder="Search all weapons..."
                    renderFunc={(item: EquippedWeapon) => (
                        <WeaponTooltip equippedWeapon={item} side="left">
                            <div className="flex items-center">
                                {item.name != "Fists" &&
                                item.name != "Fist (Vanquisher's Seal)" ? (
                                    <button
                                        className="p-1"
                                        onClick={() => {
                                            setWeaponInventory({
                                                action: "add",
                                                data: item,
                                            });
                                        }}
                                    >
                                        <ArrowUp />
                                    </button>
                                ) : null}
                                <p className="p-1">
                                    {item.infusionKey != "Standard"
                                        ? `${item.infusionKey} `
                                        : ""}
                                    {item.name}
                                </p>
                            </div>
                        </WeaponTooltip>
                    )}
                    filterFunc={(item: EquippedWeapon, searchStr: string) => {
                        const name =
                            item.infusionKey !== "Standard"
                                ? `${item.infusionKey} ${item.name}`
                                : item.name;

                        return name.toLowerCase().includes(searchStr);
                    }}
                />

                <div className="w-full h-full content-end">
                    <button
                        className="border rounded-lg p-1 w-full"
                        onClick={() => setSortingConfig({ value: "weapon" })}
                    >
                        Sorting configs...
                    </button>
                </div>
            </div>
        </div>
    );
}
