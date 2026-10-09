import { ActionDispatch, createContext, useContext, useReducer } from "react";

type SortingConfigs = "none" | "weapon" | "armor";

export type SortingConfigAction = {
    value: SortingConfigs;
};

const SortingConfigContext = createContext<SortingConfigs>("none");

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
    initialValue: SortingConfigs,
    newAttributes: SortingConfigAction,
): SortingConfigs {
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
