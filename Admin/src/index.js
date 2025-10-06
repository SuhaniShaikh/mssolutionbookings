import React from "react";
import { createRoot } from "react-dom/client";
import AdminBookings from "./pages/AdminBookings";
import "./index.css"; // optional, create if you want styles

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminBookings />
  </React.StrictMode>
);
