import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import B from "./B";

test("renders month from Redux store", () => {
  store.dispatch({ type: "month/setMonth", payload: "January" });
  const { getByText } = render(
    <Provider store={store}>
      <B />
    </Provider>
  );
  expect(getByText("January")).toBeInTheDocument();
});
