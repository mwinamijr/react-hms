import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

const getErrorMessage = (error) => {
  if (error.response && error.response.data) {
    if (typeof error.response.data === "string") {
      return error.response.data;
    } else if (error.response.data.detail) {
      return error.response.data.detail;
    } else {
      return JSON.stringify(error.response.data);
    }
  }
  return error.message || "An unknown error occurred";
};

// Login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(
        `${djangoUrl}/api/users/login/`,
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Register User
export const register = createAsyncThunk(
  "user/register",
  async (
    {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
      qualification,
      departmentId,
      role,
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const { userInfo } = getState().user;
      if (!userInfo) throw new Error("Unauthorized request");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${djangoUrl}/api/users/users/`,
        {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email,
          phone,
          password,
          qualification,
          department: departmentId,
          role,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Get User Details
export const getUserDetails = createAsyncThunk(
  "user/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;
      if (!userInfo) throw new Error("Unauthorized request");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${djangoUrl}/api/users/users/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// List Users
export const listUsers = createAsyncThunk(
  "user/list",
  async (
    { first_name = "", last_name = "", email = "" },
    { getState, rejectWithValue }
  ) => {
    try {
      const { userInfo } = getState().user;
      if (!userInfo) throw new Error("Unauthorized request");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(
        `${djangoUrl}/api/users/users/?first_name=${first_name}&last_name=${last_name}&email=${email}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;
      if (!userInfo) throw new Error("Unauthorized request");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${djangoUrl}/api/users/users/${id}/`, config);
      return id; // Return ID to remove from the list if needed
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    user: null,
    users: [],
    loading: false,
    error: null,
    successDelete: false,
  },
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    resetSuccessDelete(state) {
      state.successDelete = false;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.successDelete = true;
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { logout, resetSuccessDelete, resetError } = userSlice.actions;
export default userSlice.reducer;
