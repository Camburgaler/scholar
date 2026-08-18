import ModifierDisplay from "@/lib/components/characterInfo/rightColumn/modifierDisplay";
import EquippedRings from "@/lib/interfaces/equippedRings";
import Modifier from "@/lib/interfaces/modifier";
import { AttributeMapKey } from "@/lib/types/attributeMap";
import { JSX } from "react/jsx-runtime";

/**
 * @description Returns the active effects of the rings
 * @param rings The equipped rings. {@link EquippedRings}
 * @returns The active effects of the rings. Array of {@link Modifier}
 */
export function ringsActiveEffects(rings: EquippedRings): Modifier[] {
    return [
        ...rings[0].Modifiers,
        ...rings[1].Modifiers,
        ...rings[2].Modifiers,
        ...rings[3].Modifiers,
    ];
}

/**
 * @description Returns the attribute modifiers of the rings
 * @param rings The equipped rings. {@link EquippedRings}
 * @param attribute The attribute to get the modifiers for. {@link AttributeMapKey}
 * @returns The attribute modifiers of the rings.
 */
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

/**
 * @description Returns the modifier displays of the rings
 * @param rings The equipped rings. {@link EquippedRings}
 * @returns The modifier displays of the rings. Array of {@link ModifierDisplay}
 */
export function ringsModifierDisplays(rings: EquippedRings): JSX.Element[] {
    let activeEffects: JSX.Element[] = [];
    let isOddRow = true;

    rings[0].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                equipmentName={rings[0].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[0].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[0].ItemDiscovery}`}
                equipmentName={rings[0].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    rings[1].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                equipmentName={rings[1].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[1].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[1].ItemDiscovery}`}
                equipmentName={rings[1].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    rings[2].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                equipmentName={rings[2].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[2].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[2].ItemDiscovery}`}
                equipmentName={rings[2].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    rings[3].Modifiers.forEach((modifier) => {
        activeEffects.push(
            <ModifierDisplay
                description={modifier.Description}
                equipmentName={rings[3].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    });

    if (rings[3].ItemDiscovery > 0) {
        activeEffects.push(
            <ModifierDisplay
                description={`Increase Item Discovery by ${rings[3].ItemDiscovery}`}
                equipmentName={rings[3].Name}
                isOddRow={isOddRow}
            />,
        );
        isOddRow = !isOddRow;
    }

    return activeEffects;
}

/**
 * @description Returns the weight of the rings
 * @param rings The equipped rings. {@link EquippedRings}
 * @returns The weight of the rings.
 */
export function ringsWeight(rings: EquippedRings): number {
    return (
        rings[0].Weight + rings[1].Weight + rings[2].Weight + rings[3].Weight
    );
}
