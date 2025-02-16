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

// Fetch all visits
export const listVisits = createAsyncThunk(
  "visit/listVisits",
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
      const { data } = await axios.get(`${djangoUrl}/api/core/visits/`, config);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single visit by ID
export const visitDetails = createAsyncThunk(
  "visit/details",
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
        `${djangoUrl}/api/core/visits/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new visit
export const createVisit = createAsyncThunk(
  "visit/create",
  async (visitData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/core/visits/`,
        visitData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Bulk upload visits
export const bulkCreateVisits = createAsyncThunk(
  "visit/bulkCreate",
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
        `${djangoUrl}/api/core/visits/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a visit
export const deleteVisit = createAsyncThunk(
  "visit/delete",
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
      await axios.delete(`${djangoUrl}/api/core/visits/${id}/`, config);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update visit details
export const updateVisit = createAsyncThunk(
  "visit/update",
  async ({ id, ...values }, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/core/visits/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const assignDoctor = createAsyncThunk(
  "visit/assignDoctor",
  async ({ id, ...values }, { getState, rejectWithValue }) => {
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
      console.log("assign values:", values);
      const { data } = await axios.post(
        `${djangoUrl}/api/core/visits/assign-doctor/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Visit slice
const visitSlice = createSlice({
  name: "visit",
  initialState: {
    visits: [],
    visit: null,
    loading: false,
    error: null,
    successCreate: false,
    createdVisit: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdVisit = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listVisits.pending, (state) => {
        state.loading = true;
      })
      .addCase(listVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.visits = action.payload;
      })
      .addCase(listVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(visitDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(visitDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.visit = action.payload;
      })
      .addCase(visitDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVisit.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.createdVisit = action.payload;
      })
      .addCase(createVisit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVisit.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.visitDetails = action.payload;
      })
      .addCase(updateVisit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVisit.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.visits = state.visits.filter(
          (visit) => visit.id !== action.payload
        );
      })
      .addCase(deleteVisit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(assignDoctor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(assignDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = visitSlice.actions;
export default visitSlice.reducer;
