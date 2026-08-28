import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import {
    useEquippedWeapons,
    useEquippedWeaponsDispatch,
} from "@/lib/reducers/equippedWeapons";
import { InfusionMapKey } from "@/lib/types/infusionMap";
import { JSX } from "react/jsx-runtime";

export default function InfusionDisplay(props: {
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
            value={equippedWeapons.getWeapon(slot).infusionKey}
            onChange={(e) => {
                let newEquippedWeapon = equippedWeapons.getWeapon(slot);
                newEquippedWeapon.infusionKey = e.target
                    .value as InfusionMapKey;
                setEquippedWeapons({
                    slot: slot,
                    equippedWeapon: newEquippedWeapon,
                });
            }}
        >
            {equippedWeapons.getWeapon(slot).infusions.map((infusion) => (
                <option key={infusion.Name}>{infusion.Name}</option>
            ))}
        </select>
    );
}
