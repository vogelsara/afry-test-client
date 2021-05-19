import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    people: [],
    status: 'idle',
    error: null
}

export const fetchPeople = createAsyncThunk(
    'people/fetchPeople', 
    async () => {
        const response = await axios.get('/people');
        return response.data;
    }
)

export const addNewPerson = createAsyncThunk(
    'people/addNewPerson',
    async addedPerson => {
        const response = await axios.post('/person', addedPerson);
        return response.data;
    }
)

export const editPerson = createAsyncThunk(
    'people/editPerson',
    async person => {
        const response = await axios.put(`/person/${person.id}`, person.data);
        return response.data;
    }
)

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
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
        },
        [addNewPerson.fulfilled]: (state, action) => {
            state.people = state.people.concat(action.payload)
        },
        [editPerson.fulfilled]: (state, action) => {
            state.people = state.people.map(person => {
                if (person.id === action.payload.id) {
                    return action.payload;
                } else {
                    return person;
                }
            });
        },
    }
})

export const { personAdded } = peopleSlice.actions

export default peopleSlice.reducer

export const selectAllPeople = state => state.people.people