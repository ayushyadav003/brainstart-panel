import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { setUserData, handleLoginPopup, handleLoader } = userSlice.actions

export default userSlice.reducer
