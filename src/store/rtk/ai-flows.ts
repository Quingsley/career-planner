import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { appendAuthHeader } from "../../utils";
import { CareerDetails, RoadMapResponse } from "../../common";

export const aiFlowsApi = createApi({
  reducerPath: "aiFlowsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async headers => await appendAuthHeader(headers),
  }),
  endpoints: builder => ({
    careerSuggestion: builder.mutation<CareerDetails[], { profileId: string }>({
      query: body => ({
        url: "/career-suggestion",
        method: "POST",
        body,
      }),
    }),
    roadmapSuggestion: builder.mutation<RoadMapResponse, CareerDetails>({
      query: body => ({
        url: "/roadmap-suggestion",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCareerSuggestionMutation, useRoadmapSuggestionMutation } = aiFlowsApi;
