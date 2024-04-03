import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentClass: {
    title:'',
    id:''
  },
  currentBatch: {
    title:'',
    id:''
  },
  currentStudent: {
    title:'',
    id:''
  },
  
};

const currentDetailsSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setCurrentClass: (state, action) => {
      state.currentClass = {id:action.payload.id, title: action.payload.title};
    },
    setCurrentBtach: (state, action) => {
      state.currentBatch = {id:action.payload.id, title: action.payload.title};
    },
  },
});

export const { setCurrentClass, setCurrentBtach } = currentDetailsSlice.actions;

export default currentDetailsSlice.reducer;
