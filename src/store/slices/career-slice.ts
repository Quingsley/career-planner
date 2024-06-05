import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CareerDetails } from "../../common";

const initialState: CareerDetails[] = [];

const careerSlice = createSlice({
  initialState,
  name: "career",
  reducers: {
    addCareer: (state, action: PayloadAction<CareerDetails[]>) => {
      state.push(...action.payload);
    },
    deleteCareer(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
    removeAll: state => {
      state = [];
    },
  },
});

export const { addCareer, deleteCareer, removeAll } = careerSlice.actions;
export const careerReducer = careerSlice.reducer;
