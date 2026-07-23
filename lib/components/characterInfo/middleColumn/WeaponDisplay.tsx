import { Weapons } from "@/lib/gameData";
import { WeaponEquipSlots } from "@/lib/types/statMap";
import { useState } from "react";

export default function WeaponDisplay(props: { slot: WeaponEquipSlots }) {
    // Props
    const { slot } = props;

    // State
    const [selected, setSelected] = useState("");

    return (
        <div
            id={slot}
            className="col-span-1 flex flex-col w-full justify-between"
        >
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
