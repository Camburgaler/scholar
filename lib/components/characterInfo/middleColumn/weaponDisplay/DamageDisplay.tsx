import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import { useEquippedWeapons } from "@/lib/reducers/equippedWeapons";
import { JSX } from "react/jsx-runtime";

export default function DamageDisplay(props: {
    slot: WeaponEquipSlot;
}): JSX.Element {
    // Props
    const { slot } = props;

    // Context
    const equippedWeapons = useEquippedWeapons();

    // Constants
    const isRightHand =
        slot === "RightHandWeaponPrimary" ||
        slot === "RightHandWeaponSecondary" ||
        slot === "RightHandWeaponTertiary";

    return (
        <div
            className="flex w-full justify-between text-xl"
            style={{ justifyContent: isRightHand ? "end" : "start" }}
        >
            (
            <p id="physical" style={{ color: "tan" }}>
                10
            </p>
            /
            <p id="magic" style={{ color: "lightblue" }}>
                0
            </p>
            /
            <p id="fire" style={{ color: "pink" }}>
                0
            </p>
            /
            <p id="lightning" style={{ color: "yellow" }}>
                0
            </p>
            /
            <p id="dark" style={{ color: "white" }}>
                0
            </p>
            )
        </div>
    );
}
