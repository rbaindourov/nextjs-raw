import { configureStore, Reducer } from "@reduxjs/toolkit";

export interface State {
  month: string;
}

interface Action {
  type: "setMonth";
  payload: string;
}

const initialState = { month: "Not Set" };

const reducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    case "setMonth":
      return {
        ...state,
        month: action.payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
  preloadedState: initialState,
});
