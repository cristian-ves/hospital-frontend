import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ResourceState {
  operatingRooms: number;
  surgeons: number;
  generalDoctors: number;

  nurses: number;
  ventilators: number;
  monitors: number;
  emergencyRooms: number;

  total: {
    operatingRooms: 3;
    surgeons: 4;
    generalDoctors: 8;

    nurses: 10;
    ventilators: 5;
    monitors: 8;
    emergencyRooms: 10;
  };
}

const initialState: ResourceState = {
  operatingRooms: 3,
  surgeons: 4,
  generalDoctors: 8,
  nurses: 10,
  ventilators: 5,
  monitors: 8,
  emergencyRooms: 10,
  total: {
    operatingRooms: 3,
    surgeons: 4,
    generalDoctors: 8,
    nurses: 10,
    ventilators: 5,
    monitors: 8,
    emergencyRooms: 10,
  },
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    updateResources: (
      _,
      action: PayloadAction<Omit<ResourceState, "total">>,
    ) => ({
      ...action.payload,
      total: initialState.total,
    }),
  },
});

export const { updateResources } = resourcesSlice.actions;
export default resourcesSlice.reducer;
