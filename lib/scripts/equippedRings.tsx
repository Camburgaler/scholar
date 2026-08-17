import EquippedRings from "@/lib/interfaces/equippedRings";
import Modifier from "@/lib/interfaces/modifier";
import { AttributeMapKey } from "@/lib/types/attributeMap";
import { JSX } from "react/jsx-runtime";
import ModifierDisplay from "../components/characterInfo/rightColumn/modifierDisplay";

export function ringsActiveEffects(rings: EquippedRings) {
    return [
        ...rings[0].Modifiers,
        ...rings[1].Modifiers,
        ...rings[2].Modifiers,
        ...rings[3].Modifiers,
    ];
}

export function ringsAttributeModifiers(
    rings: EquippedRings,
    attribute: AttributeMapKey,
): number {
    var total = 0;
    const modifiers: Modifier[] = ringsActiveEffects(rings).filter(
        (modifier) =>
            modifier.TargetType === "attribute" &&
            modifier.Target === attribute,
    );

    modifiers.forEach((modifier) => {
        total += modifier.Value;
    });

    return total;
}

export function ringsModifierDisplays(rings: EquippedRings) {
    let activeEffects: JSX.Element[] = [];
    let isOddRow = true;

    rings[0].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                armorName={rings[0].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[0].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[0].ItemDiscovery}`}
                armorName={rings[0].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    rings[1].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                armorName={rings[1].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[1].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[1].ItemDiscovery}`}
                armorName={rings[1].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    rings[2].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                armorName={rings[2].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[2].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[2].ItemDiscovery}`}
                armorName={rings[2].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    rings[3].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                armorName={rings[3].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[3].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[3].ItemDiscovery}`}
                armorName={rings[3].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    return activeEffects;
}

export function ringsWeight(rings: EquippedRings) {
    return (
        rings[0].Weight + rings[1].Weight + rings[2].Weight + rings[3].Weight
    );
}
