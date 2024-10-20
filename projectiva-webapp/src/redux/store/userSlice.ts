import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface User {
  id: number;
  username: string;
  email: string; 
  role: string; 
}

interface UserState {
  items: User[]; 
  loading: boolean; 
  error: string | null; 
}

const initialState: UserState = {
  items: [],
  loading: false, 
  error: null,
};

interface UserState {
  items: User[]; 
}

export const fetchUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "users/fetchUsers",
  async (_, { getState }) => {
    const token = getState().auth.accessToken; 
    const response = await axios.get("http://localhost:3333/auth/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);


export const fetchEmployees = createAsyncThunk(
  "users/fetchEmployees",
  async () => {
    try {
      const response = await axios.get("http://localhost:3333/auth/users");
      const items = response.data.filter(
        (user: User) => user.role === "employee"
      );
      console.log(items);
      return items;
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload; 
        state.loading = false; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar usuários"; 
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default userSlice.reducer;
