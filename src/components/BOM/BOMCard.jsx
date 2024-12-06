import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editBOM, removeBOM } from "../../store/actions/bomactions";
import ReactDOM from "react-dom";
import "./BOMCard.css";

const BOMCard = ({ bom }) => {
  const {
    item_id,
    component_id,
    quantity,
    id,
    createdAt,
    created_by,
    updatedAt,
    last_updated_by,
  } = bom;

  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    item_id,
    component_id,
    quantity,
  });
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.item_id) validationErrors.item_id = "Item ID is required.";
    if (!formData.component_id)
      validationErrors.component_id = "Component ID is required.";
    if (!formData.quantity) validationErrors.quantity = "Quantity is required.";
    else if (formData.quantity < 1 || formData.quantity > 100)
      validationErrors.quantity = "Quantity must be between 1 and 100.";
    if (formData.item_id === formData.component_id)
      validationErrors.item_component_unique =
        "Item ID and Component ID must be unique.";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleEdit = () => setEditModalOpen(true);
  const handleDelete = () => setDeleteModalOpen(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(editBOM(id, formData));
      setEditModalOpen(false);
    }
  };
  const handleDeleteConfirm = () => {
    dispatch(removeBOM(id));
    setDeleteModalOpen(false);
  };

  return (
    <div className="bom-card">
      <div className="bom-card-header">
        <h3 className="bom-id">BOM ID: {id}</h3>
      </div>
      <div className="bom-card-body">
        <p>
          <strong>Item ID:</strong> {item_id}
        </p>
        <p>
          <strong>Component ID:</strong> {component_id}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Created By:</strong> {created_by}
        </p>
        <p>
          <strong>Last Updated At:</strong>{" "}
          {new Date(updatedAt).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated By:</strong> {last_updated_by}
        </p>
      </div>

      <div className="bom-card-footer">
        <button
          className="bom-card-action-button edit-button"
          onClick={handleEdit}
        >
          <FaEdit />
        </button>
        <button
          className="bom-card-action-button delete-button"
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      </div>

      {/* Edit BOM Modal */}
      {isEditModalOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit BOM</h3>
              <form onSubmit={handleSubmit}>
                <label>Item ID</label>
                <input
                  type="text"
                  name="item_id"
                  value={formData.item_id}
                  onChange={handleChange}
                />
                {errors.item_id && (
                  <p className="error-message">{errors.item_id}</p>
                )}

                <label>Component ID</label>
                <input
                  type="text"
                  name="component_id"
                  value={formData.component_id}
                  onChange={handleChange}
                />
                {errors.component_id && (
                  <p className="error-message">{errors.component_id}</p>
                )}

                {errors.item_component_unique && (
                  <p className="error-message">
                    {errors.item_component_unique}
                  </p>
                )}

                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && (
                  <p className="error-message">{errors.quantity}</p>
                )}

                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Delete BOM Modal */}
      {isDeleteModalOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Are you sure you want to delete this BOM?</h3>
              <div className="modal-actions">
                <button className="btn-danger" onClick={handleDeleteConfirm}>
                  Yes, Delete
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setDeleteModalOpen(false)}
                >
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

export default BOMCard;
