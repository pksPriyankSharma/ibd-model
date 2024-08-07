import React, { useContext, useState } from "react";
import "./AppointmentForm.css";
import { useLocation } from "react-router-dom";
import ExploreDoctor from "../ExploreDoctor/ExploreDoctor";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { jwtDecode } from "jwt-decode";


const AppointmentForm = () => {
  const { token, url } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(false); // New state for checkbox
  const [data, setData] = useState({
    name: "",
    age: "",
    time: "",
    date: "",
  });
  const location = useLocation();
  const { selectedDoctor } = location.state || {};

  if (!selectedDoctor) {
    return (
      <div>
        <ExploreDoctor />
      </div>
    );
  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async () => {
    const orderItems = [
      {
        id: selectedDoctor.id,
        name: selectedDoctor.doctor_name,
        quantity: 1,
        price: selectedDoctor.price,
      },
    ];

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.post(
        `${url}/api/order/place`,
        {
          userId,
          items: orderItems,
          amount: selectedDoctor.price,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Order placement failed:", response.data.message);
        toast.error("Order placement failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Plase logIn bfore booking aan appointment " + error.message);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.name || !data.age || !data.time || !data.date) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", Number(data.age));
    formData.append("time", data.time);
    formData.append("date", data.date);
    if (uploadImage && image) {
      formData.append("image", image); // Only append the image if checkbox is checked
    }

    try {
      const response = await axios.post(
        `${url}/api/appointment/book`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        setData({
          name: "",
          age: "",
          time: "",
          date: "",
        });
        setImage(null);
        toast.success("Your Appointment Booked");
        await placeOrder();
      } else {
        toast.error("Appointment booking failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="appointment-form">
      <h2>
        Book Appointment with {selectedDoctor.doctor_name} and fees is{" "}
        {selectedDoctor.price} ₹
      </h2>
      <form className="flex-col" onSubmit={onSubmitHandler}>
{/*         <div className="add-img-upload flex-col">
          <p>Upload Reports</p>
          <label htmlFor="image">
            {image ? (
              <img
                style={{
                  height: "60px",
                  width: "50px",
                  border: "2px solid black",
                  cursor: "pointer",
                }}
                src={URL.createObjectURL(image)}
                alt="Uploaded report"
              />
            ) : (
              <MdOutlineDriveFolderUpload
                style={{ height: "30px", width: "30px" }}
              />
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div> */}
        <div className="patient-name flex-col">
          <p>Name of patient</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            required
          />
        </div>
        <div className="patient-age flex-col">
          <p>Age of patient</p>
          <input
            onChange={onChangeHandler}
            value={data.age}
            type="number"
            name="age"
            required
          />
        </div>
        <div className="patient-appointment-time flex-col">
          <p>Time of Appointment</p>
          <input
            onChange={onChangeHandler}
            value={data.time}
            type="time"
            name="time"
            required
          />
        </div>
        <div className="patient-appointment-date flex-col">
          <p>Date of Appointment</p>
          <input
            onChange={onChangeHandler}
            value={data.date}
            type="date"
            name="date"
            required
          />
        </div>
<div className="upload-report flex-col">
          <label>
            Do you have any reports to upload?
            <input
              style={{ margin: "10px" }}
              type="checkbox"
              checked={uploadImage}
              onChange={(e) => setUploadImage(e.target.checked)}
            />
          </label>

          {uploadImage && (
            <div className="add-img-upload flex-col">
              <p>Upload Reports</p>
              <label htmlFor="image">
                {image ? (
                  <img
                    style={{
                      height: "70px",
                      width: "60px",
                      border: "2px solid black",
                      cursor: "pointer",
                    }}
                    src={URL.createObjectURL(image)}
                    alt="Uploaded report"
                  />
                ) : (
                  <MdOutlineDriveFolderUpload
                    style={{ height: "30px", width: "30px" }}
                  />
                )}
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
