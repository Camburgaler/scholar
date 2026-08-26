import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import DamageDisplay from "@/lib/components/characterInfo/middleColumn/weaponDisplay/DamageDisplay";
import InfusionDisplay from "@/lib/components/characterInfo/middleColumn/weaponDisplay/InfusionDisplay";
import ReinforcementDisplay from "@/lib/components/characterInfo/middleColumn/weaponDisplay/ReinforcementDisplay";
import { Weapons } from "@/lib/gameData";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import {
    useEquippedWeapons,
    useEquippedWeaponsDispatch,
} from "@/lib/reducers/equippedWeapons";
import { getWeaponByName } from "@/lib/scripts/weapon";
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

    // State
    const [vanquishersSeal, setVanquishersSeal] = useState(false);

    // Constants
    const isRightHand =
        slot === "RightHandWeaponPrimary" ||
        slot === "RightHandWeaponSecondary" ||
        slot === "RightHandWeaponTertiary";

    // Effect
    useEffect(() => {
        // If the "Vanquisher's Seal" ring is equipped, set the "vanquishersSeal" state to true
        Object.entries(equippedRings).forEach(([key, ring]) => {
            if (ring.Name === "Vanquisher's Seal") {
                setVanquishersSeal(true);
            }
        });
    }, [equippedRings]);

    useEffect(() => {
        // If vanquishersSeal is true, set the equipped weapon to "Fist (Vanquisher's Seal)"
        if (
            vanquishersSeal &&
            equippedWeapons.getWeapon(slot).data.Name === "Fists"
        ) {
            setEquippedWeapons({
                slot: slot,
                equippedWeapon: {
                    data: getWeaponByName("Fist (Vanquisher's Seal)")!,
                    infusion: "Physical",
                    reinforcementLevel: 0,
                },
            });
        }
    }, [vanquishersSeal, equippedWeapons, setEquippedWeapons]);

    return (
        <div
            id={slot}
            className="col-span-1 flex flex-col w-full justify-between border rounded-md"
        >
            {/* TODO: Cleverer damage display? */}
            <DamageDisplay slot={slot} />
            <select
                className="w-full"
                value={equippedWeapons.getWeapon(slot).data.Name}
                onChange={(e) =>
                    setEquippedWeapons({
                        slot: slot,
                        equippedWeapon: {
                            data: getWeaponByName(e.target.value)!,
                            infusion: "Physical",
                            reinforcementLevel: 0,
                        },
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
                            ? weapon.Name !== "Majestic Greatsword (Left Hand)"
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
                <InfusionDisplay slot={slot} />
                <ReinforcementDisplay slot={slot} />
            </div>
        </div>
    );
}
