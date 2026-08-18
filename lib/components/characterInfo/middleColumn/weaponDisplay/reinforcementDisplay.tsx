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
                setEquippedWeapons({
                    slot: slot,
                    equippedWeapon: {
                        ...equippedWeapons.getWeapon(slot),
                        reinforcementLevel: parseInt(e.target.value),
                    },
                });
            }}
        >
            {[
                ...Array(
                    equippedWeapons.getWeapon(slot).data.MaxReinforcementLevel +
                        1,
                ),
            ].map((_, index) => (
                <option key={index} value={index}>
                    +{index}
                </option>
            ))}
        </select>
    );
}
