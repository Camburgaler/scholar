import ArmorSet from "@/lib/classes/armorSet";
import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";
import {
    useEquippedArmorSet,
    useEquippedArmorSetDispatch,
} from "@/lib/reducers/equippedArmorSet";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import { filterArmor, getArmorByName } from "@/lib/scripts/armor";
import { JSX, useEffect } from "react";

// TODO: add a lock toggle to this similar to the one for the starting class
//    the lock would control how the armor optimization behaves
//    (e.g. if the armor is locked, the optimization should not change it)

/**
 * ArmorDisplay
 * @description A component that displays a piece of the equipped armor set.
 * @prop label: The name of the armor to display.
 * @prop isOddRow: Whether the row is odd or even. Optional.
 */
export function ArmorDisplay(props: {
    label: string;
    isOddRow?: boolean;
}): JSX.Element {
    // Props
    const { label, isOddRow } = props;

    // Context
    const equippedArmorSet = useEquippedArmorSet();
    const setEquippedArmor = useEquippedArmorSetDispatch();
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
    const slot: keyof ArmorSet = label.toLowerCase() as keyof ArmorSet;

    // Effects
    useEffect(() => {
        // when the virtual attributes change, if the new attributes don't meet the current armor requirements, unequip the armor
        if (
            !filterArmor(armorList, virtualAttributes).some(
                (armor) => armor === equippedArmorSet.getArmor(slot).data,
            )
        ) {
            setEquippedArmor({
                slot: slot,
                equippedArmor: {
                    data: armorList[0],
                    reinforcementLevel: 0,
                },
            });
        }
    }, [virtualAttributes]);

    // TODO: add on-hover tooltip that shows the stats of the currently equipped armor
    // TODO: add graph of normal distribution of armor stats and where the currently equipped armor falls on that distribution
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
            <div className="flex gap-1 items-center justify-center h-full">
                <select
                    className="flex text-left h-full max-w-50"
                    id={label}
                    defaultValue="0"
                    onChange={(e) =>
                        setEquippedArmor({
                            slot: slot,
                            equippedArmor: {
                                data: getArmorByName(armorList, e.target.value),
                                reinforcementLevel: 0,
                            },
                        })
                    }
                >
                    {filterArmor(armorList, virtualAttributes).map((armor) => (
                        <option key={armor.Name} value={armor.Name}>
                            {armor.Name}
                        </option>
                    ))}
                </select>
                <select
                    className="flex text-left h-full min-w-15"
                    value={equippedArmorSet.getArmor(slot).reinforcementLevel}
                    onChange={(e) =>
                        setEquippedArmor({
                            slot: slot,
                            equippedArmor: {
                                data: equippedArmorSet.getArmor(slot).data,
                                reinforcementLevel: Number(e.target.value),
                            },
                        })
                    }
                >
                    {[
                        ...Array(
                            equippedArmorSet.getArmor(slot).data
                                .MaxReinforcementLevel + 1,
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
