// store/reducers/itemsReducer.js
import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [], // Stores the list of items
    error: null, // For error handling
    loading: false, // For tracking loading state
  },
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addItem(state, action) {
      state.list.push(action.payload);
    },
    updateItem(state, action) {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteItem(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItem,
  updateItem,
  deleteItem,
} = itemsSlice.actions;

export default itemsSlice.reducer;
