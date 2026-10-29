import EquippedWeapon from "@/lib/classes/equippedWeapon";
import { InfusionMapKey } from "@/lib/types/infusionMap";

export default function InfusionDisplay(props: {
    weapon: EquippedWeapon;
    updateFunc: (weapon: EquippedWeapon) => void;
}) {
    // Props
    const { weapon, updateFunc } = props;

    return (
        <select
            value={weapon.infusionKey}
            onChange={(e) => {
                const newEquippedWeapon =
                    EquippedWeapon.fromEquippedWeapon(weapon);
                newEquippedWeapon.infusionKey = e.target
                    .value as InfusionMapKey;
                updateFunc(newEquippedWeapon);
            }}
            disabled={weapon.infusions.length <= 1}
        >
            {weapon.infusions.map((infusion) => (
                <option key={infusion.Name}>{infusion.Name}</option>
            ))}
        </select>
    );
}
