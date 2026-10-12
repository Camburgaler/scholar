import EquippedWeapon from "@/lib/classes/equippedWeapon";
import WeaponAttackTable, {
    WeaponAttackRow,
} from "@/lib/components/configs/weaponSorting/WeaponAttackTable";
import { Weapons } from "@/lib/gameData";
import { useVirtualAttributes } from "@/lib/reducers/attributes/virtualAttributes";
import { useEquippedArmorSet } from "@/lib/reducers/equipment/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equipment/equippedWeapons";
import { InfusionMapKey } from "@/lib/types/infusionMap";
import { useMemo } from "react";

export default function WeaponSorting() {
    // Context
    const equippedWeapons = useEquippedWeapons();
    const virtualAttributes = useVirtualAttributes();
    const equippedRings = useEquippedRings();
    const equippedArmorSet = useEquippedArmorSet();

    // State
    const weaponData = useMemo(() => {
        let rows: WeaponAttackRow[] = [];

        for (const weapon of Weapons) {
            let row: WeaponAttackRow = {
                weapon: weapon,
            } as WeaponAttackRow;
            let max = 0;

            for (const infusion of weapon.Infusions) {
                const infusedWeapon = EquippedWeapon.fromWeapon(weapon);
                infusedWeapon.infusionKey = infusion.Name as InfusionMapKey;
                // TODO: include weapon reinforcement level
                // infusedWeapon.reinforcementLevel = 0;

                const totalDamage = infusedWeapon.totalDamage(
                    equippedWeapons,
                    virtualAttributes,
                    equippedArmorSet,
                    equippedRings,
                );

                const attackRating = Math.floor(
                    Object.values(totalDamage).reduce((a, b) => a + b, 0),
                );

                row[infusion.Name as InfusionMapKey] = attackRating;

                if (max === 0 || attackRating > max) {
                    max = attackRating;
                }

                row.max = max;
            }

            rows.push(row);
        }

        return rows;
    }, [equippedWeapons, virtualAttributes, equippedRings, equippedArmorSet]);

    return (
        <div className="flex flex-col w-full items-center justify-center align-center">
            <h3 className="text-lg font-bold">Weapon Sorting</h3>

            <div className="grid grid-cols-3 gap-5 w-full items-center justify-center align-center">
                {/* TODO: Configs */}
                {/* TODO: Fix vertical spacing */}
                <div className="grid grid-cols-2 gap-1 w-full items-center justify-center align-center">
                    {/* TODO: Miscellanous configs */}
                    <div className="flex flex-col w-full items-center justify-center align-center">
                        <h4 className="text-md font-bold">Parameters</h4>
                        <hr />

                        {/* TODO: Reinforcement level */}

                        {/* TODO: Requirements met? */}

                        {/* TODO: Buffable only? */}

                        {/* TODO: Allow split damage? */}

                        {/* TODO: Consider status effects? */}

                        {/* TODO: Allowed infusions */}

                        {/* TODO: Damage type filters */}
                    </div>

                    {/* TODO: Weapon categories */}
                    <div className="flex flex-col w-full items-center justify-center align-center">
                        <h4 className="text-md font-bold">Categories</h4>
                        <hr />
                    </div>
                </div>

                {/* TODO: Detailed results */}
                <div className="flex flex-col col-span-2 w-full items-center justify-center align-center">
                    <h4 className="text-md font-bold">
                        Attack Rating per Infusion
                    </h4>
                    <hr />

                    <WeaponAttackTable rows={weaponData} />
                </div>
            </div>
        </div>
    );
}
