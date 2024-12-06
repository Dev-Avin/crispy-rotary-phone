import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import { useDispatch } from "react-redux"; // To dispatch actions
import { editItem, removeItem } from "../../store/actions/itemsaction"; // Import actions
import ReactDOM from "react-dom"; // Import ReactDOM for Portal
import "./ItemCard.css"; // Link to the CSS file

const ItemCard = ({ item }) => {
  const {
    internal_item_name,
    type,
    uom,
    avg_weight_needed,
    scrap_type,
    id,
    quantity,
  } = item;

  const dispatch = useDispatch(); // Redux dispatch
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    internal_item_name,
    type,
    uom,
    avg_weight_needed,
    scrap_type: scrap_type || "",
    min_buffer: item.min_buffer || 0,
    max_buffer: item.max_buffer || 0,
    quantity: quantity || 0, // Add quantity field
  });
  const [errors, setErrors] = useState({}); // To store validation errors

  // Set the hue based on item type
  const getCardClass = (type) => {
    switch (type) {
      case "sell":
        return "card-sell";
      case "purchase":
        return "card-purchase";
      case "component":
        return "card-component";
      default:
        return "";
    }
  };

  // Validation function
  const validateForm = () => {
    const validationErrors = {};

    // Required fields
    if (!formData.internal_item_name)
      validationErrors.internal_item_name = "Item Name is required.";
    if (!formData.type) validationErrors.type = "Type is required.";
    if (!formData.uom) validationErrors.uom = "UoM is required.";
    if (formData.type === "sell" && !formData.scrap_type)
      validationErrors.scrap_type = "Scrap Type is required for sell items.";
    if (formData.min_buffer === null || formData.min_buffer === "")
      validationErrors.min_buffer =
        "Min Buffer is required for sell and purchase.";
    if (formData.max_buffer < formData.min_buffer)
      validationErrors.max_buffer =
        "Max Buffer must be greater than or equal to Min Buffer.";
    if (formData.quantity <= 0)
      validationErrors.quantity = "Quantity must be a positive number.";

    // Defaulting null values for buffer fields
    if (formData.min_buffer === null || formData.min_buffer === "")
      formData.min_buffer = 0;
    if (formData.max_buffer === null || formData.max_buffer === "")
      formData.max_buffer = 0;

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Returns true if no errors
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Dispatch update item action
      dispatch(editItem(id, formData));
      setEditModalOpen(false); // Close modal after submit
    }
  };

  const handleDeleteConfirm = () => {
    // Dispatch delete item action
    dispatch(removeItem(id));
    setDeleteModalOpen(false); // Close modal after deletion
  };

  return (
    <div className={`item-card ${getCardClass(type)}`}>
      <div className="card-header">
        <h3 className="item-name">{internal_item_name}</h3>
        <span className={`item-type ${type}`}>{type}</span>
      </div>

      <div className="card-body">
        <p>
          <strong>Unit of Measure:</strong> {uom}
        </p>
        <p>
          <strong>Average Weight Needed:</strong>{" "}
          {avg_weight_needed ? "Yes" : "No"}
        </p>
        {type === "sell" && scrap_type && (
          <p>
            <strong>Scrap Type:</strong> {scrap_type}
          </p>
        )}
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
      </div>

      <div className="card-footer">
        <button className="icon-button edit-button" onClick={handleEdit}>
          <FaEdit />
        </button>
        <button className="icon-button delete-button" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>

      {/* Edit Item Modal */}
      {isEditModalOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Item</h3>
              <form onSubmit={handleSubmit}>
                <label>Item Name</label>
                <input
                  type="text"
                  name="internal_item_name"
                  value={formData.internal_item_name}
                  onChange={handleChange}
                />
                {errors.internal_item_name && (
                  <p className="error">{errors.internal_item_name}</p>
                )}

                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="sell">Sell</option>
                  <option value="purchase">Purchase</option>
                  <option value="component">Component</option>
                </select>
                {errors.type && <p className="error">{errors.type}</p>}
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && <p className="error">{errors.quantity}</p>}

                <label>UOM</label>
                <select name="uom" value={formData.uom} onChange={handleChange}>
                  <option value="kgs">kgs</option>
                  <option value="nos">nos</option>
                </select>
                {errors.uom && <p className="error">{errors.uom}</p>}

                <div
                  style={{ display: "flex", alignItems: "center", gap: "30px" }}
                >
                  <label style={{ width: "200px" }}>Avg Weight Needed</label>
                  <input
                    type="checkbox"
                    name="avg_weight_needed"
                    checked={formData.avg_weight_needed}
                    onChange={handleChange}
                    style={{ padding: "0px", margin: "0px" }}
                  />
                </div>

                {formData.type === "sell" && (
                  <>
                    <label>Scrap Type</label>
                    <input
                      type="text"
                      name="scrap_type"
                      value={formData.scrap_type}
                      onChange={handleChange}
                    />
                    {errors.scrap_type && (
                      <p className="error">{errors.scrap_type}</p>
                    )}
                  </>
                )}

                <label>Min Buffer</label>
                <input
                  type="number"
                  name="min_buffer"
                  value={formData.min_buffer}
                  onChange={handleChange}
                />
                {errors.min_buffer && (
                  <p className="error">{errors.min_buffer}</p>
                )}

                <label>Max Buffer</label>
                <input
                  type="number"
                  name="max_buffer"
                  value={formData.max_buffer}
                  onChange={handleChange}
                />
                {errors.max_buffer && (
                  <p className="error">{errors.max_buffer}</p>
                )}

                <div className="modal-actions">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body // This renders the modal outside the normal DOM tree, in the body
        )}

      {/* Delete Item Modal */}
      {isDeleteModalOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <h3>Are you sure you want to delete this item?</h3>
              <div className="modal-actions">
                <button className="delete-btn" onClick={handleDeleteConfirm}>
                  Yes, Delete
                </button>
                <button onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ItemCard;
