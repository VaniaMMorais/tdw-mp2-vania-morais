import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://gateway.marvel.com:443/v1/public";
const PUBLIC_KEY = "sua_chave_publica";
const HASH = "seu_hash";
const TIMESTAMP = "1";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (filter) => {
    let url = `${BASE_URL}/characters?apikey=${PUBLIC_KEY}&hash=${HASH}&ts=${TIMESTAMP}&limit=20`;
    if (filter) {
      url += `&${filter}`;
    }
    const response = await axios.get(url);
    return response.data.data.results;
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default characterSlice.reducer;
