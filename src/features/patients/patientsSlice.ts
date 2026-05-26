import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
  id: string;
  name: string;
  triageLevel: number;
}

export interface PatientStatus {
  patientId: string;
  name: string;
  triageLevel: string; // "CRITICAL" | "EMERGENCY" | "URGENT" | etc.
  status: "QUEUED" | "IN_PROGRESS" | "COMPLETED";
  admittedAt: number;
}

export interface HospitalStats {
  totalAttended: number;
  avgWaitSeconds: number;
}

interface PatientsState {
  /**
   * tracks every patient the user submitted this session
   */
  admissionLog: Patient[];

  activePatients: PatientStatus[];

  stats: HospitalStats;
}

const initialState: PatientsState = {
  admissionLog: [],
  activePatients: [],
  stats: {
    totalAttended: 0,
    avgWaitSeconds: 0,
  },
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.admissionLog.push(action.payload);
    },

    /**
     * Replaces the entire active patient list with the response of the backend.
     */
    setActivePatients: (state, action: PayloadAction<PatientStatus[]>) => {
      state.activePatients = action.payload;
    },

    /**
     * Updates dashboard statistics received from /topic/stats.
     */
    updateStats: (state, action: PayloadAction<HospitalStats>) => {
      state.stats = action.payload;
    },
  },
});

export const { addPatient, setActivePatients, updateStats } =
  patientsSlice.actions;
export default patientsSlice.reducer;
