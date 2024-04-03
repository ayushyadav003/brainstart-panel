import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import CurrentDetails from './features/CurrentDetailsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    current: CurrentDetails,
  },
})

export default store
