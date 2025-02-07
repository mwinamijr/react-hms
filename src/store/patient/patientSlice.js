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

// Fetch all patients
export const listPatients = createAsyncThunk(
  "patients/listPatients",
  async ({ name = "", phone = "", status = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${djangoUrl}/api/core/patients/?name=${name}&phone=${phone}&status=${status}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single patient by ID
export const patientDetails = createAsyncThunk(
  "patients/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/core/patients/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new patient
export const createPatient = createAsyncThunk(
  "patients/create",
  async (patientData, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/core/patients/`,
        patientData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Bulk upload patients
export const bulkCreatePatients = createAsyncThunk(
  "patients/bulkCreate",
  async (file, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/core/patients/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a patient
export const deletePatient = createAsyncThunk(
  "patients/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`${djangoUrl}/api/core/patients/${id}/`, config);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update patient details
export const updatePatient = createAsyncThunk(
  "patients/update",
  async ({ id, ...values }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${djangoUrl}/api/core/patients/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Patient slice
const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    patientDetails: null,
    loading: false,
    error: null,
    successCreate: false,
    createdPatient: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdPatient = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(listPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(patientDetails.fulfilled, (state, action) => {
        state.patientDetails = action.payload;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.successCreate = true;
        state.createdPatient = action.payload;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.patientDetails = action.payload;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(
          (patient) => patient.id !== action.payload
        );
      });
  },
});

export const { resetCreateState } = patientsSlice.actions;
export default patientsSlice.reducer;
