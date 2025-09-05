import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/configure-room" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
