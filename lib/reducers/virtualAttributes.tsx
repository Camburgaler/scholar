import AttributeMap, { AttributeMapKey } from "@/lib/types/attributeMap";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type VirtualAttributesAction = {
    key: string;
    value: number;
};

const VirtualAttributesContext = createContext<AttributeMap<number>>({
    Vigor: 0,
    Endurance: 0,
    Vitality: 0,
    Adaptability: 0,
    Strength: 0,
    Dexterity: 0,
    Intelligence: 0,
    Faith: 0,
    Attunement: 0,
});

export function useVirtualAttributes() {
    return useContext(VirtualAttributesContext);
}

const VirtualAttributesDispatchContext = createContext<
    ActionDispatch<[newAttributes: Map<AttributeMapKey, number>]>
>(() => {});

export function useVirtualAttributesDispatch() {
    return useContext(VirtualAttributesDispatchContext);
}

function virtualAttributesReducer(
    initialAttributes: AttributeMap<number>,
    newAttributes: Map<AttributeMapKey, number>,
): AttributeMap<number> {
    return {
        ...initialAttributes,
        ...Object.fromEntries(newAttributes),
    };
}

export function VirtualAttributesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [virtualAttributes, virtualAttributesDispatch] = useReducer(
        virtualAttributesReducer,
        {
            Vigor: 0,
            Endurance: 0,
            Vitality: 0,
            Adaptability: 0,
            Strength: 0,
            Dexterity: 0,
            Intelligence: 0,
            Faith: 0,
            Attunement: 0,
        },
    );

    return (
        <VirtualAttributesContext value={virtualAttributes}>
            <VirtualAttributesDispatchContext value={virtualAttributesDispatch}>
                {children}
            </VirtualAttributesDispatchContext>
        </VirtualAttributesContext>
    );
}
