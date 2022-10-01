import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eok9ha49itquif.m.pipedream.net",
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query<any, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery } = quizApi;
