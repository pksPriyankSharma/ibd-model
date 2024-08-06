import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import YourAppoinment from "./pages/YourAppointments/YourAppoinment";
import CancelAppointment from "./pages/CancelAppointment/CancelAppoinment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/yourAppoinment" element={<YourAppoinment />} />
          <Route path="/cancelAppointment" element={<CancelAppointment />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
