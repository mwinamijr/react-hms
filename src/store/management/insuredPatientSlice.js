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

// Fetch all insuredPatients
export const listInsuredPatients = createAsyncThunk(
  "insuredPatient/listInsuredPatients",
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
        `${djangoUrl}/api/management/insurance/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single insuredPatient by ID
export const insuredPatientDetails = createAsyncThunk(
  "insuredPatient/details",
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
        `${djangoUrl}/api/management/insurance/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new insuredPatient
export const createInsuredPatient = createAsyncThunk(
  "insuredPatient/create",
  async (insuredPatientData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/management/insurance/`,
        insuredPatientData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Bulk upload insuredPatients
export const bulkCreateInsuredPatients = createAsyncThunk(
  "insuredPatient/bulkCreate",
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
        `${djangoUrl}/api/management/insurance/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a insuredPatient
export const deleteInsuredPatient = createAsyncThunk(
  "insuredPatient/delete",
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
        `${djangoUrl}/api/management/insurance/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update insuredPatient details
export const updateInsuredPatient = createAsyncThunk(
  "insuredPatient/update",
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
        `${djangoUrl}/api/management/insurance/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// InsuredPatient slice
const insuredPatientSlice = createSlice({
  name: "insuredPatient",
  initialState: {
    insuredPatients: [],
    insuredPatient: null,
    loading: false,
    error: null,
    successCreate: false,
    createdInsuredPatient: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdInsuredPatient = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listInsuredPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(listInsuredPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.insuredPatients = action.payload;
      })
      .addCase(listInsuredPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(insuredPatientDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(insuredPatientDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.insuredPatient = action.payload;
      })
      .addCase(insuredPatientDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInsuredPatient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createInsuredPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.createdInsuredPatient = action.payload;
      })
      .addCase(createInsuredPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateInsuredPatient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateInsuredPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.insuredPatientDetails = action.payload;
      })
      .addCase(updateInsuredPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInsuredPatient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteInsuredPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.insuredPatients = state.insuredPatients.filter(
          (insuredPatient) => insuredPatient.id !== action.payload
        );
      })
      .addCase(deleteInsuredPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = insuredPatientSlice.actions;
export default insuredPatientSlice.reducer;
