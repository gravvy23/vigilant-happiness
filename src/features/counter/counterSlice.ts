import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  points: number;
  chances: number;
}

const initialState: CounterState = {
  points: 0,
  chances: 3,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increasePoints: (state) => {
      state.points += 1;
    },
    decreaseChances: (state) => {
      state.chances -= 1;
    },
    resetCounter: (state) => {
      state.chances = 3;
      state.points = 0;
    },
  },
});

export const { increasePoints, decreaseChances, resetCounter } =
  counterSlice.actions;

export default counterSlice.reducer;
