import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QuizQuestionResponse } from "./types";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eok9ha49itquif.m.pipedream.net",
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query<QuizQuestionResponse, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery } = quizApi;
