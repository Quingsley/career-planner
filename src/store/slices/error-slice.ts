import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from 'redux-persist';

const initialState: string[] = [];

const errorSlice = createSlice({
  initialState,
  name: "error",
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    clearError: (state, action: PayloadAction<string>) => {
      // find index of the error message
      const index = state.findIndex(error => error === action.payload);
      // remove the error message
      state.splice(index, 1);
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setError, clearError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
