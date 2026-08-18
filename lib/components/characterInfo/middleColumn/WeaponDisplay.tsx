import { Weapons } from "@/lib/gameData";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";

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

    // State
    const [selected, setSelected] = useState("");

    return (
        <div
            id={slot}
            className="col-span-1 flex flex-col w-full justify-between"
        >
            {/* TODO: Make these values reflect the selected weapon */}
            {/* TODO: Color-code these values based on damage type */}
            <p className="w-full">(10/0/0/0/0)</p>
            <select
                className="w-full"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                {Weapons.map((weapon) => (
                    <option key={weapon.Name} value={weapon.Name}>
                        {weapon.Name}
                    </option>
                ))}
            </select>
        </div>
    );
}
