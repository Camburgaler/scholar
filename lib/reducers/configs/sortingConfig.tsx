import { ActionDispatch, createContext, useContext, useReducer } from "react";

type SortingConfig = "none" | "weapon" | "armor";

export type SortingConfigAction = {
    value: SortingConfig;
};

const SortingConfigContext = createContext<SortingConfig>("none");

export function useSortingConfig() {
    return useContext(SortingConfigContext);
}

const SortingConfigDispatchContext = createContext<
    ActionDispatch<[action: SortingConfigAction]>
>(() => {});

export function useSortingConfigDispatch() {
    return useContext(SortingConfigDispatchContext);
}

function sortingConfigReducer(
    initialValue: SortingConfig,
    newAttributes: SortingConfigAction,
): SortingConfig {
    if (initialValue === newAttributes.value) return "none";

    return newAttributes.value;
}

export function SortingConfigProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sortingConfig, sortingConfigDispatch] = useReducer(
        sortingConfigReducer,
        "none",
    );

    return (
        <SortingConfigContext value={sortingConfig}>
            <SortingConfigDispatchContext value={sortingConfigDispatch}>
                {children}
            </SortingConfigDispatchContext>
        </SortingConfigContext>
    );
}
