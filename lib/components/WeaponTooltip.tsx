import EquippedWeapon from "@/lib/classes/equippedWeapon";
import Infusion from "@/lib/interfaces/infusion";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equippedWeapons";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import AttackPowerTypeMap, {
    AttackPowerTypeMapKey,
} from "@/lib/types/attackPowerTypeMap";
import { Tooltip } from "radix-ui";
import { JSX } from "react/jsx-runtime";

export default function WeaponTooltip(props: {
    children: JSX.Element;
    equippedWeapon: EquippedWeapon;
    side?: "top" | "right" | "bottom" | "left";
}): JSX.Element {
    // Props
    const { children, equippedWeapon, side } = props;

    // Context
    const virtualAttributes = useVirtualAttributes();
    const equippedArmorSet = useEquippedArmorSet();
    const equippedRings = useEquippedRings();
    const equippedWeapons = useEquippedWeapons();

    // Constants
    const infusion: Infusion = equippedWeapon.infusions.find(
        (infusion) => infusion.Name === equippedWeapon.infusionKey,
    )!;
    const baseDamage: AttackPowerTypeMap<number> = equippedWeapon.baseDamage();
    const scalingDamage: AttackPowerTypeMap<number> =
        equippedWeapon.scalingDamage(
            virtualAttributes,
            equippedArmorSet,
            equippedRings,
            equippedWeapons,
        );

    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={100}>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content side={side || "top"}>
                        <Tooltip.Arrow
                            height={10}
                            style={{ fill: "var(--contrast)" }}
                        />
                        <div
                            className="flex flex-col border shadow-md rounded-md p-2 min-w-60 z-100"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--secondary)",
                                borderColor: "var(--contrast)",
                            }}
                        >
                            <b>
                                {equippedWeapon.infusionKey != "Physical"
                                    ? equippedWeapon.infusionKey + " "
                                    : ""}
                                {equippedWeapon.name}
                                {equippedWeapon.reinforcementLevel != 0
                                    ? " +" + equippedWeapon.reinforcementLevel
                                    : ""}
                            </b>
                            <hr />

                            <p>Attack Power</p>
                            <table className="w-full p-1 rounded-lg">
                                <thead className="w-full">
                                    <tr>
                                        <th>Type</th>
                                        <th>Base</th>
                                        <th>Scaling</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(infusion.Damages).map(
                                        (attackPowerType) => (
                                            <tr key={attackPowerType}>
                                                <td className="text-left">
                                                    {attackPowerType}
                                                </td>
                                                <td className="text-center">
                                                    {Math.floor(
                                                        baseDamage[
                                                            attackPowerType as AttackPowerTypeMapKey
                                                        ]!,
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    +
                                                    {Math.floor(
                                                        scalingDamage[
                                                            attackPowerType as AttackPowerTypeMapKey
                                                        ]!,
                                                    )}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                            {/* TODO: Requirements */}
                            {/* TODO: Scaling */}
                        </div>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
