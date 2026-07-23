import LeftColumn from "@/lib/components/characterInfo/LeftColumn";
import MiddleColumn from "@/lib/components/characterInfo/MiddleColumn";
import RightColumn from "@/lib/components/characterInfo/RightColumn";
import { useReducer } from "react";
import { Chestpieces, Gauntlets, Helmets, Leggings, Rings } from "../gameData";
import {
    FocusedAttributeContext,
    FocusedAttributeDispatchContext,
} from "../reducers/focusedAttribute";
import { AttributeMapKey } from "../types/attributeMap";

function focusedAttributeReducer(
    initialValue: AttributeMapKey | null,
    newValue: AttributeMapKey | null,
): AttributeMapKey | null {
    if (initialValue === null || newValue === null) return newValue;

    return initialValue;
}

export default function CharacterInfo() {
    // Reducers
    const [focusedAttribute, focusedAttributeDispatch] = useReducer(
        focusedAttributeReducer,
        null,
    );

    return (
        <div className="flex flex-col w-full items-center justify-center align-center">
            {/* Header */}
            <h2 className="text-2xl font-bold">Character</h2>
            <hr />

            {/* Reducers */}
            <FocusedAttributeContext value={focusedAttribute}>
                <FocusedAttributeDispatchContext
                    value={focusedAttributeDispatch}
                >
                    {/* Content */}
                    <div className="flex w-full h-full items-center justify-center align-center gap-4">
                        <LeftColumn
                            equippedRings={[
                                Rings[0],
                                Rings[0],
                                Rings[0],
                                Rings[0],
                            ]}
                            equippedArmor={{
                                helmet: Helmets[0],
                                chestpiece: Chestpieces[0],
                                gauntlets: Gauntlets[0],
                                leggings: Leggings[0],
                                weight: 0,
                            }}
                        />

                        <hr className="h-full max-w-px" />

                        <MiddleColumn />

                        <hr className="h-full max-w-px" />

                        <RightColumn />
                    </div>
                </FocusedAttributeDispatchContext>
            </FocusedAttributeContext>
        </div>
    );
}
