import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchReducer from "./searchSlice"; // Import the reducer directly
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchReducer, // Use the correct key for the slice
    chat : chatSlice,
  },
});

export default store;
