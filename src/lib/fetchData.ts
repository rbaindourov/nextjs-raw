import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (type: "users" | "posts") => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${type}`
    );
    const data = await response.json();
    return { type, data };
  }
);
