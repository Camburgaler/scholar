import LevelUpStatusCalcParamContext from "@/lib/context/levelUpStatusCalcParam";
import WeaponContext from "@/lib/context/weapons";
import { FocusedAttributeContext } from "@/lib/reducers/focusedAttribute";
import LevelUpStatusCalcParam, {
    WeaponEquipSlots,
} from "@/lib/types/levelUpStatusCalcParam";
import Weapon from "@/lib/types/weapon";
import { useContext, useEffect, useState } from "react";

export default function WeaponDisplay(props: { slot: WeaponEquipSlots }) {
    const { slot } = props;
    const weapons: Weapon[] = useContext(WeaponContext);
    const [selected, setSelected] = useState("");
    const focusedAttribute = useContext(FocusedAttributeContext);
    const levelUpStatusCalcParams: LevelUpStatusCalcParam[] = useContext(
        LevelUpStatusCalcParamContext,
    );
    const [isFocused, setIsFocused] = useState(false);

    // determines if the focused attribute affects this weapon slot
    useEffect(() => {
        setIsFocused(
            levelUpStatusCalcParams.find(
                (param) => param.Name == focusedAttribute!,
            )?.[slot]!,
        );
    }, [focusedAttribute, levelUpStatusCalcParams]);

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
