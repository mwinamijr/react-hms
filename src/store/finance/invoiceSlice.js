import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

const getErrorMessage = (error) => {
  if (error.response && error.response.data) {
    if (typeof error.response.data === "string") return error.response.data;
    if (error.response.data.detail) return error.response.data.detail;
    return JSON.stringify(error.response.data);
  }
  return error.message || "An unknown error occurred";
};

// Fetch all invoices
export const listInvoices = createAsyncThunk(
  "invoice/listAllInvoices",
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
        `${djangoUrl}/api/payments/invoices/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch all invoice items
export const listInvoiceItems = createAsyncThunk(
  "invoice/listAllInvoiceItems",
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
        `${djangoUrl}/api/payments/invoice-items/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single invoice by ID
export const invoiceDetails = createAsyncThunk(
  "invoice/getInvoiceDetails",
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
        `${djangoUrl}/api/payments/invoices/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single invoice item by ID
export const invoiceItemDetails = createAsyncThunk(
  "invoice/getInvoiceItemDetails",
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
        `${djangoUrl}/api/payments/invoice-items/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete an invoice
export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
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
      await axios.delete(`${djangoUrl}/api/payments/invoices/${id}/`, config);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete an invoice item
export const deleteInvoiceItem = createAsyncThunk(
  "invoice/deleteInvoiceItem",
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
        `${djangoUrl}/api/payments/invoice-items/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Invoice slice
const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
    invoice: null,
    invoiceItems: [],
    invoiceItem: null,
    loading: false,
    error: null,
    successCreate: false,
    createdInvoice: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdInvoice = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(listInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(listInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(listInvoiceItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(listInvoiceItems.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceItems = action.payload;
      })
      .addCase(listInvoiceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(invoiceDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(invoiceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(invoiceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(invoiceItemDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(invoiceItemDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceItem = action.payload;
      })
      .addCase(invoiceItemDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        );
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteInvoiceItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInvoiceItem.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceItems = state.invoiceItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteInvoiceItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = invoiceSlice.actions;
export default invoiceSlice.reducer;
