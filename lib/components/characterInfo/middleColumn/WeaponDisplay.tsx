import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
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
        Object.entries(equippedRings).forEach(([key, ring]) => {
            if (ring.Name === "Vanquisher's Seal") {
                setVanquishersSeal(true);
            }
        });
    });

    return (
        <div
            id={slot}
            className="col-span-1 flex flex-col w-full justify-between border rounded-md"
        >
            <div className="flex w-full justify-between">
                {/* TODO: Make these values reflect the selected weapon */}
                {/* TODO: Color-code these values based on damage type */}
                <p className="w-full content-end">(10/0/0/0/0)</p>
            </div>
            <select
                className="w-full"
                value={equippedWeapons.getWeapon(slot).data.Name}
                onChange={(e) =>
                    setEquippedWeapons({
                        slot: slot,
                        equippedWeapon: {
                            data: getWeaponByName(e.target.value)!,
                            infusion: "Basic",
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
