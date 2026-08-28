import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import { useEquippedArmorSet } from "@/lib/reducers/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equippedWeapons";
import { useVirtualAttributes } from "@/lib/reducers/virtualAttributes";
import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function DamageDisplay(props: {
    slot: WeaponEquipSlot;
}): JSX.Element {
    // Props
    const { slot } = props;

    // Context
    const equippedWeapons = useEquippedWeapons();
    const virtualAttributes = useVirtualAttributes();
    const equippedArmor = useEquippedArmorSet();
    const equippedRings = useEquippedRings();

    // Constants
    const isRightHand =
        slot === "rightPrimary" ||
        slot === "rightSecondary" ||
        slot === "rightTertiary";

    // State
    const [damage, setDamage] = useState<AttackPowerTypeMap<number>>({
        Physical: 0,
        Magic: 0,
        Fire: 0,
        Lightning: 0,
        Dark: 0,
    });

    // Effects
    useEffect(() => {
        setDamage(
            equippedWeapons
                .getWeapon(slot)
                .totalDamage(
                    equippedWeapons,
                    virtualAttributes,
                    equippedArmor,
                    equippedRings,
                ),
        );
    }, [equippedWeapons, virtualAttributes, equippedArmor, equippedRings]);

    return (
        <div
            className="flex w-full justify-between"
            style={{ justifyContent: isRightHand ? "end" : "start" }}
        >
            (
            <p id="physical" style={{ color: "var(--physical)" }}>
                {Math.floor(damage.Physical)}
            </p>
            /
            <p id="magic" style={{ color: "var(--magic)" }}>
                {Math.floor(damage.Magic)}
            </p>
            /
            <p id="fire" style={{ color: "var(--fire)" }}>
                {Math.floor(damage.Fire)}
            </p>
            /
            <p id="lightning" style={{ color: "var(--lightning)" }}>
                {Math.floor(damage.Lightning)}
            </p>
            /
            <p id="dark" style={{ color: "var(--dark)" }}>
                {Math.floor(damage.Dark)}
            </p>
            /
            <p id="poison" style={{ color: "var(--poison)" }}>
                {Math.floor(damage.Poison || 0)}
            </p>
            /
            <p id="bleed" style={{ color: "var(--bleed)" }}>
                {Math.floor(damage.Bleed || 0)}
            </p>
            )
        </div>
    );
}
