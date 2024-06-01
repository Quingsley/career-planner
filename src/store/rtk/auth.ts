import { SignInData, SignUpData, VerificationType } from "../../common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000", timeout: 10000 }),
  endpoints: builder => ({
    signIn: builder.mutation<{ accessToken: string; refreshToken: string }, SignInData>({
      query: data => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation<string, SignUpData>({
      query: data => ({
        url: "/create-user",
        method: "POST",
        body: data,
      }),
    }),
    sendCode: builder.mutation<string, { email: string; type: VerificationType }>({
      query: data => ({
        url: "resend-code",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<{ message: string }, { email: String; code: number }>({
      query: data => ({
        url: "verify-email",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: data => ({
        url: "forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, { email: string; code: number; newPassword: string }>({
      query: data => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignInMutation,
  useSignUpMutation,
  useSendCodeMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
