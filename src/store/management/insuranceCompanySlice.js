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

// Fetch all insuranceCompanies
export const listInsuranceCompanies = createAsyncThunk(
  "insuranceCompany/listInsuranceCompanies",
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
        `${djangoUrl}/api/management/insurance-companies/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single insuranceCompany by ID
export const insuranceCompanyDetails = createAsyncThunk(
  "insuranceCompany/details",
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
        `${djangoUrl}/api/management/insurance-companies/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new insuranceCompany
export const createInsuranceCompany = createAsyncThunk(
  "insuranceCompany/create",
  async (insuranceCompanyData, { getState, rejectWithValue }) => {
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
      const { data } = await axios.post(
        `${djangoUrl}/api/management/insurance-companies/`,
        insuranceCompanyData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Bulk upload insuranceCompanies
export const bulkCreateInsuranceCompanies = createAsyncThunk(
  "insuranceCompany/bulkCreate",
  async (file, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/management/insurance-companies/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a insuranceCompany
export const deleteInsuranceCompany = createAsyncThunk(
  "insuranceCompany/delete",
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
        `${djangoUrl}/api/management/insurance-companies/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update insuranceCompany details
export const updateInsuranceCompany = createAsyncThunk(
  "insuranceCompany/update",
  async ({ id, values }, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/management/insurance-companies/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// InsuranceCompany slice
const insuranceCompanySlice = createSlice({
  name: "insuranceCompany",
  initialState: {
    insuranceCompanies: [],
    insuranceCompany: null,
    loading: false,
    error: null,
    successCreate: false,
    createdInsuranceCompany: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdInsuranceCompany = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listInsuranceCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(listInsuranceCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompanies = action.payload;
      })
      .addCase(listInsuranceCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(insuranceCompanyDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(insuranceCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompany = action.payload;
      })
      .addCase(insuranceCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInsuranceCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createInsuranceCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.createdInsuranceCompany = action.payload;
      })
      .addCase(createInsuranceCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateInsuranceCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateInsuranceCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompanyDetails = action.payload;
      })
      .addCase(updateInsuranceCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInsuranceCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteInsuranceCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompanies = state.insuranceCompanies.filter(
          (insuranceCompany) => insuranceCompany.id !== action.payload
        );
      })
      .addCase(deleteInsuranceCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = insuranceCompanySlice.actions;
export default insuranceCompanySlice.reducer;
