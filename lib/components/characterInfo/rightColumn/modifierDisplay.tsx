import { JSX } from "react/jsx-runtime";

/**
 * ModifierDisplay
 * @description A component that displays a modifier description and equipment name.
 * @prop description: The description of the modifier.
 * @prop equipmentName: The name of the equipment that the modifier is applied to.
 * @prop isOddRow: Whether the row is odd or even. Optional.
 */
export default function ModifierDisplay(props: {
    description: string;
    equipmentName: string;
    isOddRow?: boolean;
}): JSX.Element {
    const { description, equipmentName, isOddRow } = props;
    const displayValue = `${description} (${equipmentName})`;

    return (
        <p
            key={displayValue}
            className="w-full text-left p-1 rounded-lg"
            style={{
                backgroundColor: isOddRow
                    ? "var(--secondary)"
                    : "var(--primary)",
            }}
        >
            {displayValue}
        </p>
    );
}
