import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    people: [],
    status: 'idle',
    error: null
}

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
    const response = await axios.get('/people');
    return response.data;
})

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        personAdded(state, action) {
            state.people.push(action.payload)
        }
    },
    extraReducers: {
        [fetchPeople.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPeople.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.people = state.people.concat(action.payload)
        },
        [fetchPeople.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { personAdded } = peopleSlice.actions

export default peopleSlice.reducer

export const selectAllPeople = state => state.people.people