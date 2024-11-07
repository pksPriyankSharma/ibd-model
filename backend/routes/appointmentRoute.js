import express from "express";
import {
  bookappointment,
  cancelAppointment,
  listAppointment,
} from "../controllers/appointmentController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const appointmentRouter = express.Router();

// image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cd) => {
    return cd(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
// to post(book) appointment (user)
appointmentRouter.post(
  "/book",
  upload.single("image"),
  authMiddleware,
  bookappointment
);
//to shoe appointment
appointmentRouter.get("/list", listAppointment);
//remove appointmnt(adimn)
appointmentRouter.post("/cancel", cancelAppointment);

export default appointmentRouter;
