import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface LoginQuery {
  email: string;
  password: string;
}
interface RegistrationQuery {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
export interface ServiceData {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}
interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}
interface TransactionData {
  invoice_number: string;
  service_name: string;
  service_code: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}
export interface RecordTransaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}
interface TransactionHistoryData {
  offset: number;
  limit: number;
  records: Array<RecordTransaction>;
}
interface BannerData {
  banner_name: string;
  description: string;
  banner_image: string;
}
interface BaseResponse<T> {
  message: string;
  data: T;
}
type ProfileSuccessResponse = BaseResponse<ProfileData> & { status: 0 };
export type ServiceSuccessResponse = BaseResponse<Array<ServiceData>> & {
  status: 0;
};
type BannerSuccessResponse = BaseResponse<Array<BannerData>> & { status: 0 };
type TransactionSuccessResponse = BaseResponse<TransactionData> & { status: 0 };
type TransactionHistorySuccessResponse =
  BaseResponse<TransactionHistoryData> & { status: 0 };
type BadRequestResponse = BaseResponse<null> & { status: 102 };
type UnauthorizedResponse = BaseResponse<null> & { status: 108 };
type LoginSuccessResponse = BaseResponse<{ token: string }> & { status: 0 };
type LoginUnauthorizedResponse = BaseResponse<null> & { status: 103 };
type LoginResponse =
  | LoginSuccessResponse
  | BadRequestResponse
  | LoginUnauthorizedResponse;
type RegistrationResponse = LoginSuccessResponse | BadRequestResponse;
type ProfileResponse =
  | ProfileSuccessResponse
  | BadRequestResponse
  | UnauthorizedResponse;
type BannerResponse = BannerSuccessResponse | UnauthorizedResponse;
type ServiceResponse = ServiceSuccessResponse | UnauthorizedResponse;
type BalanceTopUpSuccessResponse = BaseResponse<{ balance: number }> & {
  status: 0;
};
type BalanceTopUpResponse =
  | BalanceTopUpSuccessResponse
  | BadRequestResponse
  | UnauthorizedResponse;
type TransactionResponse =
  | TransactionSuccessResponse
  | BadRequestResponse
  | UnauthorizedResponse;
type TransactionHistoryResponse =
  | TransactionHistorySuccessResponse
  | BadRequestResponse
  | UnauthorizedResponse;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://take-home-test-api.nutech-integrasi.com",
  }),
  tagTypes: ["Authentication", "Transaction", "Profile", "WebContents"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginQuery>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registration: builder.query<RegistrationResponse, RegistrationQuery>({
      query: (credentials) => ({
        url: "/registration",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["Authentication"],
    }),
    getProfile: builder.query<ProfileResponse, { token: string | null }>({
      query: (credentials) => ({
        url: "/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<
      ProfileResponse,
      { first_name: string; last_name: string; token: string }
    >({
      query: (credentials) => ({
        url: "/profile/update",
        method: "PUT",
        body: {
          first_name: credentials.first_name,
          last_name: credentials.last_name,
        },
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      invalidatesTags: ["Profile"],
    }),
    updateProfileImage: builder.mutation<
      ProfileResponse,
      { token: string; formData: FormData }
    >({
      query: (credentials) => {
        return {
          url: "/profile/image",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
          body: credentials.formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
    getBanner: builder.query<BannerResponse, { token: string | null }>({
      query: (credentials) => ({
        url: "/banner",
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      providesTags: ["WebContents"],
    }),
    getServices: builder.query<ServiceResponse, { token: string | null }>({
      query: (credentials) => ({
        url: "/services",
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      providesTags: ["WebContents"],
    }),
    getBalance: builder.query<BalanceTopUpResponse, { token: string | null }>({
      query: (credentials) => ({
        url: "/balance",
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionHistory: builder.query<
      TransactionHistoryResponse,
      { token: string | null; limit?: number; offset?: number }
    >({
      query: ({ token, limit = 5, offset = 0 }) => ({
        url: `/transaction/history?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
    postTransaction: builder.mutation<
      TransactionResponse,
      {
        token: string;
        total_amount: number;
        service_code: string;
      }
    >({
      query: (credentials) => ({
        url: "/transaction",
        method: "POST",
        body: {
          total_amount: credentials.total_amount,
          service_code: credentials.service_code,
        },
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
    postTopUp: builder.mutation<
      BalanceTopUpResponse,
      { token: string; top_up_amount: number }
    >({
      query: (credentials) => ({
        url: "/topup",
        method: "POST",
        body: { top_up_amount: credentials.top_up_amount },
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});
export const {
  useGetBalanceQuery,
  useGetTransactionHistoryQuery,
  useGetProfileQuery,
  useGetBannerQuery,
  useGetServicesQuery,
  useLoginMutation,
  useRegistrationQuery,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
  usePostTransactionMutation,
  usePostTopUpMutation,
} = apiSlice;
