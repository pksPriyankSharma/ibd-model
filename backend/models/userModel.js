import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // appointmentData: { type: Object, default: {} } // Uncomment if needed
}); // { minimize: false } This ensures that empty objects are saved

// Check if the model already exists to avoid recompiling the model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
