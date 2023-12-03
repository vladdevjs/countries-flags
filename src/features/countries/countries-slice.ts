import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountries = createAsyncThunk<{ data: Country[] }, undefined, { extra: Extra; rejectValue: string }>(
  '@@countries/loadCountries',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.ALL_COUNTRIES);
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  },
);

type CountrySlice = {
  status: Status;
  error: string | null;
  list: Country[];
};

const initialState: CountrySlice = { status: 'idle', error: null, list: [] };

const countrySlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.list = action.payload.data;
      });
  },
});

export const countryReducer = countrySlice.reducer;
