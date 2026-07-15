import LevelUpStatusCalcParamContext from "@/lib/context/levelUpStatusCalcParam";
import { FocusedAttributeContext } from "@/lib/reducers/focusedAttribute";
import LevelUpStatusCalcParam, {
    LevelUpStatusCalcParamKey,
    LevelUpStatusCalcParamMap,
} from "@/lib/types/levelUpStatusCalcParam";
import { useContext, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

function getEquipLoadPercentFromRatio(ratio: string) {
    const [numerator, denominator] = ratio.split("/").map(Number);
    return (numerator / denominator) * 100;
}

export default function StatDisplay(props: {
    levelUpStatusCalcParamKey: LevelUpStatusCalcParamKey;
    displayValue: string;
    isOddRow?: boolean;
}): JSX.Element {
    const { levelUpStatusCalcParamKey, displayValue, isOddRow } = props;
    const focusedAttribute = useContext(FocusedAttributeContext);
    const levelUpStatusCalcParams: LevelUpStatusCalcParam[] = useContext(
        LevelUpStatusCalcParamContext,
    );
    const [isFocused, setIsFocused] = useState(false);

    // determines if the focused attribute affects this stat
    useEffect(() => {
        setIsFocused(
            levelUpStatusCalcParams.find(
                (param) => param.Name == focusedAttribute!,
            )?.[levelUpStatusCalcParamKey]!,
        );
    }, [focusedAttribute, levelUpStatusCalcParams]);

    return (
        <div
            className="flex gap-1 w-full justify-between"
            style={{
                backgroundColor: isOddRow
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: isFocused ? "var(--accent)" : "var(--contrast)",
                fontWeight: isFocused ? "bold" : "normal",
            }}
            id={levelUpStatusCalcParamKey}
        >
            <label
                className="flex items-center justify-center h-full"
                htmlFor={levelUpStatusCalcParamKey}
            >
                {LevelUpStatusCalcParamMap.get(levelUpStatusCalcParamKey)}:
            </label>
            {levelUpStatusCalcParamKey == "MaximumEquipLoad" ? (
                <div className="flex flex-col items-end justify-end">
                    <input
                        className="flex text-right max-w-15"
                        id="equip-load"
                        type="text"
                        disabled
                        value={displayValue}
                    />
                    <p className=" flex items-center justify-center text-right">
                        Using {getEquipLoadPercentFromRatio(displayValue)}%
                    </p>
                </div>
            ) : (
                <input
                    className="flex text-right h-full max-w-15"
                    id={levelUpStatusCalcParamKey}
                    type="text"
                    disabled
                    value={displayValue}
                />
            )}
        </div>
    );
}
