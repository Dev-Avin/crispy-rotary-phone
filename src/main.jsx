import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js"; // Import your store
import React from "react";
import ReactDOM from "react-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
