import EquippedWeapon from "@/lib/classes/equippedWeapon";
import { JSX } from "react/jsx-runtime";

export default function ReinforcementDisplay(props: {
    weapon: EquippedWeapon;
    updateFunc: (weapon: EquippedWeapon) => void;
}): JSX.Element {
    // Props
    const { weapon, updateFunc } = props;

    return (
        <select
            value={weapon.reinforcementLevel}
            onChange={(e) => {
                const newEquippedWeapon =
                    EquippedWeapon.fromEquippedWeapon(weapon);
                newEquippedWeapon.reinforcementLevel = parseInt(e.target.value);
                updateFunc(newEquippedWeapon);
            }}
            disabled={weapon.maxReinforcementLevel == 0}
        >
            {[...Array(weapon.maxReinforcementLevel + 1)].map((_, index) => (
                <option key={index} value={index}>
                    +{index}
                </option>
            ))}
        </select>
    );
}
