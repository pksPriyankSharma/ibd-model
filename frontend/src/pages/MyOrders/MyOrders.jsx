import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import Modal from "../../components/ProcessingModal";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(data);
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/cancel`, {
        id: orderId,
      });
      if (response.data.success) {
        toast.success("Order cancelled successfully");

        // Remove the canceled order from the state to update the UI
        setData((prevData) =>
          prevData.filter((order) => order._id !== orderId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
    <Modal open={false}/>
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel} alt="parcel" />
            <p>
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} x {item.quantity}
                  {idx < order.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>{order.amount}.00⟨₹⟩</p>
            <p>{order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MyOrders;
