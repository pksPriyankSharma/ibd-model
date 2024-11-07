import mongoose from "mongoose";

export const connectdb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ankit16:ankit724971265@cluster0.7qczu1b.mongodb.net/health-care"
    )
    .then(() => {
      console.log("DB Connected");
    });
};
