import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionState {
  usedQuestionList: Array<string>;
}

const initialState: QuestionState = {
  usedQuestionList: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<string>) => {
      if (
        !state.usedQuestionList.find((question) => question === action.payload)
      ) {
        state.usedQuestionList.push(action.payload);
      }
    },
  },
});

export const { addQuestion } = questionSlice.actions;

export default questionSlice.reducer;
