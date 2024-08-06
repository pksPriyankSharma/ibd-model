import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const PaymentSuccess = () => {
  const location = useLocation();
  const { url } = useContext(StoreContext);
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  //   const url = "your_backend_url"; // replace with actual backend URL

  useEffect(() => {
    const bookAppointment = async () => {
      const appointmentData = JSON.parse(
        sessionStorage.getItem("appointmentData")
      );
      const image = sessionStorage.getItem("image");
      const formData = new FormData();
      formData.append("name", appointmentData.name);
      formData.append("age", Number(appointmentData.age));
      formData.append("time", appointmentData.time);
      formData.append("date", appointmentData.date);
      formData.append("image", image);

      try {
        const response = await axios.post(
          `${url}/api/appointment/book`,
          formData
        );
        if (response.data.success) {
          toast.success("Your Appointment Booked");
        } else {
          toast.error("Try Again");
        }
      } catch (error) {
        toast.error("An error occurred while booking the appointment");
      }
    };

    if (success && orderId) {
      bookAppointment();
    } else {
      toast.error("Payment was not successful. Please try again.");
    }
  }, [success, orderId, url]);

  return (
    <div>
      {success ? (
        <h2>Payment Successful! Booking your appointment...</h2>
      ) : (
        <h2>Payment Failed</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
