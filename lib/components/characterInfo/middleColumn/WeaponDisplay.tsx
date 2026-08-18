import { Weapons } from "@/lib/gameData";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import InfusionDisplay from "./weaponDisplay/infusionDisplay";
import ReinforcementDisplay from "./weaponDisplay/reinforcementDisplay";

/**
 * @type WeaponEquipSlot
 * @description Keys for the `slot` prop of the {@link WeaponDisplay} component
 */
type WeaponEquipSlot =
    | "LeftHandWeaponPrimary"
    | "LeftHandWeaponSecondary"
    | "LeftHandWeaponTertiary"
    | "RightHandWeaponPrimary"
    | "RightHandWeaponSecondary"
    | "RightHandWeaponTertiary";

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

    // State
    const [selected, setSelected] = useState("");
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
            className="col-span-1 flex flex-col w-full justify-between"
        >
            <div className="flex w-full justify-between">
                {isRightHand ? <InfusionDisplay /> : null}
                {isRightHand ? <ReinforcementDisplay /> : null}

                {/* TODO: Make these values reflect the selected weapon */}
                {/* TODO: Color-code these values based on damage type */}
                <p className="w-full content-end">(10/0/0/0/0)</p>

                {!isRightHand ? <ReinforcementDisplay /> : null}
                {!isRightHand ? <InfusionDisplay /> : null}
            </div>
            <select
                className="w-full"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
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
        </div>
    );
}
