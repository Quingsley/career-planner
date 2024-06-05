import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { ProfileDataState } from "../../common";
import { appendAuthHeader } from "../../utils";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    timeout: 10000,
    prepareHeaders: async headers => await appendAuthHeader(headers),
  }),
  endpoints: builder => ({
    getProfile: builder.query<ProfileDataState, string>({
      query: data => `/profile/${data}`,
    }),
    createProfile: builder.mutation<ProfileDataState, ProfileDataState>({
      query: body => ({
        url: "/create-profile",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<ProfileDataState, ProfileDataState>({
      query: body => ({
        url: "/update-profile",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateProfileMutation, useGetProfileQuery, useUpdateProfileMutation } = profileApi;
