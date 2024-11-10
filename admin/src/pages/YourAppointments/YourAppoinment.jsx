import React from "react";
import "./YourAppoinment.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import ProcessingModal from "../../components/ProcessingModal";

const YourAppoinment = () => {
  // const url = "https://health-care-backend-zr11.onrender.com";
  const url = "http://localhost:40001";
  const [list, setList] = useState([]); //store all the data from databae
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentModalData, setAppointmentModalData] = useState(null);

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

  const openProcessing = (item) => {
    console.log(item);
    setAppointmentModalData(item);
    setIsOpen(true);
  };

  const uploadImage = async (file, appointment) => {
    console.log(file, appointment);
    if (!file || !appointment) {
      toast.error("File or appointment data not found");
      return;
    }
    const formData = new FormData();
    formData.append("id", appointment._id);
    if (file) {
      formData.append("image", file); // Only append the image if checkbox is checked
    }

    try {
      const response = await axios.patch(
        `${url}/api/appointment/add-report`,
        formData
      );
      if (response.data.success) {
        toast.success("Your Appointment Updated Successfully");
        window.location.reload();
      } else {
        toast.error("Appointment booking failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <>
      <ProcessingModal
        open={isOpen}
        setOpen={setIsOpen}
        appointmentData={appointmentModalData}
        uploadImage={uploadImage}
      />
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
              <div
                key={index}
                className="list-table-format"
                onClick={() => openProcessing(item)}
              >
                <img src={`${url}/images/` + item.images[0]} alt="Reports" />
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
    </>
  );
};

export default YourAppoinment;
