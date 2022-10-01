import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { quizApi } from "../services/quiz";
import counterReducer from "../features/counter/counterSlice";
import questionReducer from "../features/question/questionSlice";

export const store = configureStore({
  reducer: {
    [quizApi.reducerPath]: quizApi.reducer,
    counter: counterReducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
