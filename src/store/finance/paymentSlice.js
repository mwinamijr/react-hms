import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const completePayment = createAsyncThunk(
  "payment/completePayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.post("/complete-payment/", {
        payment_id: paymentId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: { payments: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(completePayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completePayment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(completePayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
