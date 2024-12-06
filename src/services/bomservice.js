import axios from "axios";
const baseUrl = "https://api-assignment.inveesync.in";

export const fetchBOM = async () => {
  try {
    const response = await axios.get(`${baseUrl}/bom`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch BOM: " + error.message);
  }
};

export const addBOMEntry = async (bomEntry) => {
  try {
    const response = await axios.post(`${baseUrl}/bom`, bomEntry);
    return response.data; // Returns newly created BOM entry
  } catch (error) {
    throw new Error("Failed to create BOM entry: " + error.message);
  }
};

export const updateBOMEntry = async (id, bomEntry) => {
  try {
    const response = await axios.put(`${baseUrl}/bom/${id}`, bomEntry);
    return response.data; // Returns updated BOM entry
  } catch (error) {
    throw new Error("Failed to update BOM entry: " + error.message);
  }
};

export const deleteBOMEntry = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/bom/${id}`);
    return response.data; // Returns message and id of deleted BOM entry
  } catch (error) {
    throw new Error("Failed to delete BOM entry: " + error.message);
  }
};
