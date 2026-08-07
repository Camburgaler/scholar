export default function ModifierDisplay(props: {
    description: string;
    armorName: string;
    isOddRow?: boolean;
}) {
    const { description, armorName, isOddRow } = props;
    const displayValue = `${description} (${armorName})`;

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
