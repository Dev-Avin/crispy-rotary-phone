import { createSlice } from "@reduxjs/toolkit";

const bomSlice = createSlice({
  name: "bom",
  initialState: {
    list: [], // Stores the list of BOM entries
    error: null, // For error handling
    loading: false, // For tracking loading state
  },
  reducers: {
    fetchBOMStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBOMSuccess(state, action) {
      state.loading = false;
      console.log(action.payload);
      state.list = action.payload;
    },
    fetchBOMFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addBOMEntry(state, action) {
      state.list.push(action.payload);
    },
    updateBOMEntry(state, action) {
      const index = state.list.findIndex(
        (entry) => entry.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteBOMEntry(state, action) {
      state.list = state.list.filter((entry) => entry.id !== action.payload);
    },
  },
});

export const {
  fetchBOMStart,
  fetchBOMSuccess,
  fetchBOMFailure,
  addBOMEntry,
  updateBOMEntry,
  deleteBOMEntry,
} = bomSlice.actions;

export default bomSlice.reducer;
