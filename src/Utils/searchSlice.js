import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cache: {}
  },
  reducers: {
    addSearchCache: (state, action) => {
      state.cache = Object.assign({}, state.cache, action.payload);
    }
  }
});

export const { addSearchCache } = searchSlice.actions;

export default searchSlice.reducer;
