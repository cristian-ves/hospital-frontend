import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the patient data model for frontend state management.
 */
export interface Patient {
  id: string;
  name: string;
  triageLevel: number;
}

interface PatientsState {
  list: Patient[];
}

const initialState: PatientsState = {
  list: [],
};

/**
 * Handles actions related to patient arrival, processing, and discharge.
 */
const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.list.push(action.payload);
    },
  },
});

export const { addPatient } = patientsSlice.actions;
export default patientsSlice.reducer;