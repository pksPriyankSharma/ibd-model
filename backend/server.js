import express from "express";
import cors from "cors";
import { connectdb } from "./config/db.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 40001;

// middleware
app.use(express.json());
app.use(cors()); // exices backend from frontend

// serving image file
app.use(express.static("uploads"));

// db connection
connectdb();

// api endpointss
app.use("/api/appointment", appointmentRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
