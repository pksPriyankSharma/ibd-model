import express from "express";
import {
  addReportAppointment,
  bookappointment,
  cancelAppointment,
  fetchAppointment,
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
appointmentRouter.get("/:id", fetchAppointment);
//remove appointmnt(adimn)
appointmentRouter.post("/cancel", cancelAppointment);
// update appointment
appointmentRouter.patch(
  "/add-report",
  upload.single("image"),
  addReportAppointment
);

export default appointmentRouter;
