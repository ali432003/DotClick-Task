import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkmode : true,
}

export const DarkModeSlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    enableDarkMode : (state , action) =>{
        state.darkmode = true
    },
    enableLightMode : (state , action) => {
        state.darkmode = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { enableDarkMode , enableLightMode } = DarkModeSlice.actions

export default DarkModeSlice.reducer