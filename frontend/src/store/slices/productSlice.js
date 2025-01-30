import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/index.js"
import axios from "axios"

const initialState = {
    products: [],
    loading: false,
    error: false
}

export const DarkModeSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = true
        })

    }
})

export const fetchData = createAsyncThunk(('product/fetch'), async (obj, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/getprod`)
        // console.log(`${res.data.message}` , res.data)
        return res.data
        
    } catch (error) {
        return rejectWithValue(error)
    }   
})


export default DarkModeSlice.reducer