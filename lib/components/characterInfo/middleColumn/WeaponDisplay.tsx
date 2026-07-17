import AttributeToStatMapContext from "@/lib/context/attributeToStatMap";
import WeaponContext from "@/lib/context/weapons";
import { FocusedAttributeContext } from "@/lib/reducers/focusedAttribute";
import AttributeMap from "@/lib/types/attributeMap";
import StatMap, { WeaponEquipSlots } from "@/lib/types/statMap";
import Weapon from "@/lib/types/weapon";
import { useContext, useEffect, useState } from "react";

export default function WeaponDisplay(props: { slot: WeaponEquipSlots }) {
    const { slot } = props;
    const weapons: Weapon[] = useContext(WeaponContext);
    const [selected, setSelected] = useState("");
    const focusedAttribute = useContext(FocusedAttributeContext);
    const attributeToStatMap: AttributeMap<StatMap<boolean>> = useContext(
        AttributeToStatMapContext,
    );
    const [isFocused, setIsFocused] = useState(false);

    // determines if the focused attribute affects this weapon slot
    useEffect(() => {
        setIsFocused(attributeToStatMap[focusedAttribute!]?.[slot]);
    }, [focusedAttribute, attributeToStatMap]);

    return (
        <div
            id={slot}
            className="col-span-1 flex flex-col w-full justify-between"
            style={{
                color: isFocused ? "var(--accent)" : "var(--contrast)",
                fontWeight: isFocused ? "bold" : "normal",
            }}
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
