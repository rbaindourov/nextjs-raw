"use client";

import A from "@/components/A";
import B from "@/components/B";
import { store } from "@/lib/store/index";
import { useMemo, useState } from "react";
import { Provider } from "react-redux";

function Tavant() {
  const [inputData, setInputData] = useState<string>("");
  const disabled = useMemo(() => !inputData, [inputData]);

  const handleSubmit = async () => {
    const response = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/1"),
      fetch("https://jsonplaceholder.typicode.com/posts/2"),
      fetch("https://jsonplaceholder.typicode.com/posts/3"),
    ]);

    const data = await Promise.all(response.map((res) => res.json()));

    console.log(data);
  };

  return (
    <>
      <input type="text" onChange={(e) => setInputData(e.target.value)} />
      <button disabled={disabled} onClick={handleSubmit}>
        Submit
      </button>

      <Provider store={store}>
        <A />
        <B />
      </Provider>
    </>
  );
}

export default Tavant;
