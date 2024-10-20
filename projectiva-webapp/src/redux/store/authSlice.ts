import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'manager' | 'employee';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3333/auth/login', credentials);
      return response.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { username: string; email: string; password: string, role: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3333/auth/register', credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token;

 
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;

      
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
      
  
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? (action.payload as string) : 'Login failed';
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;

      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? (action.payload as string) : 'Registration failed';
    });
  },
});

export const { logout, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
