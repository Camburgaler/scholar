import WeaponContext from "@/lib/context/weapons";
import Weapon from "@/lib/types/weapon";
import { useContext, useState } from "react";

export default function WeaponDisplay(props: { slot: string }) {
    const { slot } = props;
    const weapons: Weapon[] = useContext(WeaponContext);
    const [selected, setSelected] = useState("");

    return (
        <div
            id={slot}
            className="col-span-1 flex flex-col w-full justify-between"
        >
            <p className="w-full">(10/0/0/0)</p>
            <select
                className="w-full"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                {weapons.map((weapon) => (
                    <option key={weapon.Name} value={weapon.Name}>
                        {weapon.Name}
                    </option>
                ))}
            </select>
        </div>
    );
}
