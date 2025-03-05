"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setMonth } from "@/lib/store/index";

const A = () => {
  const dispatch = useDispatch<AppDispatch>();
  const month = "February";
  return (
    <div>
      <button onClick={() => dispatch(setMonth(month))}>Set Month</button>
    </div>
  );
};
export default A;
