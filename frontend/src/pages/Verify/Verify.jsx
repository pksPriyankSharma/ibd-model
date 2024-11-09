import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(url + "/api/order/verify", {
          success,
          orderId,
        });
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, [url, success, orderId, navigate]); // Dependency array includes all variables used inside useEffect

  // const verifyPayment = async () => {
  //   const response = await axios.post(url + "/api/order/verify", {
  //     success,
  //     orderId,
  //   });
  //   if (response.data.success) {
  //     navigate("/myorders");
  //   } else {
  //     navigate("/");
  //   }
  // };

  // useEffect(() => {
  //   verifyPayment();
  // }, [verifyPayment]);

  // useEffect(() => {
  //   verifyPayment();
  // }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
