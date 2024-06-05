import { EducationData, ProfileDataState, Work } from "../../common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProfileDataState = {
  careerInterests: [],
  education: [],
  skills: [],
  workExperience: [],
  description: undefined,
  userId: undefined,
  _id: undefined,
};

const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setId: (state, action: PayloadAction<{ userId: string; _id: string }>) => {
      state.userId = action.payload.userId;
      state._id = action.payload._id;
    },
    addEducation: (state, action: PayloadAction<EducationData>) => {
      state.education.push(action.payload);
    },
    deleteEducation(state, action: PayloadAction<number>) {
      state.education.splice(action.payload, 1);
    },
    addWork: (state, action: PayloadAction<Work>) => {
      state.workExperience.push(action.payload);
    },
    deleteWork(state, action: PayloadAction<number>) {
      state.workExperience.splice(action.payload, 1);
    },
    setDescription: (state, action: PayloadAction<string | undefined>) => {
      state.description = action.payload;
    },
    addSelectedCareers: (state, action: PayloadAction<string[]>) => {
      state.careerInterests.push(...action.payload);
    },
    addSelectedSkills: (state, action: PayloadAction<string[]>) => {
      state.skills.push(...action.payload);
    },
    // from serve side
    addProfile: (state, action: PayloadAction<ProfileDataState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  addEducation,
  addSelectedCareers,
  addSelectedSkills,
  addWork,
  setDescription,
  deleteEducation,
  deleteWork,
  addProfile,
  setId,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
