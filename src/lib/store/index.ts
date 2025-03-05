import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export interface State {
  month: string;
}

const initialState: State = { month: "Not Set" };

const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<string>) {
      state.month = action.payload;
    },
  },
});

export const { setMonth } = monthSlice.actions;

export const store = configureStore({
  reducer: {
    month: monthSlice.reducer,
    data: dataReducer,
  },
  preloadedState: {
    month: initialState,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
