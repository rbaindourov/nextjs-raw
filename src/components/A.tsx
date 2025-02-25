import { useDispatch } from "react-redux";

const A = () => {
  const dispatch = useDispatch();
  const month = "February";
  return (
    <div>
      <button onClick={() => dispatch({ type: "setMonth", payload: month })}>
        Set Month
      </button>
    </div>
  );
};
export default A;
