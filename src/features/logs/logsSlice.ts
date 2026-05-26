import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LogEntry {
  level: string;
  message: string;
  timestamp: number;
}

const logsSlice = createSlice({
  name: "logs",
  initialState: { entries: [] as LogEntry[] },
  reducers: {
    appendLog: (state, action: PayloadAction<LogEntry>) => {
      state.entries.unshift(action.payload);
      if (state.entries.length > 200) state.entries.pop();
    },
  },
});

export const { appendLog } = logsSlice.actions;
export default logsSlice.reducer;
