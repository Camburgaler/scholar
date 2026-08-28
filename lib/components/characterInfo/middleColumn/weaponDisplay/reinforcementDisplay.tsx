import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import {
    useEquippedWeapons,
    useEquippedWeaponsDispatch,
} from "@/lib/reducers/equippedWeapons";
import { JSX } from "react/jsx-runtime";

export default function ReinforcementDisplay(props: {
    slot: WeaponEquipSlot;
}): JSX.Element {
    // Props
    const { slot } = props;

    // Context
    const equippedWeapons = useEquippedWeapons();
    const setEquippedWeapons = useEquippedWeaponsDispatch();

    return (
        <select
            style={{ backgroundColor: "var(--secondary)" }}
            value={equippedWeapons.getWeapon(slot).reinforcementLevel}
            onChange={(e) => {
                let newEquippedWeapon = equippedWeapons.getWeapon(slot);
                newEquippedWeapon.reinforcementLevel = parseInt(e.target.value);
                setEquippedWeapons({
                    slot: slot,
                    equippedWeapon: newEquippedWeapon,
                });
            }}
        >
            {[
                ...Array(
                    equippedWeapons.getWeapon(slot).maxReinforcementLevel + 1,
                ),
            ].map((_, index) => (
                <option key={index} value={index}>
                    +{index}
                </option>
            ))}
        </select>
    );
}
