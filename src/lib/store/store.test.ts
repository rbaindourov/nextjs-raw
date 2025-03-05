import { store, setMonth } from "./index";
import { RootState } from "./index";

describe("Redux Store", () => {
  it("should set the month", () => {
    store.dispatch(setMonth("January"));
    const state: RootState = store.getState();
    expect(state.month.month).toBe("January");
  });
});
