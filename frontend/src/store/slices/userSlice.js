import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { ToastAlert } from '../../config/toast'

const initialState = {
    CurrUser: {},
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'CurrUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.CurrUser = action.payload
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.CurrUser = {}
            state.error = true
        })
    }
})

export const fetchUser = createAsyncThunk(('CurrUser/fetch'), async (obj, { rejectWithValue }) => {
    try {
        const id = localStorage.getItem('uid')

        const res = await axios.get(`${BASE_URL}/getuser/${id}`)
        return res.data

        // ToastAlert("user is not logged in","error")
        // return
    } catch (error) {
        return rejectWithValue(error)
    }
})
export default userSlice.reducer



