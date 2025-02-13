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

// Fetch all hospitalItems
export const listHospitalItems = createAsyncThunk(
  "hospitalItem/listHospitalItems",
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
        `${djangoUrl}/api/management/hospital-items/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single hospitalItem by ID
export const hospitalItemDetails = createAsyncThunk(
  "hospitalItem/details",
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
        `${djangoUrl}/api/management/hospital-items/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new hospitalItem
export const createHospitalItem = createAsyncThunk(
  "hospitalItem/create",
  async (hospitalItemData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/management/hospital-items/`,
        hospitalItemData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Bulk upload hospitalItems
export const bulkCreateHospitalItems = createAsyncThunk(
  "hospitalItem/bulkCreate",
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
        `${djangoUrl}/api/management/hospital-items/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a hospitalItem
export const deleteHospitalItem = createAsyncThunk(
  "hospitalItem/delete",
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
        `${djangoUrl}/api/management/hospital-items/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update hospitalItem details
export const updateHospitalItem = createAsyncThunk(
  "hospitalItem/update",
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
      console.log("values:", values);
      const { data } = await axios.put(
        `${djangoUrl}/api/management/hospital-items/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// HospitalItem slice
const hospitalItemSlice = createSlice({
  name: "hospitalItem",
  initialState: {
    hospitalItems: [],
    hospitalItem: null,
    loading: false,
    error: null,
    successCreate: false,
    createdHospitalItem: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdHospitalItem = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listHospitalItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(listHospitalItems.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalItems = action.payload;
      })
      .addCase(listHospitalItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(hospitalItemDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(hospitalItemDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalItem = action.payload;
      })
      .addCase(hospitalItemDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createHospitalItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createHospitalItem.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.createdHospitalItem = action.payload;
      })
      .addCase(createHospitalItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateHospitalItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateHospitalItem.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalItemDetails = action.payload;
      })
      .addCase(updateHospitalItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHospitalItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteHospitalItem.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalItems = state.hospitalItems.filter(
          (hospitalItem) => hospitalItem.id !== action.payload
        );
      })
      .addCase(deleteHospitalItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = hospitalItemSlice.actions;
export default hospitalItemSlice.reducer;
