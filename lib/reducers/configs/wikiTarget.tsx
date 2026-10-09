import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type WikiTarget = "wikiGG" | "fextralife" | "wikiDot";

export type WikiTargetAction = {
    value: WikiTarget;
};

const WikiTargetContext = createContext<WikiTarget>("wikiGG");

export function useWikiTarget() {
    return useContext(WikiTargetContext);
}

const WikiTargetDispatchContext = createContext<
    ActionDispatch<[action: WikiTargetAction]>
>(() => {});

export function useWikiTargetDispatch() {
    return useContext(WikiTargetDispatchContext);
}

function wikiTargetReducer(
    initialValue: WikiTarget,
    newAttributes: WikiTargetAction,
): WikiTarget {
    return newAttributes.value;
}

export function WikiTargetProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [wikiTarget, wikiTargetDispatch] = useReducer(
        wikiTargetReducer,
        "wikiGG",
    );

    return (
        <WikiTargetContext value={wikiTarget}>
            <WikiTargetDispatchContext value={wikiTargetDispatch}>
                {children}
            </WikiTargetDispatchContext>
        </WikiTargetContext>
    );
}
