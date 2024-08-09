import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  userOrders,
  verifyOrder,
  cancelOrder
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Route to place an order
orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
//remove
orderRouter.post("/cancel", cancelOrder);

export default orderRouter;
