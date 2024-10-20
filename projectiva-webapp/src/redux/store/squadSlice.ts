import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Member {
  id: number;
  userId: number;
  squadId: number;
  role: string;
  user: User;
}

interface Squad {
  id: number;
  name: string;
  managerId: number;
  members: Member[];
}

interface SquadState {
  squads: Squad[];
  loading: boolean;
  error: string | null;
}

const initialState: SquadState = {
  squads: [],
  loading: false,
  error: null,
};


const getToken = (state: RootState) => state.auth.accessToken;
export const fetchSquads = createAsyncThunk<
  Squad[],
  void,
  { state: RootState }
>("squads/fetchSquads", async (_, { getState }) => {
  const token = getToken(getState());
  const response = await axios.get("http://localhost:3333/squads", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const fetchAllSquads = createAsyncThunk<
  Squad[],
  void,
  { state: RootState }
>("squads/fetchAllSquads", async (_, { getState }) => {
  const token = getToken(getState());
  const response = await axios.get("http://localhost:3333/squads/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const createSquad = createAsyncThunk<
  Squad,
  { name: string },
  { state: RootState }
>("squads/createSquad", async (squad, { getState }) => {
  const token = getToken(getState());
  const response = await axios.post(
    "http://localhost:3333/squads/create",
    squad,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
});

export const updateSquad = createAsyncThunk<
  Squad,
  { id: number; name: string },
  { state: RootState }
>("squads/updateSquad", async ({ id, name }, { getState }) => {
  const token = getToken(getState());
  const response = await axios.put(
    `http://localhost:3333/squads/${id}`,
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
});

export const deleteSquad = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("squads/deleteSquad", async (id, { getState }) => {
  const token = getToken(getState());
  await axios.delete(`http://localhost:3333/squads/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});


export const addMemberToSquad = createAsyncThunk<
  void,
  { squadId: number; userId: number; role: 'employee' | 'manager' }, 
  { state: RootState }
>('squads/addMemberToSquad', async ({ squadId, userId, role }, { getState, rejectWithValue }) => {
  const token = getState().auth.accessToken; 
  try {
    const response = await axios.post(
      `http://localhost:3333/squads/${squadId}/members`,
      { userId, role },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status !== 200) {
      return rejectWithValue("Falha ao adicionar membro ao squad.");
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Erro ao adicionar membro."
    );
  }
});


const squadSlice = createSlice({
  name: "squads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSquads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSquads.fulfilled, (state, action) => {
        state.loading = false;
        state.squads = action.payload;
      })
      .addCase(fetchSquads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar squads";
      })
      .addCase(fetchAllSquads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSquads.fulfilled, (state, action) => {
        state.loading = false;
        state.squads = action.payload;
      })
      .addCase(fetchAllSquads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar todos os squads";
      })
      .addCase(createSquad.fulfilled, (state, action) => {
        state.squads.push(action.payload);
      })
      .addCase(updateSquad.fulfilled, (state, action) => {
        const index = state.squads.findIndex(
          (squad) => squad.id === action.payload.id
        );
        if (index !== -1) {
          state.squads[index] = action.payload;
        }
      })
      .addCase(deleteSquad.fulfilled, (state, action) => {
        state.squads = state.squads.filter(
          (squad) => squad.id !== action.payload
        );
      });
  },
});

export default squadSlice.reducer;
