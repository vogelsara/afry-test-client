import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    companies: [],
    status: 'idle',
    error: null,
}

export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async () => {
        const response = await axios.get('/companies')
        return response.data
    }
)

export const addNewCompany = createAsyncThunk(
    'companies/createNewCompany',
    async (addedCompany) => {
        const response = await axios.post('/company', addedCompany)
        return response.data
    }
)

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCompanies.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCompanies.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.companies = state.companies.concat(action.payload)
        },
        [fetchCompanies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewCompany.fulfilled]: (state, action) => {
            state.companies = state.companies.concat(action.payload)
        },
    },
})

export const { companyAdded } = companiesSlice.actions

export default companiesSlice.reducer

export const selectAllCompanies = (state) => state.companies.companies
