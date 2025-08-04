
import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook , useDispatch, useSelector } from 'react-redux';
import userReducer from './slice/login/loginSlice';
import LocationReduce from './slice/location/locationSlice';

// Create the Redux store
export const store = configureStore({
reducer: {
  user: userReducer,
  location : LocationReduce

}

});

// Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for dispatch and selector with TypeScript support
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
