"use client";
import { useSelector } from "react-redux";
import { State } from "@/lib/store/";

const B = () => {
  const month = useSelector((state: State) => state.month);
  return <div>{month}</div>;
};

export default B;
