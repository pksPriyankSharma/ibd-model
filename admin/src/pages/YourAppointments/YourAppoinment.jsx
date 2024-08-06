import React from "react";
import "./YourAppoinment.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

const YourAppoinment = () => {
  const url = "https://health-care-backend-zr11.onrender.com";
  const [list, setList] = useState([]); //store all the data from databae

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/appointment/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("ERROR");
    }
  };

  const cancelAppointment = async (doctorId) => {
    try {
      const response = await axios.post(`${url}/api/appointment/cancel`, {
        id: doctorId,
      });
      if (response.data.success) {
        toast.success("Appointment cancelled");
        alert(" Click on 'OK' to cancel th appointment");
        fetchList();
        // console.log(response.data.name);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p style={{ fontSize: "20px" }}>All Appointments</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Reports</b>
          <b>Name</b>
          <b>Time</b>
          <b>Date</b>
          <b>Action</b>
          {/* <b>Fees</b> */}
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="Reports" />
              <p>{item.name}</p>
              <p>{item.time}</p>
              <p>{formatDate(item.date)}</p>
              {/* <p>{item.fees}</p> */}
              <p onClick={() => cancelAppointment(item._id)}>x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YourAppoinment;
