import EquippedWeapon from "@/lib/classes/equippedWeapon";
import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import DamageDisplay from "@/lib/components/characterInfo/middleColumn/weaponDisplay/DamageDisplay";
import InfusionDisplay from "@/lib/components/common/InfusionDisplay";
import ReinforcementDisplay from "@/lib/components/common/ReinforcementDisplay";
import WeaponTooltip from "@/lib/components/common/WeaponTooltip";
import { Weapons } from "@/lib/gameData";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import {
    useEquippedWeapons,
    useEquippedWeaponsDispatch,
} from "@/lib/reducers/equipment/equippedWeapons";
import {
    useWeaponInventory,
    useWeaponInventoryDispatch,
} from "@/lib/reducers/equipment/weaponInventory";
import { getWeaponById, getWeaponByName } from "@/lib/scripts/weapon";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

/**
 * WeaponDisplay
 * @description A component that displays one of the character's weapons
 * @prop slot: The slot of the weapon to display. {@link WeaponEquipSlot}.
 */
export default function WeaponDisplay(props: {
    slot: WeaponEquipSlot;
}): JSX.Element {
    // Props
    const { slot } = props;

    // Context
    const equippedRings = useEquippedRings();
    const equippedWeapons = useEquippedWeapons();
    const setEquippedWeapons = useEquippedWeaponsDispatch();
    const weaponInventory = useWeaponInventory();
    const setWeaponInventory = useWeaponInventoryDispatch();

    // State
    const [vanquishersSeal, setVanquishersSeal] = useState(false);

    // Constants
    const isRightHand =
        slot === "rightPrimary" ||
        slot === "rightSecondary" ||
        slot === "rightTertiary";

    // Effect
    useEffect(() => {
        // If the "Vanquisher's Seal" ring is equipped, set the "vanquishersSeal" state to true
        let isVanquishersSealEquipped = false;
        Object.entries(equippedRings).forEach(([_, ring]) => {
            if (ring.Name === "Vanquisher's Seal") {
                isVanquishersSealEquipped = true;
            }
        });
        setVanquishersSeal(isVanquishersSealEquipped);
    }, [equippedRings, setVanquishersSeal]);

    useEffect(() => {
        // If vanquishersSeal is true, set the equipped weapon to "Fist (Vanquisher's Seal)"
        if (
            vanquishersSeal &&
            equippedWeapons.getWeapon(slot).name === "Fists"
        ) {
            setEquippedWeapons({
                slot: slot,
                equippedWeapon: EquippedWeapon.fromWeapon(
                    getWeaponByName("Fist (Vanquisher's Seal)")!,
                ),
            });
        } else if (
            !vanquishersSeal &&
            equippedWeapons.getWeapon(slot).name === "Fist (Vanquisher's Seal)"
        ) {
            setEquippedWeapons({
                slot: slot,
                equippedWeapon: EquippedWeapon.fromWeapon(
                    getWeaponByName("Fists")!,
                ),
            });
        }
    }, [vanquishersSeal, equippedWeapons, setEquippedWeapons]);

    useEffect(() => {
        // If the equipped weapon is removed from the inventory, set the equipped weapon to "Fists"
        if (
            getWeaponById(
                weaponInventory,
                equippedWeapons.getWeapon(slot).id,
            ) === undefined
        ) {
            setEquippedWeapons({
                slot: slot,
                equippedWeapon: EquippedWeapon.fromWeapon(
                    getWeaponByName("Fists")!,
                ),
            });
        }
    }, [weaponInventory, setEquippedWeapons]);

    useEffect(() => {
        // If a weapon is equipped that is not in the inventory, add it to the inventory
        if (
            getWeaponById(
                weaponInventory,
                equippedWeapons.getWeapon(slot).id,
            ) === undefined
        ) {
            setWeaponInventory({
                action: "add",
                data: equippedWeapons.getWeapon(slot),
            });
        }
    }, [equippedWeapons, setWeaponInventory]);

    return (
        <WeaponTooltip
            side={isRightHand ? "right" : "left"}
            equippedWeapon={equippedWeapons.getWeapon(slot)}
        >
            <div
                id={slot}
                className="col-span-1 flex flex-col w-full justify-between border rounded-md"
            >
                <DamageDisplay slot={slot} />
                <select
                    className="w-full"
                    value={equippedWeapons.getWeapon(slot).name}
                    onChange={(e) =>
                        setEquippedWeapons({
                            slot: slot,
                            equippedWeapon: EquippedWeapon.fromWeapon(
                                getWeaponByName(e.target.value)!,
                            ),
                        })
                    }
                >
                    {Weapons.filter((weapon) =>
                        // Filter so that the "Vanquisher's Seal" ring acts as a toggle between "Fists" and "Fist (Vanquisher's Seal)",
                        vanquishersSeal
                            ? weapon.Name !== "Fists"
                            : weapon.Name !== "Fist (Vanquisher's Seal)",
                    )
                        .filter((weapon) =>
                            // Filter so that the "Majestic Greatsword (Left Hand)" and "Majestic Greatsword (Right Hand)" only appear on the appropriate hands
                            isRightHand
                                ? weapon.Name !==
                                  "Majestic Greatsword (Left Hand)"
                                : weapon.Name !==
                                  "Majestic Greatsword (Right Hand)",
                        )
                        .map((weapon) => (
                            <option key={weapon.Name} value={weapon.Name}>
                                {weapon.Name}
                            </option>
                        ))}
                </select>
                <div className="flex w-full justify-between">
                    <InfusionDisplay
                        weapon={equippedWeapons.getWeapon(slot)}
                        updateFunc={(weapon: EquippedWeapon) => {
                            setEquippedWeapons({
                                slot: slot,
                                equippedWeapon: weapon,
                            });
                            setWeaponInventory({
                                action: "add",
                                data: weapon,
                            });
                        }}
                    />
                    <ReinforcementDisplay slot={slot} />
                </div>
            </div>
        </WeaponTooltip>
    );
}
