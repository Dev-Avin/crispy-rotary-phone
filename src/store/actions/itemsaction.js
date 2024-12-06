import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItem,
  updateItem,
  deleteItem,
} from "../reducers/itemReducers";
import {
  fetchItems as fetchItemsService,
  addItem as addItemService,
  updateItem as updateItemService,
  deleteItem as deleteItemService,
} from "../../services/itemservice";

// Fetch Items (Async Action)
export const fetchItems = () => async (dispatch) => {
  dispatch(fetchItemsStart());
  try {
    const response = await fetchItemsService();
    console.log(response);
    dispatch(fetchItemsSuccess(response));
  } catch (error) {
    dispatch(fetchItemsFailure(error.message));
  }
};

// Add Item (Async Action)
export const createItem = (item) => async (dispatch) => {
  try {
    const response = await addItemService(item);
    dispatch(addItem(response.data));
  } catch (error) {
    console.error("Error adding item:", error.message);
  }
};

// Update Item (Async Action)
export const editItem = (id, item) => async (dispatch) => {
  try {
    const response = await updateItemService(id, item);
    dispatch(updateItem(response.data)); // Update the item in the store
    dispatch(fetchItems()); // Re-fetch items after successful update
  } catch (error) {
    console.error("Error updating item:", error.message);
  }
};

// Delete Item (Async Action)
export const removeItem = (id) => async (dispatch) => {
  try {
    await deleteItemService(id);
    dispatch(deleteItem(id)); // Remove the item from the store
    dispatch(fetchItems()); // Re-fetch items after successful deletion
  } catch (error) {
    console.error("Error deleting item:", error.message);
  }
};
