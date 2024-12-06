import React, { useEffect, useState } from "react";
import { fetchItems } from "../../services/itemsService"; // Import service for fetching items
import { fetchBOMs } from "../../services/bomService"; // Import service for fetching BOMs
import "./Dashboard.css";

const Dashboard = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const [bomCount, setBOMCount] = useState(0);
  const [pendingJobs, setPendingJobs] = useState(0);

  useEffect(() => {
    // Fetch items and BOMs count
    fetchItems().then((res) => setItemsCount(res.data.length));
    fetchBOMs().then((res) => {
      setBOMCount(res.data.length);
      const pending = res.data.filter(
        (bom) =>
          !bom.item_id ||
          !bom.component_id ||
          bom.quantity < 1 ||
          bom.quantity > 100
      ).length;
      setPendingJobs(pending);
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{itemsCount}</h2>
          <p>Total Items</p>
        </div>
        <div className="stat-card">
          <h2>{bomCount}</h2>
          <p>Total BOMs</p>
        </div>
        <div className="stat-card">
          <h2>{pendingJobs}</h2>
          <p>Pending Jobs</p>
        </div>
      </div>
      <div className="quick-links">
        <h2>Quick Links</h2>
        <div className="links-grid">
          <a href="/items" className="link-card">
            <h3>Manage Items</h3>
            <p>View, create, or edit items.</p>
          </a>
          <a href="/bom" className="link-card">
            <h3>Manage BOM</h3>
            <p>View, create, or edit Bills of Materials.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
