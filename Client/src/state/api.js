import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://centricchatbotserver.web.app",
  }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postAiText: build.mutation({
      query: (payload) => ({
        url: "/text",
        method: "POST",
        body: payload,
      }),
    }),
    postAiCentricSupport: build.mutation({
      query: (payload) => ({
        url: "/centricSupport",
        method: "POST",
        body: payload,
      }),
    }),
    postAiCode: build.mutation({
      query: (payload) => ({
        url: "/code",
        method: "POST",
        body: payload,
      }),
    }),
    postAiAssist: build.mutation({
      query: (payload) => ({
        url: "/assist",
        method: "POST",
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: "/auth",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCentricSupportMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api;
