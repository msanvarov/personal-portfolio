import React from "react";

const createContextCustom = <StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) => {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch
  });
  const Provider = (props: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = React.useReducer<
      React.Reducer<StateType, ActionType>
    >(reducer, initialState);
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  };
  return [ctx, Provider] as const;
};

export default createContextCustom;
