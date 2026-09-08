import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type TwoHandingAction = {
    value: boolean;
};

const TwoHandingContext = createContext<boolean>(false);

export function useTwoHanding() {
    return useContext(TwoHandingContext);
}

const TwoHandingDispatchContext = createContext<
    ActionDispatch<[action: TwoHandingAction]>
>(() => {});

export function useTwoHandingDispatch() {
    return useContext(TwoHandingDispatchContext);
}

function twoHandingReducer(
    initialValue: boolean,
    newAttributes: TwoHandingAction,
): boolean {
    return newAttributes.value;
}

export function TwoHandingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [twoHanding, twoHandingDispatch] = useReducer(
        twoHandingReducer,
        false,
    );

    return (
        <TwoHandingContext value={twoHanding}>
            <TwoHandingDispatchContext value={twoHandingDispatch}>
                {children}
            </TwoHandingDispatchContext>
        </TwoHandingContext>
    );
}
