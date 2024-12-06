// components/Items/UploadCSV.jsx
import React from "react";

const UploadCSV = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Process file upload logic
  };

  return (
    <div>
      <h3>Upload CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadCSV;
