import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../features/patients/patientsSlice";
import uiReducer from "../features/ui/uiSlice";
import resourcesReducer from "../features/resources/resourcesSlice";
import logsReducer from "../features/logs/logsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    ui: uiReducer,
    resources: resourcesReducer,
    logs: logsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
