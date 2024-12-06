import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./store/actions/itemsaction";
import { fetchBOM } from "./store/actions/bomactions";
import ItemCard from "./components/Items/ItemnsCard"; // Assuming ItemCard is in this path
import BOMCard from "./components/BOM/BOMCard.jsx"; // Assuming BOMCard is in this path
import { FaPlus, FaCloudUploadAlt } from "react-icons/fa"; // Import icons from react-icons
import "./TestComponent.css"; // Add this CSS file for styling

const TestComponent = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.list);
  const bom = useSelector((state) => state.bom.list);
  const logs = useSelector((state) => state.logs); // Assuming logs are in this state
  const loadingItems = useSelector((state) => state.items.loading);
  const loadingBOM = useSelector((state) => state.bom.loading);
  const errorItems = useSelector((state) => state.items.error);
  const errorBOM = useSelector((state) => state.bom.error);

  // State to control the active tab and modal visibility
  const [activeTab, setActiveTab] = useState("items"); // Default active tab is "items"
  const [showModal, setShowModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
    console.log("Uploaded CSV file:", file);
    // Handle the CSV file processing here (e.g., parse and upload to backend)
  };

  // Function to handle bulk upload logic
  const handleBulkUpload = () => {
    console.log("Bulk upload initiated...");
    // Implement bulk upload logic here (e.g., upload a CSV file or batch processing)
    setShowModal(false); // Close the modal after upload
    setCsvFile(null); // Reset the CSV file state
  };

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchBOM());
  }, [dispatch]);

  // Check if items or BOM are loading
  if (loadingItems || loadingBOM) {
    return <div>Loading...</div>;
  }

  // Function to handle "Create" button logic
  const handleCreate = () => {
    if (activeTab === "items") {
      // Trigger create item logic here
      console.log("Creating Item...");
      // Dispatch create item action if needed
    } else if (activeTab === "bom") {
      // Trigger create BOM logic here
      console.log("Creating BOM...");
      // Dispatch create BOM action if needed
    }
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "items" ? "active" : ""}`}
          onClick={() => setActiveTab("items")}
        >
          Items
        </div>
        <div
          className={`tab ${activeTab === "bom" ? "active" : ""}`}
          onClick={() => setActiveTab("bom")}
        >
          BOM
        </div>
        <div
          className={`tab ${activeTab === "logs" ? "active" : ""}`}
          onClick={() => setActiveTab("logs")}
        >
          Logs
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "items" && (
          <div className="tab-pane fade-in">
            {errorItems ? (
              <div className="error-message">Error: {errorItems}</div>
            ) : !items || items.length === 0 ? (
              <div>No items found</div>
            ) : (
              <ul>
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "bom" && (
          <div className="tab-pane fade-in">
            {errorBOM ? (
              <div className="error-message">Error: {errorBOM}</div>
            ) : !bom || bom.length === 0 ? (
              <div>No BOM entries found</div>
            ) : (
              <ul>
                {bom.map((bomEntry) => (
                  <BOMCard key={bomEntry.id} bom={bomEntry} />
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "logs" && (
          <div className="tab-pane fade-in">
            {/* Display logs here */}
            {logs && logs.length > 0 ? (
              <ul>
                {logs.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            ) : (
              <div>No logs available</div>
            )}
          </div>
        )}
      </div>

      {/* Create Button (Only for Items and BOM tabs) */}
      {activeTab !== "logs" && (
        <div className="create-button-container">
          {/* Create Button */}
          <button
            className="create-button"
            title={activeTab === "items" ? "Create Item" : "Create BOM"}
            onClick={handleCreate}
          >
            <FaPlus size={24} /> {/* React Icon for plus */}
          </button>

          {/* Bulk Upload Button */}
          <button
            className="bulk-upload-button"
            onClick={() => setShowModal(true)}
            title="Bulk Upload"
          >
            <FaCloudUploadAlt size={24} /> {/* React Icon for cloud upload */}
          </button>

          {/* File Upload Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Upload CSV File</h2>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="file-input"
                />
                <div className="modal-buttons">
                  <button
                    className="modal-close-button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="modal-upload-button"
                    onClick={handleBulkUpload}
                    disabled={!csvFile}
                  >
                    Upload CSV
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestComponent;
