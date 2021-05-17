import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/peopleSlice';

export const store = configureStore({
  reducer: {
    people: peopleReducer
  },
});
