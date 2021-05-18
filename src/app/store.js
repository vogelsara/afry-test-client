import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/peopleSlice';
import companyReducer from '../features/companies/companiesSlice';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    companies: companyReducer
  },
});
