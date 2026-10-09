import { WeaponEquipSlot } from "@/lib/classes/weaponSlots";
import { useTwoHanding } from "@/lib/reducers/attributes/twoHanding";
import { useVirtualAttributes } from "@/lib/reducers/attributes/virtualAttributes";
import { useEquippedArmorSet } from "@/lib/reducers/equipment/equippedArmorSet";
import { useEquippedRings } from "@/lib/reducers/equipment/equippedRings";
import { useEquippedWeapons } from "@/lib/reducers/equipment/equippedWeapons";
import AttackPowerTypeMap from "@/lib/types/attackPowerTypeMap";
import AttributeMap from "@/lib/types/attributeMap";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

// TODO: Cleverer damage display?
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
    const twoHanding = useTwoHanding();

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
        let attributes: AttributeMap<number> = { ...virtualAttributes };
        if (twoHanding) {
            attributes.Strength = Math.floor(attributes.Strength * 1.5);
        }

        setDamage(
            equippedWeapons
                .getWeapon(slot)
                .totalDamage(
                    equippedWeapons,
                    attributes,
                    equippedArmor,
                    equippedRings,
                ),
        );
    }, [
        equippedWeapons,
        virtualAttributes,
        equippedArmor,
        equippedRings,
        twoHanding,
    ]);

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
