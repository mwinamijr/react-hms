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

// Fetch all itemTypes
export const listItemTypes = createAsyncThunk(
  "itemType/listItemTypes",
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
        `${djangoUrl}/api/management/item-types/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single itemType by ID
export const itemTypeDetails = createAsyncThunk(
  "itemType/details",
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
        `${djangoUrl}/api/management/item-types/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new itemType
export const createItemType = createAsyncThunk(
  "itemType/create",
  async (itemTypeData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/management/item-types/`,
        itemTypeData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Bulk upload itemTypes
export const bulkCreateItemTypes = createAsyncThunk(
  "itemType/bulkCreate",
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
        `${djangoUrl}/api/management/item-types/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a itemType
export const deleteItemType = createAsyncThunk(
  "itemType/delete",
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
        `${djangoUrl}/api/management/item-types/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update itemType details
export const updateItemType = createAsyncThunk(
  "itemType/update",
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
        `${djangoUrl}/api/management/item-types/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ItemType slice
const itemTypeSlice = createSlice({
  name: "itemType",
  initialState: {
    itemTypes: [],
    itemType: null,
    loading: false,
    error: null,
    successCreate: false,
    createdItemType: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdItemType = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listItemTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(listItemTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.itemTypes = action.payload;
      })
      .addCase(listItemTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(itemTypeDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(itemTypeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.itemType = action.payload;
      })
      .addCase(itemTypeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createItemType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createItemType.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.createdItemType = action.payload;
      })
      .addCase(createItemType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateItemType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateItemType.fulfilled, (state, action) => {
        state.loading = false;
        state.itemTypeDetails = action.payload;
      })
      .addCase(updateItemType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteItemType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteItemType.fulfilled, (state, action) => {
        state.loading = false;
        state.itemTypes = state.itemTypes.filter(
          (itemType) => itemType.id !== action.payload
        );
      })
      .addCase(deleteItemType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = itemTypeSlice.actions;
export default itemTypeSlice.reducer;
