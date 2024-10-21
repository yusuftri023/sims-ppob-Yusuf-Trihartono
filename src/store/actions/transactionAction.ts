import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateTransactionHistory = createAsyncThunk(
  "transaction/updateTransactionHistory",
  async ({
    token,
    limit,
    offset,
  }: {
    token: string;
    limit: number;
    offset: number;
  }) => {
    const response = await fetch(
      `https://take-home-test-api.nutech-integrasi.com/transaction/history?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);
