import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count : 0,
}

export const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    increment : (state,action)=>{
      console.log(action.payload)
      let length = (action.payload).length
      state.count = length
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment } = cartCountSlice.actions

export default cartCountSlice.reducer