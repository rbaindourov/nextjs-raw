import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/lib/fetchData";
import { RootState, AppDispatch } from "@/lib/store";

const DataFetcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);
  const posts = useSelector((state: RootState) => state.posts);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    dispatch(fetchData("users")); // ✅ Fetch users
    dispatch(fetchData("posts")); // ✅ Fetch posts
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
