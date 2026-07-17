import { AttributeMapKey } from "@/lib/types/attributeMap";
import { ActionDispatch, createContext } from "react";

export const FocusedAttributeContext = createContext<AttributeMapKey | null>(
    null,
);
export const FocusedAttributeDispatchContext = createContext<
    ActionDispatch<[newValue: AttributeMapKey | null]>
>(() => {});
