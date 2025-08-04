// slices/userSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  lat: number;
  lon : number
}

const initialState: UserState = {
lat : 0.0,
lon : 0.0
};

const LocationReduce = createSlice({
  name: 'locatiion',
      initialState,
  reducers: {
     setLocation(state , actions : PayloadAction<{lat : number , lon : number}> ) {
      state.lat = actions.payload.lat
      state.lon = actions.payload.lon
    },
        removeLocation(state) {
         state.lat = 0.0;
         state.lon = 0.0;
    },
  },
});

export const { setLocation ,removeLocation  } = LocationReduce.actions;
export default LocationReduce.reducer;
