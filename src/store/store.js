// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemReducers";
import bomReducer from "./reducers/bomreducers";

// Configure the store using Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    items: itemsReducer,
    bom: bomReducer,
  },
});

export default store;
