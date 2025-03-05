"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/";

const B = () => {
  const month = useSelector((state: RootState) => state.month.month);
  return <div>{month}</div>;
};

export default B;
