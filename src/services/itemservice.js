import axios from "axios";

const baseUrl = "https://api-assignment.inveesync.in";

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/items`);
    console.log(response.data);
    return response.data; // Returns list of items
  } catch (error) {
    throw new Error("Failed to fetch items: " + error.message);
  }
};

export const addItem = async (item) => {
  try {
    const response = await axios.post(`${baseUrl}/items`, item);
    return response.data; // Returns newly created item
  } catch (error) {
    throw new Error("Failed to create item: " + error.message);
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${baseUrl}/items/${id}`, item);
    return response.data; // Returns updated item
  } catch (error) {
    throw new Error("Failed to update item: " + error.message);
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/items/${id}`);
    return response.data; // Returns message and id of deleted item
  } catch (error) {
    throw new Error("Failed to delete item: " + error.message);
  }
};
