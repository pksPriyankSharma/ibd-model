import appointmentModel from "../models/appointmentModel.js";
import fs from "fs";

// book Appointment(user)

const bookappointment = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const appointment = new appointmentModel({
    name: req.body.name,
    age: req.body.age,
    time: req.body.time,
    date: req.body.date,
    fees: req.body.fees,
    image: image_filename,
  });
  try {
    await appointment.save();
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

// all Appointmets list

const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

// remove appointment (admin)
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.body.id); // find the appointment
    fs.unlink(`uploads/${appointment.image}`, () => {}); // remove img for uploads folders

    await appointmentModel.findByIdAndDelete(req.body.id); //remove from mongooo
    res.json({ success: true, message: "Appointment Canceled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

export { bookappointment, listAppointment, cancelAppointment };
