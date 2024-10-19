import mongoose from "mongoose";

export const connectdb = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/health-care")
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};
