import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { CareerDetails, ResumeData, RoadMapResponse } from "../../common";

export const publicAiFlowApi = createApi({
  reducerPath: "publicAiFlowApiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    checkResume: builder.mutation<boolean, string>({
      query: resume => ({
        url: "/public/check-resume",
        method: "POST",
        body: { resume },
      }),
    }),
    resumeCareerSuggestion: builder.mutation<CareerDetails[], ResumeData>({
      query: body => ({
        url: "/public/career-suggestion?isResume=true",
        method: "POST",
        body,
      }),
    }),
    publicRoadmapSuggestion: builder.mutation<RoadMapResponse, CareerDetails>({
      query: body => ({
        url: "/public/roadmap-suggestion",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckResumeMutation, useResumeCareerSuggestionMutation, usePublicRoadmapSuggestionMutation } =
  publicAiFlowApi;
