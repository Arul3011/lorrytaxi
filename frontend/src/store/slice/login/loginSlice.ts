// slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLogin(state) {
      state.isLoggedIn = true;
    },
    islogout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { isLogin, islogout } = userSlice.actions;
export default userSlice.reducer;
