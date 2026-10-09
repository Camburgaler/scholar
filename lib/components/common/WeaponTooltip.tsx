import EquippedWeapon from "@/lib/classes/equippedWeapon";
import Infusion from "@/lib/interfaces/infusion";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import {
    useEquippedWeapons,
    useEquippedWeaponsDispatch,
} from "@/lib/reducers/equippedWeapons";
import { useTwoHanding } from "@/lib/reducers/twoHanding";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import AttackPowerTypeMap, {
    AttackPowerTypeMapKey,
} from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";
import { InfusionMapKey } from "@/lib/types/infusionMap";
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
    const setEquippedWeapons = useEquippedWeaponsDispatch();
    const twoHanding = useTwoHanding();

    // Constants
    const infusion: Infusion = equippedWeapon.infusions.find(
        (infusion) => infusion.Name === equippedWeapon.infusionKey,
    )!;
    const baseDamage: AttackPowerTypeMap<number> = equippedWeapon.baseDamage();

    let attributes: AttributeMap<number> = { ...virtualAttributes };
    if (twoHanding) {
        attributes.Strength = Math.floor(attributes.Strength * 1.5);
    }

    const scalingDamage: AttackPowerTypeMap<number> =
        equippedWeapon.scalingDamage(
            attributes,
            equippedArmorSet,
            equippedRings,
            equippedWeapons,
        );
    const title = `${
        equippedWeapon.infusionKey != "Physical"
            ? equippedWeapon.infusionKey + " "
            : ""
    }${equippedWeapon.name}${
        equippedWeapon.reinforcementLevel != 0
            ? " +" + equippedWeapon.reinforcementLevel
            : ""
    }`;
    const requirements = Object.entries(equippedWeapon.requirements)
        .filter(([, requirement]) => requirement > 0)
        .map(([attribute, requirement]) => (
            <tr key={attribute}>
                <td className="text-left">{attribute}</td>
                <td className="text-center">{requirement}</td>
            </tr>
        ));
    const scalingCoefficient = (
        ["Physical", "Raw", "Mundane"] as InfusionMapKey[]
    ).includes(equippedWeapon.infusionKey)
        ? 1
        : 0.5;

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
                            <b>{title}</b>
                            <hr />

                            <p className="text-center">Attack Power</p>
                            <table className="w-full p-1 rounded-lg">
                                <tbody>
                                    {Object.keys(infusion.Damages)
                                        .filter((attackPowerType) => {
                                            const baseDamageValue =
                                                baseDamage[
                                                    attackPowerType as AttackPowerTypeMapKey
                                                ]!;
                                            const scalingDamageValue =
                                                scalingDamage[
                                                    attackPowerType as AttackPowerTypeMapKey
                                                ]!;

                                            return (
                                                attackPowerType != "Petrify" &&
                                                attackPowerType != "Curse" &&
                                                baseDamageValue > 0 &&
                                                scalingDamageValue > 0
                                            );
                                        })
                                        .map((attackPowerType) => (
                                            <tr key={attackPowerType}>
                                                <td
                                                    className="text-left"
                                                    style={{
                                                        color: `var(--${attackPowerType.toLowerCase()})`,
                                                    }}
                                                >
                                                    {attackPowerType}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        color: `var(--${attackPowerType.toLowerCase()})`,
                                                    }}
                                                >
                                                    {Math.floor(
                                                        baseDamage[
                                                            attackPowerType as AttackPowerTypeMapKey
                                                        ]!,
                                                    )}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        color: `var(--${attackPowerType.toLowerCase()})`,
                                                    }}
                                                >
                                                    +
                                                    {Math.floor(
                                                        scalingDamage[
                                                            attackPowerType as AttackPowerTypeMapKey
                                                        ]!,
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <hr />
                            <p className="text-center">Requirements</p>
                            {requirements.length > 0 ? (
                                <table>
                                    <tbody>{requirements}</tbody>
                                </table>
                            ) : (
                                <p className="italic">None</p>
                            )}
                            <hr />
                            <p className="text-center">Scaling</p>
                            <table className="w-full p-1 rounded-lg justify-center">
                                <thead>
                                    <tr className="text-center w-full justify-between">
                                        {/* TODO: Replace words with icons */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Physical > 0 && <th>STR</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Physical > 0 && <th>DEX</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Magic > 0 && <th>MGC</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Fire > 0 && <th>FIR</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Lightning > 0 && <th>LTG</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Dark > 0 && <th>DRK</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Poison! > 0 && <th>PSN</th>}
                                        {equippedWeapon.infusion.DamageRates
                                            .Bleed! > 0 && <th>BLD</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Scaling, per damage type, is determined by the infusion and the reinforcement level */}
                                    {/* Default, Raw, and Mundane infusions just pulls the scaling value and uses that */}
                                    {/* Other infusions halve the scaling value and derive the letter therefrom */}
                                    <tr className="text-center">
                                        {/* STR */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Physical > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .PhysicalByStrength *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* DEX */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Physical > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .PhysicalByDexterity *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* MGC */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Magic > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .Magic *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* FIR */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Fire > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .Fire *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* LTG */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Lightning > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .Lightning *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* DRK */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Dark > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .Dark *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* PSN */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Poison! > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .Poison *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                        {/* BLD */}
                                        {equippedWeapon.infusion.DamageRates
                                            .Bleed! > 0 && (
                                            <td>
                                                {(
                                                    Math.floor(
                                                        equippedWeapon.scaling
                                                            .Bleed *
                                                            scalingCoefficient *
                                                            100,
                                                    ) / 100
                                                ).toFixed(2)}
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            {/* TODO: Sorcery/incantation/hex power */}
                            {/* TODO: Damage reduction */}
                            <p className="text-center">Special Effects</p>
                            {equippedWeapon.modifiers.length > 0 ? (
                                equippedWeapon.modifiers.map((modifier) => (
                                    <p
                                        key={modifier.Description}
                                        className="italic"
                                    >
                                        {modifier.Description}
                                    </p>
                                ))
                            ) : (
                                <p key="none" className="italic">
                                    None
                                </p>
                            )}
                            <hr />
                            <p className="text-center">Equip</p>
                            <div className="grid grid-cols-2 gap-1">
                                <button
                                    onClick={() =>
                                        setEquippedWeapons({
                                            slot: "leftPrimary",
                                            equippedWeapon,
                                        })
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--contrast)";
                                    }}
                                >
                                    Left Hand Primary
                                </button>
                                <button
                                    onClick={() =>
                                        setEquippedWeapons({
                                            slot: "rightPrimary",
                                            equippedWeapon,
                                        })
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--contrast)";
                                    }}
                                >
                                    Right Hand Primary
                                </button>
                                <button
                                    onClick={() =>
                                        setEquippedWeapons({
                                            slot: "leftSecondary",
                                            equippedWeapon,
                                        })
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--contrast)";
                                    }}
                                >
                                    Left Hand Secondary
                                </button>
                                <button
                                    onClick={() =>
                                        setEquippedWeapons({
                                            slot: "rightSecondary",
                                            equippedWeapon,
                                        })
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--contrast)";
                                    }}
                                >
                                    Right Hand Secondary
                                </button>
                                <button
                                    onClick={() =>
                                        setEquippedWeapons({
                                            slot: "leftTertiary",
                                            equippedWeapon,
                                        })
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--contrast)";
                                    }}
                                >
                                    Left Hand Tertiary
                                </button>
                                <button
                                    onClick={() =>
                                        setEquippedWeapons({
                                            slot: "rightTertiary",
                                            equippedWeapon,
                                        })
                                    }
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--contrast)";
                                    }}
                                >
                                    Right Hand Tertiary
                                </button>
                            </div>
                        </div>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
