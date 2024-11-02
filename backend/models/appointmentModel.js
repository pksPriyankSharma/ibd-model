import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  // fees: { type: Number, require: true },
  images: { type: [String] },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
