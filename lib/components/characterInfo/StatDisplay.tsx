import {
    LevelUpStatusCalcParamKey,
    LevelUpStatusCalcParamMap,
} from "@/lib/types/levelUpStatusCalcParam";
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

    return (
        <div
            className="flex gap-1 w-full justify-between"
            style={
                isOddRow
                    ? {
                          backgroundColor: "var(--primary)",
                      }
                    : {}
            }
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
