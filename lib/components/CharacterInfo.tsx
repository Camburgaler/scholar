import LeftColumn from "@/lib/components/characterInfo/LeftColumn";
import MiddleColumn from "@/lib/components/characterInfo/MiddleColumn";
import RightColumn from "@/lib/components/characterInfo/RightColumn";
import ChestpieceContext from "@/lib/context/chestpieces";
import GauntletsContext from "@/lib/context/gauntlets";
import HelmetContext from "@/lib/context/helmets";
import LeggingsContext from "@/lib/context/leggings";
import RingContext from "@/lib/context/rings";
import Armor from "@/lib/types/armor";
import Ring from "@/lib/types/ring";
import { useContext, useReducer } from "react";
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
    const rings: Ring[] = useContext(RingContext);
    const helmets: Armor[] = useContext(HelmetContext);
    const chestpieces: Armor[] = useContext(ChestpieceContext);
    const gauntlets: Armor[] = useContext(GauntletsContext);
    const leggings: Armor[] = useContext(LeggingsContext);
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
                                rings[0],
                                rings[0],
                                rings[0],
                                rings[0],
                            ]}
                            equippedArmor={{
                                helmet: helmets[0],
                                chestpiece: chestpieces[0],
                                gauntlets: gauntlets[0],
                                leggings: leggings[0],
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
