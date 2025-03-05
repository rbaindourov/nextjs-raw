import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/fetchData";

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}

interface DataState {
  users: User[];
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchData.fulfilled,
        (
          state,
          action: PayloadAction<{ type: string; data: User[] | Post[] }>
        ) => {
          state.loading = false;
          if (action.payload.type === "users") {
            state.users = action.payload.data as User[];
          } else if (action.payload.type === "posts") {
            state.posts = action.payload.data as Post[];
          }
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default dataSlice.reducer;
