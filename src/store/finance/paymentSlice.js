import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

const getErrorMessage = (error) => {
  if (error.response) {
    if (error.response.data) {
      if (typeof error.response.data === "string") {
        return error.response.data;
      } else if (error.response.data.detail) {
        return error.response.data.detail;
      } else {
        return JSON.stringify(error.response.data);
      }
    }
  }
  return error.message || "An unknown error occurred";
};

export const addConsultationPayment = createAsyncThunk(
  "payment/addConsultationFee",
  async (values, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/payments/generate-consultation-payment/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listPayments = createAsyncThunk(
  "payment/listPayments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/payments/`, config);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listPaymentItems = createAsyncThunk(
  "payment/listPaymentItems",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/payments/payment-items/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listVisitPayments = createAsyncThunk(
  "payment/listVisitPayments",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      console.log("visit payments calling");
      const { data } = await axios.get(
        `${djangoUrl}/api/payments/visits/${id}/payments/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listVisitPaymentItems = createAsyncThunk(
  "payment/listVisitPaymentItems",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      console.log("visit payment items calling");
      const { data } = await axios.get(
        `${djangoUrl}/api/payments/visits/${id}/payment-items/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single payment by ID
export const paymentDetails = createAsyncThunk(
  "payment/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/payments/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const paymentItemDetails = createAsyncThunk(
  "paymentItem/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/payments/payment-items/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a payment
export const deletePayment = createAsyncThunk(
  "payment/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      await axios.delete(`${djangoUrl}/api/payments/${id}/`, config);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deletePaymentItem = createAsyncThunk(
  "paymentItem/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      await axios.delete(
        `${djangoUrl}/api/payments/payment-items/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update payment details
export const updatePayment = createAsyncThunk(
  "payment/update",
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.put(
        `${djangoUrl}/api/payments/${id}/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updatePaymentItem = createAsyncThunk(
  "paymentItem/update",
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.put(
        `${djangoUrl}/api/payments/payment-items/${id}/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    payment: null,
    paymentItems: [],
    paymentItem: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addConsultationPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addConsultationPayment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addConsultationPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(listPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listVisitPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(listVisitPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(listVisitPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listPaymentItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPaymentItems.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentItems = action.payload;
      })
      .addCase(listPaymentItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listVisitPaymentItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(listVisitPaymentItems.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentItems = action.payload;
      })
      .addCase(listVisitPaymentItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(paymentDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(paymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(paymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(paymentItemDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(paymentItemDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentItem = action.payload;
      })
      .addCase(paymentItemDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePayment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePaymentItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePaymentItem.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deletePaymentItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
