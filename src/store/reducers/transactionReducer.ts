import { createSlice } from "@reduxjs/toolkit";
import { ServiceData } from "../apiSlicer";

interface History {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}
interface TransactionListPayload {
  offset: number;
  limit: number;
  records: Array<History>;
}
interface TransactionState {
  balance: number;
  transactionList: TransactionListPayload | null;
  payment: ServiceData[];
}
const initialState: TransactionState = {
  balance: 0,
  transactionList: null,
  payment: [],
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    topUp: (state, action: { payload: number; type: string }) => {
      state.balance = action.payload;
    },
    transactionServices: (state, action: { payload: number; type: string }) => {
      state.balance = action.payload;
    },
    transactionList: (state, action) => {
      state.transactionList = action.payload;
    },
    setBalance: (state, action: { payload: number }) => {
      state.balance = action.payload;
    },
    setPayment: (state, action: { payload: TransactionState["payment"] }) => {
      state.payment = [...action.payload];
    },
  },
});

export const {
  topUp,
  transactionServices,
  transactionList,
  setBalance,
  setPayment,
} = transactionSlice.actions;

export default transactionSlice.reducer;
