import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export interface MonthState {
  month: string;
}

export interface DataState {
  users: { id: number; name: string }[];
  posts: { id: number; title: string }[];
  loading: boolean;
  error: string | null;
}

const initialMonthState: MonthState = { month: "Not Set" };

const monthSlice = createSlice({
  name: "month",
  initialState: initialMonthState,
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
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
