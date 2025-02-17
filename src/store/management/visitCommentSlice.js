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

export const fetchVisitComments = createAsyncThunk(
  "visitComments/fetchVisitComments",
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
        `${djangoUrl}/api/management/visits/visit-comments/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addVisitComment = createAsyncThunk(
  "visitComments/addVisitComment",
  async ({ id, ...values }, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      console.log("comment:", values);
      const response = await axios.post(
        `${djangoUrl}/api/management/visits/visit-comments/${id}/`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateVisitComment = createAsyncThunk(
  "visitComments/updateVisitComment",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { commentId, description } = data;
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const response = await axios.patch(
        `${djangoUrl}/api/management/visit-comments/detail/${commentId}/`,
        { description },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteVisitComment = createAsyncThunk(
  "visitComments/deleteVisitComment",
  async (commentId, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/management/visit-comments/detail/${commentId}/`,
        config
      );
      return commentId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
const initialState = {
  comments: [],
  loading: false,
  error: null,
  successCreate: false,
  createdVisitComment: null,
};

const visitCommentSlice = createSlice({
  name: "visitComments",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdVisit = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisitComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchVisitComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVisitComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVisitComment.fulfilled, (state, action) => {
        state.loading = false;
        state.createdVisitComment = action.payload;
        state.successCreate = true;
      })
      .addCase(addVisitComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVisitComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVisitComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateVisitComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVisitComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVisitComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(deleteVisitComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = visitCommentSlice.actions;
export default visitCommentSlice.reducer;
