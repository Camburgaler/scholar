import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";
import {
    useEquippedArmor,
    useEquippedArmorDispatch,
} from "@/lib/reducers/equippedArmor";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import Armor, { filterArmor, getArmorByName } from "@/lib/types/armor";
import ArmorSet from "@/lib/types/armorSet";

// TODO: add a lock toggle to this similar to the one for the starting class
//    the lock would control how the armor optimization behaves
//    (e.g. if the armor is locked, the optimization should not change it)
export function ArmorDisplay(props: { label: string; isOddRow?: boolean }) {
    // Props
    const { label, isOddRow } = props;

    // Context
    const equippedArmor = useEquippedArmor();
    const setEquippedArmor = useEquippedArmorDispatch();
    const virtualAttributes = useVirtualAttributes();

    // Constants
    const armorList =
        label === "Helmet"
            ? Helmets
            : label === "Chestpiece"
              ? Chestpieces
              : label === "Gauntlets"
                ? Gauntlets
                : label === "Leggings"
                  ? Leggings
                  : [];

    // Render
    return (
        <div
            className="flex gap-1 w-full justify-between"
            style={{
                backgroundColor: isOddRow
                    ? "var(--primary)"
                    : "var(--secondary)",
            }}
        >
            <label
                className="flex items-center justify-center h-full"
                htmlFor={label}
            >
                {label}:
            </label>
            <div className="flex items-center justify-center h-full">
                <select
                    className="flex text-right h-full max-w-50"
                    id={label}
                    defaultValue="0"
                    onChange={(e) =>
                        setEquippedArmor({
                            slot: label.toLowerCase() as keyof ArmorSet,
                            armor: getArmorByName(armorList, e.target.value),
                        })
                    }
                >
                    {filterArmor(armorList, virtualAttributes).map((armor) => (
                        <option key={armor.Name} value={armor.Name}>
                            {armor.Name}
                        </option>
                    ))}
                </select>
                <select className="flex text-left h-full min-w-15">
                    {[
                        ...Array(
                            (
                                equippedArmor[
                                    label.toLowerCase() as keyof ArmorSet
                                ]! as Armor
                            ).MaxReinforcementLevel + 1,
                        ),
                    ].map((_, index) => (
                        <option key={index} value={index}>
                            +{index}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
