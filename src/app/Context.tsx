import React from "react";

export const createContext = <StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType,
) => {
    const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
    const ctx = React.createContext({
        state: initialState,
        dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
    });
    const Provider = (props: React.PropsWithChildren<{}>) => {
        const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);
        return <ctx.Provider value={{state, dispatch}} {...props} />
    };
    return [ctx, Provider] as const
};
