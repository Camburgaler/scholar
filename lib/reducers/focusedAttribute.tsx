import { AttributeMapKey } from "@/lib/types/attributeMap";
import { ActionDispatch, createContext, useContext, useReducer } from "react";

const FocusedAttributeContext = createContext<AttributeMapKey | null>(null);

export function useFocusedAttribute() {
    return useContext(FocusedAttributeContext);
}

const FocusedAttributeDispatchContext = createContext<
    ActionDispatch<[newValue: AttributeMapKey | null]>
>(() => {});

export function useFocusedAttributeDispatch() {
    return useContext(FocusedAttributeDispatchContext);
}

function focusedAttributeReducer(
    initialValue: AttributeMapKey | null,
    newValue: AttributeMapKey | null,
): AttributeMapKey | null {
    if (initialValue === null || newValue === null) return newValue;

    return initialValue;
}

export function FocusedAttributeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [focusedAttribute, focusedAttributeDispatch] = useReducer(
        focusedAttributeReducer,
        null,
    );

    return (
        <FocusedAttributeContext value={focusedAttribute}>
            <FocusedAttributeDispatchContext value={focusedAttributeDispatch}>
                {children}
            </FocusedAttributeDispatchContext>
        </FocusedAttributeContext>
    );
}
