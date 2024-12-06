import {
  fetchBOMStart,
  fetchBOMSuccess,
  fetchBOMFailure,
  addBOMEntry,
  updateBOMEntry,
  deleteBOMEntry,
} from "../reducers/bomreducers";
import {
  fetchBOM as fetchBOMService,
  addBOMEntry as addBOMEntryService,
  updateBOMEntry as updateBOMEntryService,
  deleteBOMEntry as deleteBOMEntryService,
} from "../../services/bomservice";

// Fetch BOM (Async Action)
export const fetchBOM = () => async (dispatch) => {
  dispatch(fetchBOMStart());
  try {
    const response = await fetchBOMService();
    dispatch(fetchBOMSuccess(response));
  } catch (error) {
    dispatch(fetchBOMFailure(error.message));
  }
};

// Add BOM Entry (Async Action)
export const createBOM = (entry) => async (dispatch) => {
  try {
    const response = await addBOMEntryService(entry);
    dispatch(addBOMEntry(response.data));
  } catch (error) {
    console.error("Error adding BOM entry:", error.message);
  }
};

// Update BOM Entry (Async Action)
export const editBOM = (id, entry) => async (dispatch) => {
  try {
    const response = await updateBOMEntryService(id, entry);
    dispatch(updateBOMEntry(response.data));
  } catch (error) {
    console.error("Error updating BOM entry:", error.message);
  }
};

// Delete BOM Entry (Async Action)
export const removeBOM = (id) => async (dispatch) => {
  try {
    await deleteBOMEntryService(id);
    dispatch(deleteBOMEntry(id));
  } catch (error) {
    console.error("Error deleting BOM entry:", error.message);
  }
};
