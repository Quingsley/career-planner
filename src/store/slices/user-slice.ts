import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../common";

// Define a type for the slice state

// Define the initial state using that type
const initialState: UserState = {
  fName: undefined,
  lName: undefined,
  email: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  exp: undefined,
  userId: undefined,
  isEmailVerified: undefined,
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = counterSlice.actions;

export const userReducer = counterSlice.reducer;
