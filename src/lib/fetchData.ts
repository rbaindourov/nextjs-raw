import { AppDispatch } from "@/lib/store"; // Import dispatch type

// Curried function: fetchData(endpoint) returns a function that accepts dispatch
export const fetchData = (endpoint: "users" | "posts") => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchStart());

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}`
      );
      const data = await response.json();
      dispatch(fetchSuccess({ key: endpoint, data })); // Store data under `users` or `posts`
    } catch (error) {
      dispatch(fetchError("Failed to fetch data"));
    }
  };
};
